"""
faiss_index.py

Create FAISS index from image embeddings
for fast similarity search.
"""

import os
import numpy as np
import faiss


# -----------------------------
# Configuration
# -----------------------------

EMBEDDING_FILE = "embeddings/embeddings.npy"

INDEX_FILE = "embeddings/faiss.index"


# -----------------------------
# Load embeddings
# -----------------------------

print("\nLoading embeddings...")

embeddings = np.load(
    EMBEDDING_FILE
)


print(
    "Embedding shape:",
    embeddings.shape
)


# -----------------------------
# Normalize embeddings
# -----------------------------

# Required for cosine similarity
# FAISS uses inner product search

faiss.normalize_L2(
    embeddings
)


# -----------------------------
# Create FAISS index
# -----------------------------

dimension = embeddings.shape[1]


index = faiss.IndexFlatIP(
    dimension
)


# Add embeddings

index.add(
    embeddings
)


print(
    "Total vectors indexed:",
    index.ntotal
)


# -----------------------------
# Save index
# -----------------------------

faiss.write_index(
    index,
    INDEX_FILE
)


print("\n==============================")
print("FAISS index created")
print("==============================")

print(
    "Saved:",
    INDEX_FILE
)