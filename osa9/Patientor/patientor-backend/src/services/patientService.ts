import patients from '../data/patients';
import { v4 as uuid } from 'uuid';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';

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
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getById
};