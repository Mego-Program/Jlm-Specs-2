import { Box, Button, Typography, ListItem, Avatar } from "@mui/material";
import DialogSelect from "./DialogSelect";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import AlertDialog from "./AlertDelete";

function SpecItem(item) {
  const navigate = useNavigate();

  const delSpec = () => {
    try {
      axios.delete(`http://localhost:4000/specs/${item.id}`);
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
        onClick={() => {navigate('/SingleSpec/'+ item.id)}}
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
        {/* <DialogSelect  stat="todo" /> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Button component='span' sx={{ color: "text.primary", fontSize: 11, fontWeight: 700 }}>
            Edit
          </Button> */}
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
        <AlertDialog del={delSpec}/>
      </Box>
    </ListItem>
  )
}
export default SpecItem;
