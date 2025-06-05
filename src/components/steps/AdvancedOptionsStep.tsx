
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProjectConfig } from '@/components/AndroidProjectGenerator';

interface AdvancedOptionsStepProps {
  config: ProjectConfig;
  updateConfig: (updates: Partial<ProjectConfig>) => void;
}

const AdvancedOptionsStep = ({ config, updateConfig }: AdvancedOptionsStepProps) => {
  const fontOptions = [
    { value: 'roboto', label: 'Roboto', description: 'Google\'s system font' },
    { value: 'poppins', label: 'Poppins', description: 'Modern geometric sans-serif' },
    { value: 'inter', label: 'Inter', description: 'Clean and readable UI font' },
    { value: 'open sans', label: 'Open Sans', description: 'Friendly and neutral' },
    { value: 'lato', label: 'Lato', description: 'Humanist sans-serif' }
  ];

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'tertiary', value: string) => {
    updateConfig({
      themeColors: {
        ...config.themeColors,
        [colorType]: value
      }
    });
  };

  return (
    <div className="px-6 pb-6 space-y-8">
      {/* Conditional Programming Language */}
      {config.uiToolkit === 'xml' && (
        <div className="space-y-4">
          <Label className="text-base font-medium text-gray-900">Programming Language</Label>
          <RadioGroup
            value={config.language}
            onValueChange={(value) => updateConfig({ language: value as 'kotlin' | 'java' })}
            className="space-y-2"
          >
            <div
              className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
              onClick={() => updateConfig({ language: 'kotlin' })}
            >
              <RadioGroupItem value="kotlin" id="kotlin" />
              <div className="flex-1">
                <Label htmlFor="kotlin" className="font-medium cursor-pointer">
                  Kotlin
                </Label>
                <p className="text-sm text-gray-600">Google's preferred language for Android (Recommended)</p>
              </div>
            </div>
            <div
              className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
              onClick={() => updateConfig({ language: 'java' })}
            >
              <RadioGroupItem value="java" id="java" />
              <div className="flex-1">
                <Label htmlFor="java" className="font-medium cursor-pointer">
                  Java
                </Label>
                <p className="text-sm text-gray-600">Traditional Android development language</p>
              </div>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Java Compile Version */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-gray-900">Java Compile Version</Label>
        <RadioGroup
          value={config.javaVersion}
          onValueChange={(value) => updateConfig({ javaVersion: value as '11' | '17' | '21' })}
          className="space-y-2"
        >
          <div
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
            onClick={() => updateConfig({ javaVersion: '11' })}
          >
            <RadioGroupItem value="11" id="java11" />
            <div className="flex-1">
              <Label htmlFor="java11" className="font-medium cursor-pointer">
                Java 11
              </Label>
              <p className="text-sm text-gray-600">Stable LTS version with good compatibility</p>
            </div>
          </div>
          <div
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
            onClick={() => updateConfig({ javaVersion: '17' })}
          >
            <RadioGroupItem value="17" id="java17" />
            <div className="flex-1">
              <Label htmlFor="java17" className="font-medium cursor-pointer">
                Java 17 (Recommended)
              </Label>
              <p className="text-sm text-gray-600">Latest LTS version with modern features</p>
            </div>
          </div>
          <div
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
            onClick={() => updateConfig({ javaVersion: '21' })}
          >
            <RadioGroupItem value="21" id="java21" />
            <div className="flex-1">
              <Label htmlFor="java21" className="font-medium cursor-pointer">
                Java 21
              </Label>
              <p className="text-sm text-gray-600">Newest LTS version with cutting-edge features</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Build File Format */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-gray-900">Build File Format</Label>
        <RadioGroup
          value={config.buildFormat}
          onValueChange={(value) => updateConfig({ buildFormat: value as 'kts' | 'gradle' })}
          className="space-y-2"
        >
          <div
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
            onClick={() => updateConfig({ buildFormat: 'kts' })}
          >
            <RadioGroupItem value="kts" id="kts" />
            <div className="flex-1">
              <Label htmlFor="kts" className="font-medium cursor-pointer">
                .kts (Kotlin DSL) (Recommended)
              </Label>
              <p className="text-sm text-gray-600">Modern Kotlin-based build scripts with libs.versions.toml</p>
            </div>
          </div>
          <div
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
            onClick={() => updateConfig({ buildFormat: 'gradle' })}
          >
            <RadioGroupItem value="gradle" id="gradle" />
            <div className="flex-1">
              <Label htmlFor="gradle" className="font-medium cursor-pointer">
                .gradle (Groovy)
              </Label>
              <p className="text-sm text-gray-600">Traditional Groovy-based build scripts</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Color Theme Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-gray-900">Color Scheme</Label>
        <div className="space-y-4 p-4 bg-gray-50/50 rounded-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Primary Color</Label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={config.themeColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-600 font-mono">{config.themeColors.primary}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Secondary Color</Label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={config.themeColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-600 font-mono">{config.themeColors.secondary}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Tertiary Color</Label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={config.themeColors.tertiary}
                  onChange={(e) => handleColorChange('tertiary', e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-600 font-mono">{config.themeColors.tertiary}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Font Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-gray-900">Typography</Label>
        <RadioGroup
          value={config.fontName}
          onValueChange={(value) => updateConfig({ fontName: value as any })}
          className="space-y-2"
        >
          {fontOptions.map((font) => (
            <div
              key={font.value}
              className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
              onClick={() => updateConfig({ fontName: font.value as any })}
            >
              <RadioGroupItem value={font.value} id={`font-${font.value}`} />
              <div className="flex-1">
                <Label htmlFor={`font-${font.value}`} className="font-medium cursor-pointer">
                  {font.label}
                </Label>
                <p className="text-sm text-gray-600">{font.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Configuration Notes</h4>
            <p className="text-sm text-blue-700 mt-1">
              Colors and fonts will be used to generate theme files and typography configurations for your chosen UI toolkit.
              {config.uiToolkit === 'jetpack-compose' && ' Programming language is automatically set to Kotlin for Jetpack Compose projects.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptionsStep;
