import React,{ useState ,useEffect } from 'react'
import { Grid, Container, Stack, Typography, Card} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import BalanceBidAmount from '../BalanceBidAmount';
import jsPDF from 'jspdf';
import Iconify from '../../components/iconify';
import IconButton from '@mui/material/IconButton';



export const MyTeam = () => {
   

    const [ USERLIST ,setUserList ] = useState([]);   


    const display = () => {

        const mid = localStorage.getItem("mid");
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

        const genereatePdf = () => {

            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "portrait"; // portrait or landscape
            
            const marginLeft = 40;
            const doc = new jsPDF(orientation, unit, size);
            
            
            const title = `list of Player under ${localStorage.getItem("fname") +" " + localStorage.getItem("lname")} `;
            const headers = [[
              "Player FirstName", 
              "Player LastName",
              "Position",
              "Auctioned Price",
            ]];
            
            const data = USERLIST.map(data=> [
              data.player_fname, 
              data.Player_lname,
              data.pos_name,
              data.price
            
            ]);
        
            var today = new Date();
            var dd = today.getDate();
            
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 
            
            if(mm<10) 
            {
                mm='0'+mm;
            } 
            today = mm+'-'+dd+'-'+yyyy;
        
            var newdat = "Date of Report Generated  : "+ today;
        
            let content = {
              startY: 50,
              head: headers,
              body: data
            };
            
            doc.text(title, marginLeft, 20);
            doc.autoTable(content);
        
            doc.setFontSize(10);
            doc.text(40, 35, "Match Name:"+ USERLIST[0].mname)
        
            doc.setFontSize(10);
            doc.text(40, 45, newdat)

            doc.page=1;

            doc.text(500,200, 'Page No:' + doc.page);

                doc.save('MyTeam Details.pdf')
                
              }
          
    

  return (
         <Container maxWidth="xl">
            
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        My Team
                    </Typography>
                    <BalanceBidAmount />
                    <IconButton
                        sx={{
                            float:'left',
                            marginLeft:'30px'
                        }}
                        onClick = {genereatePdf}
                        >
            <Iconify icon="prime:file-pdf" width={30} height={30} /></IconButton>

                    <Grid 
                      container
                      display='flex'
                      spacing={2}
                    >
                        
                    
                    {
                        USERLIST.map((data)=>{
                            const {player_img,player_fname,Player_lname,pos_name,exp,previousClub,price} = data;
                            

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
                                                   Experience: {exp} 
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                   Previous Club: {previousClub}
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' sx={{ justifyContent: 'center'}}>
                                                <Typography variant="body2" style={{ color: '#555' }}>
                                                   Autioned Price: {price}
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