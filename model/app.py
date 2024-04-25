from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from keras.models import load_model
import cv2
import numpy as np
from flask_cors import CORS
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input
from keras.applications.resnet50 import preprocess_input
from keras.preprocessing import image
import numpy as np
from keras.models import load_model
import tensorflow as tf

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

cnn_model = load_model("./BrainTumorCNN.h5")
resnet_model = load_model("./BrainTumorResnet50.h5")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/upload", methods=["POST"])
def upload_file():
    print(f"Starting")
    labels = ["glioma_tumor", "meningioma_tumor", "no_tumor", "pituitary_tumor"]
    sentences = [
        "Glioma tumors, though less common than some other types, are a formidable challenge in neuro-oncology due to their infiltrative nature and diverse genetic profiles. Treatment strategies often require a multidisciplinary approach tailored to individual patients' needs.",
        "Meningioma tumors, typically slow-growing and benign, can still present clinical challenges depending on their location and size. Surgical resection remains the primary treatment, but advancements in radiotherapy and targeted therapies offer promising options for cases requiring adjunctive treatment.",
        "The absence of a tumor.",
        "Pituitary tumors, often benign and hormonally active, can manifest in various ways, posing diagnostic and therapeutic dilemmas. Treatment modalities range from observation for asymptomatic cases to surgical resection and hormonal therapies for symptomatic or aggressive tumors.",
    ]
    if "image" not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No selected file"})

    if file and allowed_file(file.filename):
        filename = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(filename)
        print(f"Image received and saved: {filename}")

    img = cv2.imread(filename)
    img = cv2.resize(img, (224, 224))
    img_array = np.array(img)
    print(img_array.shape)
    img_array = img_array.reshape(1, 224, 224, 3)
    print(img_array.shape)
    cnn_prediction = cnn_model.predict(img_array)
    resnet_prediction = resnet_model.predict(img_array)

    weight_cnn = 0.5
    weight_resnet = 0.5
    ensemble_prediction = (
        weight_cnn * cnn_prediction + weight_resnet * resnet_prediction
    )

    final_label = np.argmax(ensemble_prediction, axis=1)
    print(final_label)
    predicted_label = labels[final_label[0]]
    descrip = sentences[final_label[0]]
    print(predicted_label)

    body = {}
    data = {}

    data["class"] = predicted_label
    data["descrip"] = descrip
    print(predicted_label)
    body["data"] = data
    return buildResponse(body)


def buildResponse(body):
    response = jsonify(body)
    return response


if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.debug = True
    app.run(port=5000, threaded=True)
