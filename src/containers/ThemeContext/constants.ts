import { Theme } from '@/src/containers/ThemeContext/types';

export const BACKGROUND_COLOR = '#f8e0c8';
export const SURFACE_COLOR = '#fff';
export const PRIMARY_COLOR = '#543022';
export const SECONDARY_COLOR = '#824d25';
export const SECONDARY_VARIANT_COLOR = '#AD8474';
export const ACCENT_COLOR = '#bd691a';
export const ERROR_COLOR = '#B00020';

export const ON_ACCENT_COLOR = '#fff';
export const ON_SURFACE_COLOR = PRIMARY_COLOR;

export const defaultTheme: Theme = {
  colors: {
    background: BACKGROUND_COLOR,
    surface: SURFACE_COLOR,
    primary: PRIMARY_COLOR,
    secondary: SECONDARY_COLOR,
    secondaryVariant: SECONDARY_VARIANT_COLOR,
    accent: ACCENT_COLOR,
    error: ERROR_COLOR,
    onAccent: ON_ACCENT_COLOR,
    onSurface: ON_SURFACE_COLOR,
  },
};
