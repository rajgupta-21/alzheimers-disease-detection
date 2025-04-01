
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChartBar, Brain, AlertTriangle, Check, XCircle } from 'lucide-react';
import { useInView } from '@/utils/animations';

interface ResultsSectionProps {
  predictionScore: number;
  onReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ predictionScore, onReset }) => {
  const [progress, setProgress] = useState(0);
  const { ref, isInView } = useInView();
  
  // Calculate risk level based on prediction score
  const riskLevel = predictionScore < 0.4 
    ? { label: 'Low Risk', color: 'bg-green-500', icon: Check }
    : predictionScore < 0.7 
      ? { label: 'Moderate Risk', color: 'bg-yellow-500', icon: AlertTriangle }
      : { label: 'High Risk', color: 'bg-red-500', icon: XCircle };
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(predictionScore * 100);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, predictionScore]);
  
  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto py-12 px-4">
      <Card className={`glass-panel transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-alzheimer-800 flex items-center">
            <Brain className="mr-2 text-alzheimer-500" />
            Assessment Results
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-600">Risk Assessment</span>
              <span className="text-sm font-medium text-slate-600">{Math.round(predictionScore * 100)}%</span>
            </div>
            <Progress value={progress} className="h-3 transition-all duration-1000" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-slate-500">Low Risk</span>
              <span className="text-xs text-slate-500">High Risk</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center py-6">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 ${riskLevel.color} bg-opacity-20 border-2 ${riskLevel.color.replace('bg-', 'border-')}`}>
              <span className="text-3xl font-bold text-alzheimer-800">{Math.round(predictionScore * 100)}%</span>
            </div>
            <h3 className="text-xl font-semibold text-alzheimer-800 mb-2 flex items-center">
              <riskLevel.icon className={`mr-2 ${riskLevel.color.replace('bg-', 'text-')}`} size={20} />
              {riskLevel.label}
            </h3>
            <p className="text-center text-gray-600 max-w-md">
              {predictionScore < 0.4 
                ? "Based on the provided data, the prediction model indicates a lower likelihood of Alzheimer's disease progression."
                : predictionScore < 0.7 
                  ? "The assessment indicates a moderate risk level. Further clinical evaluation is recommended."
                  : "The assessment indicates a higher risk level. We strongly recommend consulting with a healthcare professional specializing in neurodegenerative diseases."
              }
            </p>
          </div>
          
          <div className="bg-alzheimer-50 p-4 rounded-lg border border-alzheimer-100">
            <div className="flex items-start">
              <ChartBar className="mr-3 text-alzheimer-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-alzheimer-800 mb-1">Understanding This Assessment</h4>
                <p className="text-sm text-slate-600">
                  This prediction is based on a machine learning model trained on clinical data. 
                  It should be used as a screening tool only and not as a definitive diagnosis.
                  Always consult with healthcare professionals for proper evaluation and diagnosis.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button onClick={onReset} variant="outline" className="w-full">
            Start New Assessment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsSection;
