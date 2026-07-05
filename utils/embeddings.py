"""
utils/embeddings.py
-------------------
Creates and manages the embedding model used in the RAG pipeline.
"""

from langchain_huggingface import HuggingFaceEmbeddings

from config import EMBEDDING_MODEL


class EmbeddingManager:
    """
    Loads the Hugging Face embedding model.
    """

    def __init__(self):
        self.embedding_model = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL,
            model_kwargs={
                "device": "cpu"
            },
            encode_kwargs={
                "normalize_embeddings": True
            }
        )

    def get_embeddings(self):
        """
        Returns the embedding model.
        """
        return self.embedding_model