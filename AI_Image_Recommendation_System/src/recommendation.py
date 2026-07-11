

"""
recommendation.py

Image based product recommendation using
EfficientNet embeddings + FAISS search.
"""

import os
import pickle
import numpy as np
import faiss

from models.feature_extractor import FeatureExtractor


class RecommendationEngine:

    def __init__(self):

        # FAISS index path
        self.index_path = "embeddings/faiss.index"

        # Image mapping path
        self.filename_path = "embeddings/filenames.pkl"

        missing_files = [
            path for path in (self.index_path, self.filename_path)
            if not os.path.exists(path)
        ]

        if missing_files:
            raise FileNotFoundError(
                "Missing recommendation data files: "
                + ", ".join(missing_files)
                + ". Add product images to dataset/subset, then run "
                + "`python src/generate_embeddings.py` and "
                + "`python src/faiss_index.py`."
            )


        # Load FAISS index

        print("Loading FAISS index...")

        self.index = faiss.read_index(
            self.index_path
        )


        # Load image paths

        with open(
            self.filename_path,
            "rb"
        ) as f:

            self.image_paths = pickle.load(f)


        # Feature extractor

        self.extractor = FeatureExtractor()


        print("Recommendation engine ready!")


    def recommend(self, image_path, k=5):
        """
        Find similar products.

        Args:
            image_path:
                Query image

            k:
                Number of recommendations

        Returns:
            list of image paths
        """


        # Extract query embedding

        query_embedding = self.extractor.extract(
            image_path
        )


        if query_embedding is None:
            return []


        # Convert shape

        query_embedding = np.expand_dims(
            query_embedding,
            axis=0
        )


        # Normalize for cosine similarity

        faiss.normalize_L2(
            query_embedding
        )


        # Search

        distances, indices = self.index.search(
            query_embedding,
            k + 1
        )


        recommendations = []


        for idx in indices[0]:

            if idx < len(self.image_paths):

                recommendations.append(
                    self.image_paths[idx]
                )


        # Remove query image itself

        recommendations = [
            img for img in recommendations
            if os.path.abspath(img)
            != os.path.abspath(image_path)
        ]


        return recommendations[:k]
