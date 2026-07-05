"""
utils/text_splitter.py
----------------------
Splits loaded documents into smaller chunks for embedding.
"""

from typing import List

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from config import CHUNK_SIZE, CHUNK_OVERLAP


class TextSplitter:
    """
    Splits documents into overlapping text chunks.
    """

    def __init__(
        self,
        chunk_size: int = CHUNK_SIZE,
        chunk_overlap: int = CHUNK_OVERLAP,
    ):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                "",
            ],
            length_function=len,
        )

    def split_documents(
        self,
        documents: List[Document],
    ) -> List[Document]:
        """
        Split LangChain Document objects into smaller chunks.
        """

        return self.splitter.split_documents(documents)

    def split_text(
        self,
        text: str,
    ) -> List[str]:
        """
        Split a plain text string into chunks.
        """

        return self.splitter.split_text(text)