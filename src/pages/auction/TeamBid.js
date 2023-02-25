import axios from 'axios';
import React from 'react';
import { Grid, Container, Stack, Typography, Card,TextField ,Button, CardContent, TableRow, TableCell, Table} from '@mui/material';
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
import Chat from '../../components/chat/ChatComponents';



var socket;

export default function  TeamBid (props) {
  
    

    const navigate = useNavigate();
    
    const [alertMsg, setAlert] = useState();

    const [bidamt, setbidAmt] = useState(false);

    const [ amt , lastAmt] = useState('');

    const [timer,setTimer] = useState(false);

    const [ socketID , setSocket ] = useState(false);
    
    const [displayname, setdisplayName] = useState();
     
   
      var bidamountleft = localStorage.getItem("bidAmt-left");
      
      
        
        const  mid = localStorage.getItem("mid");
        const teamid = localStorage.getItem("TeamID");
        const  fname = localStorage.getItem("fname");
        const lname = localStorage.getItem("lname");


        const AuctionHistory = () => {

            axios.post("http://localhost:3001/AuctionHistory",{
              mid:props.data.mid,
            }).then((res) => {
           if(res.data[0]){
            
              }
           else{
            
           }
            }).catch((error) => {
              console.log(error);
                console.log('No internet connection found. App is running in offline mode.');
              });
          }
    

        useEffect(() => {
            

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
        if( values.bidamt < props.data.baseamt){
            alert("Price should be Higher");
            setbidAmt(true);
        }else{
            setbidAmt(false);
            // if( bidamountleft > values.bidamt){
                
            //     localStorage.setItem("bidAmt-left",bidamountleft-values.bidamt);
            // }else{
            //     alert("Check Your Bid Amount Left");
            //     setbidAmt(true);
            // }
        }
  }

                const placeBid = () => {
                    if(values.bidamt > amt){
                        socket.emit('new-bid',mid,values.bidamt,fname+" "+lname,props.data.player_id,teamid);
                    }else{
                        alert("Amount Must Be Greater than last!");
                    }
                }

    return (
        <div>
                
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
                            Total Bid Amount: {bidamountleft}
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
                        onBlur={()=>{
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

                      <Timer timercall = {timer} maxTime={60} />
                    
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
                        marginTop:'30px'
                    }}
                    >
                      <Table>

                        <TableRow>
                            <TableCell>
                                TEAM NAME
                            </TableCell>
                            <TableCell>
                                BID AMOUNT 
                            </TableCell>
                        </TableRow>

                      </Table>
                    </Card>
                </Container>
        
     </div>
  )
}