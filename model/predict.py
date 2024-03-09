import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import cv2

cnn_model = load_model("./BrainTumorCNN.h5")
resnet_model = load_model("./BrainTumorResnet50.h5")
image_path = (
    r"C:\Users\denny\OneDrive\Documents\Projects\brain\model\uploads\image(112).jpg"
)
img = cv2.imread(image_path)
img = cv2.resize(img, (224, 224))
img_array = np.array(img)
print(img_array.shape)
img_array = img_array.reshape(1, 224, 224, 3)
print(img_array.shape)

cnn_prediction = cnn_model.predict(img_array)
resnet_prediction = resnet_model.predict(img_array)
ensemble_prediction = 0.5 * (cnn_prediction + resnet_prediction)
final_label = np.argmax(ensemble_prediction, axis=1)

print("Ensemble Prediction:", final_label)
