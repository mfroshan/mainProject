import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {  Container, Typography, Divider } from '@mui/material';


// hooks
// import useResponsive from '../hooks/useResponsive';
// components

// import Logo from '../components/logo'


// import Iconify from '../components/iconify';
// sections
import { PlayerCommonReg } from '../sections/auth/login/Register/index';



// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

// const StyledSection = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: 480,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   boxShadow: theme.customShadows.card,
//   backgroundColor: theme.palette.background.default,
// }));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function PlayerRegCom() {
  // const mdUp = useResponsive('up', 'md');
  
  const [data,setData] = useState([]);

 const getStatus = () => {

  let url = [];
  url = window.location.href;
  let matchid = url[url.length-1];
  console.log(matchid); 
    axios.post('http://localhost:3001/getStatusTeam',{
       id:matchid
    }).then((response)=>{
        if(response.data){
          console.log(response.data[0].team_reg_status);
          setData(response.data[0].team_reg_status);
        }
    });
    
 } 

 
 useEffect(() => {
   getStatus()
 }, [])
 
 
 
  return (
    <>
      <Helmet>
        <title> Player Registeration  </title>
      </Helmet>

      <StyledRoot>
        {/* <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}

        {/* {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img  src="https://media.giphy.com/media/26FKSNXyevr4BFakU/giphy.gif" alt="login" />            
          </StyledSection>
        )} */}

        <Container maxWidth="sm">
          <StyledContent>
          
            <Typography variant="h4" gutterBottom>
              Register As Player
            </Typography>


            <Divider sx={{ my: 3 }}>
              {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography> */}
            </Divider>
            
             
          
             
              <PlayerCommonReg />

            
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
