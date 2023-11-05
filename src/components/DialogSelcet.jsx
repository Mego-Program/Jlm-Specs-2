import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, Select, OutlinedInput } from '@mui/material';
import { useState } from 'react';


function DialogSelect(props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);

    }
  };

  return (
    <Box sx={{height:'100%', display:'flex', alignItems:'center' }}>
      <Button sx={{color:'text.primary', fontWeight:'700', fontSize:11}} id='status' onClick={handleClickOpen}>check</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>status</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
              <Select
                native
                value={status}
                onChange={handleChange}
                input={<OutlinedInput label="Status" id="demo-dialog-native" />}
              >
                <option selected value={'1'}>1</option>
                <option value={'2'}>2</option>
                <option value={'3'}>3</option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DialogSelect;