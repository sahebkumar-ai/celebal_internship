"""
app.py
-------
Streamlit application for the Document Question Answering System (RAG).
"""

import tempfile
from pathlib import Path

import streamlit as st

from vector_store.faiss_index.config import APP_TITLE, APP_ICON
from utils.rag_pipeline import RAGPipeline


# ---------------------------------------------------------
# Streamlit Configuration
# ---------------------------------------------------------

st.set_page_config(
    page_title=APP_TITLE,
    page_icon=APP_ICON,
    layout="wide",
)

st.title(APP_TITLE)
st.caption("Ask questions from your own PDF documents using Retrieval-Augmented Generation (RAG).")


# ---------------------------------------------------------
# Cache Pipeline
# ---------------------------------------------------------

@st.cache_resource
def load_pipeline():
    return RAGPipeline()


pipeline = load_pipeline()


# ---------------------------------------------------------
# Sidebar
# ---------------------------------------------------------

with st.sidebar:

    st.header("📂 Upload PDF Documents")

    uploaded_files = st.file_uploader(
        "Select one or more PDF files",
        type=["pdf"],
        accept_multiple_files=True,
    )

    build_button = st.button(
        "🚀 Build Knowledge Base",
        use_container_width=True,
    )


# ---------------------------------------------------------
# Build Vector Database
# ---------------------------------------------------------

if build_button:

    if not uploaded_files:
        st.warning("Please upload at least one PDF.")
        st.stop()

    with tempfile.TemporaryDirectory() as temp_dir:

        for pdf in uploaded_files:

            destination = Path(temp_dir) / pdf.name

            with open(destination, "wb") as file:
                file.write(pdf.getbuffer())

        with st.spinner("Processing documents..."):

            result = pipeline.build_vector_database(temp_dir)

        st.success("Knowledge Base Created Successfully!")

        col1, col2 = st.columns(2)

        col1.metric(
            "Pages Loaded",
            result["documents"],
        )

        col2.metric(
            "Chunks Created",
            result["chunks"],
        )


st.divider()


# ---------------------------------------------------------
# Ask Questions
# ---------------------------------------------------------

st.header("💬 Ask Questions")

question = st.text_input(
    "Enter your question",
    placeholder="Example: What are the technical skills mentioned in the document?",
)

if st.button(
    "Generate Answer",
    use_container_width=True,
):

    if not pipeline.vector_database_exists():

        st.error("Please build the Knowledge Base first.")

        st.stop()

    if question.strip() == "":

        st.warning("Please enter a question.")

        st.stop()

    with st.spinner("Generating answer..."):

        result = pipeline.ask(question)

    st.subheader("📌 Answer")

    st.write(result["answer"])

    with st.expander("📄 Retrieved Context"):

        st.write(result["context"])











