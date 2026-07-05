"""
utils/document_loader.py
------------------------

Loads PDF documents using LangChain's PyPDFLoader.
"""

from pathlib import Path
from typing import List

from langchain_core.documents import Document
from langchain_community.document_loaders import PyPDFLoader


class DocumentLoader:
    """
    Loads PDF documents from a directory.
    """

    def __init__(self):
        pass

    def load_pdf(self, pdf_path: str) -> List[Document]:
        """
        Load a single PDF file.

        Args:
            pdf_path (str): Path to the PDF file.

        Returns:
            List[Document]
        """

        path = Path(pdf_path)

        if not path.exists():
            raise FileNotFoundError(f"PDF not found: {pdf_path}")

        loader = PyPDFLoader(str(path))

        documents = loader.load()

        return documents

    def load_directory(self, directory_path: str) -> List[Document]:
        """
        Load all PDF files from a directory.

        Args:
            directory_path (str): Directory containing PDF files.

        Returns:
            List[Document]
        """

        directory = Path(directory_path)

        if not directory.exists():
            raise FileNotFoundError(
                f"Directory not found: {directory_path}"
            )

        pdf_files = sorted(directory.glob("*.pdf"))

        if not pdf_files:
            raise ValueError(
                "No PDF files found in the specified directory."
            )

        all_documents = []

        for pdf_file in pdf_files:
            try:
                loader = PyPDFLoader(str(pdf_file))
                docs = loader.load()
                all_documents.extend(docs)

            except Exception as error:
                print(f"Failed to load {pdf_file.name}: {error}")

        return all_documents

    def get_pdf_count(self, directory_path: str) -> int:
        """
        Count PDF files in a directory.
        """

        directory = Path(directory_path)

        if not directory.exists():
            return 0

        return len(list(directory.glob("*.pdf")))