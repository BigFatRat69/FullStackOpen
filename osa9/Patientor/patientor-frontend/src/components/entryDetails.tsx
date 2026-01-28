import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Entry, HealthCheckEntry, HealthCheckRating } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Error: ${JSON.stringify(value)}`
  );
};



const HealthRating = ({ entry }: { entry: HealthCheckEntry }) => {
  let color: string;

  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      color = "green";
      break;
    case HealthCheckRating.LowRisk:
      color = "yellowgreen";
      break;
    case HealthCheckRating.HighRisk:
      color = "orange";
      break;
    case HealthCheckRating.CriticalRisk:
      color = "darkred";
      break;
    default:
      color = "gray";
  }

  return <FavoriteIcon sx={{ color }} />;
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box>
          <Typography>
            {entry.date} <LocalHospitalIcon />
          </Typography>
          <Typography>{entry.description}</Typography>
          <Typography>Diagnosed by: {entry.specialist}</Typography>
          <Typography>Discharge {entry.discharge.date}</Typography>
          <Typography>Discharge reason {entry.discharge.criteria}</Typography>
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box>
          <Typography>
            {entry.date} <WorkIcon /> {entry.employerName}
          </Typography>
          <Typography>{entry.description}</Typography>
          <Typography>Diagnosed by: {entry.specialist}</Typography>
          {entry.sickLeave && (
            <>
              <Typography>Sick leave start: {entry.sickLeave.startDate}</Typography>
              <Typography>Sick leave end: {entry.sickLeave.endDate}</Typography>
            </>
          )}
        </Box>
      );

    case "HealthCheck":
      return (
        <Box>
          <Typography>
            {entry.date} <FavoriteIcon />
          </Typography>
          <Typography>{entry.description}</Typography>
          <Typography>Diagnosed by: {entry.specialist}</Typography>
          <HealthRating entry={entry}/>
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
