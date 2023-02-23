import React from 'react'
import { Grid, Container, Stack, Typography, Card,TextField ,Button} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Item from '@mui/material/ListItem';
import CardContent from '@mui/material/CardContent';
import Timer from './Timer';
import EditIcon from '@mui/icons-material/Edit';
import { useState} from 'react';
import Axios from 'axios';

export const Auctions = (props) => {

        console.log(props);
    const [ auctionValue ,setAuction ] = useState([]);

    
    const auction = async () => {

        let mid = props.data.tbl_match_id;
        let pid = props.data.player_id;
    
        await Axios.post("http://localhost:3001/auciton",{
            matchdid: mid,
            pid: pid, 
      }).then((res) => {
            // console.log(res.data);
        if (res.data[1][0].status === 1) {
            setAuction(res.data[0]);
        }else{
    
            setAuction([]);
        }
      });
    }

    if(props.data)
    {
        setInterval(auction,1000);
    }

  return (
         <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Auction Details
                    </Typography>

                                        
                    <Timer />
                    
                    <Grid container  
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                    >
                        
                        <Grid item align="left" xs={12} sm={3} md={3}>
                        <Card
                                
                            >
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={props.data.player_img}
                                    alt="player Image"
                                />

                                <CardContent>
                                <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {/* {player.player_fname +" " +player.Player_lname} */}
                                    Name: {props.data.player_fname + " " +props.data.Player_lname }
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    Position: {props.data.pos_name}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       Email: {props.data.username}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       Base Amount: {props.data.baseamt}
                                    </Typography>
                                </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                                                                    
                    </Grid>

                     
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                     spacing={2}
                     >
                        
                { auctionValue && auctionValue.map((data)=>{
                    return(
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
                    )
                })
                    
                }
                      </Grid>
                </Container>
  )
}

export default Auctions;