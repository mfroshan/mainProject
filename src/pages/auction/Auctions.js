import React,{ useState ,useEffect } from 'react'
import { Grid, Container, Stack, Typography, Card,TextField ,Button} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Item from '@mui/material/ListItem';
import CardContent from '@mui/material/CardContent';
import Timer from './Timer';
import Axios from 'axios';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

var socket;

export const Auctions = (props) => {

    const [ amt , lastAmt] = useState('');

    const [displayname, setdisplayName] = useState();

    const [ socketID , setSocket ] = useState(false);

    const [ auctionValue ,setAuction ] = useState([]);

    const [timerTime, setTimertime] = useState();

    const  mid = localStorage.getItem("mid");

    const navigate = useNavigate();


    const timeCalculate = (times)=>{
        const cDate = new Date();
        const lDate = new Date(times);
        const fSec = cDate.getTime() - lDate.getTime();
        setTimertime(20-Math.floor(fSec/1000));
        console.log(20-Math.floor(fSec/1000));
    }
    const timerSetting = ()=>{
        Axios.post("http://localhost:3001/getTime",{
          mid: mid,
          pid:props.data.player_id,
        }).then((res) => {
       if(res.data[0]){
        // console.log(res.data)
        //setTimertime(res.data[0][0].last_time)
        timeCalculate(res.data[0][0].last_time)
       // console.log(res.data[0][0].last_time);
          }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
    }


    useEffect(() => {

        timerSetting()

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
    
    const timerCallback = () => {

        const mid = props.data.match_id;
        const pid = props.data.player_id;
        Axios.post("http://localhost:3001/pendingAuction",{
          mid:mid,
          pid:pid,
        }).then((res) => {
       if(res.data[0][0]){
          console.log(res.data[0][0]);
          
       }
       else{
        
        
       }
        }).catch((error) => {
          console.log(error);
            console.log('No internet connection found. App is running in offline mode.');
          });
          
          socket.emit("start-auction",mid,pid)

          navigate('/dashboard/bidsetup',{
            state:{
                mid:localStorage.getItem("mid")
            }
            
        });
       
      }

        
    

  return (
         <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Auction Details
                    </Typography>

                                        
                    {timerTime && <Timer  maxTime={timerTime} callback={timerCallback}/>}
                    
                    <Grid container
                     direction="column"
                     justifyContent="center"
                     alignItems="center"
                      spacing={2}
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
                                                                    
                    

                    
                    <Grid item xs="auto">
                <Card sx={{ minWidth: 275 }}>
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
                </Container>
  )
}

export default Auctions;