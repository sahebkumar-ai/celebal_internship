"""
utils/retriever.py
------------------
Retrieves the most relevant document chunks from the FAISS vector store.
"""

from typing import List, Tuple

from langchain_core.documents import Document

from vector_store.faiss_index.config import TOP_K
from utils.vector_store import VectorStoreManager


class Retriever:
    """
    Handles similarity search over the FAISS vector database.
    """

    def __init__(self):
        self.vector_store = VectorStoreManager().load_vector_store()

    # ---------------------------------------------------------
    # Retrieve Documents
    # ---------------------------------------------------------

    def retrieve(
        self,
        query: str,
        k: int = TOP_K,
    ) -> List[Document]:
        """
        Retrieve the most relevant documents.
        """

        documents = self.vector_store.similarity_search(
            query=query,
            k=k,
        )

        return documents

    # ---------------------------------------------------------
    # Retrieve Documents with Similarity Scores
    # ---------------------------------------------------------

    def retrieve_with_scores(
        self,
        query: str,
        k: int = TOP_K,
    ) -> List[Tuple[Document, float]]:
        """
        Retrieve documents along with similarity scores.
        """

        results = self.vector_store.similarity_search_with_score(
            query=query,
            k=k,
        )

        return results

    # ---------------------------------------------------------
    # Format Context
    # ---------------------------------------------------------

    @staticmethod
    def format_context(
        documents: List[Document],
    ) -> str:
        """
        Combine retrieved documents into a single context string.
        """

        context = "\n\n".join(
            doc.page_content for doc in documents
        )

        return context