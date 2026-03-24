import {
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  secondaryVariant: string;
  accent: string;
  error: string;
  onAccent: string;
  onSurface: string;
};

export type Theme = {
  colors: ThemeColors;
};

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
