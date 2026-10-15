import os
import json
from typing import Tuple
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, StratifiedKFold, GridSearchCV
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
import joblib
from app.machine_learning.synthetic_data import generate_synthetic_data, get_label_map

ARTIFACT_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'artifacts')
os.makedirs(ARTIFACT_DIR, exist_ok=True)
MODEL_PATH = os.path.join(ARTIFACT_DIR, 'random_forest.joblib')
EVAL_PATH = os.path.join(ARTIFACT_DIR, 'evaluation.json')
LABEL_MAP_PATH = os.path.join(ARTIFACT_DIR, 'label_map.json')

RANDOM_STATE = 42


def prepare_features(df: pd.DataFrame) -> pd.DataFrame:
    return df.copy()


def train_and_evaluate(n_samples: int = 2000) -> Tuple[RandomForestClassifier, dict]:
    X_df, y = generate_synthetic_data(n_samples=n_samples, random_state=RANDOM_STATE)
    X_df = prepare_features(X_df)
    X = X_df.values
    y = y.values
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=RANDOM_STATE
    )
    imputer = SimpleImputer(strategy='mean')
    scaler = StandardScaler()
    clf = RandomForestClassifier(random_state=RANDOM_STATE, n_jobs=-1)
    pipeline = Pipeline([('imputer', imputer), ('scaler', scaler), ('clf', clf)])
    param_grid = {
        'clf__n_estimators': [100, 200],
        'clf__max_depth': [None, 10, 20],
        'clf__min_samples_split': [2, 5]
    }
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
    grid = GridSearchCV(pipeline, param_grid, cv=cv, scoring='f1_macro', n_jobs=-1)
    grid.fit(X_train, y_train)
    best = grid.best_estimator_
    y_pred = best.predict(X_test)
    metrics = {
        'accuracy': float(accuracy_score(y_test, y_pred)),
        'precision_macro': float(precision_score(y_test, y_pred, average='macro', zero_division=0)),
        'recall_macro': float(recall_score(y_test, y_pred, average='macro', zero_division=0)),
        'f1_macro': float(f1_score(y_test, y_pred, average='macro', zero_division=0)),
        'confusion_matrix': confusion_matrix(y_test, y_pred).tolist(),
        'classification_report': classification_report(y_test, y_pred, output_dict=True, zero_division=0)
    }
    model_obj = {'pipeline': best, 'feature_names': list(X_df.columns)}
    joblib.dump(model_obj, MODEL_PATH)
    with open(EVAL_PATH, 'w') as f:
        json.dump(metrics, f, indent=2)
    label_map = get_label_map()
    with open(LABEL_MAP_PATH, 'w') as f:
        json.dump(label_map, f, indent=2)
    return best, metrics


if __name__ == '__main__':
    model, metrics = train_and_evaluate(2000)
    print('Training complete')
    print(json.dumps(metrics, indent=2))
