import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button, List, Paper} from '@mui/material';
import Item from './FormUser';
import { Entity } from 'draft-js';
import SpecInput from '../../pages/SpecInput';

export default function Tags(props) { 

const CustomPaper = (props) => {
        return (
          <Paper
            elevation={5}
            sx={{
              border:4,
              borderTop:1,
              borderColor:'secondary.main',
              bgcolor: "secondary.light",
              padding: 0,
              "& ::-webkit-scrollbar": {
                width: "6px",
              },
      
              " & ::-webkit-scrollbar-thumb": {
                backgroundColor: "#f6c927",
                borderRadius: "6px",
              },
            }}
            {...props}
          />
        );
      };

const top100Films = [
    'The Godfather',
    'The Godfather: Part II',
    'The Dark Knight',
    '12 Angry Men',
    "Schindler's List", 
    'The Lord of the Rings'
  ];
 
const [value, setValue] = React.useState("")
const [users, setUsers] = React.useState([])
const [list, setList] = React.useState([])

React.useEffect(() => {
    console.log('value:' + value);
    console.log('props:', props);
    console.log('list:' + list);
 },[props, list, value])

const enterUser = (event) => {
    setValue(event.target.innerHTML)
    if (value.length > 0) {
    props.set({ ...props.info, team: [...props.info.team, value] });
}}

 const handleTeam = () => {
    props.set({ ...props.info, team: [...props.info.team, value] });
    setList(props.info.team)
    }

  const delItem = (id) => {
    let newTeam = props.info.team.filter((item, index) => id !== index);
    props.set({ ...props, team: newTeam });
    setList(newTeam)
  };

  return (
    <Stack spacing={3} sx={{ width: '100%'}}>
      <Autocomplete
      PaperComponent={CustomPaper}
      onChange={enterUser}
        multiple 
        id="tags-outlined"
        options={top100Films} 
        getOptionLabel ={(option) => option} 
        freeSolo
        filterSelectedOptions
        renderInput = {(params) => ( 
          <TextField
          onChange={enterUser}
            {...params} 
            label="TEAM" 
            placeholder="USERS" 
          />
        )} 
      />
        <Button 
        onClick={handleTeam}
          variant="contained"
          sx={{ marginX: 2, marginY: 3, fontWeight: 700 }}
        >
          Add
        </Button>
        <List sx={{ width: "100%", bgcolor: "secondary.light", borderRadius: 2 }}>
      {props.info.team.map((i, index) => (
          <Item name={i} key={index} id={index} del={delItem}/>
      ))}
      </List>
    
    </Stack>
  );
}

