import { useCallback } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Camera, PhotoFile } from 'react-native-vision-camera';
import { useThemedStyle } from './CaptureButton.styles';

export interface CaptureButtonProps {
  enabled: boolean;
  camera: React.RefObject<Camera | null>;
  onPhotoCaptured: (photo: PhotoFile) => void;
}

export const CaptureButton = ({
  enabled,
  camera,
  onPhotoCaptured,
}: CaptureButtonProps) => {
  const styles = useThemedStyle();

  const takePhoto = useCallback(async () => {
    try {
      if (!enabled) return;

      if (camera.current == null) throw new Error('Camera ref is null!');

      const photo = await camera.current.takePhoto({
        enableShutterSound: false,
      });
      onPhotoCaptured(photo);
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, []);

  return (
    <TouchableHighlight onPress={takePhoto}>
      <View style={[styles.button, !enabled && styles.disabled]}></View>
    </TouchableHighlight>
  );
};
