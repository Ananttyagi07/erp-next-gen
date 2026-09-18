import { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material';
import i18n from '../i18n/i18n';
import apiService from '../services/apiService';

const ThemeContext = createContext();

// Define all available themes with their color palettes
const THEME_DEFINITIONS = {
  black: {
    name: 'Black',
    value: 'black',
    primary: '#1a1a1a',
    secondary: '#333333',
    accent: '#555555',
  },
  maroon: {
    name: 'Maroon',
    value: 'maroon',
    primary: '#C41E3A',
    secondary: '#A52A2A',
    accent: '#D9534F',
  },
  olive: {
    name: 'Olive',
    value: 'olive',
    primary: '#B8B800',
    secondary: '#A0A000',
    accent: '#CDDC39',
  },
  lavender: {
    name: 'Lavender',
    value: 'lavender',
    primary: '#9C27B0',
    secondary: '#D8BFD8',
    accent: '#DDA0DD',
  },
  bright_green: {
    name: 'Bright Green',
    value: 'bright_green',
    primary: '#00C853',
    secondary: '#00DD00',
    accent: '#00BB00',
  },
  dark_purple: {
    name: 'Dark Purple',
    value: 'dark_purple',
    primary: '#7851A9',
    secondary: '#6A0DAD',
    accent: '#9C27B0',
  },
  magenta: {
    name: 'Magenta',
    value: 'magenta',
    primary: '#E91E63',
    secondary: '#DD00DD',
    accent: '#BB00BB',
  },
  cyan: {
    name: 'Cyan',
    value: 'cyan',
    primary: '#00BCD4',
    secondary: '#00DDDD',
    accent: '#00BBBB',
  },
  dark_red: {
    name: 'Dark Red',
    value: 'dark_red',
    primary: '#D9534F',
    secondary: '#A52A2A',
    accent: '#DC143C',
  },
  bright_orange: {
    name: 'Bright Orange',
    value: 'bright_orange',
    primary: '#FF9800',
    secondary: '#FF7F27',
    accent: '#FF9500',
  },
  navy: {
    name: 'Navy Blue',
    value: 'navy',
    primary: '#0D47A1',
    secondary: '#001080',
    accent: '#1976D2',
  },
  bright_red: {
    name: 'Bright Red',
    value: 'bright_red',
    primary: '#F44336',
    secondary: '#DD0000',
    accent: '#BB0000',
  },
  teal: {
    name: 'Teal',
    value: 'teal',
    primary: '#00897B',
    secondary: '#009999',
    accent: '#00B2B2',
  },
  burnt_orange: {
    name: 'Burnt Orange',
    value: 'burnt_orange',
    primary: '#FF6F00',
    secondary: '#DD6600',
    accent: '#EE7700',
  },
};

// Create Material-UI theme from theme definition
const createMuiTheme = (themeDefinition) => {
  // For very dark colors, use a brighter variant
  let primaryColor = themeDefinition.primary;
  let secondaryColor = themeDefinition.secondary;

  // Adjust if primary color is too dark (e.g., black, navy)
  if (primaryColor === '#000000' || primaryColor === '#000080' || primaryColor === '#4B0082' || primaryColor === '#800000') {
    primaryColor = themeDefinition.secondary; // Use secondary instead
  }

  return createTheme({
    shape: {
      borderRadius: 0,
    },
    transitions: {
      easing: {
        sharp: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    palette: {
      primary: {
        main: primaryColor,
        light: themeDefinition.secondary,
        dark: themeDefinition.accent,
        contrastText: '#fff',
      },
      secondary: {
        main: secondaryColor,
        light: themeDefinition.accent,
        contrastText: '#fff',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
      success: {
        main: '#4caf50',
      },
      error: {
        main: '#f44336',
      },
      warning: {
        main: '#ff9800',
      },
      info: {
        main: '#2196f3',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h5: {
        fontWeight: 600,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            borderRadius: 0,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.02em',
            transition: 'transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.18s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 18px -6px rgba(0,0,0,0.35)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          contained: {
            backgroundColor: primaryColor,
            boxShadow: '0 2px 8px -2px rgba(0,0,0,0.25)',
            '&:hover': {
              backgroundColor: themeDefinition.accent,
              boxShadow: '0 10px 20px -6px rgba(0,0,0,0.4)',
            },
          },
          outlined: {
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: primaryColor,
            borderRadius: 0,
            transition: 'transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.18s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            transition: 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            transition: 'box-shadow 0.18s ease, border-color 0.18s ease',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
              borderColor: primaryColor,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 0,
          },
        },
      },
    },
  });
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('black');
  const [muiTheme, setMuiTheme] = useState(() =>
    createMuiTheme(THEME_DEFINITIONS.black)
  );
  const [enableRTL, setEnableRTL] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme settings from backend on app initialization
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        setIsLoading(true);
        console.log('[Theme] Loading theme settings from backend...');

        // Check if user has auth token before making API call
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.log('[Theme] No auth token, using default theme');
          setIsLoading(false);
          return;
        }

        const response = await apiService.get('/admin-settings/general/');
        const data = response.data.data;

        const theme = data.color_theme || 'black';
        const rtl = data.enable_rtl || false;
        const language = data.language || 'en';

        console.log('[Theme] Settings loaded:', { theme, rtl, language });

        setCurrentTheme(theme);
        setEnableRTL(rtl);
        setCurrentLanguage(language);
        setMuiTheme(createMuiTheme(THEME_DEFINITIONS[theme]));

        // Apply language to i18n
        await i18n.changeLanguage(language);
        localStorage.setItem('language', language);

        // Apply to DOM
        document.documentElement.dir = rtl ? 'rtl' : 'ltr';
      } catch (error) {
        console.error('[Theme] Failed to load theme settings:', error.message);
        // Use default theme on error
        setCurrentTheme('black');
        setMuiTheme(createMuiTheme(THEME_DEFINITIONS.black));
      } finally {
        setIsLoading(false);
      }
    };

    loadThemeSettings();
  }, []);

  // Update theme when currentTheme changes
  useEffect(() => {
    if (THEME_DEFINITIONS[currentTheme]) {
      setMuiTheme(createMuiTheme(THEME_DEFINITIONS[currentTheme]));
      console.log('[Theme] Applied theme:', currentTheme);
    }
  }, [currentTheme]);

  // Apply RTL to DOM
  useEffect(() => {
    document.documentElement.dir = enableRTL ? 'rtl' : 'ltr';
  }, [enableRTL]);

  const updateTheme = async (themeValue, rtlEnabled = enableRTL, languageValue = currentLanguage) => {
    try {
      console.log('[Theme] Updating theme:', { themeValue, rtlEnabled, languageValue });

      // Update local state first for immediate UI feedback
      setCurrentTheme(themeValue);
      setEnableRTL(rtlEnabled);
      setCurrentLanguage(languageValue);
      document.documentElement.dir = rtlEnabled ? 'rtl' : 'ltr';

      // Update i18n language
      await i18n.changeLanguage(languageValue);
      localStorage.setItem('language', languageValue);

      // Persist to backend
      await apiService.post('/admin-settings/general/', {
        color_theme: themeValue,
        enable_rtl: rtlEnabled,
        language: languageValue,
      });

      console.log('[Theme] Theme updated and persisted successfully');
      return { success: true };
    } catch (error) {
      console.error('[Theme] Failed to update theme:', error);
      throw error;
    }
  };

  const value = {
    currentTheme,
    muiTheme,
    enableRTL,
    isLoading,
    updateTheme,
    themes: THEME_DEFINITIONS,
    currentLanguage,
    setCurrentLanguage,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
