import { Box, ListItem, Typography } from "@mui/material";


function SpecObject() {
  let date = new Date();
  let currectDay = date.toLocaleDateString();
  return (
      <ListItem sx={{bgcolor:'b1', color:'#fff', display:'flex', alignItems:'flex-start', padding:'0'}}>
        <Box sx={{textAlign:'center', width:'10vw'}}>
        <Typography >{currectDay}</Typography>
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', paddingTop:'4px', width:'2vw'}}>
              <Box sx={{bgcolor:'b2', width:'15px', height:'15px', borderRadius:'50%'}}/>
              <Box sx={{bgcolor:'b2', width:'2px', height:'10vh'}}/>
        </Box>
        <Box sx={{bgcolor:'b2', border:1, borderColor:'y', borderRadius:1, width:'80%', display:'flex', height:'10vh', margin:'5px 10px'}}>
          <h2 className="white">TITLE</h2>
          <h5 className="white">TEXT</h5>

          <select class="form-select" aria-label="Default select example">
            <option selected>Work status:</option>
            <option value="In-progress">In progress</option>
            <option value="Done">Done</option>
          </select>

          <select class="form-select" aria-label="Default select example">
            <option selected>Can I work?</option>
            <option value="In-progress">Edit</option>
            <option value="Done">Done</option>
          </select>

        </Box>
        <button type="reset">delete</button>

      </ListItem>
  );
}
export default SpecObject;
