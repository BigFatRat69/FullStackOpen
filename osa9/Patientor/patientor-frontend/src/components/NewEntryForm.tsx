import { useState } from "react";
import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import { EntryWithoutId, EntryFormProps, EntryType, NewEntryFormProps } from "../types";
import patientService from "../services/patients";


const HealthCheckEntryForm = ({ onSubmit }: EntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(",").map(c => c.trim())
        : undefined
    });
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        New HealthCheck Entry
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Specialist"
            value={specialist}
            onChange={e => setSpecialist(e.target.value)}
            fullWidth
          />

          <TextField
            label="Health Check Rating (0–3)"
            type="number"
            inputProps={{ min: 0, max: 3 }}
            value={healthCheckRating}
            onChange={e => setHealthCheckRating(Number(e.target.value))}
          />

          <TextField
            label="Diagnosis Codes (comma separated)"
            value={diagnosisCodes}
            onChange={e => setDiagnosisCodes(e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained">
            Add Entry
          </Button>
        </Stack>
      </form>
    </Box>
  );
};


const HospitalEntryForm = ({ onSubmit }: EntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      type: "Hospital",
      description,
      date,
      specialist,
      discharge: {
        date: dischargeDate,
        criteria
      }
    });
  };

  return (
    <Box mt={2}>
      <Typography variant="h6">New Hospital Entry</Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Specialist"
            value={specialist}
            onChange={e => setSpecialist(e.target.value)}
            fullWidth
          />

          <TextField
            label="Discharge Date"
            type="date"
            value={dischargeDate}
            onChange={e => setDischargeDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Discharge Criteria"
            value={criteria}
            onChange={e => setCriteria(e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained">
            Add Entry
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

const OccupationalHealthcareEntryForm = ({ onSubmit }: EntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      employerName,
      sickLeave: startDate && endDate
        ? { startDate, endDate }
        : undefined
    });
  };

  return (
    <Box mt={2}>
      <Typography variant="h6">New Occupational Healthcare Entry</Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Specialist"
            value={specialist}
            onChange={e => setSpecialist(e.target.value)}
            fullWidth
          />

          <TextField
            label="Employer Name"
            value={employerName}
            onChange={e => setEmployerName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Sick Leave Start Date"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Sick Leave End Date"
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button type="submit" variant="contained">
            Add Entry
          </Button>
        </Stack>
      </form>
    </Box>
  );
};


 
const ChangeableElement = ({
  type,
  onSubmit
}: {
  type: EntryType;
  onSubmit: (values: EntryWithoutId) => void;
}) => {
  switch (type) {
    case "HealthCheck":
      return <HealthCheckEntryForm onSubmit={onSubmit} />;
    case "Hospital":
      return <HospitalEntryForm onSubmit={onSubmit} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryForm onSubmit={onSubmit} />;
    default:
      return null;
  }
};


const NewEntryForm = ({ patientId, onEntryAdded }: NewEntryFormProps) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");

  const submitEntry = async (values: EntryWithoutId) => {
    const updatedPatient = await patientService.createEntry(patientId, values);
    onEntryAdded(updatedPatient);
  };

  return (
    <Box mt={3}>
      <Typography variant="h5">Add new entry</Typography>

      <Box mt={2}>
        <TextField
          select
          label="Entry type"
          value={entryType}
          onChange={e => setEntryType(e.target.value as EntryType)}
          SelectProps={{ native: true }}
        >
          <option value="HealthCheck">HealthCheck</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">Occupational Healthcare</option>
        </TextField>
      </Box>

      <ChangeableElement
        type={entryType}
        onSubmit={submitEntry}
      />
    </Box>
  );
};

export default NewEntryForm;

