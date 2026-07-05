"""
utils/rag_pipeline.py
---------------------
End-to-End RAG Pipeline
"""

from utils.document_loader import DocumentLoader
from utils.text_splitter import TextSplitter
from utils.vector_store import VectorStoreManager
from utils.retriever import Retriever
from utils.llm import LLMManager
from prompts.prompt_template import build_prompt


class RAGPipeline:
    """
    Complete Retrieval-Augmented Generation Pipeline.
    """

    def __init__(self):
        self.document_loader = DocumentLoader()
        self.text_splitter = TextSplitter()
        self.vector_manager = VectorStoreManager()
        self.llm = LLMManager()

    # -----------------------------------------------------
    # Build Vector Database
    # -----------------------------------------------------

    def build_vector_database(self, data_directory: str):
        """
        Build the FAISS vector database from PDF files.
        """

        print("Loading PDF documents...")

        documents = self.document_loader.load_directory(
            data_directory
        )

        print(f"Loaded {len(documents)} pages.")

        print("Splitting documents...")

        chunks = self.text_splitter.split_documents(
            documents
        )

        print(f"Created {len(chunks)} chunks.")

        print("Creating FAISS Vector Store...")

        vector_store = self.vector_manager.create_vector_store(
            chunks
        )

        self.vector_manager.save_vector_store(
            vector_store
        )

        print("Vector Store Saved Successfully!")

        return {
            "documents": len(documents),
            "chunks": len(chunks),
        }

    # -----------------------------------------------------
    # Ask Question
    # -----------------------------------------------------

    def ask(self, question: str):
        """
        Ask a question about the uploaded documents.
        """

        retriever = Retriever()

        retrieved_documents = retriever.retrieve(question)

        context = retriever.format_context(
            retrieved_documents
        )

        prompt = build_prompt(
            context=context,
            question=question,
        )

        answer = self.llm.generate_response(
            prompt
        )

        return {
            "question": question,
            "answer": answer,
            "context": context,
            "documents": retrieved_documents,
        }

    # -----------------------------------------------------
    # Ask with Scores
    # -----------------------------------------------------

    def ask_with_scores(self, question: str):
        """
        Retrieve documents with similarity scores.
        """

        retriever = Retriever()

        results = retriever.retrieve_with_scores(
            question
        )

        documents = [doc for doc, _ in results]

        scores = [score for _, score in results]

        context = retriever.format_context(
            documents
        )

        prompt = build_prompt(
            context=context,
            question=question,
        )

        answer = self.llm.generate_response(
            prompt
        )

        return {
            "question": question,
            "answer": answer,
            "scores": scores,
            "documents": documents,
        }

    # -----------------------------------------------------
    # Check Vector Store
    # -----------------------------------------------------

    def vector_database_exists(self):
        """
        Returns True if the vector database exists.
        """

        return self.vector_manager.vector_store_exists()