import React,{ useState ,useEffect } from 'react'
import { Grid, Container, Stack, Typography, Card,TextField ,Button} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Item from '@mui/material/ListItem';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Label from '../../components/label';
import BalanceBidAmount from '../BalanceBidAmount';
import ViewCert from './VierwCert';

export const TeamViewPlayer = (props) => {
   

    const navigate = useNavigate();

    const [ USERLIST ,setUserList ] = useState([]); 

    const [open, setOpen] = useState(true);

    const [addDialog, setDialog] = useState();

    const [certificate, setcertificate] = useState(false);

    const handleClose = () => {
        setDialog();
      };

      const handleClickOpen = (cert,name) => {
        setDialog(
            <ViewCert 
              onClose={handleClose}
              open={open}
              cert={cert}
              name={name}
            />      
        );
        setcertificate(true);
      }

      
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
            {addDialog}
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Player Registered For Auction
                    </Typography>
                    <BalanceBidAmount />
                    <Grid 
                      container
                      display='flex'
                      spacing={2}
                    >
                    {
                        USERLIST.map((data)=>{
                            const {player_img,player_fname,Player_lname,pos_name,bidstatus,previousClub,exp,aboutme} = data;
                            let stst = 'Available'
                  
                                if(bidstatus === 1){
                                    stst = 'Not Available'
                                }

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
                                                Name: {player_fname +" "+Player_lname}
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                Position: {pos_name}
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                   Experience: {exp}
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                   Previous Club: {previousClub}
                                                </Typography>
                                            </Stack>
                                            
                                            <Label 
                                             sx={{
                                                float:'right',
                                                marginTop:'10px',
                                                marginBottom:'10px'
                                             }}
                                             color={bidstatus ? 'error' : 'success'}>
                                                            {stst}
                                                        </Label>
                                            <Button
                                            sx={{
                                            marginBottom:'10px'
                                             }}
                                             onClick={()=>{
                                                handleClickOpen(aboutme,player_fname +" "+Player_lname);
                                                
                                             }}
                                            >
                                                View Certificate
                                            </Button>

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