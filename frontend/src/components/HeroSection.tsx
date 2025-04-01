
import React from 'react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/utils/animations';
import { Brain } from 'lucide-react';

const HeroSection: React.FC<{ onStartClick: () => void }> = ({ onStartClick }) => {
  const { ref, isInView } = useInView();
  
  return (
    <div 
      ref={ref}
      className={`min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="w-20 h-20 mb-8 flex items-center justify-center rounded-full bg-alzheimer-100 text-alzheimer-600 animate-pulse-gentle">
        <Brain size={48} />
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-alzheimer-900">
        Alzheimer's Disease Prediction
      </h1>
      
      <p className="text-lg md:text-xl text-center max-w-2xl mb-8 text-slate-600">
        Using advanced machine learning to help identify risk factors and 
        provide early detection insights for Alzheimer's disease.
      </p>
      
      <div className="relative">
        <Button 
          onClick={onStartClick}
          className="animated-button group text-lg px-8 py-6"
        >
          Start Assessment
          <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-white opacity-0 group-hover:opacity-10 rounded-md"></div>
        </Button>
      </div>
      
      <div className="mt-12 p-4 glass-panel max-w-md text-center">
        <p className="text-sm text-slate-500">
          This tool is designed to help healthcare professionals assess risk factors.
          It is not a diagnostic tool and should not replace professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
