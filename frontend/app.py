from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:8080"],  
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept"],
        "supports_credentials": True,
        "max_age": 3600
    }
})


# Load the trained model
try:
    model = joblib.load('model/alzheimer_model.pkl')
except FileNotFoundError:
    print("Error: Model file not found. Please ensure 'model/alzheimer_model.pkl' exists.")
    exit(1)

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'error': 'No data provided',
                'status': 'error'
            }), 400
            
        print("Received data:", data)  # Debug print
        
        required_features = ['Age', 'Gender', 'EducationLevel', 'BMI', 'Smoking', 
                           'AlcoholConsumption', 'PhysicalActivity', 'FamilyHistoryAlzheimers',
                           'CardiovascularDisease', 'Diabetes', 'Depression', 'HeadInjury',
                           'Hypertension', 'SystolicBP', 'DiastolicBP', 'CholesterolTotal',
                           'MMSE', 'FunctionalAssessment', 'MemoryComplaints', 'BehavioralProblems']
        
        # Validate all required features are present
        missing_features = [feat for feat in required_features if feat not in data]
        if missing_features:
            return jsonify({
                'error': f'Missing required features: {missing_features}',
                'status': 'error'
            }), 400

        # Extract features from the request data
        features = [
            data['Age'], 
            1 if data['Gender'] == 'Male' else 0,
            data['EducationLevel'],
            data['BMI'],
            1 if data['Smoking'] == 'Yes' else 0,
            1 if data['AlcoholConsumption'] == 'Yes' else 0,
            1 if data['PhysicalActivity'] == 'Active' else 0,
            1 if data['FamilyHistoryAlzheimers'] else 0,
            1 if data['CardiovascularDisease'] else 0,
            1 if data['Diabetes'] else 0,
            1 if data['Depression'] else 0,
            1 if data['HeadInjury'] else 0,
            1 if data['Hypertension'] else 0,
            data['SystolicBP'],
            data['DiastolicBP'],
            data['CholesterolTotal'],
            data['MMSE'],
            data['FunctionalAssessment'],
            1 if data['MemoryComplaints'] else 0,
            1 if data['BehavioralProblems'] else 0
        ]
        
        # Make prediction
        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict_proba(features_array)[0][1]
        
        print("Prediction:", prediction)  # Debug print
        return jsonify({
            'prediction': float(prediction),
            'status': 'success'
        })
        
    except Exception as e:
        print("Error:", str(e))  # Debug print
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)