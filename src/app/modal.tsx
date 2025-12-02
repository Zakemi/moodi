import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
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
import { useDiary } from '../hooks/useDiary';

export default function ModalScreen() {
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
      created: new Date().toISOString(),
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
            <ScrollView style={{ marginBottom: 20 }}>
              <FlatList
                data={moods}
                renderItem={({ item: mood }) => (
                  <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Checkbox
                      value={mood.isSet}
                      color="#bd691a"
                      onValueChange={(value: boolean) =>
                        onSetMood(mood.mood, value)
                      }
                    ></Checkbox>
                    <Text>{mood.mood}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.mood}
                ItemSeparatorComponent={() => (
                  <View style={{ marginBottom: 15 }} />
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
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingBottom: 10,
        }}
      >
        <Text style={{ color: '#AD8474' }}>{now.toLocaleDateString()}</Text>
        <Text style={{ color: '#AD8474' }}>
          {now.toLocaleDateString('EN', { weekday: 'long' })}
        </Text>
      </View>
      <TouchableHighlight
        onPress={() => setMoodModalVisible(true)}
        style={styles.moodsInput}
      >
        <>
          <View>
            <Text>What moods do you feel now?</Text>
            {!!selectedMoods.length && (
              <Text style={{ color: '#824d25' }}>
                {selectedMoods.join(', ')}
              </Text>
            )}
          </View>
          <MaterialIcons size={20} name="edit" color="#000" />
        </>
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
      <View
        style={{ position: 'absolute', bottom: 32, right: 32, zIndex: 100 }}
      >
        <TouchableHighlight onPress={onAddPress}>
          <MaterialIcons
            size={35}
            name="add"
            color="#fff"
            style={{
              backgroundColor: '#bd691a',
              padding: 10,
              borderRadius: 30,
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    position: 'relative',
    backgroundColor: '#f8e0c8',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  moodsInput: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#bd691a',
  },
  buttonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  modalView: {
    margin: 30,
    maxHeight: '80%',
    backgroundColor: 'white',
    padding: 30,
    width: '100%',
  },
});
