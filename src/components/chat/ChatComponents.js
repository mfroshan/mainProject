import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Comment } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Chat from './Chat';


const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    backgroundColor:'#103996',
    color:'#FFFFFF',
    zIndex:3
   };
const useStyles = makeStyles({
    liveChat : {
        bottom: 300,
        right:"47%",
        position: "fixed",
        width: "300px",
        height: "600px",
        zIndex:1,
        flexGrow: 1,
        '@media (max-width: 600px)' : {
          width:"100%",
          right:0,
          top: 0,  
        }
      }
  });

  const ChatComponent = ()=> {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const toggleDiv = () => {
     setShow(!show)
   }
     return (
     <>
       <div className={classes.liveChat}>
        {show && <Chat/> }
       </div>
      <Button variant="fab" aria-label="add" style={style} onClick={toggleDiv} >
        <Comment/>
      </Button>
      </>
      );
    }
    export default ChatComponent;