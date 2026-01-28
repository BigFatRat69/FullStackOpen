import express from 'express';
import patientService from '../services/patientService';
import { Request, Response, NextFunction } from 'express';
import { NewPatientEntry, PatientEntry, Entry } from '../types';
import { NewPatientEntrySchema, NewEntrySchema } from '../utils';

const router = express.Router();

const newPatientParser = ( req: Request, _res: Response, next: NextFunction ) => {
  try {
    req.body = NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = ( req: Request, _res: Response, next: NextFunction ) => {
  try {
    req.body = NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  };
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  }
);

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, Entry>, res) => {
  patientService.addEntry(req.params.id, req.body);
  const patient = patientService.getById(req.params.id);

  if (!patient) {
    return res.sendStatus(404);
  }

  res.json(patient);
});




export default router;