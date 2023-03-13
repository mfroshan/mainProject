import axios from 'axios';
import React from 'react';
import { useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'; 
import Typography from '@mui/material/Typography';
import { PlayerViewAuction } from './PlayerviewAuction';
import io from 'socket.io-client';


var socket;

export default function ViewAuction () {
  
    

    const navigate = useNavigate();

    
    const [msg, setMsg] = useState('');
  
    const [alertMsg, setAlert] = useState(false);  

    const [ player, setPlayer]  = useState([]);
   
    
    
    const Auctioncheck = () => {
      const id = localStorage.getItem("mid");
      console.log(id);
      
      axios.post("http://localhost:3001/AuctionCheck",{
        mid: id,
      }).then((res) => {
     if(res.data[0]){
      console.log("Auction:"+res.data[0][0].msg)
      console.log("mid:"+id)
        display(res.data[0][0].msg)
      }
      }).catch((error) => {
        console.log(error);
          console.log('No internet connection found. App is running in offline mode.');
        });
    }

    const display = (msgg) => {
      setMsg(msgg);
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
        Auctioncheck();
            //display("Auction Has Not Started!");
            
            socket = io('http://localhost:3001') 

            socket.on("auction-stats", (matchid,playerid)=>{
            console.log("auction");
              Auctioncheck();
              // display("Please Wait For Next Player!");
              console.log(matchid);
              console.log(playerid);
              console.log("Auction Started!");
              
          })
        
      }, [])
      
      
      console.log(alertMsg);
      
           
      
      
      
        
      

      // setInterval(auction,1000);
        
        
      const StatusMenu = (props) => {
        return(
            <>
              {
                props.status &&
                <div>
                  <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
                   <PlayerViewAuction data={player} display={display}/>
                </div>
              }
              {
                !props.status &&
                  <div>
                   <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
                  <Typography variant='h1'
                  sx={{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'200px'
                  }}
                  >
                     {msg}
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