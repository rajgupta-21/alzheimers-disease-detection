/**
 * API service for Alzheimer's disease prediction
 */

export interface PatientData {
  PatientID: string;
  Age: number;
  Gender: string;
  Ethnicity: string;
  EducationLevel: number;
  BMI: number;
  Smoking: string;
  AlcoholConsumption: string;
  PhysicalActivity: string;
  DietQuality: string;
  SleepQuality: string;
  FamilyHistoryAlzheimers: boolean;
  CardiovascularDisease: boolean;
  Diabetes: boolean;
  Depression: boolean;
  HeadInjury: boolean;
  Hypertension: boolean;
  SystolicBP: number;
  DiastolicBP: number;
  CholesterolTotal: number;
  CholesterolLDL: number;
  CholesterolHDL: number;
  CholesterolTriglycerides: number;
  MMSE: number;
  FunctionalAssessment: number;
  MemoryComplaints: boolean;
  BehavioralProblems: boolean;
  ADL: number;
  Confusion: boolean;
  Disorientation: boolean;
  PersonalityChanges: boolean;
  DifficultyCompletingTasks: boolean;
  Forgetfulness: boolean;
}

// Default API URL - Backend running on 127.0.0.1:5000
const API_URL = "http://127.0.0.1:5000";

/**
 * Get prediction from backend model
 * @param patientData Patient data to use for prediction
 * @returns Promise with prediction result (0-1 risk score)
 */
export const getPrediction = async (
  patientData: PatientData
): Promise<number> => {
  try {
    console.log("Sending request to:", `${API_URL}/predict`);
    console.log("Request data:", patientData);

    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
      mode: "cors",
      credentials: "omit",
    });

    if (!response.ok) {
      console.error("Response not OK:", response.status, response.statusText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received response:", data);
    return data.prediction;
  } catch (error) {
    console.error("Error getting prediction:", error);
    throw error;
  }
};
