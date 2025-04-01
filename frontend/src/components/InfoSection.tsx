
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Brain, ChartPie, Search } from 'lucide-react';
import { useInView } from '@/utils/animations';

const InfoSection: React.FC = () => {
  const { ref: ref1, isInView: isInView1 } = useInView();
  const { ref: ref2, isInView: isInView2 } = useInView();
  
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4">
      <div 
        ref={ref1}
        className={`text-center mb-12 transition-all duration-1000 ${isInView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className="text-3xl font-bold text-alzheimer-800 mb-4">About Alzheimer's Disease</h2>
        <p className="max-w-2xl mx-auto text-slate-600">
          Alzheimer's disease is a progressive neurologic disorder that causes the brain to shrink and brain cells to die.
          Early detection and intervention can significantly improve quality of life and slow progression.
        </p>
      </div>
      
      <div 
        ref={ref2}
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${isInView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <Card className="glass-panel overflow-hidden">
          <div className="h-2 bg-alzheimer-400 w-full"></div>
          <CardHeader>
            <CardTitle className="flex items-center text-alzheimer-800">
              <Brain className="mr-2 text-alzheimer-500" />
              About the Disease
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-3">
            <p>
              Alzheimer's disease is the most common cause of dementia, accounting for 60-80% of cases. 
              It's characterized by progressive memory loss, cognitive decline, and behavioral changes.
            </p>
            <Separator />
            <h4 className="font-medium text-alzheimer-700">Common Symptoms:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Memory loss that disrupts daily life</li>
              <li>Challenges in planning or solving problems</li>
              <li>Difficulty completing familiar tasks</li>
              <li>Confusion with time or place</li>
              <li>Changes in mood and personality</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="glass-panel overflow-hidden">
          <div className="h-2 bg-alzheimer-500 w-full"></div>
          <CardHeader>
            <CardTitle className="flex items-center text-alzheimer-800">
              <ChartPie className="mr-2 text-alzheimer-500" />
              About Our Model
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-3">
            <p>
              Our prediction model uses Random Forest, a robust machine learning algorithm 
              that analyzes multiple biomarkers and clinical data to estimate the risk of 
              Alzheimer's disease.
            </p>
            <Separator />
            <h4 className="font-medium text-alzheimer-700">Key Features Used:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Demographic information (age, gender, education)</li>
              <li>Clinical assessments (MMSE, CDR-SB)</li>
              <li>Neuroimaging measurements (brain volumes)</li>
              <li>Genetic markers (when available)</li>
            </ul>
            <p className="text-xs mt-3 pt-3 border-t border-slate-100">
              Model accuracy: ~85-90% (varies based on data quality)
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-panel overflow-hidden">
          <div className="h-2 bg-alzheimer-600 w-full"></div>
          <CardHeader>
            <CardTitle className="flex items-center text-alzheimer-800">
              <Search className="mr-2 text-alzheimer-500" />
              Research & Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-3">
            <p>
              Ongoing research continues to improve our understanding of Alzheimer's disease 
              and develop better detection methods and treatments.
            </p>
            <Separator />
            <h4 className="font-medium text-alzheimer-700">Helpful Resources:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Alzheimer's Association: <span className="text-alzheimer-500">alz.org</span></li>
              <li>National Institute on Aging: <span className="text-alzheimer-500">nia.nih.gov</span></li>
              <li>WHO Dementia Resources: <span className="text-alzheimer-500">who.int/health-topics/dementia</span></li>
            </ul>
            <p className="italic mt-3 pt-3 border-t border-slate-100">
              "Early detection allows for better planning, treatment options, and quality of life."
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfoSection;
