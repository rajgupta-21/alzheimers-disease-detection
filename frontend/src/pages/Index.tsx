import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";
import PredictionForm from "@/components/PredictionForm";
import ResultsSection from "@/components/ResultsSection";
import { useRef, useState } from "react";

enum AppState {
  INTRO,
  FORM,
  RESULTS,
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [predictionScore, setPredictionScore] = useState<number>(0);
  const formRef = useRef<HTMLDivElement>(null);

  const handleStartClick = () => {
    setAppState(AppState.FORM);
    // Smooth scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleFormSubmit = (result: number) => {
    setPredictionScore(result);
    setAppState(AppState.RESULTS);
    // Smooth scroll to results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAppState(AppState.FORM);
    // Smooth scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-alzheimer-50">
      {appState === AppState.INTRO && (
        <HeroSection onStartClick={handleStartClick} />
      )}

      {appState === AppState.RESULTS && (
        <ResultsSection
          predictionScore={predictionScore}
          onReset={handleReset}
        />
      )}

      <div
        ref={formRef}
        className={appState === AppState.FORM ? "block" : "hidden"}
      >
        <PredictionForm onSubmit={handleFormSubmit} />
      </div>

      <InfoSection />

      <footer className="w-full py-6 px-4 border-t border-alzheimer-100 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Alzheimer's Disease Prediction Tool
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-400">
              This tool is for educational purposes only and not for medical
              diagnosis
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
