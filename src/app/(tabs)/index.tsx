import { diaryEntries } from "@/src/store/diary";
import { useRouter } from "expo-router";
import { Button, Text, View, VirtualizedList } from "react-native";
import { useSelector } from "react-redux";

interface DiaryItem {
  id: string,
  text: string,
  moods: string[],
}

interface ItemProps {
  diary: DiaryItem
}

function Item({ diary}: ItemProps) {
  return (<View>
    <Text>{diary.text}</Text>
    <Text style={{ color: '#888' }}>{diary.moods.join(', ')}</Text>
  </View>)
}

export default function Index() {
  const router = useRouter()
  const items = useSelector(diaryEntries) || []

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        position: 'relative'
      }}
    >
      <View style={{position:"absolute", bottom: 32, right: 32, zIndex: 100}}>
        <Button title="Write something..." onPress={() => router.navigate('/modal')} />
      </View>
      {items.length && (
        <VirtualizedList 
        ItemSeparatorComponent={() => <View style={{height: 1, margin: 10, borderBottomWidth: 1}} />}
        renderItem={({item}: {item: DiaryItem}) => <Item diary={item}/>}
        keyExtractor={item => item.id}
        getItemCount={(_data) => _data?.length}
        getItem={(data, index): DiaryItem => data[index]}
        data={items}
      />
      )}
      {!items.length && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Write something to your diary</Text></View>
      )}
    </View>
  );
}
