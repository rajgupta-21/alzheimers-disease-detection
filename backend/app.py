from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'models/alzheimer_model.pkl'
SCALER_PATH = 'models/scaler.pkl'
os.makedirs('models', exist_ok=True)

# Global variables for model and scaler
model = None
scaler = None

@app.route('/', methods=['GET'])
def home():
    """Root endpoint to check API status"""
    return jsonify({
        'status': 'success',
        'message': "Alzheimer's Disease Detection API",
        'model_status': 'loaded' if model is not None else 'not loaded',
        'available_endpoints': {
            '/': 'Get API status (GET)',
            '/predict': 'Make predictions (POST)'
        },
        'version': '1.0.0'
    })
def validate_input(data):
    """Validate input data"""
    required_fields = ['Age', 'Gender', 'MMSE']
    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
    
    # Validate Age
    if not isinstance(data['Age'], (int, float)) or data['Age'] < 0 or data['Age'] > 120:
        raise ValueError("Age must be between 0 and 120")
    
    # Validate Gender - make it more flexible
    gender = str(data['Gender']).upper()  # Convert to uppercase
    if gender not in ['M', 'F', 'MALE', 'FEMALE']:
        raise ValueError("Gender must be 'M' or 'F' (or 'Male'/'Female')")
    data['Gender'] = gender[0]  # Take first letter only
    
    # Validate MMSE
    if not isinstance(data['MMSE'], (int, float)) or data['MMSE'] < 0 or data['MMSE'] > 30:
        raise ValueError("MMSE must be between 0 and 30")
    
def train_model():
    print("Training new model with patient data...")
    
    try:
        # Load and validate CSV data
        csv_path = 'data/alzheimers_disease_data.csv'
        if not os.path.exists(csv_path):
            raise FileNotFoundError(f"Patient data CSV file not found at {csv_path}")
            
        df = pd.read_csv(csv_path)
        print(f"Loaded {len(df)} patient records")
        
        if 'Diagnosis' not in df.columns:
            raise ValueError("CSV must contain 'Diagnosis' column")
        
        # Select features based on available columns
        features = [
            'Age', 'Gender', 'MMSE', 'FamilyHistoryAlzheimers',
            'CardiovascularDisease', 'Diabetes', 'Depression',
            'HeadInjury', 'Hypertension', 'MemoryComplaints',
            'Confusion', 'Disorientation', 'PersonalityChanges',
            'DifficultyCompletingTasks', 'Forgetfulness'
        ]
        
        # Verify columns exist
        missing_columns = [col for col in features if col not in df.columns]
        if missing_columns:
            raise ValueError(f"Missing columns in CSV: {missing_columns}")
            
        # Prepare features and target
        X = df[features].copy()
        y = df['Diagnosis']
        
        # Convert Gender from 0/1 to F/M and then to binary
        X['Gender'] = X['Gender'].map({0: 'F', 1: 'M'})
        X['Gender'] = (X['Gender'] == 'F').astype(int)
        
        # Convert boolean columns to int
        bool_columns = [
            'FamilyHistoryAlzheimers', 'CardiovascularDisease',
            'Diabetes', 'Depression', 'HeadInjury', 'Hypertension',
            'MemoryComplaints', 'Confusion', 'Disorientation',
            'PersonalityChanges', 'DifficultyCompletingTasks',
            'Forgetfulness'
        ]
        X[bool_columns] = X[bool_columns].astype(int)
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Scale numerical features
        global scaler, model
        scaler = StandardScaler()
        numerical_features = ['Age', 'MMSE']
        X_train[numerical_features] = scaler.fit_transform(X_train[numerical_features])
        X_test[numerical_features] = scaler.transform(X_test[numerical_features])
        
        # Save scaler for later use
        joblib.dump(scaler, SCALER_PATH)
        
        # Improve model parameters
        model = RandomForestClassifier(
            n_estimators=200,  # Increased from 100
            max_depth=15,      # Increased from 10
            min_samples_split=5,
            class_weight='balanced',  # Add class weights
            random_state=42
        )
        model.fit(X_train, y_train)
        
        # Add model evaluation
        y_pred = model.predict(X_test)
        print("\nModel Performance:")
        print(classification_report(y_test, y_pred))
        print("\nConfusion Matrix:")
        print(confusion_matrix(y_test, y_pred))
        
        # Save model
        joblib.dump(model, MODEL_PATH)
        
        print("Model and scaler saved successfully")
        return model, scaler
        
    except Exception as e:
        print(f"Error in train_model: {str(e)}")
        raise
    

@app.route('/predict', methods=['POST'])
def predict():
    try:
        global model, scaler
        data = request.get_json()
        validate_input(data)
        if not data:
            return jsonify({
                'error': 'No data provided',
                'status': 'error'
            }), 400
        
        if model is None or scaler is None:
         
         return jsonify({
        'prediction': float(prediction_prob),
        'risk_class': int(prediction_class),
        'risk_level': 'High' if prediction_prob >= 0.6     # Lower threshold for High
                     else 'Medium' if prediction_prob >= 0.4  # Adjusted medium range
                     else 'Low',
        'status': 'success',
        'risk_factors': [factor for factor, value in data.items() 
                        if value is True and factor != 'Gender']
    })
            
        # Prepare features
        features = pd.DataFrame([{
            'Age': data['Age'],
            'Gender': 1 if data.get('Gender') == 'F' else 0,
            'MMSE': data['MMSE'],
            'FamilyHistoryAlzheimers': int(data.get('FamilyHistoryAlzheimers', False)),
            'CardiovascularDisease': int(data.get('CardiovascularDisease', False)),
            'Diabetes': int(data.get('Diabetes', False)),
            'Depression': int(data.get('Depression', False)),
            'HeadInjury': int(data.get('HeadInjury', False)),
            'Hypertension': int(data.get('Hypertension', False)),
            'MemoryComplaints': int(data.get('MemoryComplaints', False)),
            'Confusion': int(data.get('Confusion', False)),
            'Disorientation': int(data.get('Disorientation', False)),
            'PersonalityChanges': int(data.get('PersonalityChanges', False)),
            'DifficultyCompletingTasks': int(data.get('DifficultyCompletingTasks', False)),
            'Forgetfulness': int(data.get('Forgetfulness', False))
        }])
        
        # Scale numerical features
        numerical_features = ['Age', 'MMSE']
        features[numerical_features] = scaler.transform(features[numerical_features])
        
        # Make prediction
        prediction_prob = model.predict_proba(features)[0][1]
        prediction_class = 1 if prediction_prob >= 0.5 else 0
        
        return jsonify({
            'prediction': float(prediction_prob),
            'risk_class': int(prediction_class),
            'risk_level': 'High' if prediction_prob >= 0.6  # Lower threshold for High
                         else 'Medium' if prediction_prob >= 0.4  # Adjusted medium range
                         else 'Low',
            'status': 'success',
            'risk_factors': [factor for factor, value in data.items() 
                            if value is True and factor != 'Gender']
        })
        
    except Exception as e:
        print("Error:", str(e))
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500
    
if __name__ == '__main__':
    try:
        print("Initializing model and scaler...")
        if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
            print("Training new model...")
            model, scaler = train_model()
        else:
            print("Loading existing model...")
            model = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
            print("Model and scaler loaded successfully")
    except Exception as e:
        print(f"Error during initialization: {str(e)}")
        raise

    # Run Flask app
    app.run(host='127.0.0.1', port=5000, debug=True)
    
    