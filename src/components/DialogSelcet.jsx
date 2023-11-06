import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, Select, OutlinedInput } from '@mui/material';
import { useState } from 'react';


function DialogSelect(props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(props.status);

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
      <Button sx={{color:'text.primary', fontWeight:'700', fontSize:11}} id='status' onClick={handleClickOpen}>{status}</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle  sx={{bgcolor:'background.y', color:'#121231'}}>status</DialogTitle>
        <DialogContent sx={{bgcolor:'background.y'}}>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel sx={{color:'text.primary'}} htmlFor="demo-dialog-native">Status</InputLabel>
              <Select
                native
                value={status}
                onChange={handleChange}
                input={<OutlinedInput sx={{color:'#121231'}} label="Status" id="demo-dialog-native" />}
              >
                <option selected value={props.first}>{props.first}</option>
                <option value={props.second}>{props.second}</option>
                <option value={props.third}>{props.third}</option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{bgcolor:'background.y'}}>
          <Button sx={{bgcolor:'background.b2', color:'text.primary'}} onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DialogSelect;