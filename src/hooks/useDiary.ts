import { useSQLiteContext } from 'expo-sqlite';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDiaryEntity,
  getAllDiaryEntities,
  initDatabase,
  NewDiaryItem,
} from '../helpers/database';
import { addEntry, initEntries, initialized } from '../store/diary';

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
    await initDatabase(db);

    const allEntities = await getAllDiaryEntities(db);
    dispatch(initEntries(allEntities));
  }

  const addItem = async (diaryEntity: NewDiaryItem) => {
    const newItem = await createDiaryEntity(db, diaryEntity);
    dispatch(addEntry(newItem));
  };

  return {
    loadDiary,
    addItem,
  };
};
