import { Box, Button, Typography, ListItem, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import AlertDialog from "../global/AlertDialog";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";


function SpecItem(item) {
  const navigate = useNavigate();

  const [alert , setAlert] = useState(false)

  const delSpec = () => {
    try {
      axios.delete(`${import.meta.env.VITE_API_URL}/specs/${item.id}`);
      console.log('test');
      item.del(item.id);
    } catch (error) {
      console.log("faild to delete item: ", error);
    }
  };

  const dateobject = dayjs(item.date);
  const dateString = dateobject.$D + "." + dateobject.$M + "." + dateobject.$y;
  
  return (
    <ListItem
      sx={{
        bgcolor: "background.b1",
        color: "text.primary",
        display: "flex",
        alignItems: "flex-start",
        padding: "0",
        paddingTop: 1,
        height: 100,
      }}
    >
      <Box sx={{ textAlign: "center", marginX: 1, width: "5vw" }}>
        <Typography sx={{ fontSize: 11 }}>{dateString}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "2px",
          width: "2vw",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.b2",
            width: "15px",
            height: "15px",
            borderRadius: "50%",
          }}
        />
        <Box sx={{ bgcolor: "background.b2", width: "2px", height: "70px" }} />
      </Box>
      <Button
        onClick={() => {navigate('single/'+ item.id)}}
        sx={{
          color: "text.primary",
          bgcolor: "background.b2",
          border: 1,
          borderColor: "background.y",
          borderRadius: 1,
          width: "80%",
          display: "flex",
          height: "80%",
          margin: "5px 10px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "70%", height: "100%", display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'start',  wordWrap:'break-word', overflowX:'hidden', overflowY:'scroll', '::-webkit-scrollbar':{display:'none'}}}>
          <Typography
            sx={{ margin: 0, paddingTop: 1, fontWeight: 700 }}
          >
            {item.title}
          </Typography>
          <Typography sx={{ fontSize: 9, textAlign:'start', marginRight:1}}>{item.info}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

        </Box>
        <Avatar>f</Avatar>
      </Button>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >   
      <DeleteIcon
                sx={{
                  color: "primary.main",
                  boxSizing:'border-box',
                  "&:hover": { border:1, borderColor:'primary.main' },
                  padding:1,
                  borderRadius:'50%',
                  fontSize:48
                }}
                onClick={() => setAlert(true)}
              />
        <AlertDialog
                open={alert}
                setOpen={setAlert}
                del={delSpec}
                index={item.id}
              />
      </Box>
    </ListItem>
  )
}
export default SpecItem;
