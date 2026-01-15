import diagnosis from '../data/diagnoses';
import { DiagnosisEntry } from '../types';


const getEntries = (): DiagnosisEntry[] => {
  return diagnosis;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};