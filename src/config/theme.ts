// Theme configuration file
// This is the central place to manage your website's theme colors

/**
 * Updates the theme variables at runtime
 * @param theme A partial theme object with the properties to update
 */
export function updateTheme(theme: Partial<ThemeConfig>) {
  const root = document.documentElement;
  
  // Update CSS variables based on provided theme
  Object.entries(theme).forEach(([key, value]) => {
    if (value && typeof value === 'object') {
      // Handle nested objects like primary.50, primary.100 etc.
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        const cssVarName = `--color-${key}-${nestedKey}`;
        if (nestedValue) {
          root.style.setProperty(cssVarName, nestedValue as string);
        }
      });
    } else if (key.includes('-')) {
      // Handle direct component variables like card-bg-gradient-from
      root.style.setProperty(`--${key}`, value as string);
    }
  });
  
  // Update component-specific variables if specified
  if (theme.components) {
    Object.entries(theme.components).forEach(([component, componentTheme]) => {
      Object.entries(componentTheme).forEach(([property, value]) => {
        const cssVarName = `--${component}-${property}`;
        root.style.setProperty(cssVarName, value as string);
      });
    });
  }
}

// Default theme settings
export const defaultTheme: ThemeConfig = {
  // Color palettes
  primary: {
    '50': '#f8fafc',
    '100': '#f1f5f9',
    '200': '#e2e8f0',
    '300': '#cbd5e1',
    '400': '#94a3b8',
    '500': '#64748b',
    '600': '#475569',
    '700': '#334155',
    '800': '#1e293b',
    '900': '#0f172a'
  },
  secondary: {
    '50': '#f8fafc',
    '100': '#f1f5f9',
    '200': '#e2e8f0',
    '300': '#cbd5e1',
    '400': '#94a3b8',
    '500': '#64748b',
    '600': '#475569',
    '700': '#334155',
    '800': '#1e293b',
    '900': '#0f172a'
  },
  
  // Component-specific
  components: {
    card: {
      'bg-gradient-from': '#f8fafc',
      'bg-gradient-to': '#f8fafc',
      'border-color': 'var(--color-secondary-200)',
      'icon-color': 'var(--color-primary-600)',
      'brutalism-border-color': 'var(--color-secondary-200)'
    },
    button: {
      'primary-bg': 'var(--color-primary-600)',
      'primary-hover': 'var(--color-primary-700)',
      'secondary-bg': 'var(--color-secondary-600)',
      'secondary-hover': 'var(--color-secondary-700)'
    },
    badge: {
      'primary-bg': 'var(--color-primary-50)',
      'primary-text': 'var(--color-primary-700)',
      'secondary-bg': 'var(--color-secondary-50)',
      'secondary-text': 'var(--color-secondary-700)'
    },
    filter: {
      'button-bg': 'var(--color-secondary-500)',
      'button-hover': 'var(--color-secondary-600)'
    },
    link: {
      'color': 'var(--color-primary-600)',
      'hover': 'var(--color-primary-700)'
    }
  }
};

// Preset theme variations you can easily switch between
export const themePresets = {
  default: defaultTheme,
  
  // Slate theme 
  slate: {
    primary: {
      '50': '#f8fafc',
      '100': '#f1f5f9',
      '200': '#e2e8f0',
      '300': '#cbd5e1',
      '400': '#94a3b8',
      '500': '#64748b',
      '600': '#475569',
      '700': '#334155',
      '800': '#1e293b',
      '900': '#0f172a'
    },
    secondary: {
      '50': '#f9fafb',
      '100': '#f3f4f6',
      '200': '#e5e7eb',
      '300': '#d1d5db',
      '400': '#9ca3af',
      '500': '#6b7280',
      '600': '#4b5563',
      '700': '#374151',
      '800': '#1f2937',
      '900': '#111827'
    },
    components: {
      card: {
        'bg-gradient-from': 'var(--color-primary-50)',
        'bg-gradient-to': 'var(--color-secondary-50)',
        'border-color': 'var(--color-primary-200)',
        'icon-color': 'var(--color-primary-600)',
        'brutalism-border-color': 'var(--color-primary-200)'
      }
    }
  },
  
  // Teal theme
  teal: {
    primary: {
      '50': '#f0fdfa',
      '100': '#ccfbf1',
      '200': '#99f6e4',
      '300': '#5eead4',
      '400': '#2dd4bf',
      '500': '#14b8a6',
      '600': '#0d9488',
      '700': '#0f766e',
      '800': '#115e59',
      '900': '#134e4a'
    },
    secondary: {
      '50': '#f0f9ff',
      '100': '#e0f2fe',
      '200': '#bae6fd',
      '300': '#7dd3fc',
      '400': '#38bdf8',
      '500': '#0ea5e9',
      '600': '#0284c7',
      '700': '#0369a1',
      '800': '#075985',
      '900': '#0c4a6e'
    },
    components: {
      card: {
        'bg-gradient-from': 'var(--color-primary-50)',
        'bg-gradient-to': 'var(--color-secondary-50)',
        'border-color': 'var(--color-primary-200)',
        'icon-color': 'var(--color-primary-600)',
        'brutalism-border-color': 'var(--color-primary-200)'
      }
    }
  },
  
  // Minimal gray theme
  minimal: {
    primary: {
      '50': '#f9fafb',
      '100': '#f3f4f6',
      '200': '#e5e7eb',
      '300': '#d1d5db',
      '400': '#9ca3af',
      '500': '#6b7280',
      '600': '#4b5563',
      '700': '#374151',
      '800': '#1f2937',
      '900': '#111827'
    },
    secondary: {
      '50': '#fafafa',
      '100': '#f4f4f5',
      '200': '#e4e4e7',
      '300': '#d4d4d8',
      '400': '#a1a1aa',
      '500': '#71717a',
      '600': '#52525b',
      '700': '#3f3f46',
      '800': '#27272a',
      '900': '#18181b'
    },
    components: {
      card: {
        'bg-gradient-from': '#ffffff',
        'bg-gradient-to': '#fafafa',
        'border-color': 'var(--color-secondary-200)',
        'icon-color': 'var(--color-primary-600)',
        'brutalism-border-color': 'var(--color-secondary-200)'
      }
    }
  }
};

// Theme configuration type definitions
export interface ThemeConfig {
  primary?: ColorPalette;
  secondary?: ColorPalette;
  accent?: ColorPalette;
  gray?: ColorPalette;
  success?: ColorPalette;
  warning?: ColorPalette;
  error?: ColorPalette;
  components?: {
    card?: ComponentTheme;
    button?: ComponentTheme;
    badge?: ComponentTheme;
    filter?: ComponentTheme;
    link?: ComponentTheme;
    [key: string]: ComponentTheme | undefined;
  };
  [key: string]: any;
}

interface ColorPalette {
  '50'?: string;
  '100'?: string;
  '200'?: string;
  '300'?: string;
  '400'?: string;
  '500'?: string;
  '600'?: string;
  '700'?: string;
  '800'?: string;
  '900'?: string;
  [key: string]: string | undefined;
}

interface ComponentTheme {
  [key: string]: string;
}