import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEntry } from '../store/diary';

export default function ModalScreen() {
  const [text, setText] = useState('')
  const [moods, setMoods] = useState([
    { isSet: false, mood: 'happy'},
    { isSet: false, mood: 'sad'},
    { isSet: false, mood: 'joyful'},
    { isSet: false, mood: 'depressive'},
  ])
  const [moodModalVisible, setMoodModalVisible] = useState(false)
  const now = new Date();
  const router = useRouter()
  const dispatch = useDispatch()

  const onAddPress = () => {
    dispatch(addEntry({
      id: Date.now().toString(),
      text,
      moods: moods.filter(mood => mood.isSet).map(mood => mood.mood),
      created: new Date()
    }))
    router.back()
  }

  const onSetMood = (changedMood: string, isSet: boolean) => {
    setMoods(prevMoods => prevMoods.map(mood => mood.mood === changedMood ? { mood: mood.mood, isSet } : mood))
  }

  const onMoodsEdit = () => {
    setMoodModalVisible(true)
  }

  const getMoodList = () => {
    const selectedMoods = moods.filter(mood => mood.isSet).map(mood => mood.mood)

    return selectedMoods.length ? selectedMoods.join(', ') : null
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={moodModalVisible}
        onRequestClose={() => {
          setMoodModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{gap: 10, paddingBottom: 20}}>
              {moods.map(mood => (
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Checkbox value={mood.isSet} onValueChange={(value: boolean) => onSetMood(mood.mood, value)}></Checkbox>
                <Text>{mood.mood}</Text>
              </View>
            ))}
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setMoodModalVisible(false)}>
              <Text>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{ justifyContent: "space-between", flexDirection: 'row', paddingBottom: 10 }}>
        <Text style={{ color: '#AD8474' }}>{now.toLocaleDateString()}</Text>
        <Text style={{ color: '#AD8474' }}>{now.toLocaleDateString('EN', { weekday: 'long' }) }</Text>
      </View>
      <TouchableHighlight onPress={() => setMoodModalVisible(true)} style={styles.moodsInput}>
        <>
          <View>
            <Text>What moods do you feel now?</Text>
            <Text>{getMoodList()}</Text>
          </View>
          <MaterialIcons size={20} name="edit" color='#000'/>
        </>
      </TouchableHighlight>
      <TextInput
          editable
          multiline
          onChangeText={value => setText(value)}
          value={text}
          autoFocus
          style={styles.textInput}
          textAlignVertical='top'
          placeholder='What happened today?'
        />
      <View style={{position:"absolute", bottom: 32, right: 32, zIndex: 100}}>
        <TouchableHighlight onPress={onAddPress}>
          <MaterialIcons size={35} name="add" color='#fff' style={{backgroundColor: '#bd691a', padding: 10, borderRadius: 30}} />
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
    backgroundColor: '#f8e0c8'
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
