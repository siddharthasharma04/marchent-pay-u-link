import { TColorPallette, TColors } from "../model";

export const ColorThemes: Record<string, TColorPallette> = {
  CLASSIC_BLUE: 'classic-blue',
  DEEP_TEAL: 'deep-teal',
  DARK_MODE: 'dark-mode',
};

export const PALETTES: { [key: TColorPallette]: TColors } = {
  [ColorThemes.CLASSIC_BLUE]: {
    primary: '#0B4F6C',       // Royal Blue
    secondary: '#D4AF37',     // Khanjar Gold
    background: '#F8F9FA',
    surface: '#FFFFFF',
    textMain: '#1A1A1A',
    textSecondary: '#FFFFFF',
    textBoxBg: '#FFFFFF',
    textMuted: '#757575',
    textInput: '#212121',
    border: '#E0E0E0',
    error: '#D32F2F',
    success: '#388E3C',
  },
  [ColorThemes.DEEP_TEAL]: {
    primary: '#008080',       // Deep Teal
    secondary: '#C5A059',     // Warm Muted Gold
    background: '#F4F7F6',    // Soft Mint-tinted Grey
    surface: '#FFFFFF',
    textMain: '#0F2027',
    textSecondary: '#FFFFFF',
    textBoxBg: '#FFFFFF',
    textMuted: '#607D8B',
    textInput: '#37474F',
    border: '#CFD8DC',
    error: '#E53935',
    success: '#2E7D32',
  },
  [ColorThemes.DARK_MODE]: {
    primary: '#1E293B',       // Deep Slate Blue/Grey
    secondary: '#F59E0B',     // Vibrant Amber/Gold for contrast
    background: '#0F172A',    // Dark Navy Midnight Background
    surface: '#1E293B',       // Slightly lighter slate for cards/containers
    textMain: '#F8FAFC',      // Off-white for high-contrast reading
    textSecondary: '#FFFFFF',
    textBoxBg: '#0F172A',
    textMuted: '#94A3B8',
    textInput: '#212121',     // Muted grey for subtext
    border: '#334155',        // Soft borders to separate cards
    error: '#EF4444',         // Bright error
    success: '#10B981',       // Bright vibrant success green
  }
};

export const OMANI_THEME_BASE = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    round: 24,
  },
};