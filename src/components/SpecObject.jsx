import { Box, Button, Typography, ListItem } from "@mui/material";
import DialogSelect from "./DialogSelcet";

function SpecObject() {
  let date = new Date();
  let currectDay = date.toLocaleDateString();
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
        <Typography sx={{ fontSize: 11 }}>{currectDay}</Typography>
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
      <Box
        sx={{
          bgcolor: "background.b2",
          border: 1,
          borderColor: "background.y",
          borderRadius: 1,
          width: "80%",
          display: "flex",
          height: "80%",
          margin: "5px 10px",
        }}
      >
        <Box sx={{padding:1}}>
          <Typography sx={{margin:0, padding:0, fontWeight:700}}>title</Typography>
          <Typography sx={{ fontSize: 9 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            inventore corporis, velit libero laboriosam praesentium asperiores
            error illum
          </Typography>
        </Box>
        <DialogSelect/>
        

        {/* <FormControl fullWidth>
          <InputLabel id='status'>status</InputLabel>
        <Select id='status'>
          <MenuItem value={'ToDo'} selected>ToDo</MenuItem>
          <MenuItem value={"In-progress"}>In progress</MenuItem>
          <MenuItem value={"Done"}>Done</MenuItem>
        </Select>
        </FormControl> */}
        

        {/* <Select class="form-select" aria-label="Default select example">
          <MenuItem selected>Can I work?</MenuItem>
          <MenuItem value="In-progress">Edit</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Button margin="0" padding="0" sx={{color:'text.primary', fontSize:11, fontWeight:700}}>
          Delete
        </Button>
      </Box>
    </ListItem>
  );
}
export default SpecObject;





