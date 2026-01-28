import patients from '../data/patients';
import { v4 as uuid } from 'uuid';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Entry } from '../types';


const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ ssn: _ssn, ...patient }) => patient);
};

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getById = (id: string): PatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {

  const newPatientEntry: PatientEntry = {
    id: uuid(),
    ...entry,
    entries: []
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: Entry): Entry => {
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    throw new Error('Patient not found');
  }

  const newEntry = {
    ...entry,
    id: uuid(),
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getById,
  addEntry
};