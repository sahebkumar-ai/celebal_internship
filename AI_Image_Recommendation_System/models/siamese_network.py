

"""
siamese_network.py

Siamese Network for learning image similarity
using EfficientNetB0 embeddings.
"""

import tensorflow as tf

from tensorflow.keras.applications import EfficientNetB0

from tensorflow.keras.layers import (
    Input,
    Dense,
    Dropout,
    GlobalAveragePooling2D,
    Lambda
)

from tensorflow.keras.models import Model



# -----------------------------
# Configuration
# -----------------------------

IMAGE_SIZE = (224,224)

EMBEDDING_SIZE = 512



# -----------------------------
# Create Encoder
# -----------------------------


def create_encoder():

    """
    Creates shared CNN encoder.
    """

    base_model = EfficientNetB0(

        weights="imagenet",

        include_top=False,

        input_shape=(224,224,3)

    )


    # Freeze CNN initially

    for layer in base_model.layers:

        layer.trainable = False



    x = base_model.output


    x = GlobalAveragePooling2D()(x)


    x = Dense(

        512,

        activation="relu"

    )(x)


    x = Dropout(

        0.3

    )(x)



    # Normalize embedding

    x = Lambda(

        lambda x:
        tf.math.l2_normalize(
            x,
            axis=1
        )

    )(x)



    encoder = Model(

        inputs=base_model.input,

        outputs=x,

        name="image_encoder"

    )


    return encoder



# -----------------------------
# Siamese Model
# -----------------------------


def create_siamese_network():


    encoder = create_encoder()



    image_a = Input(

        shape=(224,224,3),

        name="image_a"

    )


    image_b = Input(

        shape=(224,224,3),

        name="image_b"

    )



    embedding_a = encoder(

        image_a

    )


    embedding_b = encoder(

        image_b

    )



    # Euclidean distance

    distance = Lambda(

        lambda tensors:

        tf.sqrt(

            tf.reduce_sum(

                tf.square(

                    tensors[0] -
                    tensors[1]

                ),

                axis=1,

                keepdims=True

            )

        )

    )(

        [embedding_a, embedding_b]

    )



    output = Dense(

        1,

        activation="sigmoid"

    )(

        distance

    )



    siamese_model = Model(

        inputs=[image_a,image_b],

        outputs=output

    )


    return siamese_model, encoder



# -----------------------------
# Contrastive Loss
# -----------------------------


def contrastive_loss(
        y_true,
        y_pred,
        margin=1
):

    """
    Contrastive loss function.

    y_true:
        1 = similar
        0 = different
    """

    y_true = tf.cast(

        y_true,

        y_pred.dtype

    )


    positive_loss = (

        y_true *

        tf.square(y_pred)

    )


    negative_loss = (

        (1-y_true)

        *

        tf.square(

            tf.maximum(

                margin-y_pred,

                0

            )

        )

    )


    return tf.reduce_mean(

        positive_loss +

        negative_loss

    )