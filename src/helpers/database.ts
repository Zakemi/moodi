import { SQLiteDatabase } from 'expo-sqlite';
import { Diary } from '../types';

export interface DiaryEntity {
  text: string;
  moods: string[];
  created: string;
}

// todo on exit app, close db?
// todo is db shared? security?
// todo redux thunk

export async function initDatabase(db: SQLiteDatabase) {
  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS diary (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, moods TEXT, created TEXT NOT NULL)',
  );
}

export async function getAllDiaryEntities(
  db: SQLiteDatabase,
): Promise<Diary[]> {
  const allRows = await db.getAllAsync('SELECT * FROM diary');
  return allRows.map((row) => ({
    ...row,
    moods: row.moods.split(','),
  }));
}

export async function createDiaryEntity(
  db: SQLiteDatabase,
  diaryEntity: DiaryEntity,
) {
  await db.execAsync(
    `INSERT INTO diary (text, moods, created) VALUES ('${diaryEntity.text}', '${diaryEntity.moods.join(',')}', '${diaryEntity.created}')`,
  );

  // TODO Find a way to use 'RETURNING id, text, moods, created' instead of query the new item
  const newItem = await db.getFirstAsync(
    `SELECT * FROM diary WHERE created = ?`,
    diaryEntity.created,
  );
  return { ...newItem, moods: newItem.moods.split(',') };
}
