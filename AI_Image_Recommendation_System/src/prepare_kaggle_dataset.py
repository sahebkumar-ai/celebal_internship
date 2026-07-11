"""
Download a small working subset from the Kaggle fashion product dataset.
"""

import argparse
from pathlib import Path

import kagglehub
import pandas as pd
import requests
from tqdm import tqdm


DATASET_HANDLE = "paramaggarwal/fashion-product-images-dataset"
STYLES_FILE = "fashion-dataset/styles.csv"
IMAGES_FILE = "fashion-dataset/images.csv"
OUTPUT_DIR = Path("dataset/subset")
DEFAULT_CATEGORIES = [
    "Shirts",
    "Tshirts",
    "Jeans",
    "Casual Shoes",
    "Handbags",
    "Dresses",
]


def download_csv(file_path):
    return Path(
        kagglehub.dataset_download(
            DATASET_HANDLE,
            file_path,
        )
    )


def download_image(url, output_path):
    response = requests.get(
        url,
        timeout=30,
    )
    response.raise_for_status()

    output_path.write_bytes(
        response.content
    )


def prepare_subset(samples_per_category, categories):
    print("Downloading Kaggle metadata...")

    styles_path = download_csv(STYLES_FILE)
    images_path = download_csv(IMAGES_FILE)

    styles_df = pd.read_csv(
        styles_path,
        on_bad_lines="skip",
    )
    images_df = pd.read_csv(
        images_path,
    )

    styles_df = styles_df.dropna(
        subset=["articleType"]
    )
    styles_df["filename"] = styles_df["id"].astype(str) + ".jpg"

    df = styles_df.merge(
        images_df,
        on="filename",
        how="inner",
    )

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    total_downloaded = 0

    for category in categories:
        category_df = df[df["articleType"] == category]

        if category_df.empty:
            print(f"No images found for {category}")
            continue

        sample_count = min(
            samples_per_category,
            len(category_df),
        )
        category_df = category_df.sample(
            n=sample_count,
            random_state=42,
        )

        save_dir = OUTPUT_DIR / category
        save_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        downloaded = 0
        print(f"\nProcessing {category}")

        for _, row in tqdm(
            category_df.iterrows(),
            total=len(category_df),
        ):
            output_path = save_dir / row["filename"]

            if output_path.exists():
                downloaded += 1
                continue

            try:
                download_image(
                    row["link"],
                    output_path,
                )
                downloaded += 1
            except Exception as e:
                print(f"Skipping {row['filename']}: {e}")

        total_downloaded += downloaded
        print(f"Downloaded {downloaded} images")

    print("\nSubset creation completed")
    print(f"Total images ready: {total_downloaded}")
    print(f"Saved to: {OUTPUT_DIR}")


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--samples-per-category",
        type=int,
        default=20,
        help="Number of images to download for each category.",
    )
    parser.add_argument(
        "--categories",
        nargs="+",
        default=DEFAULT_CATEGORIES,
        help="Product categories to include from styles.csv articleType.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    prepare_subset(
        args.samples_per_category,
        args.categories,
    )
