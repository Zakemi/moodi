import { SQLiteDatabase } from 'expo-sqlite';
import { Diary, DiaryStoreEntity } from '../types';

export interface DiaryEntity {
  id: string;
  text: string;
  moods: string;
  created: string;
}

export type NewDiaryItem = Omit<Diary, 'id' | 'created'>;

export interface DiaryDAO {
  initDatabase: (db: SQLiteDatabase) => Promise<void>;
  getAllDiaryEntities: (db: SQLiteDatabase) => Promise<DiaryStoreEntity[]>;
  createDiaryEntity: (
    db: SQLiteDatabase,
    diary: NewDiaryItem,
  ) => Promise<DiaryStoreEntity>;
}

// todo on exit app, close db?

class DiaryDaoImpl implements DiaryDAO {
  async initDatabase(db: SQLiteDatabase) {
    await db.execAsync(
      'CREATE TABLE IF NOT EXISTS diary (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, moods TEXT, created TEXT NOT NULL)',
    );
  }

  async getAllDiaryEntities(db: SQLiteDatabase): Promise<DiaryStoreEntity[]> {
    const allRows = await db.getAllAsync<DiaryEntity>(
      'SELECT * FROM diary ORDER BY datetime(created) DESC',
    );
    return allRows.map((row) => this.transformToDiaryStoreEntity(row));
  }

  async createDiaryEntity(
    db: SQLiteDatabase,
    diary: NewDiaryItem,
  ): Promise<DiaryStoreEntity> {
    const statement = await db.prepareAsync(
      'INSERT INTO diary (text, moods, created) VALUES ($text, $moods, $created) RETURNING *',
    );
    try {
      const result = await statement.executeAsync<DiaryEntity>({
        $text: diary.text,
        $moods: diary.moods.join(','),
        $created: new Date().toISOString(),
      });
      const newItem = await result.getFirstAsync();

      if (!newItem) {
        throw new Error('Diary entity creation failed, new item is null');
      }

      return this.transformToDiaryStoreEntity(newItem);
    } finally {
      await statement.finalizeAsync();
    }
  }

  transformToDiaryStoreEntity(diaryEntity: DiaryEntity): DiaryStoreEntity {
    return {
      ...diaryEntity,
      moods: diaryEntity.moods.length ? diaryEntity.moods.split(',') : [],
    };
  }
}

export const diaryDao: DiaryDAO = new DiaryDaoImpl();
