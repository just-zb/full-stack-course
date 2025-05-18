import patients from '../../data/patients';

import { Entry, EntryWithoutId, NoSsnPatient, Patient, PatientFormValues } from '../types';

import { v1 as uuidv1 } from 'uuid';

// Patient
const getAllPatient = (): Patient[] => {
  return patients;
};

const getNoSsnPatients = (): NoSsnPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      occupation,
      dateOfBirth,
      gender,
      entries,
    }),
  );
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (data: PatientFormValues): Patient => {
  const newPatient = {
    id: uuidv1(),
    ...data,
    entries: [],
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry = {
    ...entry,
    id: uuidv1(),
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getAllPatient,
  getNoSsnPatients,
  addPatient,
  getPatientById,
  addEntry,
};
