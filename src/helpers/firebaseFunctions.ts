import { Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  connectFunctionsEmulator,
  getFunctions,
  FirebaseFunctionsTypes,
} from '@react-native-firebase/functions';

// Android emulator can't reach the host machine via `localhost`.
const EMULATOR_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const EMULATOR_PORT = 5001;

let functionsInstance: FirebaseFunctionsTypes.Module | undefined;

export function getFunctionsClient(): FirebaseFunctionsTypes.Module {
  if (functionsInstance) {
    return functionsInstance;
  }

  functionsInstance = getFunctions(getApp());

  if (__DEV__ && process.env.EXPO_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
    connectFunctionsEmulator(functionsInstance, EMULATOR_HOST, EMULATOR_PORT);
  }

  return functionsInstance;
}