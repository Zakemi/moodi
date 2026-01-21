import { diaryDao, NewDiaryItem } from '@/src/helpers/diaryDao';
import { addEntry, initEntries, initialized } from '@/src/store/diary';
import { useSQLiteContext } from 'expo-sqlite';
import { useDispatch, useSelector } from 'react-redux';

// todo use redux thunk instead
export const useDiary = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const isDiaryInitialized = useSelector(initialized);

  async function loadDiary() {
    if (isDiaryInitialized) {
      return;
    }

    // todo Call it in Splash screen instead
    await diaryDao.initDatabase(db);

    const allEntities = await diaryDao.getAllDiaryEntities(db);
    dispatch(initEntries(allEntities));
  }

  const addItem = async (diaryEntity: NewDiaryItem) => {
    const newItem = await diaryDao.createDiaryEntity(db, diaryEntity);
    dispatch(addEntry(newItem));
  };

  return {
    loadDiary,
    addItem,
  };
};
