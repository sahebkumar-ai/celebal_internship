# 🛍️  Visual Product Recommendation System
An end-to-end **Deep Learning-based Visual Product Recommendation System** that retrieves visually similar fashion products from an image using **EfficientNetB0**, **Transfer Learning**, **FAISS**, and **Siamese Networks**. The project also includes a modern React frontend, FastAPI backend, Supabase Authentication, and an interactive dashboard.
---
## 📌 Project Overview
Traditional e-commerce search relies on keywords, which often fail to capture a product's visual appearance such as style, texture, color, or design. This project addresses that limitation by implementing an **image-based recommendation engine** capable of retrieving visually similar products using deep feature embeddings.
Users can upload a fashion product image, and the system extracts deep visual features to retrieve the **Top-K most similar products** from a pre-indexed dataset.
---
## 🎯 Objectives
- Build an image-based recommendation engine.
- Extract robust visual embeddings using pretrained CNNs.
- Retrieve visually similar products using FAISS.
- Improve retrieval quality through Transfer Learning.
- Learn semantic similarity using Siamese Networks.
- Provide an interactive web application with authentication.
- Store user recommendation history using Supabase.
---
# ✨ Features
- 🔍 Image-Based Product Search
- 🧠 EfficientNetB0 Feature Extraction
- ⚡ FAISS Similarity Search
- 🎯 Top-K Recommendations
- 🔄 Transfer Learning Support
- 🤝 Siamese Network Training
- 👤 User Authentication (Supabase)
- 📊 Recommendation Dashboard
- 📱 Fully Responsive UI
- ☁️ Cloud Deployment Ready
- 📈 Performance Evaluation
- ❤️ Save Recommendation History
---
# 🏗️ System Architecture
```
                     User
                       │
                       ▼
          React Frontend (Vercel)
                       │
                       ▼
             FastAPI Backend (Render)
                       │
       ┌───────────────┴───────────────┐
       ▼                               ▼
 TensorFlow + EfficientNetB0      Supabase Authentication
       │                               │
       ▼                               ▼
 Feature Embeddings            PostgreSQL Database
       │
       ▼
      FAISS
       │
       ▼
Top-K Similar Products
```
---

# 📂 Project Structure

```
Visual_Product_Recommendation/

│── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
│── dataset/
│   ├── fashion-dataset/
│   └── subset/
│
│── embeddings/
│   ├── embeddings.npy
│   ├── filenames.pkl
│   └── faiss.index
│
│── models/
│
│── saved_models/
│
│── src/
│   ├── create_subset.py
│   ├── preprocess.py
│   ├── generate_embeddings.py
│   ├── faiss_index.py
│   ├── recommendation.py
│   ├── train_transfer.py
│   ├── siamese_model.py
│   ├── train_siamese.py
│   └── utils.py
│
│── api.py
│── app.py
│── requirements.txt
│── README.md
│── .gitignore
```
---
# 📊 Dataset
**Fashion Product Images Dataset**
Source:https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-dataset
Dataset contains:
- Shirts
- Shoes
- Dresses
- Jeans
- T-Shirts
- Handbags
- Watches
- Accessories
A subset of approximately **1500–2500 images** is used for efficient training and evaluation.
---
# 🧠 Deep Learning Pipeline
```
Fashion Dataset
       │
       ▼
Image Preprocessing
       │
       ▼
EfficientNetB0
       │
       ▼
Feature Embeddings
       │
       ▼
Transfer Learning
       │
       ▼
Siamese Network
       │
       ▼
FAISS Index
       │
       ▼
Similarity Search
       │
       ▼
Top-K Recommendations
```
---
# 🛠️ Tech Stack
## Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite
## Backend

- FastAPI
- Python
## Deep Learning
- TensorFlow
- Keras
- EfficientNetB0
- Siamese Network
## Recommendation Engine
- FAISS
- NumPy
- Scikit-learn
## Image Processing
- OpenCV
- Pillow
## Authentication
- Supabase Authentication
## Database
- PostgreSQL (Supabase)
## Deployment
- Supabase
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 📥 Download Dataset


---

# 🚀 Create Dataset Subset

```bash
python src/create_subset.py
```

---

# 🚀 Generate Embeddings
```bash
python src/generate_embeddings.py
```
This creates:
```
embeddings.npy
filenames.pkl
``
# 📊 Evaluation Metrics
### Precision@K
Measures the percentage of relevant products among Top-K recommendations.
### Recall@K
Measures how many relevant products are successfully retrieved.
.
### Visual Comparison
Baseline vs Transfer Learning vs Siamese Network
---
# 🧪 Model Comparison
| Model | Description |
|--------|-------------|
| EfficientNetB0 | Baseline feature extractor |
| Fine-Tuned EfficientNet | Improved feature representation |
| Siamese Network | Learns semantic similarity between products |
---
# 🔐 Authentication
Supabase provides:
- Email Authentication
- User Registration
- Login
- Session Management
- Recommendation History
- User Profiles
---
# 📸 Application Workflow

```
Upload Image

↓

Preprocessing

↓

Feature Extraction

↓
Embedding Generation

↓

FAISS Search

↓

Top-K Similar Products

↓

Display Recommendations
```
---
# 🎯 Future Enhancements
- Multi-image search
- Voice search
- Product bookmarking
- Hybrid recommendation system
- Mobile application
- Multi-language support
- Real-time recommendations
- Personalized recommendations
- Recommendation analytics dashboard
---

# 📚 Learning Outcomes
This project demonstrates practical implementation of:
- Computer Vision
- Deep Learning
- Transfer Learning
- Siamese Networks
- Image Retrieval
- FAISS Similarity Search
- Feature Embedding
- Authentication
- Cloud Deployment
- REST API Development
- Full Stack AI Application Development
---
# ⭐ Acknowledgements
- TensorFlow
- Keras
- FAISS
- OpenCV
- Scikit-learn
- Supabase
- FastAPI
- React
- Kaggle Fashion Product Images Dataset
- EfficientNet Research
