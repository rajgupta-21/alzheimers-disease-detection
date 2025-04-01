# Alzheimer's Disease Detection Project

This project consists of a Flask backend API for Alzheimer's disease prediction and a Vue.js frontend interface.

## Project Structure

```
alzheimers-disease-project/
├── frontend/           # Vue.js frontend
├── backend/           # Flask API
│   ├── data/         # Dataset
│   ├── models/       # Trained models
│   └── app.py        # Main API file
└── README.md
```

## Setup Instructions

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /`: API status
- `POST /predict`: Make predictions

## Environment Variables

Create `.env` files in both frontend and backend directories as needed.
