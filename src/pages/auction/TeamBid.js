import axios from 'axios';
import React from 'react';
import { Grid, Container, Stack, Typography, Card,TextField ,Button, CardContent, TableRow, TableCell, Table, Snackbar,Alert} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import Paper from '@mui/material/Paper';
import Item from '@mui/material/ListItem';
import io from 'socket.io-client';
import Timer from './Timer';
import TableContainer from '@mui/material/TableContainer';
import Chat from '../../components/chat/ChatComponents';
import TableHead from '@mui/material/TableHead';


var socket;

export default function  TeamBid (props) {
  
    

    const navigate = useNavigate();
    
    const [alertMsg, setAlert] = useState(false);
    const [msg, setMsg] = useState("");

    const [bidamt, setbidAmt] = useState(false);

    const [ amt , lastAmt] = useState('');

    const [ BidHistory , setBidHistory ] = useState([]);

    const [timer, setTimer] = useState(false);

    const [ socketID , setSocket ] = useState(false);
    
    const [displayname, setdisplayName] = useState();
     
    const [timerTime, setTimertime] = useState();

    const [biStatus,setBistatus] = useState();

    const [biamountLeft,setbidamountLeft] = useState();
   
      
      
      const Auctioncheck = () => {

        axios.post("http://localhost:3001/AuctionCheck",{
          mid: mid,
        }).then((res) => {
       if(res.data[0]){
        setBistatus(res.data[0][0].status);
          }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
      }

        
        const  mid = localStorage.getItem("mid");
        const teamid = localStorage.getItem("TeamID");
        const  fname = localStorage.getItem("fname");
        const lname = localStorage.getItem("lname");

        const BalanceBidAmount = () =>{
            axios.post("http://localhost:3001/getBalanceBidAmount",{
                mid: mid,
                tid:teamid,
              }).then((res) => {
             if(res.data[0]){
                console.log(res.data[0][0].amount);
                setbidamountLeft(res.data[0][0].amount);
                }
              }).catch((error) => {
                console.log(error);
                  console.log('No internet connection found. App is running in offline mode.');
                });
          }
        

        const timeCalculate = (times)=>{
            const cDate = new Date();
            const lDate = new Date(times);
            const fSec = cDate.getTime() - lDate.getTime();
            setTimertime(60-Math.floor(fSec/1000));
            console.log(60-Math.floor(fSec/1000));
        }
        const timerSetting = ()=>{
            axios.post("http://localhost:3001/getTime",{
              mid: mid,
              pid:props.data.player_id,
            }).then((res) => {
           if(res.data[0]){
            timeCalculate(res.data[0][0].last_time);
              }
            }).catch((error) => {
              console.log(error);
                console.log('No internet connection found. App is running in offline mode.');
              });
        }


        const AuctionHistory = () => {

            axios.post("http://localhost:3001/AuctionHistory",{
              mid: mid,
              pid:props.data.player_id,
            }).then((res) => {
           if(res.data[0]){
            console.log(res.data)
            setBidHistory(res.data[0]);
            setAlert(true);
              }
           else{
                setBidHistory([]);
                setAlert(false);
           }
            }).catch((error) => {
              console.log(error);
                console.log('No internet connection found. App is running in offline mode.');
              });
          }
    

        useEffect(() => {
            
            AuctionHistory()
            timerSetting()
            Auctioncheck()
            BalanceBidAmount()

      socket = io('http://localhost:3001') 
     
      
 
    
      
      socket.emit("setup",mid);
      
      socket.on("connection",()=> setSocket(true));

      socket.emit("join-auction",1);

       socket.on('receive-bid', (number,obj,name,playerid) => {
        console.log(number);
        console.log(obj);
        console.log(name);
        console.log(playerid);

    
        if(mid===number){
            lastAmt(obj);
            console.log(amt);
            setdisplayName(name);
        }
       })
        
      }, [])

      
      
     

      const validSchema = Yup.object().shape({
        bidamt: Yup.string('Bid Amount is Required!').required('Bid Amount is required'),
      });
    
      const formik = useFormik({
        initialValues: {
          bidamt:  '',
        },
        validationSchema: validSchema,
        onSubmit: (values, actions) => {
            placeBid()
        }
      });
      
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

      

      const bidamtCheck = () => {
        if( values.bidamt < props.data.baseamt || values.bidamt > biamountLeft){
            setMsg("Bid Amount should be Higher");
            setbidAmt(true);
        }else{
            setbidAmt(false);
        }
  }

                const placeBid = () => {
                    if(values.bidamt > amt){
                        socket.emit('new-bid',mid,values.bidamt,fname+" "+lname,props.data.player_id,teamid);
                    }else{
                        setMsg("Amount Must Be Greater than last Bid!");
                  }
                  
                }
                const timerCallback = () => {
                    
                    props.display();
                }

                console.log(timerTime)
    return (
        <div>
                        <Snackbar
                          open={bidamt}
                          autoHideDuration={6000}
                          onClose={()=>{}}
                          
                        >
                         <Alert severity="error">{msg}</Alert> 
                          </Snackbar>
                            
               <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Auction Details
                    </Typography>
                    <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
                    
                    <Paper sx={{
                        display:'flex',
                        float:'right',
                    }}
                    elevation={5}
                    >
                        <Typography
                        variant="h5"
                        >
                            Total Bid Amount: {biamountLeft}
                        </Typography>
                    
                    </Paper> 
                    
                    <Grid container spacing={2}>
                        <Grid item align="left" xs={12} sm={3} md={3}>
                        <Card
                                sx={{
                                    py: 2,
                                    boxShadow: 7,
                                    textAlign: 'center',
                                    bgcolor: '#fff',
                                    height: '228px',
                                    cursor: 'pointer'
                                }}
                            >
                                <img
                                    src={props.data.player_img}
                                    alt="playerimage"
                                    height="100%"
                                    width="100%"
                                    style={{ objectFit: 'contain' }}
                                />
                            </Card>
                        </Grid>

                        <Grid item align="left" xs={12} sm={9} md={9}>
                            <Card
                                sx={{
                                    py: 3,
                                    boxShadow: 7,
                                    textAlign: 'center',
                                    bgcolor: '#fff'
                                }}
                            >
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Player Name
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {/* {player.player_fname +" " +player.Player_lname} */}
                                    {props.data.player_fname + " " +props.data.Player_lname }
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Position
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {props.data.pos_name}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        email
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       {props.data.username}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Base Amount
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       {props.data.baseamt}
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid>
                                                
                    </Grid>
                    <Grid 
                        container
                    sx={{
                        marginTop:'2px',
                        justifyContent:'left'
                    }}>
                        <Grid item>

                        <TextField 
                        type="number"
                        label="Bid Amount"
                        sx={{
                            padding:'6px'
                        }}
                        {...getFieldProps('bidamt')}
                        error={Boolean(touched.bidamt && errors.bidamt)}
                        helperText={touched.bitamt && errors.bidamt}
                        onPointerMove={()=>{
                            bidamtCheck()
                        }}
                        />
                        { !bidamt && 
                            <Button variant="contained"
                            sx={{
                                marginTop:'18px'
                            }} 
                            onClick={handleSubmit}>Bid</Button>
                        }
                        </Grid>                       
                      </Grid>

                      {timerTime && <Timer  maxTime={timerTime} callback={timerCallback}/>}
                    
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                     spacing={2}
                     
                     >
                <Grid item xs="auto">
                <Card sx={{ minWidth: 275 , boxShadow: 20 }}>
                <CardContent>
                        <Item>   
                    
                    <Typography 
                    Typography variant="h5" component="div"
                    >
                    Team Name: {displayname}
                    </Typography>
                    
                    </Item>
                    <Item>
                       <Typography variant='h5'
                        sx={{
                        color: 'error.main'
                        }}
                        >
                        Bid Amount: {amt}
                        </Typography>
                        
                          </Item>
                          </CardContent>
                         </Card>
                         
                        </Grid>
                      </Grid>
                      <Chat mid={mid} fname={fname} lname={lname} teamid={teamid} />


                    <Card
                    sx={{
                        display:'flex',
                        justifyContent:'center',
                        marginTop:'30px',
                        width:"500px"
                    }}

                    >
                        <TableContainer>
            { !alertMsg &&   
                      <Table sx={{
                        widht:'100px'
                      }}>
                        <TableHead align="center">
                            <TableRow align="center">
                                <TableCell>Bid History</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableRow>
                            <TableCell colSpan={2} align="center">
                                TEAM NAME
                            </TableCell>
                            <TableCell colSpan={2} align='center'>
                                BID AMOUNT 
                            </TableCell>
                        </TableRow>
                        
                            {
                                BidHistory.map((data)=>{
                                    console.log(data)
                                    return(
                                    <TableRow>
                                        <TableCell colSpan={2} align="center">{data.name}</TableCell>
                                        <TableCell colSpan={2} align="center">{data.bidamt}</TableCell>
                                    </TableRow>
                                    
                                    )
                                })
                            }
                      </Table>
                    }
                      </TableContainer>
                    </Card>
                </Container>    
            </div>
  )
}