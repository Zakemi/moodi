export interface Diary {
  id: string;
  text: string;
  moods: string[];
  created: Date;
}

export interface DiaryStoreEntity {
  id: string;
  text: string;
  moods: string[];
  created: string;
}
