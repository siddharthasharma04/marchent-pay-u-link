import { useAppStore } from '../store/useAppStore';
import { PALETTES, OMANI_THEME_BASE, ColorThemes } from '../constants/theme';
import { TTheme } from '../model';

export function useTheme(): TTheme {
  const activeThemeName = useAppStore((state) => state.activeTheme);
  
  // Safeguard: Fallback to Classic Blue if something goes wrong
  const selectedColors = PALETTES[activeThemeName] || PALETTES[ColorThemes.CLASSIC_BLUE];

  return {
    colors: selectedColors,
    spacing: OMANI_THEME_BASE.spacing,
    borderRadius: OMANI_THEME_BASE.borderRadius,
    themeName: activeThemeName
  };
}