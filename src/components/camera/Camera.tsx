import { useAppState } from '@react-native-community/hooks';
import { useRef } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import {
  PhotoFile,
  useCameraDevice,
  Camera as VisionCamera,
} from 'react-native-vision-camera';
import { styles } from './Camera.styles';
import { CaptureButton } from './CaptureButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface CameraProps {
  isActive: boolean;
  onPhotoCaptured: (photo: PhotoFile) => void;
  onCameraClose: () => void;
}

export const Camera = ({
  isActive,
  onPhotoCaptured,
  onCameraClose,
}: CameraProps) => {
  const camera = useRef<VisionCamera>(null);
  const device = useCameraDevice('back');
  const appState = useAppState();
  const isAppActive = appState === 'active';

  if (device === undefined) {
    return (
      <Modal
        animationType="fade"
        transparent
        visible={isActive}
        onRequestClose={onCameraClose}
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalView}>
            <Text>Your device does not have a camera</Text>
            <Button title="Close" onPress={onCameraClose} />
          </SafeAreaView>
        </View>
      </Modal>
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
