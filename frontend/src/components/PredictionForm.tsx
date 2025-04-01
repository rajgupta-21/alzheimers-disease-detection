
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useStaggered } from '@/utils/animations';
import { useToast } from '@/hooks/use-toast';
import { getPrediction, type PatientData } from '@/services/predictionApi';

interface PredictionFormProps {
  onSubmit: (result: number) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isVisible } = useStaggered(5, 100);
  
  const form = useForm<PatientData>({
    defaultValues: {
      PatientID: `PID${Math.floor(Math.random() * 10000)}`,
      Age: 65,
      Gender: 'Male',
      Ethnicity: 'Caucasian',
      EducationLevel: 12,
      BMI: 25,
      Smoking: 'Never',
      AlcoholConsumption: 'Moderate',
      PhysicalActivity: 'Moderate',
      DietQuality: 'Good',
      SleepQuality: 'Good',
      FamilyHistoryAlzheimers: false,
      CardiovascularDisease: false,
      Diabetes: false,
      Depression: false,
      HeadInjury: false,
      Hypertension: false,
      SystolicBP: 120,
      DiastolicBP: 80,
      CholesterolTotal: 200,
      CholesterolLDL: 100,
      CholesterolHDL: 50,
      CholesterolTriglycerides: 150,
      MMSE: 28,
      FunctionalAssessment: 90,
      MemoryComplaints: false,
      BehavioralProblems: false,
      ADL: 6,
      Confusion: false,
      Disorientation: false,
      PersonalityChanges: false,
      DifficultyCompletingTasks: false,
      Forgetfulness: false
    }
  });

  const handleFormSubmit = async (data: PatientData) => {
    setIsLoading(true);
    
    try {
      // In development, simulate a delay
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      // Call API to get prediction
      const prediction = await getPrediction(data);
      
      // Success
      setIsLoading(false);
      onSubmit(prediction);
    } catch (error) {
      setIsLoading(false);
      
      toast({
        title: "Error",
        description: "Failed to get prediction. Please try again later.",
        variant: "destructive"
      });
      
      console.error("Prediction error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full max-w-4xl mx-auto py-12 px-4">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-2xl text-alzheimer-800">Patient Information</CardTitle>
            <CardDescription>
              Enter the patient data for Alzheimer's disease risk assessment
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className={`transition-all duration-500 ${isVisible(0) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-lg font-medium text-alzheimer-700 mb-4">Demographics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="Age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="e.g., 65" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="Gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="Ethnicity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ethnicity</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ethnicity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Caucasian">Caucasian</SelectItem>
                          <SelectItem value="African">African</SelectItem>
                          <SelectItem value="Hispanic">Hispanic</SelectItem>
                          <SelectItem value="Asian">Asian</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="EducationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education (years)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 12"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="BMI"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BMI</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1"
                          placeholder="e.g., 25"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className={`transition-all duration-500 ${isVisible(1) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-lg font-medium text-alzheimer-700 mb-4">Lifestyle Factors</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="Smoking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Smoking</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select smoking status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Never">Never</SelectItem>
                          <SelectItem value="Former">Former</SelectItem>
                          <SelectItem value="Current">Current</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="AlcoholConsumption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alcohol Consumption</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select alcohol consumption" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Light">Light</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Heavy">Heavy</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="PhysicalActivity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Physical Activity</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select physical activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sedentary">Sedentary</SelectItem>
                          <SelectItem value="Light">Light</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Vigorous">Vigorous</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="DietQuality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diet Quality</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select diet quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Poor">Poor</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="SleepQuality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep Quality</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sleep quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Poor">Poor</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className={`transition-all duration-500 ${isVisible(2) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-lg font-medium text-alzheimer-700 mb-4">Medical History</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="FamilyHistoryAlzheimers"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Family History of Alzheimer's</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="CardiovascularDisease"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Cardiovascular Disease</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="Diabetes"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Diabetes</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="Depression"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Depression</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="HeadInjury"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">History of Head Injury</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="Hypertension"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Hypertension</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="SystolicBP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Systolic BP (mmHg)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 120"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="DiastolicBP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diastolic BP (mmHg)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 80"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="CholesterolTotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Cholesterol (mg/dL)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 200"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="CholesterolLDL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LDL Cholesterol (mg/dL)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 100"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="CholesterolHDL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HDL Cholesterol (mg/dL)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 50"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="CholesterolTriglycerides"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Triglycerides (mg/dL)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 150"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className={`transition-all duration-500 ${isVisible(3) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-lg font-medium text-alzheimer-700 mb-4">Clinical Assessment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="MMSE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MMSE Score (0-30)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="0"
                          max="30" 
                          placeholder="e.g., 28"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Mini-Mental State Examination</FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="FunctionalAssessment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Functional Assessment (0-100)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="0"
                          max="100" 
                          placeholder="e.g., 90"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ADL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ADL Score (0-6)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="0"
                          max="6" 
                          placeholder="e.g., 6"
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Activities of Daily Living</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className={`transition-all duration-500 ${isVisible(4) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-lg font-medium text-alzheimer-700 mb-4">Symptoms</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="MemoryComplaints"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Memory Complaints</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="BehavioralProblems"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Behavioral Problems</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="Confusion"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Confusion</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="Disorientation"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Disorientation</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="PersonalityChanges"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Personality Changes</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="DifficultyCompletingTasks"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Difficulty Completing Tasks</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="Forgetfulness"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 mb-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0">Forgetfulness</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full animated-button"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Calculate Risk Assessment'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default PredictionForm;
