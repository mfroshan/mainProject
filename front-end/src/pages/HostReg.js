import { Link as RLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui

import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// components

// import Logo from '../components/logo'


// import Iconify from '../components/iconify';
// sections
import { RegisterHost } from '../sections/auth/login/Register';


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

export default function HostReg() {
  const mdUp = useResponsive('up', 'md');
   
 
  return (
    <>
      <Helmet>
        <title> Register </title>
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
              Signup as Host
            </Typography>

            

            {/* <Stack direction="row" spacing={2}>
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
              <Typography variant="body2" sx={{ color: 'text.secondary' }} />
            </Divider>

            <RegisterHost />
            
            <Typography variant="body2">
              Go to Login ? {''}
              <RLink to={'/login'}><Link variant="subtitle2">  login</Link></RLink>
            </Typography>
            <Typography variant="body2" >
              Register As Player{''}
              <RLink to={'/registerplayer'}><Link variant="subtitle2">Register</Link></RLink>
            </Typography>
            <Typography variant="body2" >
              Register As Team {''}
              <RLink to={'/registerteam'}><Link variant="subtitle2">Register</Link></RLink>
            </Typography> 
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
