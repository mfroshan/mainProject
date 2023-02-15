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
import { TeamReg } from '../sections/auth/login/Register/index';



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

export default function TeamRegister() {
  // const mdUp = useResponsive('up', 'md');
  
  const [data,setData] = useState([]);

  const Display = () => {
    console.log(data);
      if(data === 0){
        return(
          <TeamReg />
        )
      }else{
        return(
          "Registration Closed!"
        )
      }
   }
  

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
        <title> Team Registeration  </title>
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
              Register As Team
            </Typography>

            {/* <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack> */}

            <Divider sx={{ my: 3 }}>
              {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography> */}
            </Divider>
            
             {/* <TeamReg /> */}
             { Display() } 

          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
