import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEntry } from '../store/diary';

export default function ModalScreen() {
  const [text, setText] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  const onAddPress = () => {
    dispatch(addEntry({
      id: Date.now().toString(),
      text,
      moods: ['happy']
    }))
    router.back()
  }

  return (
    <View style={styles.container}>
      <TextInput
          editable
          multiline
          onChangeText={value => setText(value)}
          value={text}
          autoFocus
          style={styles.input}
          textAlignVertical='top'
        />
      <View style={{position:"absolute", bottom: 32, right: 32, zIndex: 100}}>
        <Button title="Add" onPress={onAddPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative'
  },
  input: {
    flex: 1
  },
});
