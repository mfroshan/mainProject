import axios from 'axios';
import React from 'react';
import { Grid, Container, Stack, Typography, Card,TextField ,Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import Paper from '@mui/material/Paper';
import Item from '@mui/material/ListItem';
import {io} from 'socket.io-client';




export default function  TeamBidView () {
  
    const socket  = io.connect('http://localhost:3000')

    const navigate = useNavigate();

    const location = useLocation();


    
    const [alertMsg, setAlert] = useState();

    const [bidamt, setbidAmt] = useState(false);

    const [ auctionValue ,setAuction ] = useState([]);
   
    // localStorage.setItem("pos_id",location.state.pos_id);

    const [ player, setPlayer]  = useState([]);
    
    // let mid = localStorage.getItem("MatchID");


    const bidamtCheck = () => {
        if(values.bidamt < baseamt ) {
            alert("Price should be Higher");
            setbidAmt(true);
           
        }else{
            setbidAmt(false);
            if( bidamountleft > values.bidamt){
                
                // localStorage.setItem("bidAmt-left",bidamountleft-values.bidamt);
            }else{
                alert("Check Your Bid Amount Left");
                setbidAmt(true);
            }
        }
  }

    socket.emit('chat message',{ a : 'hi'});

    
    const display = () => {

        const username = localStorage.getItem("User_Name");
        const role = localStorage.getItem("Role");
        axios.post("http://localhost:3001/auctionDisplay",{
          username: username,
          role:role,
        }).then((res) => {
       if(res.data){
          console.log(res.data[0][0]);
          setPlayer(res.data[0][0]);
          localStorage.setItem("bidAmt-left",res.data[0][0].total_bid_amt);
          setAlert(false);
       }
       else{
        setPlayer([]);
        setAlert(true);
       }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
      }
      
      
      useEffect(() => {
        display()
        
      }, [])

      const { username,player_fname,Player_lname,Player_no,player_img,pos_name,total_bid_amt,baseamt,tbl_match_id,player_id} = player;
      
      var bidamountleft = localStorage.getItem("bidAmt-left");
      
      const auction = async () => {

            let mid = tbl_match_id;
            let pid = player_id;
            
            await Axios.post("http://localhost:3001/auciton",{
                matchdid: mid,
                pid: pid, 
          }).then((res) => {
                  console.log(res.data);
            if (res.data[1][0].status === 1) {
                setAuction(res.data[0]);
            }
          })
       
      };

    


      const validSchema = Yup.object().shape({
        bidamt: Yup.string('Bid Amount is Required!').required('Bid Amount is required'),
      });
    
      const formik = useFormik({
        initialValues: {
          bidamt:  '',
        },
        validationSchema: validSchema,
        onSubmit: (values, actions) => {
          
        }
      });
      
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

      
   
  
  
    
    return (
        <div>
               { 
                alertMsg===false  &&
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
                                    src={player.player_img}
                                    alt="player image"
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
                                    {player.player_fname + " " +player.Player_lname }
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Position
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {player.pos_name}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        email
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       {player.username}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Base Amount
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       {player.baseamt}
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
                            bidamtCheck();
                        }}
                        />
                        { bidamt===false && 
                            <Button variant="contained"
                            sx={{
                                marginTop:'18px'
                            }} 
                            onClick={handleSubmit}>Bid</Button>
                        }
                        </Grid>                       
                      </Grid>

                     
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                     spacing={2}
                     >
                {auctionValue.map((data)=>{

                        <Grid item xs="auto">
                        <Item><Typography variant='h5'
                        sx={{
                        color: 'success.main'
                        }}
                        >
                        {data.fname}:{data.bidamt}
                        </Typography>
                        </Item>
                        </Grid>
                })
                    
                }
                      
                      
                      

                      </Grid>


                </Container>
               }
     </div>
  )
}