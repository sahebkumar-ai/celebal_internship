"""
app.py
-------
Streamlit application for the Document Question Answering System (RAG).
"""

import tempfile
from pathlib import Path

import streamlit as st

from config import APP_TITLE, APP_ICON
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






# python -m streamlit run app.py


# import tempfile
# from pathlib import Path
# import streamlit as st

# from config import APP_TITLE, APP_ICON
# from utils.rag_pipeline import RAGPipeline


# st.set_page_config(page_title=APP_TITLE, page_icon=APP_ICON, layout="wide")
# st.title(APP_TITLE)

# # -------------------------
# # Session State (Chat Memory)
# # -------------------------
# if "chat_history" not in st.session_state:
#     st.session_state.chat_history = []

# # -------------------------
# # Load Pipeline
# # -------------------------
# @st.cache_resource
# def load_pipeline():
#     return RAGPipeline()

# pipeline = load_pipeline()

# # -------------------------
# # Sidebar Upload
# # -------------------------
# with st.sidebar:
#     st.header("📂 Upload PDFs")

#     uploaded_files = st.file_uploader(
#         "Upload PDF files",
#         type=["pdf"],
#         accept_multiple_files=True
#     )

#     build = st.button("🚀 Build Knowledge Base", use_container_width=True)

# # -------------------------
# # Build KB
# # -------------------------
# if build:
#     if not uploaded_files:
#         st.warning("Upload PDFs first")
#         st.stop()

#     with tempfile.TemporaryDirectory() as temp_dir:
#         for file in uploaded_files:
#             path = Path(temp_dir) / file.name
#             path.write_bytes(file.getbuffer())

#         with st.spinner("Processing..."):
#             result = pipeline.build_vector_database(temp_dir)

#         st.success("Knowledge Base Ready!")

#         st.metric("Documents", result["documents"])
#         st.metric("Chunks", result["chunks"])

# # -------------------------
# # Chat UI
# # -------------------------
# st.divider()
# st.header("💬 Chat with your Documents")

# question = st.text_input("Ask a question")

# if st.button("Ask"):

#     if not pipeline.vector_database_exists():
#         st.error("Build Knowledge Base first")
#         st.stop()

#     if not question:
#         st.warning("Enter a question")
#         st.stop()

#     result = pipeline.ask(question)

#     answer = result["answer"]

#     # Save memory
#     st.session_state.chat_history.append((question, answer))

# # -------------------------
# # Display Chat History
# # -------------------------
# for q, a in st.session_state.chat_history:
#     st.markdown("### 🧑 You")
#     st.write(q)

#     st.markdown("### 🤖 AI")
#     st.write(a)








