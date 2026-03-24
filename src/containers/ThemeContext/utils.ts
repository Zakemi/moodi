import { NamedStyles, Theme } from '@/src/containers/ThemeContext/types';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/src/containers/ThemeContext/ThemeContext';

/**
 * Creates an interface like `StyleSheet.create` enhanced with theme support.
 * The provided function will be called with the current theme and should return
 * an object of styles. The returned hook can then be used to get the styles.
 *
 * Usage example:
 * <code>
 *   // Component.styles.ts
 *   const useThemedStyle = createThemedStyleSheet((theme: Theme) => ({
 *     container: {
 *       backgroundColor: theme.colors.background,
 *     },
 *   }));
 *
 *   // Component.tsx
 *   import { useThemedStyle } from './Component.styles';
 *   function Component() {
 *     const styles = useThemedStyle()
 *     return (<View style={styles.container} />);
 *   }
 * </code>
 * @param styleDefinitionFunction
 */
export function createThemedStyleSheet<
  T extends NamedStyles<T> | NamedStyles<any>,
>(styleDefinitionFunction: (theme: Theme) => T): () => T {
  return () => {
    const theme = useTheme();
    const styleObject = styleDefinitionFunction(theme);
    return StyleSheet.create(styleObject);
  };
}
