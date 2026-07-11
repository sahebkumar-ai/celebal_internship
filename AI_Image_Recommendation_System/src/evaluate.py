
"""
evaluate.py

Evaluation metrics for image recommendation system.
"""

import time
import os

from src.recommendation import RecommendationEngine



# -----------------------------
# Precision@K
# -----------------------------


def precision_at_k(
        recommendations,
        true_category,
        k
):

    """
    Calculate Precision@K
    """


    relevant = 0


    for image in recommendations[:k]:

        category = image.split(
            os.sep
        )[-2]


        if category == true_category:

            relevant += 1



    return relevant / k



# -----------------------------
# Recall@K
# -----------------------------


def recall_at_k(
        recommendations,
        true_category,
        total_relevant,
        k
):

    """
    Calculate Recall@K
    """


    relevant = 0


    for image in recommendations[:k]:

        category = image.split(
            os.sep
        )[-2]


        if category == true_category:

            relevant += 1



    if total_relevant == 0:

        return 0


    return relevant / total_relevant



# -----------------------------
# Inference Time
# -----------------------------


def measure_inference_time(
        engine,
        image_path,
        k=5
):


    start = time.time()


    result = engine.recommend(
        image_path,
        k
    )


    end = time.time()


    return (

        result,

        end-start

    )



# -----------------------------
# Evaluation
# -----------------------------


if __name__ == "__main__":


    engine = RecommendationEngine()



    test_image = (
        "dataset/subset/Shirts/15970.jpg"
    )


    true_category = "Shirts"



    print(
        "\nRunning evaluation..."
    )



    recommendations, inference_time = (
        measure_inference_time(
            engine,
            test_image,
            k=5
        )
    )



    print(
        "\nRecommendations:"
    )


    for img in recommendations:

        print(img)



    precision = precision_at_k(

        recommendations,

        true_category,

        5

    )



    recall = recall_at_k(

        recommendations,

        true_category,

        total_relevant=100,

        k=5

    )



    print(
        "\nEvaluation Results"
    )


    print(
        "Precision@5:",
        precision
    )


    print(
        "Recall@5:",
        recall
    )


    print(
        "Inference Time:",
        inference_time,
        "seconds"
    )