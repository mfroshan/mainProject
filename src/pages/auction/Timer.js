import React,{useState, useEffect } from 'react'
import {Typography } from '@mui/material';


 const  Timer = (props) => {
    
    const [ time, setTime] = useState("60");

    console.log(props.timercall);

    let maxTime = props.maxTime;

    
let timer;

    const timeChange = () => {
        maxTime--;
        if(maxTime !==0 && maxTime >=0){
            setTime(maxTime);
        }else{
            
            setTime('60');
            window.location.reload();
        }
  };

  

  

    useEffect(()=>{
        maxTime = props.maxTime ? props.maxTime : time;
            
                
           
        // timer = setInterval(timeChange,1000);    
          
            
       },[])
  
  return (
        <Typography
                    variant='h4'
                    sx={{
                        float:'right',
                        color:'orange'
                    }}
                        >
                      TIME LEFT:  {`${time} sec`}
                    </Typography>
  )
}

export default Timer;