import React from 'react';
import { useState} from 'react';

//material
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MuiSnackbar from '@mui/material/Snackbar';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import  Popup  from './Popup';

import {
  Card,
  Typography,
  TextField,
  Alert,
} from '@mui/material';
import { generatePath, useNavigate, useParams } from 'react-router-dom';


const PlayerRegGen = (prop) => {
  const theme = useTheme();
  
  const { id } = useParams();

  const history = useNavigate();

  const [open, setOpen] = useState(true);

  const [alertOpen, setAlertOpen] = useState(false);
  
  const [ addDialog, setDialog] = useState(<></>);

   const handleClose = () => {
    setDialog();
  };


  const handleClick = () => {

   console.log("popup");
      setDialog(
        <Popup 
        open={open}
        onClose={handleClose}
        />
      );
      setOpen(true);
  }
  const CopyToClipboard = (value) => {
  
    if(value === 'p'){
      const link = `http://localhost:3000/PlayerRegister/${prop.mid}`;
      navigator.clipboard.writeText(link)
    }

    

  }

 const GenerateLink = (value)=> {

  console.log(value)

      if(value === 'p'){
          let  btn = document.getElementById("outlined-basic");
          btn.value = `http://localhost:3000/PlayerRegister/${prop.mid}`;
          console.log(id);
          generatePath(`/PlayerRegister/${prop.mid}`);
      }
 }
  
          const sendMSg = () => {

          }
 return (
  
    <Card sx={{ display: 'flex', top:'30px' ,width:'400px'}}>
      {addDialog}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Generate Player 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Registration Link
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

      

        <TextField id="outlined-basic"  variant="outlined" disabled value={`http://localhost:3000/PlayerRegister/${prop.mid}`}
        sx={{ width: '300px' }}/>
        
        <IconButton aria-label="copy link"
        onClick={() => {
          CopyToClipboard("p")
          setAlertOpen(true)
        }}
        >
        <ContentCopyIcon />
        </IconButton>

          {/* <IconButton aria-label="Generate Link" 
          onClick={()=>{
            GenerateLink("p")
          }}>
             <AutorenewIcon />
          </IconButton> */}

        <IconButton>
             <a style={{ color:'#637381'}}
        href={`https://api.whatsapp.com/send?text="http://localhost:3000/PlayerRegister/${prop.mid}"`}>
         <WhatsAppIcon/>
          </a>
        </IconButton>
     
     <MuiSnackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="success"
          variant="filled"
        >
          Link copied
        </Alert>
      </MuiSnackbar>

        </Box>
      </Box>
      {/* <CardMedia
        component="img"
        sx={{ width: 151 }}
        image=""
        alt="Live from space album cover"
      /> */}
    </Card>
  )
}

export default PlayerRegGen