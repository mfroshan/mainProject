import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Typography,Grid,IconButton,Stack} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  
}));

export default function ComplaintDetails(props) {
  
  const [USERLIST,setUserList] = useState([]);

  console.log(props);

  

  const handleClose = () => {
    props.onClose();
  };

  const display = () => {
    console.log(props.id);
    axios.post("http://localhost:3001/getRequestDetails",{
      id:props.id,
    }).then((res) => {
   if(res.data){
      console.log(res.data[0]);
      setUserList(res.data[0]);
   }
   else{
    setUserList([]);
   }
    }).catch((error) => {
      console.log(error);
        console.log('No internet connection found. App is running in offline mode.');
      });
  }

  useEffect(()=>{
    display()
  },[])


  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle
        align='center'
        >Re Auction Request Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item>
          <Typography variant='h6'>
          Request By: {props.data.teamname} 
          </Typography>
          <Typography variant='h6'>
            Reason: {props.data.reason}
          </Typography>
          <Typography variant='h6'>
            Name of Player Injured: {props.data.pname}
          </Typography>
          <Typography variant='h6'>
            Position: {props.data.pos_name} 
          </Typography>
          <Typography variant='h6'>
            Issue Related Image: 
          </Typography>
          {
            USERLIST.map((result)=>{
              return(
                
                <Stack direction="row" spacing={2}>
                 <Item>
                 <img
                src={result.poc}
                alt="poc"
                style={{
                  width:'400px',
                  height:'200px'
                }}
                >
                 </img>
                 </Item>
                </Stack>
              )
            })
          }
          </Grid>
        </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}