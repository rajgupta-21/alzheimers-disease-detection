import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

def load_and_preprocess_data(file_path):
    # Load data
    df = pd.read_csv(file_path)
    
    # Convert boolean columns to int
    boolean_columns = ['FamilyHistoryAlzheimers', 'CardiovascularDisease', 
                      'Diabetes', 'Depression', 'HeadInjury', 'Hypertension', 
                      'MemoryComplaints']
    df[boolean_columns] = df[boolean_columns].astype(int)
    
    # Convert Gender to numeric
    df['Gender'] = df['Gender'].map({'M': 0, 'F': 1})
    
    # Select features for model
    features = ['Age', 'Gender', 'MMSE', 'FamilyHistoryAlzheimers',
                'CardiovascularDisease', 'Diabetes', 'Depression',
                'HeadInjury', 'Hypertension', 'MemoryComplaints']
    
    X = df[features]
    y = df['Diagnosis']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    return X_train_scaled, X_test_scaled, y_train, y_test, scaler