import { DiaryScreen } from '@/src/screens/diary';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { diaryEntries } from '@/src/store/diary';

export const DiaryContainer = () => {
  const router = useRouter();
  const items = useSelector(diaryEntries);

  const handleAddNewDiary = () => {
    router.navigate('/modal');
  };

  return <DiaryScreen items={items} onAddNewDiary={handleAddNewDiary} />;
};
