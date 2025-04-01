
# Alzheimer's Disease Risk Prediction App

This is a web application for predicting Alzheimer's disease risk using a Random Forest model.

## Frontend

The frontend is built using React, TypeScript, and shadcn/ui components. It provides a user-friendly interface for entering patient data and viewing prediction results.

## Backend (Required)

The application requires a backend service to run the machine learning model. You need to set up a backend API service that can load and run the pickle model.

### Setting up the Python Backend

1. Create a new directory for your backend service
2. Set up a Python environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install required packages:
   ```bash
   pip install flask flask-cors pandas scikit-learn joblib numpy
   ```
4. Create a file named `app.py` with the following content:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load your trained model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get patient data from request
        data = request.json
        
        # Convert to DataFrame for prediction
        df = pd.DataFrame([data])
        
        # Ensure all columns are in the correct order
        # Modify this list to match your model's expected features
        features = ['PatientID', 'Age', 'Gender', 'Ethnicity', 'EducationLevel', 'BMI', 
                   'Smoking', 'AlcoholConsumption', 'PhysicalActivity', 'DietQuality', 
                   'SleepQuality', 'FamilyHistoryAlzheimers', 'CardiovascularDisease', 
                   'Diabetes', 'Depression', 'HeadInjury', 'Hypertension', 'SystolicBP', 
                   'DiastolicBP', 'CholesterolTotal', 'CholesterolLDL', 'CholesterolHDL', 
                   'CholesterolTriglycerides', 'MMSE', 'FunctionalAssessment', 
                   'MemoryComplaints', 'BehavioralProblems', 'ADL', 'Confusion', 
                   'Disorientation', 'PersonalityChanges', 'DifficultyCompletingTasks', 
                   'Forgetfulness']
        
        # Drop the PatientID as it's not used for prediction
        df = df.drop(['PatientID'], axis=1)
        
        # Preprocess categorical features if needed
        # For example, convert string values to numeric codes
        categorical_features = ['Gender', 'Ethnicity', 'Smoking', 'AlcoholConsumption', 
                              'PhysicalActivity', 'DietQuality', 'SleepQuality']
        
        # Make prediction
        prediction = model.predict_proba(df)[0][1]  # Assuming class 1 is the positive class
        
        return jsonify({
            'prediction': float(prediction),
            'success': True
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

5. Place your pickle model file (`model.pkl`) in the same directory as `app.py`
6. Start the server:
   ```bash
   python app.py
   ```
7. Update the API_URL in `src/services/predictionApi.ts` to point to your backend:
   ```typescript
   const API_URL = 'http://localhost:5000/api';
   ```

## Deployment

### Frontend
Deploy the React app to services like Vercel, Netlify, or GitHub Pages.

### Backend
Deploy the Python backend to services like:
- Heroku
- PythonAnywhere
- Google Cloud Run
- AWS Lambda

After deploying, update the API_URL in `src/services/predictionApi.ts` to point to your deployed backend.
