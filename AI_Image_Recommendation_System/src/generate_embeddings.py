"""
generate_embeddings.py

Generate image embeddings using EfficientNetB0
and save them for similarity search.
"""

import os
import sys
import numpy as np
import pickle
from tqdm import tqdm

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.feature_extractor import FeatureExtractor
from src.preprocess import get_image_paths


# -----------------------------
# Configuration
# -----------------------------

IMAGE_FOLDER = "dataset/subset"

EMBEDDING_FOLDER = "embeddings"

EMBEDDING_FILE = os.path.join(
    EMBEDDING_FOLDER,
    "embeddings.npy"
)

FILENAMES_FILE = os.path.join(
    EMBEDDING_FOLDER,
    "filenames.pkl"
)


# Create embeddings directory
os.makedirs(
    EMBEDDING_FOLDER,
    exist_ok=True
)


# -----------------------------
# Load Images
# -----------------------------

print("\nScanning images...")

image_paths = get_image_paths(
    IMAGE_FOLDER
)

print(
    f"Total images found: {len(image_paths)}"
)


# -----------------------------
# Load Model
# -----------------------------

extractor = FeatureExtractor()


# -----------------------------
# Generate Embeddings
# -----------------------------

embeddings = []
valid_images = []


print("\nGenerating embeddings...")

for image_path in tqdm(image_paths):

    try:

        embedding = extractor.extract(
            image_path
        )

        if embedding is not None:

            embeddings.append(
                embedding
            )

            valid_images.append(
                image_path
            )


    except Exception as e:

        print(
            f"Skipping {image_path}: {e}"
        )


# Convert to numpy array

embeddings = np.array(
    embeddings
)


# -----------------------------
# Save Results
# -----------------------------

print("\nSaving embeddings...")


np.save(
    EMBEDDING_FILE,
    embeddings
)


with open(
    FILENAMES_FILE,
    "wb"
) as f:

    pickle.dump(
        valid_images,
        f
    )


print("\n==============================")
print("Embedding generation complete")
print("==============================")

print(
    "Embedding shape:",
    embeddings.shape
)

print(
    "Saved:",
    EMBEDDING_FILE
)

print(
    "Saved:",
    FILENAMES_FILE
)
