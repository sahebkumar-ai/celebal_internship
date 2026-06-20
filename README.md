Week 1 – Python, Linear Algebra & Statistics

This repository contains a strong foundational collection of tasks covering core Python programming, NumPy, Pandas, Linear Algebra, and Statistics concepts essential for Machine Learning and Data Science. The project focuses on understanding implementation logic and mathematical foundations instead of relying completely on high-level frameworks.

📁 Repository Overview

The repository includes Google Colab notebooks with complete code implementations, mathematical operations, visualizations, and practical exercises.

🛠️ Key Implementations
1. Python Fundamentals & Defensive Programming
Implemented conditional logic and numerical evaluation programs with proper validation.
Used list comprehensions, sets, and manual string frequency analysis for optimized operations.
Designed exception handling for runtime-safe calculations using TypeError and ZeroDivisionError.
2. Scientific Computing with NumPy
Performed transformations from 1D arrays to multi-dimensional matrices.
Applied element-wise operations and matrix multiplication techniques.
Demonstrated matrix non-commutativity (P × Q ≠ Q × P) using practical examples.
3. Data Wrangling using Pandas
Used .loc and .iloc for efficient indexing and filtering.
Built preprocessing workflows for handling missing values using mean and median imputations.
Explored feature profiling and dataset cleaning techniques.
4. Linear Algebra & Dimensionality Reduction
Calculated vector norms and visualized vectors using quiver plots.
Extracted Eigenvalues and Eigenvectors while verifying:

Implemented Singular Value Decomposition (SVD) for matrix decomposition and low-rank approximation.
5. Statistics & Data Visualization
Computed statistical measures such as Mean, Median, Standard Deviation, and IQR.
Created histograms and KDE plots for distribution analysis and visualization.
💻 Tech Stack
Language: Python 3 (Google Colab)
Libraries: NumPy, Pandas, Matplotlib, Seaborn, SciPy







Week 2 :-Machine Learning & Time Series Analysis Fundamentals

## Dataset

