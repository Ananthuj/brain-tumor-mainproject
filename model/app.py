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

loaded_model = load_model("resnet.h5")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/upload", methods=["POST"])
def upload_file():
    print(f"Starting")
    labels = ['glioma_tumor','no_tumor','meningioma_tumor','pituitary_tumor']
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
    img = cv2.resize(img, (150, 150))
    img = np.expand_dims(img, axis=0) 
    predictions = loaded_model.predict(img)
    predicted_class = np.argmax(predictions)
    predicted_label = labels[predicted_class]
    print(predicted_label)

    body = {}
    data = {}

    data["class"] = predicted_label
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
