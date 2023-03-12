import { useEffect } from 'react';
import { Link as RouterLink,useNavigate, useLocation } from 'react-router-dom';


import { Helmet } from 'react-helmet-async';
// @mui

import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components

// import Logo from '../components/logo'


// import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

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

export default function LoginPage(props) {
  const mdUp = useResponsive('up', 'md');
  
  const navigate = useNavigate();

   const location = useLocation();

  useEffect(() => {
   
    if(location.state === 'logout'){
      window.location.reload(false);
      window.history.replaceState({}, document.title)
    }
    
    // if (localStorage.getItem('Role') !== null) {
    //   navigate('/dashboard/app', { replace: true });
    //  }
  
  },[])
  
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        {/* <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img  src="https://media.giphy.com/media/S2vc8XI0eeBajDSO4a/giphy.gif" alt="login" />            
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
             <RouterLink to={'/HostRegister'}><Link  variant="subtitle2">Get started</Link></RouterLink> 
            </Typography>

            <Divider sx={{ my: 3 }}>
              {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography> */}
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
