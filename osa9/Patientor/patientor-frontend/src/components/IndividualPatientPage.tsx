import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Patient } from "../types";
import EntryDetails from "./entryDetails";
import patientService from "../services/patients";
import NewEntryForm from "./NewEntryForm";


const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const data = await patientService.getById(id);
      setPatient(data);
    };

    fetchPatient();
  }, [id]);


  if (!patient) {
    return <div>loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography>gender: {patient.gender}</Typography>

      <NewEntryForm patientId={patient.id} onEntryAdded={setPatient}/>

      <Typography variant="h6" sx={{ mt: 2 }}>
        entries
      </Typography>

    {patient.entries?.length === 0 && <Typography>No entries</Typography>}

    {patient.entries?.map(entry => (
      <Box key={entry.id} sx={{ border: "1px solid #ccc", p: 1, mb: 1 }}>
        <EntryDetails entry={entry} />
      </Box>
    ))}
    </Box>
  );
};

export default PatientInfoPage;
