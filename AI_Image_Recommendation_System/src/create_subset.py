import os
import shutil
import random
from pathlib import Path

import pandas as pd
from tqdm import tqdm

# -----------------------------
# Configuration
# -----------------------------

DATASET_DIR = Path("dataset")
KAGGLE_DATA_DIR = Path("kaggle_Data") / "fashion-dataset"
OUTPUT_DIR = DATASET_DIR / "subset"


def find_local_kaggle_files():
    candidates = [
        KAGGLE_DATA_DIR,
        KAGGLE_DATA_DIR / "fashion-dataset",
        DATASET_DIR,
    ]

    for root in candidates:
        csv_path = root / "styles.csv"
        image_dir = root / "images"

        if csv_path.exists() and image_dir.exists():
            return csv_path, image_dir

    raise FileNotFoundError(
        "Could not find styles.csv and images folder. Expected them under "
        "kaggle_Data/fashion-dataset or dataset."
    )

# Categories to include
SELECTED_CATEGORIES = [
    "Shirts",
    "Tshirts",
    "Jeans",
    "Casual Shoes",
    "Handbags",
    "Dresses"
]

# Images per category
SAMPLES_PER_CATEGORY = 300

# Random seed
random.seed(42)

# -----------------------------
# Create output folder
# -----------------------------

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("\nLoading metadata...")
CSV_PATH, IMAGE_DIR = find_local_kaggle_files()
print(f"Metadata: {CSV_PATH}")
print(f"Images: {IMAGE_DIR}")

df = pd.read_csv(CSV_PATH, on_bad_lines="skip")

# Remove missing values
df = df.dropna(subset=["articleType"])

print(f"Total metadata records : {len(df)}")

# -----------------------------
# Create subset
# -----------------------------

total_copied = 0

for category in SELECTED_CATEGORIES:

    print(f"\nProcessing {category}")

    category_df = df[df["articleType"] == category]

    if len(category_df) == 0:
        print(f"No images found for {category}")
        continue

    sample_count = min(SAMPLES_PER_CATEGORY, len(category_df))

    category_df = category_df.sample(
        n=sample_count,
        random_state=42
    )

    save_dir = OUTPUT_DIR / category

    save_dir.mkdir(parents=True, exist_ok=True)

    copied = 0

    for _, row in tqdm(category_df.iterrows(),
                       total=len(category_df)):

        image_name = f"{row['id']}.jpg"

        src = IMAGE_DIR / image_name

        dst = save_dir / image_name

        if src.exists():

            try:
                shutil.copy(src, dst)
                copied += 1

            except Exception:
                pass

    total_copied += copied

    print(f"Copied {copied} images")

print("\n-----------------------------------")
print("Subset creation completed")
print("-----------------------------------")
print(f"Total copied images : {total_copied}")
print(f"Saved to : {OUTPUT_DIR}")
