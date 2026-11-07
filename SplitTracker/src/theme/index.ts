import { MD3LightTheme } from 'react-native-paper';

// Splitwise-inspired clean minimal light theme
export const AppTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1EC69A',        // teal-green (main brand)
    primaryContainer: '#D4F5EC',
    secondary: '#FF6B6B',      // red for "you owe"
    secondaryContainer: '#FFE5E5',
    tertiary: '#4A90D9',       // blue accent
    background: '#F7F8FA',
    surface: '#FFFFFF',
    surfaceVariant: '#F0F1F3',
    outline: '#E0E1E5',
    onPrimary: '#FFFFFF',
    onBackground: '#1A1A2E',
    onSurface: '#1A1A2E',
    onSurfaceVariant: '#6B7280',
    error: '#E53935',
    // Custom tokens (accessed via theme.colors.custom)
  },
  roundness: 12,
};

// Convenience color tokens used across screens
export const Colors = {
  owedGreen: '#1EC69A',       // money owed TO you (positive balance)
  owingRed: '#FF6B6B',        // money you OWE (negative balance)
  neutral: '#6B7280',         // settled / zero balance
  background: '#F7F8FA',
  surface: '#FFFFFF',
  border: '#E0E1E5',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  settlement: '#4A90D9',      // color for settlement entries
  danger: '#E53935',
};

export type AppThemeType = typeof AppTheme;
