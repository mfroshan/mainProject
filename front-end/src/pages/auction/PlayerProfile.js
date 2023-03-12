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
import io from 'socket.io-client';

var socket;

export default function  PlayerProfile () {
  
    const navigate = useNavigate();

    const location = useLocation();

    console.log(location);
    
    localStorage.setItem("pos_id",location.state.pos_id);

    const [ player, setPlayer]  = useState([]);
    
    let mid = localStorage.getItem("MatchID");



    
    const display = () => {
        const pos_id = localStorage.getItem("pos_id");
        axios.post("http://localhost:3001/playerp",{
          mid:mid,
          pos_id:pos_id,
        }).then((res) => {
       if(res.data){
          console.log(res.data[0][0]);
          setPlayer(res.data[0][0]);
          
       }
       else{
        setPlayer([]);
       }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
      }

      useEffect(() => {
        display()

        socket = io('http://localhost:3001')      
      
    
      

      }, [])


      const validSchema = Yup.object().shape({
        bidamt: Yup.string().required('First Name is required'),
      });
    
    

      
    
      
      const [alertMsg, setAlert] = useState();
    
      const formik = useFormik({
        initialValues: {
          bidamt:  '',
        },
        validationSchema: validSchema,
        onSubmit: (values, actions) => {
            addAuction();
        }
      });
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

      const { player_id ,username,player_fname,Player_lname,Player_no,player_img,pos_name} = player;

      const addAuction = () => {

            
            let matchid = localStorage.getItem('MatchID');
            let posid = localStorage.getItem('pos_id');

            Axios.post("http://localhost:3001/addPlayerToAuction",{
                matchid: matchid,
                posid: posid,
                baseamt: values.bidamt, 
                playerid: player_id,
          }).then((res) => {
            console.log(res.data[0][0])
            if (res.data[0][0].status === 1) {

            socket.emit("start-auction",matchid,player_id);
            
                navigate('/dashboard/auctiondisplay',{state:
                {
                    mid:matchid
                }

            });
                
            }
          })
       
      }


    return (
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Auction Details
                    </Typography>
                    <KeyboardBackspaceIcon sx={{cursor: "pointer"}} onClick={()=>{navigate(-1)}} />
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
                            </Card>
                        </Grid>
                        
                        <Grid item align="left" xs={12} sm={2} md={2}>
                            <Typography variant="h6" >
                                Base Amount
                            </Typography>
                            <Card
                                sx={{
                                    py: 3,
                                    boxShadow: 7,
                                    textAlign: 'center',
                                    bgcolor: '#fff'
                                }}
                            >
                                
                                <TextField 
                                type="number "
                                id="standard-basic" 
                                label="Base Amount" 
                                variant="standard" 
                                {...getFieldProps('bidamt')}
                                error={Boolean(touched.bidamt && errors.bidamt)}
                                helperText={touched.bitamt && errors.bidamt}
                                />
                            </Card>
                        </Grid>
                        
                    </Grid>
                    <Grid sx={{
                        display:'flex',
                        justifyContent:'center'
                    }}>
                    <Button variant="contained" onClick={handleSubmit}>Start Auction</Button>
                      </Grid>
                </Container>
  )
}