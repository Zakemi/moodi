import {
  ACCENT_COLOR,
  ON_ACCENT_COLOR,
  ON_SURFACE_COLOR,
  SECONDARY_VARIANT_COLOR,
} from '@/src/containers/ThemeContext/constants';
import { useDiary } from '@/src/hooks/useDiary';
import { useLocation } from '@/src/hooks/useLocation';
import { useWeather } from '@/src/hooks/useWeather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhotoFile, useCameraPermission } from 'react-native-vision-camera';
import { Camera } from '../../camera';
import { useThemedStyle } from './NewDiaryEntryModal.styles';
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';

const analytics = getAnalytics();

export function NewDiaryEntryModal() {
  const [text, setText] = useState('');
  const [moods, setMoods] = useState([
    // Positive moods
    { isSet: false, mood: 'joyful' },
    { isSet: false, mood: 'grateful' },
    { isSet: false, mood: 'hopeful' },
    { isSet: false, mood: 'content' },
    { isSet: false, mood: 'inspired' },
    { isSet: false, mood: 'motivated' },
    { isSet: false, mood: 'peaceful' },
    { isSet: false, mood: 'excited' },
    { isSet: false, mood: 'relieved' },
    { isSet: false, mood: 'confident' },
    // Negative moods
    { isSet: false, mood: 'anxious' },
    { isSet: false, mood: 'frustrated' },
    { isSet: false, mood: 'angry' },
    { isSet: false, mood: 'disappointed' },
    { isSet: false, mood: 'overwhelmed' },
    { isSet: false, mood: 'sad' },
    { isSet: false, mood: 'lonely' },
    { isSet: false, mood: 'melancholic' },
    { isSet: false, mood: 'guilty' },
    { isSet: false, mood: 'worried' },
    // Natural/Complex moods
    { isSet: false, mood: 'reflective' },
    { isSet: false, mood: 'nostalgic' },
    { isSet: false, mood: 'curious' },
    { isSet: false, mood: 'confused' },
    { isSet: false, mood: 'indifferent' },
    { isSet: false, mood: 'thoughtful' },
    { isSet: false, mood: 'ambivalent' },
    { isSet: false, mood: 'surprised' },
    { isSet: false, mood: 'skeptical' },
    { isSet: false, mood: 'bored' },
  ]);
  const [moodModalVisible, setMoodModalVisible] = useState(false);
  const now = new Date();
  const router = useRouter();
  const { addItem } = useDiary();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isCameraActive, setCameraActive] = useState(false);
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const {
    loading: locationLoading,
    errorMsg: locationErrorMsg,
    location,
    locationText,
  } = useLocation();
  const { temperature, weatherCode } = useWeather({ location });
  const styles = useThemedStyle();

  const selectedMoods = moods
    .filter((mood) => mood.isSet)
    .map((mood) => mood.mood);

  const onAddPress = async () => {
    if (!text.length) {
      return;
    }

    await addItem({
      text,
      moods: moods.filter((mood) => mood.isSet).map((mood) => mood.mood),
      photoUrls: photos.map((photo) => `file://${photo.path}`),
    });
    router.back();
  };

  const onSetMood = (changedMood: string, isSet: boolean) => {
    setMoods((prevMoods) =>
      prevMoods.map((mood) =>
        mood.mood === changedMood ? { mood: mood.mood, isSet } : mood,
      ),
    );
  };

  const handlePhotoCaptured = (photo: PhotoFile) => {
    setCameraActive(false);
    setPhotos((prevValue) => [...prevValue, photo]);
    logEvent(analytics, 'camera', {
      action: 'photoCaptured',
    });
  };

  const handleCameraClose = () => {
    setCameraActive(false);
    logEvent(analytics, 'camera', {
      action: 'cameraClose',
    });
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={moodModalVisible}
        onRequestClose={() => {
          setMoodModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalView}>
            <Text style={styles.modalTitle}>Moods</Text>
            <ScrollView style={styles.modalScrollView}>
              <FlatList
                data={moods}
                renderItem={({ item: mood }) => (
                  <View style={styles.moodSelectorItem}>
                    <Checkbox
                      value={mood.isSet}
                      color={ACCENT_COLOR}
                      onValueChange={(value: boolean) =>
                        onSetMood(mood.mood, value)
                      }
                    ></Checkbox>
                    <Text>{mood.mood}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.mood}
                ItemSeparatorComponent={() => (
                  <View style={styles.moodSelectorItemSeparator} />
                )}
              />
            </ScrollView>
            <Pressable
              style={styles.button}
              onPress={() => setMoodModalVisible(false)}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      </Modal>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>{now.toLocaleDateString()}</Text>
          <Text style={styles.headerText}>
            {now.toLocaleDateString('EN', { weekday: 'long' })}
          </Text>
        </View>
        <View style={styles.headerItem}>
          {locationLoading && <Text>Location data is loading...</Text>}
          {locationErrorMsg && <Text>{locationErrorMsg}</Text>}
          {location && (
            <>
              <Text style={styles.headerText}>
                {locationText
                  ? locationText
                  : `${location.coords.latitude}, ${location.coords.longitude}`}
              </Text>
              <Text style={styles.headerText}>
                ({weatherCode}) {temperature}
              </Text>
            </>
          )}
        </View>
      </View>
      <TouchableHighlight onPress={() => setMoodModalVisible(true)}>
        <View style={styles.moodsInput}>
          <View>
            <Text>What moods do you feel now?</Text>
            {!!selectedMoods.length && (
              <Text style={styles.selectedMoodsList}>
                {selectedMoods.join(', ')}
              </Text>
            )}
          </View>
          <MaterialIcons size={20} name="edit" color={ON_SURFACE_COLOR} />
        </View>
      </TouchableHighlight>
      <TextInput
        editable
        multiline
        onChangeText={(value) => setText(value)}
        value={text}
        autoFocus
        style={styles.textInput}
        textAlignVertical="top"
        placeholder="What happened today?"
      />
      {!hasPermission && (
        <View>
          <Text>Need camera permission to attach photos</Text>
          <Button
            title="Grant permission"
            onPress={() => requestPermission()}
          />
        </View>
      )}
      {hasPermission && (
        <ScrollView
          style={styles.imagesInput}
          contentContainerStyle={{
            alignItems: 'flex-start',
            flexDirection: 'row',
            gap: 10,
            padding: 4,
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <TouchableHighlight
            style={styles.imageButton}
            onPress={() => setCameraActive(true)}
          >
            <MaterialCommunityIcons
              style={styles.addImageButton}
              color={SECONDARY_VARIANT_COLOR}
              size={60}
              name="camera-plus"
            />
          </TouchableHighlight>
          {photos.map((photo) => (
            <TouchableHighlight key={photo.path} style={styles.imageButton}>
              <Image width={100} height={100} src={`file://${photo.path}`} />
            </TouchableHighlight>
          ))}
        </ScrollView>
      )}
      <View
        style={[
          StyleSheet.absoluteFill,
          isCameraActive && styles.cameraContainer,
        ]}
      >
        <Camera
          isActive={isCameraActive}
          onPhotoCaptured={handlePhotoCaptured}
          onCameraClose={handleCameraClose}
        />
      </View>
      <View style={styles.addButtonContainer}>
        <TouchableHighlight onPress={onAddPress}>
          <MaterialIcons
            size={35}
            name="add"
            color={ON_ACCENT_COLOR}
            style={styles.addButtonIcon}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}
