import { Box, Button, Typography, ListItem, Avatar } from "@mui/material";
import DialogSelect from "./DialogSelect";
import { useNavigate } from "react-router-dom";
import axios from "axios";




function SpecItem(item) {

  const navigate = useNavigate();

  const handelItem = () =>{
    console.log(item);
    navigate('/SingleSpec/'+ item.id)

  };
  const delSpec = () => {
    try{
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this spec?"
      );
      if (confirmDelete) {
      axios.delete(`http://localhost:4000/specs/${item.id}`)
      item.del(item.id)
      }
    }catch (error){
      console.log('faild to delete item: ', error);
    }
      
      
  }

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
      <Box sx={{ textAlign: "center", marginX: 1 }}>
        <Typography sx={{ fontSize: 11 }}>{item.date}</Typography>
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
        onClick={handelItem}
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
        <Box sx={{ width: "50%", textAlign: "start", height: "100%" }}>
          <Typography
            sx={{ margin: 0, padding: 0, fontWeight: 700 }}
          >
            {item.title}
          </Typography>
          <Typography sx={{ fontSize: 9 }}>{item.info}</Typography>
        </Box>
        {/* <DialogSelect  stat="todo" /> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button component='span' sx={{ color: "text.primary", fontSize: 11, fontWeight: 700 }}>
            Edit
          </Button>
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
        <Button
          margin="0"
          padding="0"
          onClick={delSpec}
          sx={{ color: "text.primary", fontSize: 11, fontWeight: 700 }}
        >
          Delete
        </Button>
      </Box>
    </ListItem>
  );
}
export default SpecItem;
