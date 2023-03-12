import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';
import 
{
    Typography
} from '@mui/material';

function BalanceBidAmount(props) {

    console.log(props.mid);

    const [bidamontLeft,setbidamountLeft] = useState();


    const BalanceBidAmount = () =>{

        const mid = localStorage.getItem("mid");
        const teamid = localStorage.getItem("TeamID");
        

        axios.post("http://localhost:3001/getBalanceBidAmount",{
            mid: mid,
            tid:teamid,
          }).then((res) => {
         if(res.data[0]){
            console.log(res.data[0][0].amount);
            setbidamountLeft(res.data[0][0].amount);
            }else{
                setbidamountLeft(0);
            }
          }).catch((error) => {
            console.log(error);
              console.log('No internet connection found. App is running in offline mode.');
            });
      }
      useEffect(() => {
    
      BalanceBidAmount()
        
      }, [])
      

  return (
    <div>

        <Typography
        variant='h4'
        sx={{
            marginBottom:'2px',
            float:'right'
        }}
        >
          Bid Amount:{bidamontLeft}
        </Typography>
    </div>
  )
}

export default BalanceBidAmount