"""
train_siamese.py

Train Siamese Network for visual similarity learning.
"""


import os
import random
import numpy as np

from PIL import Image

import tensorflow as tf

from tensorflow.keras.optimizers import Adam


from models.siamese_network import (
    create_siamese_network,
    contrastive_loss
)



# -----------------------------
# Configuration
# -----------------------------


DATASET_PATH = "dataset/subset"


IMAGE_SIZE = (224,224)


BATCH_SIZE = 16


EPOCHS = 10


SAVE_PATH = (
    "saved_models/"
    "siamese_encoder.keras"
)



# -----------------------------
# Load image paths
# -----------------------------


def get_images():

    images = []


    for category in os.listdir(DATASET_PATH):

        category_path = os.path.join(
            DATASET_PATH,
            category
        )


        if not os.path.isdir(category_path):
            continue


        for img in os.listdir(category_path):

            if img.endswith(".jpg"):

                images.append(

                    (
                        os.path.join(
                            category_path,
                            img
                        ),

                        category

                    )

                )


    return images



# -----------------------------
# Image preprocessing
# -----------------------------


def load_image(path):

    img = Image.open(path)

    img = img.convert("RGB")


    img = img.resize(
        IMAGE_SIZE
    )


    img = np.array(
        img,
        dtype=np.float32
    )


    img = tf.keras.applications.efficientnet.preprocess_input(
        img
    )


    return img



# -----------------------------
# Create pairs
# -----------------------------


def create_pairs(images):


    pairs_a = []

    pairs_b = []

    labels = []


    categories = {}


    for path, category in images:

        categories.setdefault(
            category,
            []
        ).append(path)



    # Positive pairs

    for category in categories:

        items = categories[category]


        for _ in range(100):

            img1, img2 = random.sample(
                items,
                2
            )


            pairs_a.append(
                load_image(img1)
            )


            pairs_b.append(
                load_image(img2)
            )


            labels.append(1)



    # Negative pairs

    category_list = list(
        categories.keys()
    )


    for _ in range(len(labels)):

        cat1, cat2 = random.sample(
            category_list,
            2
        )


        img1 = random.choice(
            categories[cat1]
        )


        img2 = random.choice(
            categories[cat2]
        )


        pairs_a.append(
            load_image(img1)
        )


        pairs_b.append(
            load_image(img2)
        )


        labels.append(0)



    return (

        np.array(pairs_a),

        np.array(pairs_b),

        np.array(labels)

    )



# -----------------------------
# Main Training
# -----------------------------


print(
    "Loading images..."
)


images = get_images()


print(
    "Total images:",
    len(images)
)



print(
    "Creating pairs..."
)


x1, x2, y = create_pairs(
    images
)



print(
    "Pair count:",
    len(y)
)



# Create model

model, encoder = create_siamese_network()



model.compile(

    optimizer=Adam(
        learning_rate=0.0001
    ),

    loss=contrastive_loss,

    metrics=[
        "accuracy"
    ]

)



model.summary()



# Train

model.fit(

    [x1,x2],

    y,

    batch_size=BATCH_SIZE,

    epochs=EPOCHS,

    validation_split=0.2

)



# Save encoder

os.makedirs(

    "saved_models",

    exist_ok=True

)



encoder.save(

    SAVE_PATH

)


print(
    "\nSiamese encoder saved:"
)

print(
    SAVE_PATH
)