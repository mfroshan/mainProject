import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';




// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  Box
} from '@mui/material';

// components
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MatchPlayerPos from './MatchPlayerPos';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------






export default function BidSetup() {
  const navigate = useNavigate()

  const location = useLocation();

  const [ count ,setcount ] = useState([]);

  const mid = localStorage.getItem("MatchID");
      
      const getcount = () => {
        axios.post("http://localhost:3001/getCount",{
          mid:mid
        }).then((res) => {
       if(res.data){
          console.log(res.data[0]);
          setcount(res.data[0]);
       }
       else{
        setcount([]);
       }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
      }
  
      
  useEffect(() => {
   getcount()
  }, [])
  



  return (
    <>
    <Helmet>
      <title> Auction Details </title>
    </Helmet>

    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
       Players 
      </Typography>
      

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
      {count.map((data) => (
        <Grid item xs={2} sm={4} md={4}  >
                <MatchPlayerPos
               title={data.pos_name} 
               total={data.cnt} 
               icon={'ant-design:team-outlined'} 
               pid={data.pos_id} 
               mid={location.state.mid}
              
                />
               </Grid>
               ))}
          </Grid>
      
    </Container>
  </>
  );
}
