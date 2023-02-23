import React,{useState, useEffect } from 'react'
import {Typography } from '@mui/material';




 const  Timer = (props) => {
    
    const [ time, setTime] = useState("30");

    let maxTime=0;
    
    const timeChange = () => {
        maxTime--;
        if(maxTime!==0 && maxTime >=0){
            setTime(maxTime);
        }else{
            
            setTime('Times Up');
        }
  };

  useEffect(()=>{
   maxTime = props.maxTime ? props.maxTime : 30;
  },[])
  return (
        <Typography
                    variant='h4'
                    sx={{
                        float:'right',
                        color:'orange'
                    }}
                        >
                        {`${time} sec`}
                    </Typography>
  )
}

export default Timer;