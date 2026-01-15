import { SQLiteDatabase } from 'expo-sqlite';
import { Diary, DiaryStoreEntity } from '../types';

export interface DiaryEntity {
  id: string;
  text: string;
  moods: string;
  created: string;
}

export type NewDiaryItem = Omit<Diary, 'id' | 'created'>;

// todo on exit app, close db?

export async function initDatabase(db: SQLiteDatabase) {
  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS diary (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, moods TEXT, created TEXT NOT NULL)',
  );
}

export async function getAllDiaryEntities(
  db: SQLiteDatabase,
): Promise<DiaryStoreEntity[]> {
  const allRows = await db.getAllAsync<DiaryEntity>(
    'SELECT * FROM diary ORDER BY datetime(created) DESC',
  );
  return allRows.map((row) => transformToDiaryStoreEntity(row));
}

export async function createDiaryEntity(
  db: SQLiteDatabase,
  diary: NewDiaryItem,
): Promise<DiaryStoreEntity | null> {
  const statement = await db.prepareAsync(
    'INSERT INTO diary (text, moods, created) VALUES (?, ?, ?) RETURNING *',
  );
  try {
    const result = await statement.executeAsync<DiaryEntity>(
      diary.text,
      diary.moods.join(','),
      new Date().toISOString(),
    );
    const newItem = await result.getFirstAsync();

    return newItem ? transformToDiaryStoreEntity(newItem) : null;
  } finally {
    await statement.finalizeAsync();
  }
}

function transformToDiaryStoreEntity(
  diaryEntity: DiaryEntity,
): DiaryStoreEntity {
  return {
    ...diaryEntity,
    moods: diaryEntity.moods.length ? diaryEntity.moods.split(',') : [],
  };
}
