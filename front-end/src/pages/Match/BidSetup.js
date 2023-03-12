import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';
import { alpha, styled } from '@mui/material/styles';




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


const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(3),
  height: theme.spacing(3),
  justifyContent: 'center',
  marginBottom: theme.spacing(0),
}));



export default function BidSetup() {
  const navigate = useNavigate()

  const location = useLocation();

  const [ count ,setcount ] = useState([]);

  const [pendingCount , setpendingCount] = useState();

  const [ Status , setStatus ] = useState(false);

  const [pendingstat, setpendingstat] = useState(false);

  const [msg,setMsg] = useState('');

  const mid = localStorage.getItem("MatchID");

  const Auctioncheck = () => {
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
  
      const getcount = () => {
        axios.post("http://localhost:3001/getCount",{
          mid:mid
        }).then((res) => {
       if(res.data){
        console.log(res.data);
          console.log(res.data[0]);
          setcount(res.data[0]);
          setStatus(true);
          if(res.data[1][0].pendingCount===0){
            setpendingstat(false);
          }else{
            setpendingstat(true);
            setpendingCount(res.data[1][0].pendingCount);
          }
       }
       else{
        setcount([]);
        setStatus(false);
       }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
      }
  
      const ChangePending = () => {
        
        axios.post("http://localhost:3001/changePending",{
          mid:mid
        }).then((res) => {
       if(res.data){
        console.log(res.data);
          console.log(res.data[0]);
          setcount(res.data[0]);
          setpendingCount(res.data[1][0].pendingCount);
          setStatus(true);
       }
       else{
        setcount([]);
        setStatus(false);
        navigate(-1)       
      }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
      }

  useEffect(() => {
   getcount()
   Auctioncheck()
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

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
      <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
{
  pendingstat && 
      <Grid item xs={2} sm={4} md={4}  >
      <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette["primary"].darker,
        bgcolor: '#FCAE3E',

      }}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette["primary"].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha('#FCAE1E', 0)} 0%, ${alpha(
              theme.palette["primary"].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={'ant-design:team-outlined'} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h3">{pendingCount}</Typography>

      <Typography sx={{
        cursor: "pointer",
        opacity: 0.72 
        }} 
       variant="subtitle2" 
       onClick={()=>{
        ChangePending();
        window.location.reload();
        console.log('pending!');
       }}
       >
        Pending
      </Typography>
    </Card>
      </Grid>
}

  {Status && 
    <>
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
      </>
  }
   </Grid>

{ msg &&
          <div>
              <Typography
              variant='h4'
              sx={{
                display:'flex',
                justifyContent:'center'
              }}
              >
                  {msg}
              </Typography>
          </div>
}
    </Container>
  </>
  );
}
