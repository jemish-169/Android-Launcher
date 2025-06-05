
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Check, Settings, Code, Smartphone, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProjectSetupStep from '@/components/steps/ProjectSetupStep';
import ConfigurationStep from '@/components/steps/ConfigurationStep';
import AdvancedOptionsStep from '@/components/steps/AdvancedOptionsStep';
import ReviewStep from '@/components/steps/ReviewStep';

export interface ProjectConfig {
  projectName: string;
  projectId: string;
  uiToolkit: 'jetpack-compose' | 'xml';
  networking: 'retrofit' | 'ktor' | 'none';
  serialization: 'gson' | 'moshi' | 'kotlinx-serialization' | 'none';
  dependencyInjection: 'hilt' | 'koin' | 'none';
  localStorage: 'datastore' | 'sharedpreferences' | 'none';
  enableRoom: boolean;
  uiTheme: 'material' | 'material3' | 'material3-expressive';
  permissions: string[];
  internationalization: {
    enabled: boolean;
    languages: string[];
  };
  lightDark: boolean;
  httpNetworking: boolean;
  viewBinding: boolean;
  language: 'kotlin' | 'java';
  javaVersion: '11' | '17' | '21';
  buildFormat: 'kts' | 'gradle';
  themeColors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  fontName: 'roboto' | 'poppins' | 'Inter' | 'open sans' | 'lato';
}

const AndroidProjectGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedStep, setExpandedStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const [config, setConfig] = useState<ProjectConfig>({
    projectName: 'MyAndroidApp',
    projectId: 'com.example.myapp',
    uiToolkit: 'jetpack-compose',
    networking: 'retrofit',
    serialization: 'gson',
    dependencyInjection: 'hilt',
    localStorage: 'datastore',
    enableRoom: false,
    uiTheme: 'material3',
    permissions: [],
    internationalization: {
      enabled: false,
      languages: ['en']
    },
    lightDark: false,
    httpNetworking: false,
    viewBinding: false,
    language: 'kotlin',
    javaVersion: '17',
    buildFormat: 'kts',
    themeColors: {
      primary: '#6200EE',
      secondary: '#03DAC6',
      tertiary: '#BB86FC'
    },
    fontName: 'roboto'
  });

  const steps = [
    {
      id: 1,
      title: 'Core Project Setup',
      icon: Code,
      description: 'Configure essential libraries and frameworks'
    },
    {
      id: 2,
      title: 'Additional Configurations',
      icon: Settings,
      description: 'Set up permissions, themes, and features'
    },
    {
      id: 3,
      title: 'Advanced Options',
      icon: Smartphone,
      description: 'Language and compilation settings'
    },
    {
      id: 4,
      title: 'Review & Generate',
      icon: Check,
      description: 'Review configuration and generate project'
    }
  ];

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      setExpandedStep(expandedStep === stepId ? 0 : stepId);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setExpandedStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setExpandedStep(currentStep - 1);
    }
  };

  const updateConfig = (updates: Partial<ProjectConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const generateProject = async () => {
    setIsGenerating(true);

    try {
      // Automatically set navigation based on UI toolkit
      const navigation = config.uiToolkit === 'jetpack-compose' ? 'compose-navigation' : 'jetpack-navigation';

      // Automatically set language to kotlin if Jetpack Compose is selected
      const language = config.uiToolkit === 'jetpack-compose' ? 'kotlin' : config.language;

      const jsonConfig = {
        project: {
          name: config.projectName,
          package: config.projectId,
          minSdk: 24,
          targetSdk: 34,
          compileSdk: 34
        },
        configuration: {
          ...config,
          language,
          navigation,
          useLibsVersionsToml: config.buildFormat === 'kts'
        },
        generated_at: new Date().toISOString(),
        generator_version: "1.0.0"
      };

      console.log('Sending configuration:', jsonConfig);

      // Create a blob from the JSON config
      const jsonBlob = new Blob([JSON.stringify(jsonConfig, null, 2)], {
        type: 'application/json'
      });

      // Create FormData and append the JSON file
      const formData = new FormData();
      formData.append('file', jsonBlob, 'android-project-config.json');

      // Send request to API
      const response = await fetch('http://192.168.0.90:8000/generate', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server responded with status: ${response.status}. ${errorText}`);
      }

      // Get the ZIP file blob
      const zipBlob = await response.blob();
      console.log('Received blob size:', zipBlob.size);

      // Create download link
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${config.projectName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      toast({
        title: "Project Generated Successfully!",
        description: "Your Android project has been generated and downloaded.",
      });

    } catch (error) {
      console.error('Error generating project:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate project. Please check if the API server is running.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStepContent = (stepId: number) => {
    if (expandedStep !== stepId) return null;

    switch (stepId) {
      case 1:
        return <ProjectSetupStep config={config} updateConfig={updateConfig} />;
      case 2:
        return <ConfigurationStep config={config} updateConfig={updateConfig} />;
      case 3:
        return <AdvancedOptionsStep config={config} updateConfig={updateConfig} />;
      case 4:
        return <ReviewStep config={config} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Android Project Generator</h1>
        </div>
        <p className="text-gray-600 text-lg">Create a professional Android project with modern libraries and best practices</p>
      </div>

      {/* Step Navigator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer ${step.id <= currentStep
                    ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                    }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span className={`text-xs mt-2 text-center ${step.id <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${step.id < currentStep ? 'bg-gradient-to-r from-orange-500 to-purple-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Cards */}
      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.id} className={`transition-all duration-200 ${expandedStep === step.id ? 'shadow-lg border-orange-200' : 'shadow-sm'}`}>
            <div
              className="p-6 cursor-pointer flex items-center justify-between"
              onClick={() => handleStepClick(step.id)}
            >
              <div className="flex items-center space-x-4">
                <step.icon className={`w-6 h-6 ${step.id <= currentStep ? 'text-orange-600' : 'text-gray-400'}`} />
                <div>
                  <h3 className={`text-lg font-semibold ${step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {step.id < currentStep && (
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                )}
                {step.id <= currentStep && (
                  expandedStep === step.id ?
                    <ChevronUp className="w-5 h-5 text-gray-400" /> :
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
            {renderStepContent(step.id)}
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-6"
        >
          Previous
        </Button>
        {currentStep === 4 ? (
          <Button
            onClick={generateProject}
            disabled={isGenerating}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Project'}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="px-6 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default AndroidProjectGenerator;
