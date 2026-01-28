import { useState, useEffect } from 'react';
import diaryService from './services/diaryService';
import {
  DiaryEntry,
  DiaryListProps,
  NewDiaryEntry,
  Weather,
  Visibility,
  NewDiaryFormState
} from './types';

const DiaryList = ({ diaries }: DiaryListProps) => (
  <div>
    <h1>Flight Diaries</h1>
    {diaries.map(diary => (
      <div key={diary.id}>
        <h3>{diary.date}</h3>
        <div>visibility: {diary.visibility}</div>
        <div>weather: {diary.weather}</div>
        {diary.comment && <div>comment: {diary.comment}</div>}
      </div>
    ))}
  </div>
);

type NewDiaryFormProps = {
  newDiary: NewDiaryFormState;
  setNewDiary: React.Dispatch<React.SetStateAction<NewDiaryFormState>>;
  addDiary: (d: DiaryEntry) => void;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const NewDiaryForm = ({
  newDiary,
  setNewDiary,
  addDiary,
  setError
}: NewDiaryFormProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newDiary.weather || !newDiary.visibility) {
      setError('weather and visibility are required');
      return;
    }

    const diaryToSend: NewDiaryEntry = {
      date: newDiary.date,
      weather: newDiary.weather,
      visibility: newDiary.visibility,
      comment: newDiary.comment
    };

    try {
      const savedDiary = await diaryService.createDiary(diaryToSend);
      addDiary(savedDiary);

      setNewDiary({
        date: '',
        weather: undefined,
        visibility: undefined,
        comment: ''
      });

      setError(null);
    } catch {
      setError('failed to save diary');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        date
        <input
          type="date"
          value={newDiary.date}
          onChange={e => setNewDiary({ ...newDiary, date: e.target.value })}
        />
      </div>

      <div>
        weather
        {Object.values(Weather).map(w => (
          <label key={w}>
            <input
              type="radio"
              name="weather"
              checked={newDiary.weather === w}
              onChange={() => setNewDiary({ ...newDiary, weather: w })}
            />
            {w}
          </label>
        ))}
      </div>

      <div>
        visibility
        {Object.values(Visibility).map(v => (
          <label key={v}>
            <input
              type="radio"
              name="visibility"
              checked={newDiary.visibility === v}
              onChange={() => setNewDiary({ ...newDiary, visibility: v })}
            />
            {v}
          </label>
        ))}
      </div>

      <div>
        comment
        <input
          value={newDiary.comment ?? ''}
          onChange={e => setNewDiary({ ...newDiary, comment: e.target.value })}
        />
      </div>

      <button type="submit">add</button>
    </form>
  );
};

const App = () => {
  const [error, setError] = useState<string | null>(null);
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryFormState>({
    date: '',
    weather: undefined,
    visibility: undefined,
    comment: ''
  });

  useEffect(() => {
    diaryService.getAllDiaries().then(setDiaries);
  }, []);

  const addDiary = (diary: DiaryEntry) =>
    setDiaries(diaries.concat(diary));

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <DiaryList diaries={diaries} />
      <NewDiaryForm
        newDiary={newDiary}
        setNewDiary={setNewDiary}
        addDiary={addDiary}
        setError={setError}
      />
    </div>
  );
};

export default App;
