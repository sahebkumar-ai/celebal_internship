"""
config.py
---------
Application configuration for the Document Question Answering System (RAG).
"""

from pathlib import Path
import os

from dotenv import load_dotenv

# ---------------------------------------------------------
# Load .env file
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
ENV_FILE = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_FILE)

# ---------------------------------------------------------
# API KEY
# ---------------------------------------------------------

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError(
        "GOOGLE_API_KEY not found. Please check your .env file."
    )

# ---------------------------------------------------------
# Streamlit
# ---------------------------------------------------------

APP_TITLE = "📄 Document Question Answering System"
APP_ICON = "🤖"

# ---------------------------------------------------------
# Gemini Model
# ---------------------------------------------------------

LLM_MODEL = "gemini-2.5-flash"

TEMPERATURE = 0.3

MAX_OUTPUT_TOKENS = 2048

# ---------------------------------------------------------
# Embedding Model
# ---------------------------------------------------------

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# ---------------------------------------------------------
# Text Splitting
# ---------------------------------------------------------

CHUNK_SIZE = 1000

CHUNK_OVERLAP = 200

# ---------------------------------------------------------
# Retrieval
# ---------------------------------------------------------

TOP_K = 4

# ---------------------------------------------------------
# Vector Store
# ---------------------------------------------------------

VECTOR_DB_PATH = "vector_store/faiss_index"

# ---------------------------------------------------------
# Supported Files
# ---------------------------------------------------------

SUPPORTED_EXTENSIONS = [".pdf"]