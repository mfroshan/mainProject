import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import useStyles from '../styles/styles';

const Footer = () => {
  const date = new Date().getFullYear();
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
      <Typography className={classes.footerText}>
        Created By{' '}
        <Link href="" target="_blank" underline="none">
          @Roshan
        </Link>
      </Typography>
      <Typography className={classes.footerDate}></Typography>
    </Box>
  );
};

export default Footer;