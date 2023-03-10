import React,{ useState ,useEffect } from 'react'
import { Grid, Container, Stack, Typography, Card} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import BalanceBidAmount from '../BalanceBidAmount';



export const MyTeam = (props) => {
   

    const [ USERLIST ,setUserList ] = useState([]);   


    const display = () => {
        const  mid = localStorage.getItem("mid");
        const tid = localStorage.getItem("TeamID");

        axios.post("http://localhost:3001/myTeamDisplay",{
          mid: mid, 
          tid:tid,
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
                        My Team
                    </Typography>
                    <BalanceBidAmount />
                    <Grid 
                      container
                      display='flex'
                      spacing={2}
                    >
                    {
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
                       
                       {
                        USERLIST.length === 0 &&
                        <div> 
                                <Typography
                                variant='h4'
                                >
                                    You Have Not Auctioned Any Players!
                                </Typography>
                        </div>
                       }
                    </Grid>
                </Container>
  )
}

export default MyTeam;