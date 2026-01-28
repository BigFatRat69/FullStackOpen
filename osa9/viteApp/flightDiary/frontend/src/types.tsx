export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface DiaryListProps {
  diaries: DiaryEntry[]
}

export interface NewDiaryFormProps {
  newDiary: NewDiaryEntry
  setNewDiary: React.Dispatch<React.SetStateAction<NewDiaryEntry>>
  addDiary: (diary: DiaryEntry) => void
}

export type NewDiaryFormState = {
  date: string
  weather?: Weather
  visibility?: Visibility
  comment?: string
};

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
