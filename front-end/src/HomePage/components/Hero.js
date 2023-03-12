import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import myteam from '../images/20945153.jpg';
import useStyles from '../styles/styles';
import { useNavigate } from 'react-router-dom';


const Hero = () => {

  const navigate = useNavigate();

  const classes = useStyles();

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            Let's scale your Auction
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            We Provide Platfrom to bid Players,that makes easier to paticipation in 
            auction and any can host match or singup host and organise auction..
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
            onClick={()=>{
              navigate('/login')
            }}
          >
            Try Us
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={myteam} alt="My Team" className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;