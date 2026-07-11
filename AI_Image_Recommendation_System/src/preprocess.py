"""
preprocess.py

Image preprocessing utilities for the Visual Product Recommendation System.
"""

import os
import numpy as np
from PIL import Image

from tensorflow.keras.applications.efficientnet import preprocess_input


# Image size expected by EfficientNetB0
IMAGE_SIZE = (224, 224)


def load_image(image_path):
    """
    Load an image using PIL.

    Args:
        image_path (str): Path to image.

    Returns:
        PIL.Image or None
    """

    try:
        image = Image.open(image_path).convert("RGB")
        return image

    except Exception as e:
        print(f"Error loading {image_path}: {e}")
        return None


def preprocess_image(image_path):
    """
    Load and preprocess image for EfficientNet.

    Args:
        image_path (str)

    Returns:
        numpy.ndarray
        Shape: (1, 224, 224, 3)
    """

    image = load_image(image_path)

    if image is None:
        return None

    image = image.resize(IMAGE_SIZE)

    image = np.array(image, dtype=np.float32)

    image = preprocess_input(image)

    image = np.expand_dims(image, axis=0)

    return image


def preprocess_pil_image(image):
    """
    Preprocess a PIL image (used by Streamlit upload).

    Args:
        image (PIL.Image)

    Returns:
        numpy.ndarray
    """

    image = image.convert("RGB")

    image = image.resize(IMAGE_SIZE)

    image = np.array(image, dtype=np.float32)

    image = preprocess_input(image)

    image = np.expand_dims(image, axis=0)

    return image


def is_valid_image(image_path):
    """
    Check if image is readable.

    Returns:
        bool
    """

    try:
        img = Image.open(image_path)
        img.verify()
        return True

    except Exception:
        return False


def get_image_paths(root_dir):
    """
    Recursively collect all image paths.

    Args:
        root_dir (str)

    Returns:
        list
    """

    image_paths = []

    valid_extensions = (".jpg", ".jpeg", ".png")

    for root, _, files in os.walk(root_dir):

        for file in files:

            if file.lower().endswith(valid_extensions):

                image_paths.append(os.path.join(root, file))

    return sorted(image_paths)