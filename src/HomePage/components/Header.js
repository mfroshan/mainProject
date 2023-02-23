import {
  AppBar,
  Typography,
  Link,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
  Button
} from '@mui/material';
import React, { useState } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../styles/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Helmet } from 'react-helmet-async';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function ElevationScroll(props) {
  const { children, window } = props;
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Header = (props) => {
  const classes = useStyles();
  const links = [
    { id: 1, route: 'Login', url: '/login' },
    { id: 2, route: 'Register', url: '/HostRegister' },
  ];

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {links.map((link) => (
          <ListItem button key={link.id}>
            <ListItemText primary={link.route} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
    <Helmet>
    <title>Home</title>
    </Helmet>
    <Box sx={{ marginBottom: '70px' }}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar className={classes.toolBar}>
            <Link href="/" underline="none">
              <Typography variant="h5" className={classes.logo}>
                Auction.com
              </Typography>
            </Link>

            {matches ? (
              <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer('right', true)}
              >
                <MenuIcon className={classes.menuIcon} fontSize="" />
              </IconButton>

              <Drawer
                anchor="right"
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                {list('right')}
              </Drawer>
            </Box>
            ): <Box
              sx={{
                display: 'flex',
                gap:'2rem',
                marginLeft:'700px',
                flexGrow: '0.1',
              }}
            >
              {links.map((link) => (
                <Link href={link.url} target="_blank" underline="none" key={link.id}>
                  <Button variant="outlined"
                  endIcon={<PersonAddAltIcon />}
                  >
                    <Typography className={classes.link}>{link.route}</Typography>
                  </Button>
                </Link>
              ))}
            </Box>}
           
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
    </>
  );
};

export default Header;