
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProjectConfig } from '@/components/AndroidProjectGenerator';

interface ReviewStepProps {
  config: ProjectConfig;
}

const ReviewStep = ({ config }: ReviewStepProps) => {
  const formatOptionLabel = (value: string) => {
    return value.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const sections = [
    {
      title: 'Project Information',
      items: [
        { label: 'Project Name', value: config.projectName },
        { label: 'Project ID', value: config.projectId }
      ]
    },
    {
      title: 'Core Setup',
      items: [
        { label: 'UI Toolkit', value: formatOptionLabel(config.uiToolkit) },
        { label: 'Networking', value: formatOptionLabel(config.networking) },
        { label: 'Serialization', value: formatOptionLabel(config.serialization) },
        { label: 'Dependency Injection', value: formatOptionLabel(config.dependencyInjection) },
        { label: 'Local Storage', value: formatOptionLabel(config.localStorage) },
        { label: 'Room Database', value: config.enableRoom ? 'Enabled' : 'Disabled' },
        { label: 'UI Theme', value: formatOptionLabel(config.uiTheme) }
      ]
    },
    {
      title: 'Features & Permissions',
      items: [
        {
          label: 'Permissions',
          value: config.permissions.length > 0 ? config.permissions.map(formatOptionLabel).join(', ') : 'None'
        },
        {
          label: 'Internationalization',
          value: config.internationalization.enabled ? `Enabled (${config.internationalization.languages.join(', ')})` : 'Disabled'
        },
        { label: 'Light/Dark Themes', value: config.lightDark ? 'Enabled' : 'Disabled' },
        { label: 'HTTP Networking', value: config.httpNetworking ? 'Enabled' : 'Disabled' },
        ...(config.uiToolkit === 'xml' ? [{ label: 'ViewBinding', value: config.viewBinding ? 'Enabled' : 'Disabled' }] : [])
      ]
    },
    {
      title: 'Advanced Options',
      items: [
        { label: 'Language', value: config.uiToolkit === 'jetpack-compose' ? 'Kotlin (Auto)' : formatOptionLabel(config.language) },
        { label: 'Java Version', value: `Java ${config.javaVersion}` },
        { label: 'Build Format', value: config.buildFormat === 'kts' ? 'Kotlin DSL (.kts)' : 'Groovy (.gradle)' }
      ]
    },
    {
      title: 'Design & Styling',
      items: [
        { label: 'Font Family', value: config.fontName },
        { label: 'Primary Color', value: config.themeColors.primary },
        { label: 'Secondary Color', value: config.themeColors.secondary },
        { label: 'Tertiary Color', value: config.themeColors.tertiary }
      ]
    }
  ];

  return (
    <div className="px-6 pb-6 space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Configuration</h3>
        <p className="text-gray-600">Please review your project settings before generating the Android project.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={index} className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">{section.title}</h4>
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  {item.label.includes('Color') ? (
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: item.value }}
                      />
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-mono text-xs">
                        {item.value}
                      </Badge>
                    </div>
                  ) : (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {item.value}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewStep;
