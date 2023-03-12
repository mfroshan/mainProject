import axios from 'axios';
import React from 'react';
import { useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'; 
import Typography from '@mui/material/Typography';
import { PlayerViewAuction } from './PlayerviewAuction';


export default function ViewAuction () {
  
    

    const navigate = useNavigate();

    

    // console.log(location);


    const [alertMsg, setAlert] = useState(false);

    

    const [ player, setPlayer]  = useState([]);
   
    
    
    const display = () => {

        const mid = localStorage.getItem("mid");
        axios.post("http://localhost:3001/auctionDisplaytoHost",{
          mid:mid,
        }).then((res) => {
       if(res.data[0][0]){
          console.log(res.data[0][0]);
          setPlayer(res.data[0][0]);
            setAlert(true);
       }
       else{
        setPlayer([]);
        setAlert(false);
       }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
      }

      useEffect(() => {
        display()
        
      }, [])
      
      
      console.log(alertMsg);
      
           
      
      
      
        
      

      // setInterval(auction,1000);
        
        
      const StatusMenu = (props) => {
        return(
            <>
              {
                props.status===true &&
                <div>
                  <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
                   <PlayerViewAuction data={player}/>
                </div>
              }
              {
                props.status===false &&
                  <div>
                   <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
                  <Typography variant='h1'
                  sx={{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'200px'
                  }}
                  >
                      Auctions is Not Yet Started !
                  </Typography>
                  </div>
              }
            </>
        )
      }
    return (
        <div>
                
               <StatusMenu status={alertMsg} />
               
        </div>
  )
}