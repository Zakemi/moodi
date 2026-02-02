import { useAppState } from '@react-native-community/hooks';
import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  PhotoFile,
  useCameraDevice,
  Camera as VisionCamera,
} from 'react-native-vision-camera';
import { styles } from './Camera.styles';
import { CaptureButton } from './CaptureButton';

export interface CameraProps {
  isActive: boolean;
  onPhotoCaptured: (photo: PhotoFile) => void;
}

export const Camera = ({ isActive, onPhotoCaptured }: CameraProps) => {
  const camera = useRef<VisionCamera>(null);
  const device = useCameraDevice('back');
  const appState = useAppState();
  const isAppActive = appState === 'active';

  if (device === undefined) {
    return (
      <View>
        <Text>Your device does not have a camera</Text>
      </View>
    );
  }

  return (
    <View style={[isActive && StyleSheet.absoluteFill]}>
      <VisionCamera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isAppActive && isActive}
        photo={true}
        preview={isActive}
      />
      {isActive && (
        <View style={styles.buttonContainer}>
          <CaptureButton
            camera={camera}
            enabled={true}
            onPhotoCaptured={onPhotoCaptured}
          />
        </View>
      )}
    </View>
  );
};
