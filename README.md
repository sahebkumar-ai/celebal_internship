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







Week 2 :-Classical Machine Learning.

## Dataset

Dataset Source: [Kaggle - Tesla Deliveries and Production Data (2015–2025)](https://www.kaggle.com/datasets/nalisha/tesla-ea-deliveries-and-production-data20152025)

Machine Learning Fundamentals
1. Introduction
Machine Learning (ML) is a branch of Artificial Intelligence (AI) that enables systems to learn from data and improve performance without explicit programming.

Why ML matters:

Automates decision-making

Handles massive datasets

Reveals hidden patterns

Improves with experience

Applications: Recommendation systems, fraud detection, healthcare, stock prediction, NLP, computer vision.

2. Types of Machine Learning
Supervised Learning → learns from labeled data
Examples: House price prediction, spam detection
Algorithms: Linear/Logistic Regression, Decision Trees, Random Forest

Unsupervised Learning → finds patterns in unlabeled data
Examples: Customer segmentation, market basket analysis
Algorithms: K-Means, Hierarchical Clustering, PCA

Semi-Supervised Learning → small labeled + large unlabeled data
Example: Medical image classification

Reinforcement Learning → agent learns via rewards
Examples: Robotics, self-driving cars, game AI

3. ML Pipeline
Data Collection

Data Cleaning

Exploratory Data Analysis (EDA)

Feature Engineering

Train-Test Split

Model Training

Evaluation

Hyperparameter Tuning

Deployment

Monitoring

4. Bias-Variance Tradeoff
High Bias → underfitting (too simple)

High Variance → overfitting (too complex)

Goal → balance bias & variance for optimal generalization

5. Underfitting vs Overfitting
Underfitting: High train & test error → solution: add features, complex model

Overfitting: Low train error, high test error → solution: more data, regularization, cross-validation

6. Data Cleaning
Handle missing values (drop, mean/median/mode imputation)

Remove duplicates (df.drop_duplicates())

Handle outliers (IQR, Z-score)

Fix data types (astype())

7. Exploratory Data Analysis (EDA)
Univariate: histograms, box plots

Bivariate: scatter plots, correlation matrix

Multivariate: pair plots, heatmaps

8. Encoding Techniques
Label Encoding → ordinal categories

One-Hot Encoding → nominal categories

Target Encoding → replace with target mean (useful for high-cardinality features)

9. Feature Scaling
Standardization: mean=0, std=1 (StandardScaler)

Normalization: scale to [0,1] (MinMaxScaler)

Important for: Linear/Logistic Regression, SVM, KNN, Neural Nets

10. Feature Engineering
Date features: year, month, weekday

Interaction features: area × rooms

Transformations: log, sqrt

Binning: convert continuous → categorical

11. Data Leakage
Occurs when future/test info leaks into training.
Prevention: split before preprocessing, use pipelines, validate properly.

12–14. Regression Models
Linear Regression: 
𝑦
=
𝛽
0
+
𝛽
1
𝑥
+
𝜀

Ridge Regression (L2): shrinks coefficients, handles multicollinearity

Lasso Regression (L1): feature selection, reduces complexity

Feature	Ridge	Lasso
Penalty	L2	L1
Feature Selection	No	Yes
Coefficients	Shrinks	Can become zero


15. Evaluation Metrics
MAE: average absolute error

MSE: average squared error

RMSE: sqrt of MSE

R²: variance explained

16. Cross Validation
K-Fold CV: split into K folds, train on K-1, validate on 1, repeat.

Benefits: better performance estimate, reduces overfitting risk.

17. Hyperparameter Tuning
Grid Search: exhaustive search

Random Search: random sampling

Bayesian Optimization: guided search using prior results

18–22. Time Series
Components: trend, seasonality, cycles, noise

Stationarity: constant mean/variance → achieved via differencing/log transform

Rolling Statistics: moving averages & std for trend/volatility

Forecasting Models: ARIMA, SARIMA, Random Forest, LSTM

Chronological Split: train on past, test on future (avoid random split)

🎯 Conclusion
Machine Learning is an end-to-end process: data prep → modeling → evaluation → deployment. Mastering fundamentals like bias-variance tradeoff, regularization, cross-validation, and time series forecasting ensures robust, reliable ML systems.
