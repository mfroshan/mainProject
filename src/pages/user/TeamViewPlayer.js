import React,{ useState ,useEffect } from 'react'
import { Grid, Container, Stack, Typography, Card,TextField ,Button} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Item from '@mui/material/ListItem';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const TeamViewPlayer = (props) => {

   
   

    const [ USERLIST ,setUserList ] = useState([]);


   

    const navigate = useNavigate();


    const display = () => {
        const  mid = localStorage.getItem("mid");
        axios.post("http://localhost:3001/playerdisplay",{
          m_id: mid, 
        }).then((res) => {
       if(res.data[0]){
          setUserList(res.data[0]);
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

        display()
    
        },[])

        
    

  return (
         <Container maxWidth="xl">
            
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Player For Auction
                    </Typography>

                    <Grid 
                      container
                      display='flex'
                      spacing={2}
                    >
                    {
                        USERLIST.map((data)=>{
                                return(

                                    <Grid item align="left" xs={12} sm={3} md={3}>
                                    <Card>
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={data.player_img}
                                                alt="player Image"
                                            />
            
                                            <CardContent>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                {/* {player.player_fname +" " +player.Player_lname} */}
                                                Name: {data.player_fname +" " +data.Player_lname}
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                Position: {data.pos_name}
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                   Experience: 
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                   Previous Club:
                                                </Typography>
                                            </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                )
                        })
                    }
                       
                    </Grid>
                </Container>
  )
}

export default TeamViewPlayer;