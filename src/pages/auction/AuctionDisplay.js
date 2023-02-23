import axios from 'axios';
import React from 'react';
import { useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'; 
import Auctions from './Auctions';
import Typography from '@mui/material/Typography';


export default function AuctionDisplay () {
  
    

    const navigate = useNavigate();

    const location = useLocation();

    // console.log(location);

    localStorage.setItem("mid",location.state.mid);

    const [alertMsg, setAlert] = useState(false);

    

    const [ player, setPlayer]  = useState([]);
   
    
    
    const display = () => {

        const mid = localStorage.getItem("mid");
        axios.post("http://localhost:3001/auctionDisplaytoHost",{
          mid:mid,
        }).then((res) => {
       if(res.data){
          console.log(res.data[0][0]);
          setPlayer(res.data[0][0]);
          if(player.length > 0){
            setAlert(true);
          }else{
            setAlert(false);
          }
          
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
      
        if(player?.length < 0){
          setAlert(false);
          console.log(player);
          console.log(alertMsg);
        }else{
          console.log(player);
          const {player_fname,Player_lname,Player_no,player_img,pos_name,total_bid_amt,baseamt,tbl_match_id,player_id} = player;
        }    
      
      
      
        
      

      // setInterval(auction,1000);
        
        
      const StatusMenu = (props) => {
        return(
            <>
              {
                props.status===true &&
                <div>
                  <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
                   <Auctions data={player}/>
                </div>
              }
              {
                props.status===false &&
                  <div>
                   <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
                  <Typography variant='h1'>
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