Dataset Source: [Kaggle - Tesla Deliveries and Production Data (2015–2025)](https://www.kaggle.com/datasets/nalisha/tesla-ea-deliveries-and-production-data20152025)



## Overview

This repository provides a comprehensive overview of essential Machine Learning and Time Series Analysis concepts. It is designed for students, beginners, and aspiring data scientists who want to build a strong foundation in machine learning workflows, model development, evaluation techniques, and forecasting methodologies.

The project covers the complete machine learning lifecycle, from data preprocessing and exploratory analysis to model training, evaluation, and time series forecasting.

---


# Topics Covered

### 1. Introduction to Machine Learning

Machine Learning is a branch of Artificial Intelligence that enables systems to automatically learn patterns from historical data and make accurate predictions or decisions without being explicitly programmed.

### 2. Types of Machine Learning

Explores Supervised Learning, Unsupervised Learning, and Reinforcement Learning, highlighting their methodologies, use cases, and real-world applications.

### 3. Machine Learning Pipeline

Demonstrates the end-to-end workflow including data collection, preprocessing, feature engineering, model training, evaluation, and deployment.

### 4. Bias-Variance Tradeoff

Examines the relationship between model complexity and prediction performance, helping achieve the optimal balance between underfitting and overfitting.

### 5. Underfitting and Overfitting

Analyzes common modeling challenges where models either fail to learn meaningful patterns or memorize training data, impacting generalization performance.

### 6. Data Cleaning

Covers techniques for handling missing values, removing duplicate records, correcting inconsistencies, and detecting outliers to ensure high-quality datasets.

### 7. Exploratory Data Analysis (EDA)

Utilizes statistical summaries and visualizations to uncover hidden patterns, identify trends, and gain valuable insights from data.

### 8. Encoding Techniques

Implements various categorical encoding methods such as Label Encoding, One-Hot Encoding, and Ordinal Encoding to prepare data for machine learning algorithms.

### 9. Feature Scaling

Applies normalization and standardization techniques to ensure numerical features contribute equally during model training.

### 10. Feature Engineering

Focuses on creating meaningful features, transforming existing variables, and selecting the most informative attributes to improve model performance.

### 11. Data Leakage

Identifies and prevents situations where future or target information unintentionally influences model training, leading to overly optimistic results.

### 12. Linear Regression

Builds predictive models using linear relationships between independent variables and continuous target variables for regression analysis.

### 13. Ridge Regression

Introduces L2 regularization to reduce model complexity, improve stability, and minimize overfitting in regression tasks.

### 14. Lasso Regression

Applies L1 regularization to shrink less important coefficients to zero, enabling automatic feature selection and model simplification.

### 15. Evaluation Metrics

Evaluates regression model performance using industry-standard metrics such as MAE, MSE, RMSE, and R² Score.

### 16. Cross Validation

Implements robust validation strategies such as K-Fold Cross Validation to assess model reliability and generalization capability.

### 17. Hyperparameter Tuning

Optimizes model parameters using techniques like Grid Search and Random Search to maximize predictive accuracy.

### 18. Time Series Components

Analyzes key components of temporal data including trend, seasonality, cyclic behavior, and irregular residual patterns.

### 19. Stationarity

Examines the statistical properties of time series data and applies methods to achieve stationarity for effective forecasting.

### 20. Rolling Statistics

Uses moving averages and rolling standard deviations to monitor evolving trends, volatility, and structural changes over time.

### 21. Forecasting

Develops predictive models to estimate future values based on historical observations and temporal dependencies.

### 22. Chronological Train-Test Split

Implements time-aware data splitting techniques that preserve temporal order and prevent data leakage in forecasting applications.

---

## Key Learning Outcomes

* Developed a comprehensive understanding of machine learning fundamentals and workflow design.
* Gained practical experience in data preprocessing, feature engineering, and exploratory analysis.
* Applied regression algorithms and regularization techniques for predictive modeling.
* Evaluated model performance using appropriate statistical metrics and validation strategies.
* Implemented hyperparameter optimization techniques to enhance model accuracy.
* Learned best practices for handling time series data, stationarity testing, and forecasting.
* Built a strong foundation for developing scalable and production-ready machine learning solutions.


Week 3: Classification Machine Learning Algorithms, Ensemble Methods & Clustering Techniques

## 📊 Dataset

Dataset used in this project:

🔗 [Country Data Dataset (Kaggle)](https://www.kaggle.com/datasets/rohan0301/unsupervised-learning-on-country-data)

## 📌 Overview

This repository provides a comprehensive collection of Machine Learning algorithms, ensemble learning techniques, clustering methodologies, feature importance analysis, and model evaluation frameworks implemented using Python and industry-standard libraries.

Designed as a practical learning resource, the project covers both fundamental and advanced Machine Learning concepts, enabling users to develop a strong understanding of predictive modeling, data analysis, and intelligent decision-making systems.

---

# 📂 Repository Contents

## 🔹 Logistic Regression

A statistical classification algorithm used for binary and multiclass prediction tasks.

**Key Concepts**

* Binary and Multiclass Classification
* Sigmoid Function
* Probability Estimation
* Model Interpretation
* Classification Performance Evaluation

---

## 🔹 Naive Bayes

A probabilistic machine learning algorithm based on Bayes’ Theorem.

**Key Concepts**

* Bayesian Classification
* Gaussian Naive Bayes
* Multinomial Naive Bayes
* Bernoulli Naive Bayes
* Text Classification Applications

---

## 🔹 K-Nearest Neighbors (KNN)

A distance-based learning algorithm that classifies observations based on their nearest neighbors.

**Key Concepts**

* Instance-Based Learning
* Classification and Regression
* Distance Metrics
* Neighbor Selection
* Hyperparameter Optimization

---

## 🔹 Support Vector Machine (SVM)

A powerful supervised learning algorithm that finds the optimal decision boundary between classes.

**Key Concepts**

* Linear Classification
* Non-Linear Classification
* Kernel Functions (Linear, Polynomial, RBF)
* Margin Maximization
* Support Vectors

---

## 🔹 Model Evaluation Metrics

Performance assessment techniques used to evaluate machine learning models.

**Metrics Covered**

* Accuracy Score
* Precision
* Recall
* F1-Score
* Confusion Matrix
* ROC-AUC Score
* Cross-Validation

---

## 🔹 Decision Tree

A tree-based learning algorithm used for classification and regression tasks.

**Key Concepts**

* Tree Construction
* Entropy
* Gini Impurity
* Node Splitting
* Model Visualization

---

## 🔹 Random Forest

An ensemble learning technique that combines multiple decision trees to improve predictive performance.

**Key Concepts**

* Bootstrap Aggregation (Bagging)
* Ensemble Learning
* Overfitting Reduction
* Feature Importance Analysis
* Robust Predictions

---

## 🔹 Feature Importance Analysis

Techniques used to identify the most influential variables affecting model predictions.

**Key Concepts**

* Feature Ranking
* Model Interpretability
* Variable Significance
* Feature Selection Strategies

---

## 🔹 AdaBoost

An adaptive boosting algorithm that enhances weak learners through sequential training.

**Key Concepts**

* Adaptive Learning
* Sample Weighting
* Sequential Model Improvement
* Boosting Framework

---

## 🔹 Gradient Boosting

A boosting technique that minimizes prediction errors through iterative optimization.

**Key Concepts**

* Gradient Descent Optimization
* Additive Modeling
* Error Reduction
* High Predictive Performance

---

## 🔹 XGBoost

An optimized gradient boosting framework widely used in machine learning competitions and production systems.

**Key Concepts**

* Regularization Techniques
* Scalability
* Computational Efficiency
* Advanced Boosting Methods

---

## 🔹 LightGBM

A high-performance gradient boosting framework developed for large-scale machine learning applications.

**Key Concepts**

* Leaf-Wise Tree Growth
* Fast Training Speed
* Memory Optimization
* Large Dataset Handling

---

## 🔹 Stacking Ensemble

An advanced ensemble technique that combines predictions from multiple models using a meta-learner.

**Key Concepts**

* Multi-Model Integration
* Meta Learning
* Performance Enhancement
* Ensemble Optimization

---

## 🔹 K-Means Clustering

A partition-based clustering algorithm used for grouping similar observations.

**Key Concepts**

* Cluster Formation
* Customer Segmentation
* Elbow Method
* Silhouette Analysis
* Cluster Visualization

---

## 🔹 K-Medoids Clustering

A robust clustering algorithm that represents clusters using actual data points.

**Key Concepts**

* Medoid-Based Clustering
* Outlier Resistance
* Distance-Based Grouping
* Non-Euclidean Applications

---

## 🔹 DBSCAN

A density-based clustering algorithm capable of identifying clusters of arbitrary shapes.

**Key Concepts**

* Density-Based Clustering
* Noise Detection
* Outlier Identification
* Automatic Cluster Discovery

---

# 🛠️ Technologies & Libraries

* Python
* NumPy
* Pandas
* Matplotlib
* Seaborn
* Scikit-Learn
* XGBoost
* LightGBM
* SciPy

---

# 📊 Machine Learning Workflow

1. Data Collection
2. Data Cleaning & Preprocessing
3. Exploratory Data Analysis (EDA)
4. Feature Engineering
5. Feature Selection
6. Model Development
7. Hyperparameter Optimization
8. Model Evaluation
9. Feature Importance Analysis
10. Deployment Preparation

---

# 🎯 Key Learning Outcomes

Through this repository, users will gain practical experience in:

* Supervised Learning Algorithms
* Ensemble Learning Techniques
* Clustering and Segmentation Methods
* Feature Engineering & Selection
* Model Evaluation & Validation
* Hyperparameter Tuning
* Predictive Analytics
* Explainable Machine Learning
* End-to-End Machine Learning Workflows

---

# 📈 Real-World Applications

The implemented techniques can be applied across various domains, including:

* Customer Segmentation
* Country Intelligence Systems
* Fraud Detection
* Healthcare Analytics
* Financial Forecasting
* Marketing Analytics
* Recommendation Systems
* Risk Assessment & Decision Support Systems

---

# ⭐ Project Objective

To provide a structured, hands-on learning platform for understanding and implementing Machine Learning algorithms, ensemble models, clustering techniques, and evaluation frameworks while developing practical skills applicable to real-world data science projects.


Week 4:  Deep Learning Fundamentals

# CIFAR-10 Image Classification using Artificial Neural Networks (ANN) and Convolutional Neural Networks (CNN)

## Project Overview

This project explores image classification using Deep Learning techniques on the CIFAR-10 dataset. The objective is to compare the performance of Artificial Neural Networks (ANNs) and Convolutional Neural Networks (CNNs) in recognizing and classifying images across ten categories.

The project demonstrates how different neural network architectures impact model performance and highlights the importance of convolutional layers for computer vision tasks.

---

## Dataset

The CIFAR-10 dataset consists of 60,000 color images of size 32×32 pixels distributed across 10 classes:

* Airplane
* Automobile
* Bird
* Cat
* Deer
* Dog
* Frog
* Horse
* Ship
* Truck

Dataset Distribution:

* Training Images: 50,000
* Testing Images: 10,000
* Number of Classes: 10
* Image Size: 32 × 32 × 3

---

## Technologies and Libraries Used

* Python
* TensorFlow
* Keras
* NumPy
* Pandas
* Matplotlib

---

## Project Workflow

### 1. Data Loading and Preprocessing

* Loaded the CIFAR-10 dataset from TensorFlow.
* Normalized pixel values from 0–255 to 0–1.
* Prepared training and testing datasets.

### 2. Artificial Neural Network (ANN)

Implemented a baseline ANN model by flattening image data into one-dimensional vectors.

#### ANN Architecture

* Flatten Layer
* Dense Layer (ReLU)
* Dense Layer (ReLU)
* Output Layer (Softmax)

#### Limitations

ANN treats images as simple arrays of numbers and cannot effectively capture spatial relationships between pixels.

---

### 3. Deep Artificial Neural Network

Developed a deeper ANN architecture with additional hidden layers.

#### Improvements

* Increased model complexity.
* Enhanced feature learning capability.
* Achieved better accuracy than the baseline ANN.

However, the model still lacked the ability to extract spatial image features effectively.

---

### 4. Convolutional Neural Network (CNN)

Implemented a CNN model designed specifically for image classification.

#### CNN Architecture

* Data Augmentation Layer

* Conv2D (32 Filters)

* Batch Normalization

* Max Pooling

* Conv2D (64 Filters)

* Batch Normalization

* Max Pooling

* Conv2D (128 Filters)

* Batch Normalization

* Flatten Layer

* Dense Layer (128 Neurons)

* Dropout (0.4)

* Output Layer (Softmax)

---

### 5. Training Improvements

The following techniques were incorporated to improve model performance:

#### Data Augmentation

* Random Horizontal Flip
* Random Rotation
* Random Zoom

Benefits:

* Increases training data diversity.
* Reduces overfitting.
* Improves generalization.

#### Batch Normalization

Benefits:

* Stabilizes training.
* Speeds up convergence.
* Improves model performance.

#### Dropout Regularization

Benefits:

* Prevents overfitting.
* Encourages robust feature learning.

#### Early Stopping

Benefits:

* Stops training when validation performance stops improving.
* Restores the best-performing model weights.

---

## Model Evaluation

Models were evaluated using:

* Accuracy Score
* Training Accuracy
* Validation Accuracy
* Test Accuracy
* Loss Curves

### Performance Comparison

| Model        | Expected Accuracy Range |
| ------------ | ----------------------- |
| Basic ANN    | 45% – 55%               |
| Deep ANN     | 55% – 65%               |
| CNN          | 70% – 80%               |
| Improved CNN | 75% – 85%               |

The CNN significantly outperformed ANN models because it can automatically learn spatial and hierarchical image features.

---

## Key Findings

* ANN models struggle with image data because they ignore spatial information.
* CNNs effectively capture patterns such as edges, textures, and object shapes.
* Increasing CNN filters from 32 → 64 → 128 improves feature extraction capability.
* Batch Normalization and Dropout improve model stability and reduce overfitting.
* Data Augmentation enhances model generalization.
* Early Stopping prevents unnecessary training and helps retain the best model.

---

## Results

The improved CNN achieved the highest performance among all tested models and demonstrated strong generalization on unseen images.

Key achievements:

* Better feature extraction
* Reduced overfitting
* Improved validation performance
* Higher test accuracy
* Robust image classification capability

---

## Learning Outcomes

Through this project, the following concepts were explored:

* Deep Learning Fundamentals
* Artificial Neural Networks (ANN)
* Convolutional Neural Networks (CNN)
* Image Preprocessing
* Data Augmentation
* Batch Normalization
* Dropout Regularization
* Early Stopping
* Model Evaluation and Comparison

---

## Conclusion

This project demonstrates the effectiveness of Convolutional Neural Networks for image classification tasks. While ANN models provide a useful baseline, CNNs significantly outperform them by leveraging spatial information within images. The integration of Data Augmentation, Batch Normalization, Dropout, and Early Stopping further enhances model performance and generalization, making the improved CNN architecture a reliable solution for image recognition problems.

The project provides a strong foundation for advanced computer vision applications and serves as an excellent learning resource for deep learning practitioners and students.



## 📚 Topics Covered

This repository provides a structured introduction to Deep Learning, covering the fundamental building blocks of neural networks, advanced learning mechanisms, and modern computer vision techniques. Each topic is explained with theoretical concepts, mathematical intuition, and practical implementation examples.

### 🔹 Perceptron

Explore the foundational unit of Artificial Neural Networks. Learn how a perceptron processes input features using weights and bias to perform binary classification tasks, along with its advantages and limitations.

### 🔹 Multi-Layer Perceptron (MLP)

Understand how multiple interconnected layers enable neural networks to learn complex non-linear relationships. This section covers network architecture, hidden layers, activation functions, and practical applications of MLPs.

### 🔹 Forward Pass

Learn how information flows through a neural network from the input layer to the output layer. This topic explains weighted summation, activation functions, and the generation of predictions during model inference.

### 🔹 Backpropagation

Study the core learning mechanism of neural networks. Learn how prediction errors are propagated backward through the network to update weights and improve model performance using gradient-based optimization techniques.

### 🔹 Sigmoid and Tanh Activation Functions

Understand the mathematical foundations, characteristics, and practical applications of Sigmoid and Tanh activation functions. Learn their advantages, limitations, and impact on neural network training.

### 🔹 ReLU Family

Explore modern activation functions used in deep learning, including ReLU, Leaky ReLU, Parametric ReLU (PReLU), and ELU. Learn how these functions help overcome vanishing gradient problems and improve training efficiency.

### 🔹 Loss Functions in Deep Learning

Gain an understanding of how neural networks measure prediction error during training. Topics include Mean Squared Error (MSE), Mean Absolute Error (MAE), Binary Cross-Entropy, and Categorical Cross-Entropy, along with their appropriate use cases.

### 🔹 Convolution Layer

Discover the fundamental building block of Convolutional Neural Networks (CNNs). Learn how convolution operations use filters and kernels to extract meaningful features such as edges, textures, and patterns from images.

### 🔹 Pooling and Stride

Understand techniques used to reduce feature map dimensions and computational complexity. Learn the role of Max Pooling, Average Pooling, and Stride in improving model efficiency and feature extraction.

### 🔹 Padding

Learn how padding preserves spatial information and controls output dimensions during convolution operations. Explore different padding strategies, including Valid Padding and Same Padding.

### 🔹 CNN Architectures

Study the evolution of Convolutional Neural Networks through influential architectures such as LeNet, AlexNet, VGG, ResNet, and Inception. Understand their innovations, design principles, and contributions to computer vision.

### 🔹 Transfer Learning

Learn how pre-trained deep learning models can be adapted for new tasks with minimal training data. Explore feature extraction, fine-tuning techniques, and the practical use of architectures such as VGG16, ResNet50, MobileNet, and EfficientNet.

---

## 🎯 Learning Outcomes

By completing this repository, learners will be able to:

* Understand the core principles of Deep Learning and Neural Networks.
* Build and train Artificial Neural Networks (ANNs) from scratch.
* Implement Forward Propagation and Backpropagation algorithms.
* Apply activation functions effectively in different scenarios.
* Select appropriate loss functions for classification and regression problems.
* Understand the internal workings of Convolutional Neural Networks (CNNs).
* Perform image feature extraction using convolution operations.
* Apply pooling, stride, and padding techniques in CNN architectures.
* Explore and compare popular deep learning architectures.
* Utilize Transfer Learning for real-world computer vision applications.
* Develop, train, evaluate, and optimize deep learning models using industry-standard frameworks.

This repository serves as a comprehensive learning resource for students, aspiring data scientists, machine learning engineers, and professionals seeking a strong foundation in Deep Learning and Computer Vision.


Week 5 – Recurrent Neural Network
# 🧠 Text Generation using Vanilla RNN, LSTM, and GRU

## 📖 Overview

This project demonstrates text generation using three popular recurrent neural network architectures:

* Vanilla Recurrent Neural Network (RNN)
* Long Short-Term Memory (LSTM)
* Gated Recurrent Unit (GRU)

The models are trained on a text corpus to learn language structure, grammar, contextual relationships, and sequential patterns. After training, the models generate new text by predicting the next word in a sequence.

This notebook is designed for students, beginners, and deep learning enthusiasts who want to understand sequence modeling both mathematically and practically.

---

## 🎯 Objective

Design and implement deep learning models capable of learning the underlying structure, grammar, and contextual dependencies of a given text corpus to generate coherent and meaningful text sequences using:

* Vanilla RNN
* LSTM
* GRU

The project further compares the performance of these architectures to understand the advantages of gated recurrent networks in sequence learning tasks.

---

## 📚 Learning Outcomes

This project helps learners understand:

### Grammar

Learning the syntactic and grammatical structures of language to generate linguistically correct and meaningful sentences.

### Sentence Flow

Understanding the logical progression and arrangement of words to produce coherent, fluent, and naturally structured sentences.

### Contextual Dependencies

Capturing both short-term and long-term relationships between words to preserve context, meaning, and semantic consistency throughout a sequence.

### Next-Word Prediction

Modeling the probability distribution of words to accurately predict the most likely subsequent word given a preceding sequence.

### Text Generation

Generating contextually relevant and coherent text by leveraging learned language patterns, sequential dependencies, and semantic relationships.

---

## 🔬 Models Implemented

### 1. Vanilla Recurrent Neural Network (RNN)

A basic recurrent neural network that processes sequential data through recurrent connections.

**Key Features**

* Simple architecture
* Learns short-term dependencies
* Fast training
* Suffers from vanishing gradients

---

### 2. Long Short-Term Memory (LSTM)

An advanced recurrent architecture that uses memory cells and gating mechanisms to retain information over longer sequences.

**Key Features**

* Strong long-term memory
* Handles vanishing gradient problems
* Captures complex contextual patterns
* Excellent text generation capability

---

### 3. Gated Recurrent Unit (GRU)

A simplified version of LSTM that maintains strong performance with fewer parameters.

**Key Features**

* Faster training
* Lower computational complexity
* Effective memory retention
* Performance comparable to LSTM

---

## ⚙️ Model Enhancements

The original implementation was improved using the following modifications:

| Parameter           | Original          | Updated            |
| ------------------- | ----------------- | ------------------ |
| Corpus              | Small sample text | Custom text corpus |
| Embedding Dimension | 32                | 64                 |
| Hidden Units        | 64                | 128                |
| Training Epochs     | 100               | 200                |
| Generated Words     | 5                 | 10                 |

The corpus can be replaced with:

* Shakespeare text
* Song lyrics
* Chatbot conversations
* Story paragraphs
* PDF-extracted text
* Custom datasets

---

## 📊 Model Comparison

The three architectures are evaluated using the following criteria:

### Training Loss

Measures how effectively each model learns patterns from the training data. Lower loss indicates better convergence and learning capability.

### Generated Text Quality

Evaluates the coherence, fluency, grammatical correctness, and contextual relevance of generated text.

### Memory Handling

Assesses the model's ability to retain and utilize information from previous time steps.

### Long-Term Dependency Learning

Measures how effectively the model captures relationships between distant words and phrases within a sequence.

| Criterion                     | Vanilla RNN | LSTM      | GRU       |
| ----------------------------- | ----------- | --------- | --------- |
| Training Loss                 | Higher      | Lower     | Lower     |
| Generated Text Quality        | Basic       | Excellent | Very Good |
| Memory Handling               | Limited     | Strong    | Strong    |
| Long-Term Dependency Learning | Weak        | Excellent | Very Good |

---

## 🛠️ Technologies Used

* Python
* TensorFlow / Keras
* NumPy
* Pandas
* Matplotlib
* Natural Language Processing (NLP)

---

## 🚀 Applications

The concepts explored in this project are applicable to:

* Natural Language Processing (NLP)
* Language Modeling
* Text Generation
* Conversational AI
* Chatbots
* Machine Translation
* Sentiment Analysis
* Speech Recognition
* Predictive Text Systems

---

## ✅ Conclusion

This project provides a comprehensive introduction to sequence modeling using recurrent neural networks. Through the implementation and comparison of Vanilla RNN, LSTM, and GRU architectures, learners gain practical experience in understanding how neural networks process sequential data and generate meaningful text.

The results demonstrate that Vanilla RNN is effective for learning short-term patterns but struggles with long-range dependencies. LSTM achieves the strongest performance through its memory cells and gating mechanisms, while GRU offers a balanced trade-off between computational efficiency and predictive performance.

Overall, this project serves as a strong foundation for understanding sequence modeling, recurrent neural networks, and modern Natural Language Processing techniques.


