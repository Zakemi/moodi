import { useSQLiteContext } from 'expo-sqlite';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry, initEntries, initialized } from '../store/diary';

// TODO Create common types
interface DiaryItem {
  id: string;
  text: string;
  moods: string[];
  created: string;
}

export const useDiary = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const isDiaryInitialized = useSelector(initialized);

  async function loadDiary() {
    if (isDiaryInitialized) {
      return;
    }

    await db.execAsync(
      'CREATE TABLE IF NOT EXISTS diary (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, moods TEXT, created TEXT NOT NULL)',
    );

    const allRows = await db.getAllAsync('SELECT * FROM diary');
    const formattedEntries = allRows.map((row) => ({
      ...row,
      moods: row.moods.split(','),
    }));
    dispatch(initEntries(formattedEntries));
  }

  const addItem = async (diaryItem: Omit<DiaryItem, 'id'>) => {
    await db.execAsync(
      `INSERT INTO diary (text, moods, created) VALUES ('${diaryItem.text}', '${diaryItem.moods.join(',')}', '${diaryItem.created}')`,
    );
    // TODO Find a way to use 'RETURNING id, text, moods, created' instead of query the new item
    const newItem = await db.getFirstAsync(
      `SELECT * FROM diary WHERE created = ?`,
      diaryItem.created,
    );
    const formattedNewItem = { ...newItem, moods: newItem.moods.split(',') };
    dispatch(addEntry(formattedNewItem));
  };

  return {
    loadDiary,
    addItem,
  };
};
