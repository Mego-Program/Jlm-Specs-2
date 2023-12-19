import React from 'react';
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import Item from '../global/FormUser';
import { Edit } from '@mui/icons-material';
import axios from 'axios';

// קודם כל, הצגה. תהיה כותרת ומתחת הצגה. בכותרת team ומצד שני כפתור פלוס
// מתחת יש קופסה שאני רוצה 
// אחכ הוספה ואז מחיקה. שאתה לוחץ על כפתור יפתח דיאלוג (MUI)

function SpecTeam(props) {

  const [value, setValue] = React.useState("")
  const [list, setList] = React.useState([]) 
  const [users, setUsers] = React.useState([])

  const delItem = (id) => {
    let newTeam = props.info.team.filter((item, index) => id !== index);
    console.log(newTeam);
    props.set({...props.info, team: newTeam });
    console.log(props.info.team);
  };

    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/team`);
        let data = response.data
        response.data.map((item) => { 
            console.log(item.userName)
          }
        );
        // response.data.map((item, index) => { 
        //   <List>
        //       <Item name={item} key={index} id={index}/>
        //   </List>
        //   }
      }
       catch (error) {
        console.error(error);
      }
    }







    // let newTeam = props.info.team.map((item, index) => id === index);
    // console.log(newTeam);
    // console.log(props.info.team)
    // .filter((item, index) => id !== index);
    // console.log(newTeam);
//     if (value.length > 0 && value != "") {
//     props.set({ ...props.info, team: [...props.info.team, value] });
// }
// }
  
  return (
    <Box>
      <Typography variant="h5">Team:</Typography>
      <List sx={{bgcolor:'secondary.light', borderRadius:1}}>
      {props.info.team.map((i, index) => (
          <Item name={i} key={index} id={index} del={delItem}/>
      ))}
      </List>
      <Button
      variant="outlined"
      color="primary"
      startIcon={<Edit/>}
      onClick={fetchData}
            ></Button>
      </Box>
  );
}

export default SpecTeam;

