export interface Diary {
  id: string;
  text: string;
  moods: string[];
  created: Date;
  photoUrls: string[];
}

export interface DiaryStoreEntity {
  id: string;
  text: string;
  moods: string[];
  created: string;
  photoUrls: string[];
}
