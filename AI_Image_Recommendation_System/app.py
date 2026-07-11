


import streamlit as st

from PIL import Image

import os


from src.recommendation import RecommendationEngine



# -----------------------------
# Page Configuration
# -----------------------------


st.set_page_config(

    page_title="Visual Product Recommendation",

    layout="wide"

)



st.title("Visual Product Recommendation System")


st.write(
    "Upload a product image and find visually similar products using Deep Learning."
)



# -----------------------------
# Load Recommendation Engine
# -----------------------------


@st.cache_resource
def load_engine():

    return RecommendationEngine()



# -----------------------------
# Upload Image
# -----------------------------


uploaded_file = st.file_uploader(

    "Upload Product Image",

    type=[
        "jpg",
        "jpeg",
        "png"
    ]

)



if uploaded_file:


    image = Image.open(
        uploaded_file
    ).convert("RGB")



    st.subheader(
        "Uploaded Image"
    )


    st.image(

        image,

        width=300

    )



    # Save temporary image

    temp_path = (
        "temp_uploaded_image.jpg"
    )


    image.save(
        temp_path,
        format="JPEG"
    )



    # Number of recommendations


    k = st.slider(

        "Number of Recommendations",

        min_value=1,

        max_value=10,

        value=5

    )



    if st.button(
        "Find Similar Products"
    ):



        with st.spinner(
            "Searching similar products..."
        ):

            try:

                engine = load_engine()

            except FileNotFoundError as e:

                st.error(
                    str(e)
                )

                st.stop()


            recommendations = engine.recommend(

                temp_path,

                k

            )



        st.success(
            "Recommendations Found!"
        )



        st.subheader(
            "Similar Products"
        )



        cols = st.columns(5)



        for index, product in enumerate(
            recommendations
        ):


            if os.path.exists(product):


                img = Image.open(
                    product
                )



                with cols[index % 5]:


                    st.image(

                        img,

                        caption=f"Product {index+1}",

                        use_column_width=True

                    )

