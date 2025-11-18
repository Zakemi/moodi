import { diaryEntries } from '@/src/store/diary';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Text, TouchableHighlight, View, VirtualizedList } from 'react-native';
import { useSelector } from 'react-redux';

interface DiaryItem {
  id: string;
  text: string;
  moods: string[];
  created: Date;
}

interface ItemProps {
  diary: DiaryItem;
}

function Item({ diary }: ItemProps) {
  const createdDate = new Date(diary.created);

  return (
    <View style={{ borderRadius: 20, padding: 20, backgroundColor: '#fff' }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ color: '#AD8474' }}>
          {createdDate.toLocaleDateString()}
        </Text>
        <Text style={{ color: '#AD8474' }}>
          {createdDate.toLocaleDateString('EN', { weekday: 'long' })}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#AD8474',
          marginTop: 3,
          marginBottom: 10,
        }}
      />
      <Text style={{ color: '#543022' }}>{diary.text}</Text>
      {!!diary.moods.length && (
        <Text style={{ color: '#AD8474', paddingTop: 10 }}>
          {diary.moods.join(', ')}
        </Text>
      )}
    </View>
  );
}

export default function Index() {
  const router = useRouter();
  const items = useSelector(diaryEntries) || [];

  return (
    <View
      style={{
        flex: 1,
        paddingRight: 16,
        paddingLeft: 16,
        position: 'relative',
        backgroundColor: '#f8e0c8',
      }}
    >
      <View
        style={{ position: 'absolute', bottom: 16, right: 32, zIndex: 100 }}
      >
        <TouchableHighlight onPress={() => router.navigate('/modal')}>
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
      {!!items.length && (
        <VirtualizedList
          ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
          renderItem={({ item }: { item: DiaryItem }) => <Item diary={item} />}
          keyExtractor={(item) => item.id}
          getItemCount={(_data) => _data?.length}
          getItem={(data, index): DiaryItem => data[index]}
          data={items}
        />
      )}
      {!items.length && (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#543022' }}>
            Write something to your diary
          </Text>
        </View>
      )}
    </View>
  );
}

/*
#e5e1dc background
#fff    card bg
#EF9A54 
#aaa    date
#ccc    separator
#888    moods
*/

/*
#f8e0c8
#824d25
#bd691a
#B06447
#543022
*/
