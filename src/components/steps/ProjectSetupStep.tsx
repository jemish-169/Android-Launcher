
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ProjectConfig } from '@/components/AndroidProjectGenerator';

interface ProjectSetupStepProps {
  config: ProjectConfig;
  updateConfig: (updates: Partial<ProjectConfig>) => void;
}

const ProjectSetupStep = ({ config, updateConfig }: ProjectSetupStepProps) => {
  const validatePackageName = (packageName: string): boolean => {
    const packageRegex = /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$/;
    return packageRegex.test(packageName);
  };

  const handleNetworkingChange = (value: string) => {
    const updates: Partial<ProjectConfig> = { networking: value as any };
    
    // If a networking library is selected (not 'none'), automatically add internet permission
    if (value !== 'none') {
      const updatedPermissions = config.permissions.includes('internet') 
        ? config.permissions 
        : [...config.permissions, 'internet'];
      updates.permissions = updatedPermissions;
    }
    
    updateConfig(updates);
  };

  const sections = [
    {
      title: 'UI Toolkit',
      key: 'uiToolkit' as keyof ProjectConfig,
      options: [
        { value: 'jetpack-compose', label: 'Jetpack Compose', description: 'Modern UI toolkit' },
        { value: 'xml', label: 'XML Views', description: 'Traditional view system' }
      ],
      handler: (value: string) => updateConfig({ uiToolkit: value as any })
    },
    {
      title: 'Networking Library',
      key: 'networking' as keyof ProjectConfig,
      options: [
        { value: 'retrofit', label: 'Retrofit', description: 'Type-safe HTTP client' },
        { value: 'ktor', label: 'Ktor', description: 'Kotlin multiplatform' },
        { value: 'none', label: 'None', description: 'No networking library' }
      ],
      handler: handleNetworkingChange
    },
    {
      title: 'JSON/Serialization',
      key: 'serialization' as keyof ProjectConfig,
      options: [
        { value: 'gson', label: 'Gson', description: 'Google JSON library' },
        { value: 'moshi', label: 'Moshi', description: 'Modern JSON library' },
        { value: 'kotlinx-serialization', label: 'kotlinx.serialization', description: 'Kotlin native' },
        { value: 'none', label: 'None', description: 'No serialization library' }
      ],
      handler: (value: string) => updateConfig({ serialization: value as any })
    },
    {
      title: 'Dependency Injection',
      key: 'dependencyInjection' as keyof ProjectConfig,
      options: [
        { value: 'hilt', label: 'Hilt', description: 'Android DI framework' },
        { value: 'koin', label: 'Koin', description: 'Lightweight DI' },
        { value: 'none', label: 'None', description: 'No DI framework' }
      ],
      handler: (value: string) => updateConfig({ dependencyInjection: value as any })
    },
    {
      title: 'Local Storage',
      key: 'localStorage' as keyof ProjectConfig,
      options: [
        { value: 'datastore', label: 'Jetpack DataStore', description: 'Modern preferences' },
        { value: 'shared-preferences', label: 'SharedPreferences', description: 'Simple key-value' },
        { value: 'none', label: 'None', description: 'No local storage' }
      ],
      handler: (value: string) => updateConfig({ localStorage: value as any })
    },
    {
      title: 'UI Theme',
      key: 'uiTheme' as keyof ProjectConfig,
      options: [
        { value: 'material', label: 'Material Design', description: 'Classic Material' },
        { value: 'material3', label: 'Material 3', description: 'Material You' },
        { value: 'material3-expressive', label: 'Material 3 Expressive', description: 'Enhanced Material 3' }
      ],
      handler: (value: string) => updateConfig({ uiTheme: value as any })
    }
  ];

  return (
    <div className="px-6 pb-6 space-y-8">
      {/* Project Information Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
          <div className="space-y-4 p-4 bg-gray-50/50 rounded-lg border border-gray-100">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Project Name *</Label>
              <Input
                type="text"
                value={config.projectName}
                onChange={(e) => updateConfig({ projectName: e.target.value })}
                placeholder="MyAndroidApp"
                className={`bg-white ${!config.projectName.trim() ? 'border-red-300' : ''}`}
                required
              />
              {!config.projectName.trim() && (
                <p className="text-sm text-red-600">Project name is required</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Project ID (Package Name) *</Label>
              <Input
                type="text"
                value={config.projectId}
                onChange={(e) => updateConfig({ projectId: e.target.value })}
                placeholder="com.example.myapp"
                className={`bg-white ${!validatePackageName(config.projectId) ? 'border-red-300' : ''}`}
                required
              />
              {!validatePackageName(config.projectId) && (
                <p className="text-sm text-red-600">
                  Package name must follow Android conventions (e.g., com.example.myapp)
                </p>
              )}
            </div>
          </div>
        </div>
        <Separator />
      </div>

      {/* Core Libraries Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Core Libraries & Frameworks</h3>
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.key} className="space-y-3">
              <Label className="text-base font-medium text-gray-900">{section.title}</Label>
              <RadioGroup
                value={config[section.key] as string}
                onValueChange={section.handler}
                className="space-y-2"
              >
                {section.options.map((option) => (
                  <div 
                    key={option.value} 
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
                    onClick={() => section.handler(option.value)}
                  >
                    <RadioGroupItem value={option.value} id={`${section.key}-${option.value}`} />
                    <div className="flex-1 cursor-pointer">
                      <Label htmlFor={`${section.key}-${option.value}`} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
        <Separator />
      </div>

      {/* Optional Database Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Optional Database</h3>
        <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-100">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => updateConfig({ enableRoom: !config.enableRoom })}
          >
            <div>
              <Label className="text-base font-medium text-gray-900 cursor-pointer">Enable Room Database</Label>
              <p className="text-sm text-gray-600">SQLite abstraction layer for local database</p>
            </div>
            <Switch
              checked={config.enableRoom}
              onCheckedChange={(checked) => updateConfig({ enableRoom: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSetupStep;
