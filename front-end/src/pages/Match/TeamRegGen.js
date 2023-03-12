import React from 'react';
import { useState } from 'react';

//material
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import MuiSnackbar from '@mui/material/Snackbar';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import {
  Card,
  Typography,
  TextField,
  Alert,
} from '@mui/material';
import { generatePath } from 'react-router-dom';


const  TeamRegGen = (prop) => {
  const theme = useTheme();
  const [alertOpen, setAlertOpen] = useState(false);
  
  
  const CopyToClipboard = () => {
  
    const link = `http://localhost:3000/TeamReg/${prop.mid}`;
    navigator.clipboard.writeText(link);
  
    }

 const GenerateLink = ()=> {
          let  btn = document.getElementById("team");
          btn.value = `http://localhost:3000/TeamReg/${prop.mid}`;
          generatePath(`/PlayerRegister/${prop.mid}`);
      
 }
  
 return (
    <Card sx={{ display: 'flex',top:'30px' ,width:'400px'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Generate Team 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Registration Link
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <TextField id="team"  variant="outlined" disabled value={`http://localhost:3000/TeamReg/${prop.mid}`}
        sx={{ width: '300px' }}/>
        
        <IconButton aria-label="copy link"
        onClick={() => {
          CopyToClipboard()
          setAlertOpen(true)
        }}
        >
        <ContentCopyIcon />
        </IconButton>

          {/* <IconButton aria-label="Generate Link" 
          onClick={()=>{
            GenerateLink()
          }}>
             <AutorenewIcon />
          </IconButton> */}

          <IconButton>
             <a style={{ color:'#637381'}}
        href={`https://api.whatsapp.com/send?text="http://localhost:3000/TeamReg/${prop.mid}"`}>
         <WhatsAppIcon/>
          </a>
      </IconButton>

      {/* <IconButton>
      <ForwardToInboxIcon></ForwardToInboxIcon>
      </IconButton> */}

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

export default TeamRegGen