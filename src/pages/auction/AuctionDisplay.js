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

    const [msg,setMsg] = useState('');

    const [ player, setPlayer]  = useState([]);
   
    const Auctioncheck = () => {
      const mid = localStorage.getItem("mid");
      axios.post("http://localhost:3001/AuctionCheck",{
        mid: mid,
      }).then((res) => {
     if(res.data[0]){
      console.log("Auction:"+res.data[0][0].msg)
        setMsg(res.data[0][0].msg);
      }
      }).catch((error) => {
        console.log(error);
          console.log('No internet connection found. App is running in offline mode.');
        });
    }
    
    
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
        Auctioncheck()
      }, [])
           
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