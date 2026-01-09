import { ACCENT_COLOR, BACKGROUND_COLOR, ON_ACCENT_COLOR, PRIMARY_COLOR } from '@/src/constants/style';
import { diaryEntries } from '@/src/store/diary';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Text, TouchableHighlight, View, VirtualizedList } from 'react-native';
import { useSelector } from 'react-redux';
import { DiaryItem } from './DiaryItem';
import { Diary } from './types';

export function DiaryTab() {
  const router = useRouter();
  const items = useSelector(diaryEntries);

  return (
    <View
      style={{
        flex: 1,
        paddingRight: 16,
        paddingLeft: 16,
        position: 'relative',
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      <View
        style={{ position: 'absolute', bottom: 16, right: 32, zIndex: 100 }}
      >
        <TouchableHighlight onPress={() => router.navigate('/modal')}>
          <MaterialIcons
            size={35}
            name="add"
            color={ON_ACCENT_COLOR}
            style={{
              backgroundColor: ACCENT_COLOR,
              padding: 10,
              borderRadius: 30,
            }}
          />
        </TouchableHighlight>
      </View>
      {!!items.length && (
        <VirtualizedList
          ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
          renderItem={({ item }: { item: Diary }) => <DiaryItem diary={item} />}
          keyExtractor={(item) => item.id}
          getItemCount={(_data) => _data?.length}
          getItem={(data, index): Diary => data[index]}
          data={items}
        />
      )}
      {!items.length && (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: PRIMARY_COLOR }}>
            Write something to your diary
          </Text>
        </View>
      )}
    </View>
  );
}
