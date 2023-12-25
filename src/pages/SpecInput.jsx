import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "dayjs/locale/en-gb";

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";

import FormDetails from "../components/Form/FormDetails";
import FormKpi from "../components/Form/FormKpi";
import FormTask from "../components/Form/FormTask";
import FormTeam from "../components/Form/FormTeam";
import FormSubmit from "../components/Form/FormSubmit";
import UserProfile from "../components/global/UserProfile";

const steps = ["Details", "KPIs", "Task", "Team", "Submit"];

export default function SpecInput() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);

  const [disabled, setDisabled] = useState(true);
  // const [fillPage, setfillPage] = useState(true);


  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [item, setItem] = React.useState({
    author:null,
    title: "",
    description: "",
    content: { blocks: [] },
    startDate: null,
    endDate: null,
    task: { projectName: null, tasks: [] },
    team: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await UserProfile;
        setItem({...item, author:userData})
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    setDisabled(true)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    navigate("../");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/specs`,
        item
      );
      console.log("specs: ", response.data);
      if (response.data.task.projectName === "") setAlert(true);
      handleNext();
    } catch (error) {
      console.error("Error sending object to srver: ", error);
      setError("try again");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", bgcolor: "background.b1" }}>
      <Stepper
        sx={{
          paddingTop: 10,
          paddingX: 25,
          "& .MuiStepLabel-label": {
            color: "primary.main",
          },
          "& .MuiStepConnector-lineHorizontal": {
            borderColor: "primary.main",
          },
          "& .Mui-disabled": {
            color: "secondary.light",
            "& .MuiSvgIcon-root": {
              color: "secondary.light",
            },
            "& .MuiStepConnector-lineHorizontal": {
              borderColor: "secondary.light",
            },
          },
        }}
        activeStep={activeStep}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step
              sx={{
                bgcolor:
                  activeStep === index ? "background.b3" : "background.b2",
                borderRadius: 3,
              }}
              key={label}
              {...stepProps}
            >
              <StepLabel
                sx={{
                  color: activeStep === index ? "background.y" : "text.primary",
                }}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box
            sx={{
              mt: 2,
              mb: 1,
              color: "text.primary",
              bgcolor: "background.b2",
              marginX: 25,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              padding: 5,
              marginTop: 5,
            }}
          >
            <Typography>New spec added successfully</Typography>

            {alert && (
              <Alert
                sx={{
                  marginTop: 4,
                  bgcolor: "secondary.light",
                  color: "primary.main",
                  svg: { color: "primary.main" },
                }}
                severity="warning"
              >
                This spec is not linked to a board!
              </Alert>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              bgcolor: "background.b2",
              marginX: 25,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              variant="contained"
              sx={{ margin: 1, fontWeight: 700 }}
              onClick={handleCancel}
            >
              Return to list
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            sx={{
              mt: 2,
              mb: 1,
              color: "text.primary",
              bgcolor: "background.b2",
              marginX: 25,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              padding: 5,
              marginTop: 5,
            }}
          >
            {activeStep === 0 && <FormDetails disabled={setDisabled} info={item} set={setItem} />}
            {activeStep === 1 && <FormKpi disabled={setDisabled} info={item} set={setItem} />}
            {activeStep === 2 && <FormTask disabled={setDisabled} info={item} set={setItem} />}

            {activeStep === 3 && <FormTeam disabled={setDisabled} info={item} set={setItem} />}
            {activeStep === 4 && (
              <FormSubmit info={item} set={setItem}/>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              bgcolor: "background.b2",
              marginX: 25,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <Button
              onClick={handleCancel}
              sx={{
                margin: 1,
                fontWeight: 700,
                "&:hover": { color: "background.b3" },
              }}
              variant="contained"
            >
              <KeyboardBackspaceSharpIcon sx={{ paddingRight: 1 }} />
              cancel
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, '&.Mui-disabled':{color:'secondary.light', cursor:'not-allowed', pointerEvents:'unset'}}}
            >
              <ArrowBackIosNewSharpIcon />
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <LoadingButton
                color="primary"
                sx={{
                  margin: 1,
                  paddingX: 3,
                  "&.Mui-disabled": {
                    border: 1,
                    borderColor: "primary.main",
                    ".MuiCircularProgress-circle": {
                      color: "primary.main",
                    },
                  },
                }}
                variant="contained"
                onClick={handleSubmit}
                size="small"
                startIcon={<DoneSharpIcon />}
                loading={loading}
                // disabled={disabled}
              >
                Create
                {error && (
                  <Typography
                    sx={{
                      position: "absolute",
                      top: -20,
                      color: "red",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {error}
                  </Typography>
                )}
              </LoadingButton>
            ) : (
              <Button sx={{'&.Mui-disabled':{color:'secondary.light', cursor:'not-allowed', pointerEvents:'unset'}}} disabled={disabled}  onClick={handleNext}>
                Next
                <ArrowForwardIosSharpIcon />
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
