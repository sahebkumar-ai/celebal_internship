"""
utils/vector_store.py
---------------------
Creates, saves, loads, and manages the FAISS vector database.
"""

from pathlib import Path
from typing import List

from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS

from vector_store.faiss_index.config import VECTOR_DB_PATH
from utils.embeddings import EmbeddingManager


class VectorStoreManager:
    """
    Handles FAISS vector database operations.
    """

    def __init__(self):
        self.embedding_model = EmbeddingManager().get_embeddings()

    # ---------------------------------------------------------
    # Create Vector Store
    # ---------------------------------------------------------

    def create_vector_store(
        self,
        documents: List[Document],
    ) -> FAISS:
        """
        Create a FAISS vector store from document chunks.
        """

        vector_store = FAISS.from_documents(
            documents=documents,
            embedding=self.embedding_model,
        )

        return vector_store

    # ---------------------------------------------------------
    # Save Vector Store
    # ---------------------------------------------------------

    def save_vector_store(
        self,
        vector_store: FAISS,
    ) -> None:
        """
        Save the FAISS index to disk.
        """

        save_path = Path(VECTOR_DB_PATH)

        save_path.parent.mkdir(parents=True, exist_ok=True)

        vector_store.save_local(str(save_path))

    # ---------------------------------------------------------
    # Load Vector Store
    # ---------------------------------------------------------

    def load_vector_store(self) -> FAISS:
        """
        Load an existing FAISS index.
        """

        save_path = Path(VECTOR_DB_PATH)

        if not save_path.exists():
            raise FileNotFoundError(
                f"Vector database not found: {save_path}"
            )

        vector_store = FAISS.load_local(
            folder_path=str(save_path),
            embeddings=self.embedding_model,
            allow_dangerous_deserialization=True,
        )

        return vector_store

    # ---------------------------------------------------------
    # Check Existence
    # ---------------------------------------------------------

    def vector_store_exists(self) -> bool:
        """
        Check whether the FAISS database exists.
        """

        return Path(VECTOR_DB_PATH).exists()