import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import bestTeams from '../images/13015.jpg';
import useStyles from '../styles/styles';

const AboutUs = () => {
  const classes = useStyles();

  return (
    <Box className={classes.aboutUsContainer}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={5}>
          <img src={bestTeams} alt="My Team" className={classes.largeImage} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            We Provide, You Organise
          </Typography>
          <Typography  className={classes.aboutUsSubtitle}>
            Your Auction needs to be in safe hands at all times. We ensure you
            Secure and Efficient System. We are trusted by
            over 500+ People to deliver quality during auction.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            TRY US
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;