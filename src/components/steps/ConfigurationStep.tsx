
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ProjectConfig } from '@/components/AndroidProjectGenerator';

interface ConfigurationStepProps {
  config: ProjectConfig;
  updateConfig: (updates: Partial<ProjectConfig>) => void;
}

const ConfigurationStep = ({ config, updateConfig }: ConfigurationStepProps) => {
  const permissions = [
    { id: 'camera', label: 'Camera', description: 'Access device camera' },
    { id: 'internet', label: 'Internet', description: 'Network access' },
    { id: 'storage', label: 'Storage', description: 'Read/write external storage' },
    { id: 'location', label: 'Location', description: 'GPS and location services' },
    { id: 'microphone', label: 'Microphone', description: 'Audio recording' },
    { id: 'contacts', label: 'Contacts', description: 'Access contact list' },
    { id: 'sms', label: 'SMS', description: 'Send and receive SMS' },
    { id: 'phone', label: 'Phone', description: 'Make phone calls' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' }
  ];

  // Check if internet permission should be disabled (when networking library is selected)
  const isInternetPermissionRequired = config.networking !== 'none';

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    // Don't allow unchecking internet permission if networking library is selected
    if (permissionId === 'internet' && !checked && isInternetPermissionRequired) {
      return;
    }

    const updatedPermissions = checked
      ? [...config.permissions, permissionId]
      : config.permissions.filter(p => p !== permissionId);
    updateConfig({ permissions: updatedPermissions });
  };

  const handleLanguageChange = (languageCode: string, checked: boolean) => {
    const updatedLanguages = checked
      ? [...config.internationalization.languages, languageCode]
      : config.internationalization.languages.filter(l => l !== languageCode);

    updateConfig({
      internationalization: {
        ...config.internationalization,
        languages: updatedLanguages
      }
    });
  };

  const handleI18nToggle = (enabled: boolean) => {
    updateConfig({
      internationalization: {
        enabled,
        languages: enabled ? config.internationalization.languages : ['en']
      }
    });
  };

  return (
    <div className="px-6 pb-6 space-y-8">
      {/* Permissions */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-gray-900">Permissions</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {permissions.map((permission) => {
            const isChecked = config.permissions.includes(permission.id);
            const isDisabled = permission.id === 'internet' && isInternetPermissionRequired;

            return (
              <div
                key={permission.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-200 transition-colors ${isDisabled
                  ? 'bg-gray-50 border-gray-300 cursor-not-allowed'
                  : 'hover:border-orange-300 hover:bg-orange-50/30 cursor-pointer'
                  }`}
                onClick={() => !isDisabled && handlePermissionChange(permission.id, !isChecked)}
              >
                <Checkbox
                  id={permission.id}
                  checked={isChecked}
                  disabled={isDisabled}
                  onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                />
                <div className="flex-1">
                  <Label
                    htmlFor={permission.id}
                    className={`font-medium ${isDisabled ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {permission.label}
                    {permission.id === 'internet' && isInternetPermissionRequired && (
                      <span className="text-xs text-orange-600 ml-2">(Required for networking)</span>
                    )}
                  </Label>
                  <p className={`text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
                    {permission.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Internationalization */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium text-gray-900">Internationalization (i18n)</Label>
            <p className="text-sm text-gray-600">Enable multi-language support</p>
          </div>
          <Switch
            checked={config.internationalization.enabled}
            onCheckedChange={handleI18nToggle}
          />
        </div>

        {config.internationalization.enabled && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Select Languages</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {languages.map((language) => (
                <div
                  key={language.code}
                  className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-colors cursor-pointer"
                  onClick={() => handleLanguageChange(language.code, !config.internationalization.languages.includes(language.code))}
                >
                  <Checkbox
                    id={`lang-${language.code}`}
                    checked={config.internationalization.languages.includes(language.code)}
                    onCheckedChange={(checked) => handleLanguageChange(language.code, checked as boolean)}
                  />
                  <Label htmlFor={`lang-${language.code}`} className="text-sm cursor-pointer">
                    {language.name}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {config.internationalization.languages.map((langCode) => {
                const lang = languages.find(l => l.code === langCode);
                return lang ? (
                  <Badge key={langCode} variant="secondary" className="bg-orange-100 text-orange-800">
                    {lang.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Theme Options */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors"
          onClick={() => updateConfig({ lightDark: !config.lightDark })}
        >
          <div>
            <Label className="text-base font-medium text-gray-900 cursor-pointer">Light/Dark Themes</Label>
            <p className="text-sm text-gray-600">Generate themes.xml and themes-night.xml</p>
          </div>
          <Switch
            checked={config.lightDark}
            onCheckedChange={(checked) => updateConfig({ lightDark: !config.lightDark })}
          />
        </div>
      </div>

      {/* HTTP Networking */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors"
          onClick={() => updateConfig({ httpNetworking: !config.httpNetworking })}
        >
          <div>
            <Label className="text-base font-medium text-gray-900 cursor-pointer">HTTP Networking</Label>
            <p className="text-sm text-gray-600">Generate network_security_config.xml</p>
          </div>
          <Switch
            checked={config.httpNetworking}
            onCheckedChange={(checked) => updateConfig({ httpNetworking: checked })}
          />
        </div>
      </div>

      {/* ViewBinding (only for XML) */}
      {config.uiToolkit === 'xml' && (
        <div className="space-y-4">
          <div
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors"
            onClick={() => updateConfig({ viewBinding: !config.viewBinding })}
          >
            <div>
              <Label className="text-base font-medium text-gray-900 cursor-pointer">ViewBinding</Label>
              <p className="text-sm text-gray-600">Enable ViewBinding for XML layouts</p>
            </div>
            <Switch
              checked={config.viewBinding}
              onCheckedChange={(checked) => updateConfig({ viewBinding: checked })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationStep;
