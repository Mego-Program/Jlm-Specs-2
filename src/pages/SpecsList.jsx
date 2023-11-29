import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  List,
  Typography,
} from "@mui/material";
import SpecItem from "../components/SpecItem";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import axios from "axios";

function SpecsList() {
  const [specsList, setSpecsList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [faild, setfaild] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/specs`)
      .then((response) => {
        setSpecsList(response.data.reverse());
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setfaild(true)
      });
  }, []);

  const delSpec = (id) => {
    let newList = specsList.filter((item) => item._id !== id);
    setSpecsList(newList);
  };
  

  return (
    <Box sx={{ height: "100vh", bgcolor: "background.b1" }}>
      <Box sx={{ bgcolor: "background.b1", padding: 3 }}>
        <Link to={"../SpecInput"}>
          <Button variant="contained" sx={{ bgcolor: "background.y" }}>
            <Typography fontSize={11} fontWeight={700}>
              Add New Spec
            </Typography>
            <Box
              sx={{
                bgcolor: "background.b2",
                display: "flex",
                height: "30px",
                width: "50px",
                marginLeft: 2,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
              }}
            >
              <AddIcon color="primary" />
            </Box>
          </Button>
        </Link>
      </Box>
      {success ? (
        <List sx={{ padding: 0, textAlign: "center" }}>
          {specsList.length > 0 ? (
            specsList.map((spec, index) => (
              <SpecItem
                date={spec.startDate}
                title={spec.title}
                info={spec.description}
                key={spec._id}
                id={spec._id}
                del={delSpec}
                // avater={spec.creator}
              />
            ))
          ) : (
            <Typography
              sx={{
                bgcolor: "background.b2",
                color: "background.y",
                paddingY: 2,
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              No Specs currently available
            </Typography>
          )}
        </List>
      ) : (
        <Box>
          {faild ? (
            <Typography
            sx={{
              bgcolor: "background.b2",
              color: "background.y",
              paddingY: 2,
              fontSize: 24,
              fontWeight: 700,
              textAlign:'center'
            }}
          >
            Faild to load list of Specs - Try again
          </Typography>
          ):(
            <Backdrop
          sx={{
            color: "primary.main",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
          )}
        </Box>
        
      )}
    </Box>
  );
}

export default SpecsList;
