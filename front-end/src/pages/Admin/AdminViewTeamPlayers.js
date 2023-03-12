import React,{ useState ,useEffect } from 'react'
import { Grid, Container, Stack, Typography, Card,TextField ,Button} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Item from '@mui/material/ListItem';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Label from '../../components/label';


export const AdminViewTeamPlayers = () => {
   

    const location = useLocation();

    const [ USERLIST ,setUserList ] = useState([]);   


    const display = () => {
        

        axios.post("http://localhost:3001/myTeamDisplay",{
          mid: location.state.mid, 
          tid:location.state.tid,
        }).then((res) => {
       if(res.data[0]){
          setUserList(res.data[0]);
          console.log(USERLIST.length)
       }
       else{
        setUserList([]);
        console.log(USERLIST.length)
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
                        Player Under Team
                    </Typography>

                    <Grid 
                      container
                      display='flex'
                      spacing={2}
                    >
                    {
                    USERLIST &&   
                       USERLIST.map((data)=>{
                            const {player_img,player_fname,Player_lname,pos_name,bidstatus} = data;
                            

                                return(

                                    <Grid item align="left" xs={12} sm={3} md={3}>
                                    <Card>
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={player_img}
                                                alt="player Image"
                                            />
            
                                            <CardContent>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                {/* {player.player_fname +" " +player.Player_lname} */}
                                                Name: {player_fname +" " +Player_lname}
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                Position: {pos_name}
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

                    {USERLIST.length === 0 && 

                        <div>
                            <Typography
                            variant="h4" 
                            sx={{
                                display:'flex',
                                justifyContent:'center',
                                marginTop:'200px',
                                marginLeft:'400px'
                            }}
                            >
                                No Players Yet!
                            </Typography>
                            </div>

                    }
                       
                    </Grid>
                </Container>
  )
}

export default AdminViewTeamPlayers;