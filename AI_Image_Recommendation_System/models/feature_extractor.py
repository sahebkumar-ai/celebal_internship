"""
feature_extractor.py

Loads a pretrained EfficientNetB0 model and extracts
1280-dimensional image feature embeddings.
"""

import numpy as np

from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import GlobalAveragePooling2D
from tensorflow.keras.models import Model

from src.preprocess import preprocess_image


class FeatureExtractor:
    """Feature extraction using pretrained EfficientNetB0."""

    def __init__(self):
        base_model = EfficientNetB0(
            weights="imagenet",
            include_top=False,
            input_shape=(224, 224, 3),
        )

        output = GlobalAveragePooling2D()(base_model.output)
        self.model = Model(inputs=base_model.input, outputs=output)

        print("EfficientNetB0 loaded successfully.")

    def extract(self, image_path):
        """Return the normalized feature embedding for one image."""
        image = preprocess_image(image_path)

        if image is None:
            return None

        embedding = self.model.predict(image, verbose=0)[0]
        return embedding / np.linalg.norm(embedding)

    def extract_batch(self, image_list):
        """Return feature embeddings for all readable images in a list."""
        embeddings = []

        for image_path in image_list:
            embedding = self.extract(image_path)

            if embedding is not None:
                embeddings.append(embedding)

        return embeddings
