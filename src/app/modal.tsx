import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEntry } from '../store/diary';

export default function ModalScreen() {
  const [text, setText] = useState('')
  const [moods, setMoods] = useState('')
  const now = new Date();
  const router = useRouter()
  const dispatch = useDispatch()

  const onAddPress = () => {
    dispatch(addEntry({
      id: Date.now().toString(),
      text,
      moods: moods.split(',').map(mood => mood.trim()),
      created: new Date()
    }))
    router.back()
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", flexDirection: 'row', paddingBottom: 10 }}>
        <Text style={{ color: '#AD8474' }}>{now.toLocaleDateString()}</Text>
        <Text style={{ color: '#AD8474' }}>{now.toLocaleDateString('EN', { weekday: 'long' }) }</Text>
      </View>
      <TextInput
          editable
          onChangeText={value => setMoods(value)}
          value={moods}
          style={styles.moodsInput}
          placeholder='What moods do you feel now?'
      />
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {

  }
});
