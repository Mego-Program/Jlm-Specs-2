import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import { useNavigate } from "react-router-dom";
import FormDetails from "../components/FormDetails";
import FormKpi from "../components/FormKpi";
import FormTeam from "../components/FormTeam";
import FormSubmit from "../components/FormSubmit";
const steps = ["Details", "KPIs", "Team", "Submit"];


export default function SpecInput() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handelCancel = () => {
    console.log("check");
    navigate('../SpecsList')
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", bgcolor: "background.b1" }}>
      <Stepper sx={{ paddingTop: 10, paddingX: 25 }} activeStep={activeStep}>
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
          <Typography
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
            All steps completed - you&apos;re finished
          </Typography>
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
              sx={{ margin: 1 }}
              onClick={handleReset}
            >
              Reset
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
            {activeStep === 0 && <FormDetails/>}
            {activeStep === 1 && <FormKpi/>}
            {activeStep === 2 && <FormTeam/>}
            {activeStep === 3 && <FormSubmit/>}
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
            <Button onClick={handelCancel}
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
              sx={{ mr: 1 }}
            >
              <ArrowBackIosNewSharpIcon />
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                onClick={handleNext}
              >
                <DoneSharpIcon sx={{ marginRight: 1 }} />
                Create
              </Button>
            ) : (
              <Button onClick={handleNext}>
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
