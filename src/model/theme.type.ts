import { OMANI_THEME_BASE } from "../constants/theme";

export type TColorPallette = 'classic-blue' | 'deep-teal' | 'dark-mode';

export type TColors = {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    textMain: string;
    textSecondary: string;
    textBoxBg: string;
    textMuted: string;
    textInput: string;
    border: string;
    error: string;
    success: string;
};

export type TTheme = {
    colors: TColors;
    spacing: typeof OMANI_THEME_BASE.spacing;
    borderRadius: typeof OMANI_THEME_BASE.borderRadius;
    themeName: string;
};