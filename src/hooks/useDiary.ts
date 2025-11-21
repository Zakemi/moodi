import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

export const useDiary = () => {
  const db = useSQLiteContext();
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    async function loadDiary() {
      await db.execAsync(
        'CREATE TABLE IF NOT EXISTS diary (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, moods TEXT, created TEXT NOT NULL)',
      );
      await db.execAsync(
        `INSERT INTO diary (text, moods, created) VALUES ('My first diary entry', 'happy,joyful', '2025-11-21T17:40:56.238Z')`,
      );

      const allRows = await db.getAllAsync('SELECT * FROM diary');
      for (const row of allRows) {
        console.log(row.id, row.text, row.moods, row.created);
      }
      setDiaryEntries(
        allRows.map((row) => ({ ...row, moods: row.moods.split(',') })),
      );
    }
    loadDiary();
  }, []);

  return {
    diaryEntries,
  };
};
