

"""
finetune_model.py

Transfer learning model using EfficientNetB0
for fashion product categories.
"""

import os

import tensorflow as tf

from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import (
    Dense,
    Dropout,
    GlobalAveragePooling2D
)

from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

from tensorflow.keras.preprocessing.image import ImageDataGenerator



# -----------------------------
# Configuration
# -----------------------------

DATASET_PATH = "dataset/subset"

MODEL_SAVE_PATH = (
    "saved_models/efficientnet_finetuned.keras"
)


IMAGE_SIZE = (224,224)

BATCH_SIZE = 32

EPOCHS = 10



# -----------------------------
# Data Preparation
# -----------------------------


datagen = ImageDataGenerator(

    validation_split=0.2,

    rotation_range=20,

    zoom_range=0.2,

    horizontal_flip=True,

    preprocessing_function=tf.keras.applications.efficientnet.preprocess_input

)



train_data = datagen.flow_from_directory(

    DATASET_PATH,

    target_size=IMAGE_SIZE,

    batch_size=BATCH_SIZE,

    class_mode="categorical",

    subset="training"

)



validation_data = datagen.flow_from_directory(

    DATASET_PATH,

    target_size=IMAGE_SIZE,

    batch_size=BATCH_SIZE,

    class_mode="categorical",

    subset="validation"

)



num_classes = len(
    train_data.class_indices
)


print(
    "Classes:",
    train_data.class_indices
)



# -----------------------------
# Load EfficientNetB0
# -----------------------------


base_model = EfficientNetB0(

    weights="imagenet",

    include_top=False,

    input_shape=(224,224,3)

)



# Freeze pretrained layers

for layer in base_model.layers:

    layer.trainable = False



# -----------------------------
# Add Custom Classifier
# -----------------------------


x = base_model.output


x = GlobalAveragePooling2D()(x)


x = Dense(
    512,
    activation="relu"
)(x)


x = Dropout(
    0.4
)(x)


output = Dense(
    num_classes,
    activation="softmax"
)(x)



model = Model(

    inputs=base_model.input,

    outputs=output

)



# -----------------------------
# Compile
# -----------------------------


model.compile(

    optimizer=Adam(
        learning_rate=0.0001
    ),

    loss="categorical_crossentropy",

    metrics=[
        "accuracy"
    ]

)



model.summary()



# -----------------------------
# Training
# -----------------------------


history = model.fit(

    train_data,

    validation_data=validation_data,

    epochs=EPOCHS

)



# -----------------------------
# Save Model
# -----------------------------


os.makedirs(

    "saved_models",

    exist_ok=True

)



model.save(

    MODEL_SAVE_PATH

)



print(
    "\nModel saved:"
)

print(
    MODEL_SAVE_PATH
)