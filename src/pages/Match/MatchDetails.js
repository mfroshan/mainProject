import { filter, set } from 'lodash';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';



// material
import {
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  TextField,
  Box
} from '@mui/material';

// components
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Page from '../../components/Page';
import Label from '../../components/label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/iconify';
import CardContent from '@mui/material/CardContent';
import AddMatch from './AddMatch';
import PlayerInMatch from './PlayerInMatch';
import TeamInMatch from './TeamInMatch';
import PlayerRegGen from './PlayerRegGen';
import TeamRegGen from './TeamRegGen';

// import requestPost from '../serviceWorker';
// mock
// import USERLIST from '../_mock/user';
// import ServiceURL from '../constants/url';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------







export default function MatchDetails() {
  const navigate = useNavigate()
  const ref = useRef(null);
  

  const handleClose = () => {
    setDialog();
  };
  const [USERLIST,setUserList] = useState();

  const [pcount ,setpcount]= useState();

  const [tcount,settcount] = useState();
      

  const getCount = () => 
  {
    axios.post("http://localhost:3001/getPlayerCount",{
      id:location.state.mid,
    }).then((res) => {
   if(res.data[0]){
    setpcount(res.data[0].pcount);
      settcount(res.data[0].tcount);
   }
   else{
    setpcount(res.data[0].pcount);
      settcount(res.data[0].tcount);    
   }
    }).catch((error) => {
      console.log(error);
        console.log('No internet connection found. App is running in offline mode.');
      });
  }

  
      const display = () => {
        axios.post("http://localhost:3001/bidStatus",{
          id:location.state.mid,
        }).then((res) => {
       if(res.data){
          console.log(res.data[0][0]);
          setUserList(res.data[0][0].bidStatus);
       }
       else{
        setUserList([]);
       }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
      }
      
  useEffect(() => {
   display();
   getCount();
  }, [])
  
  const [open, setOpen] = useState(true);

  

  const [addDialog, setDialog] = useState();

  
  const location = useLocation();
  console.log(location.state.mid);

  localStorage.setItem("MatchID",location.state.mid);
 
  const StatusMenu = (props)=>{
  console.log(props)
    return(
      <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {props.status === 0  && 
      <>
          
      
        <Button variant="contained"  startIcon={<Iconify icon="material-symbols:select-check-box" />}
        onClick={()=>{
          navigate('/dashboard/bidsetup', {state:{
            matchid: location.state.mid,
             }
           }
           )
        }}>Select Player For Auction</Button>
        </>
        }
        {
         props.status ===1 && 
         <Button variant='contained' 
         onClick={()=>{
          navigate('/dashboard/auctiondetails', {state:{
            mid: location.state.mid,
             }
           }
           )
        }}
         >Bid Details</Button>
        }
      </Box>
      </>);
  }

  return (
    <Page title="Matches">
      <Container maxWidth="xl">
      {addDialog}
      
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Match Details
          </Typography>
          <Button variant="contained"  onClick={()=>{
            navigate('/dashboard/position',{
              state:{
              mid:location.state.mid
              }
            })
            console.log("clicked!");
          }} startIcon={<Iconify icon="eva:plus-fill" />}>
            Manages Positon
          </Button> 
          
        </Stack>
        <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} sx = {{
            marginLeft:15
          }}>
            <PlayerInMatch 
               title="Player Details" total={pcount} icon={'uil:football'} mid={location.state.mid} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx = {{
            marginLeft:40
          }}>
            <TeamInMatch   title="Team Details" total={tcount} icon={'ant-design:team-outlined'} mid={location.state.mid} />
          </Grid>
         </Grid>

         <Grid 
         sx={{ display: 'flex', gap:'20rem'}}>
          
          <PlayerRegGen mid={location.state.mid}/>
          <TeamRegGen  mid={location.state.mid} />

          
          
          </Grid>

        <Grid sx={{ display: 'flex',justifyContent:'center',marginTop:'50px'}}>
         
            <StatusMenu status={USERLIST} />
            
        </Grid>

      </Container>
    </Page>
  );
}
