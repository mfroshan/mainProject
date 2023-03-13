import axios from 'axios';
import React from 'react';
import {Typography} from '@mui/material';
import { useState,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TeamBid from './TeamBid';
import io from 'socket.io-client';


var socket;

export default function  TeamBidView () {
  

    const navigate = useNavigate();

    const [msg,setMsg] = useState('');
    
    const [alertMsg, setAlert] = useState(false);

    const [ player, setPlayer]  = useState([]);
    
    const [biStatus,setBistatus] = useState();
 
    const [mid,setMid] = useState();
    // let mid = localStorage.getItem("MatchID");

    
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

    const display =(msgg) => {
      
        setMsg(msgg);
        const username = localStorage.getItem("User_Name");
        const role = localStorage.getItem("Role");
        axios.post("http://localhost:3001/auctionDisplay",{
          username: username,
          role:role,
        }).then((res) => {
       if(res.data[0][0]){
        console.log("display:"+res.data[0][0]);
          setPlayer(res.data[0][0]);
          localStorage.setItem("bidAmt-left",res.data[0][0].total_bid_amt);
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
        
      const { username,player_fname,Player_lname,Player_no,player_img,pos_name,total_bid_amt,baseamt,tbl_match_id,player_id} = player;

    

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

      const StatusMenu = (props) => {
        return(
            <>
              {
                props.status &&
                <div>
                  
                   <TeamBid data={player} display={display}/>
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