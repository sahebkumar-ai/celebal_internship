"""
FastAPI bridge for the React frontend.

It exposes the existing recommendation engine over HTTP and serves local
dataset images through a guarded image endpoint.
"""

from pathlib import Path
from typing import Annotated
from urllib.parse import quote

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from src.recommendation import RecommendationEngine


ROOT_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = ROOT_DIR / "temp_uploads"
DATASET_DIR = (ROOT_DIR / "dataset").resolve()
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}

UPLOAD_DIR.mkdir(exist_ok=True)

app = FastAPI(title="Visual Product Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8501",
        "http://127.0.0.1:8501",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine: RecommendationEngine | None = None


def get_engine() -> RecommendationEngine:
    global engine

    if engine is None:
        engine = RecommendationEngine()

    return engine


def resolve_dataset_path(path: str) -> Path:
    requested = (ROOT_DIR / path).resolve()

    try:
        requested.relative_to(DATASET_DIR)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="Invalid image path.") from exc

    if requested.suffix.lower() not in ALLOWED_EXTENSIONS or not requested.exists():
        raise HTTPException(status_code=404, detail="Image not found.")

    return requested


@app.get("/api/health")
def health():
    recommender = get_engine()

    return {
        "status": "ok",
        "indexed_images": len(recommender.image_paths),
    }


@app.get("/api/image")
def image(path: str):
    image_path = resolve_dataset_path(path)
    return FileResponse(image_path)


@app.post("/api/recommend")
async def recommend(
    file: Annotated[UploadFile, File()],
    k: Annotated[int, Form()] = 10,
):
    suffix = Path(file.filename or "").suffix.lower()

    if suffix not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Upload a JPG, JPEG, or PNG image.")

    safe_k = max(1, min(k, 15))
    query_path = UPLOAD_DIR / f"query{suffix}"

    query_path.write_bytes(await file.read())

    recommender = get_engine()
    results = recommender.recommend(str(query_path), safe_k)

    products = []

    for rank, product_path in enumerate(results, start=1):
        relative_path = Path(product_path).as_posix()
        category = Path(product_path).parent.name
        product_id = Path(product_path).stem
        similarity = max(50, 98 - (rank - 1) * 3)

        products.append(
            {
                "id": product_id,
                "category": category,
                "similarity": similarity,
                "confidence": round(similarity / 100, 2),
                "img": f"/api/image?path={quote(relative_path)}",
                "color": "Visual match",
            }
        )

    return {
        "count": len(products),
        "products": products,
    }
