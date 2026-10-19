import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { courses, plans } from './mockData';
import { createLearningRepository, emptyLearning } from './learningRepository';

const repository = createLearningRepository(AsyncStorage, courses, plans);

export function useLearningStorage() {
  const [data, setData] = useState(emptyLearning);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const current = useRef(data);
  const writing = useRef(false);

  const reload = async () => {
    setError('');
    try {
      const saved = await repository.load();
      current.current = saved;
      setData(saved);
      setReady(true);
    } catch {
      setError('Não foi possível ler os dados salvos. Os dados originais foram preservados. Tente novamente.');
    }
  };

  useEffect(() => { reload(); }, []);

  const update = async transform => {
    if (!ready || writing.current) return false;
    writing.current = true;
    setBusy(true);
    setError('');
    try {
      const next = transform(current.current);
      // Publish state only after storage confirms the complete snapshot.
      await repository.save(next);
      current.current = next;
      setData(next);
      return true;
    } catch {
      setError('Não foi possível salvar. A alteração não foi aplicada. Tente a ação novamente.');
      return false;
    } finally {
      writing.current = false;
      setBusy(false);
    }
  };

  return { data, ready, busy, error, reload, update };
}
