
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Button, Grid, Container, Stack, Typography, Avatar, Card, DialogTitle, DialogContent,TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Close from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

// components
import Page from '../../components/Page';
import { id } from 'date-fns/locale';
import { UpdateDetails } from './UpdateDetails';
import BalanceBidAmount from '../BalanceBidAmount';

// ----------------------------------------------------------------------
const ImageStyle = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    justifyContent: 'center'
}));

export default function Profile(props) {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);
    const [edit1, setEdit1] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [edit3, setEdit3] = useState(false);
    const [datas, setdatas] = useState({});
    const [proImg, setImg] = useState();
    const [mid,setmid] = useState();
    const [tid,settid] = useState();

    const profileClick = () => {
        setOpen(true);
    };

    const [bidamontLeft,setbidamountLeft] = useState();

    

    const BalanceBidAmount = () =>{

        const mid = localStorage.getItem("mid");
        const teamid = localStorage.getItem("TeamID");
        

        axios.post("http://localhost:3001/getBalanceBidAmount",{
            mid: props.mid,
            tid:teamid,
          }).then((res) => {
         if(res.data[0]){
            
            setbidamountLeft(res.data[0][0].amount);
            }else{
                setbidamountLeft(0);
            }
          }).catch((error) => {
            console.log(error);
              console.log('No internet connection found. App is running in offline mode.');
            });
      }
    

    
      const request = ()=>{
        const role = localStorage.getItem("Role");
        const username = localStorage.getItem("User_Name");
          axios.post("http://localhost:3001/getProflileDetails",{
                role: role,
                username: username, 
          }).then((res) => {
            console.log(res.data)
            if (res.data[1][0].status === 0) {
              
              setmid(res.data[0][0].mid);
              localStorage.setItem("mid",res.data[0][0].mid);
              localStorage.setItem("fname",res.data[0][0].fname);
              localStorage.setItem("lname",res.data[0][0].lname);
              setdatas(res.data[0][0]);
              if(res.data[0][0].img !== null){
                setImg(res.data[0][0].img);
              }
              
            }
          })
      }

      const [Team,setTeam]= useState();

      const TeamCheck = () => {
        const playerid = localStorage.getItem("PlayerID");
        axios.post("http://localhost:3001/teamCheck",{
        pid: playerid,
      }).then((res) => {
        if (res.data[0]) {
          console.log(res.data[0][0]===0)
          setTeam(res.data[0][0].teamname);
        }
        console.log(Team);
      });
      }

      useEffect(() => {
        request();
        TeamCheck();
      }, [])


    const handleClose = () => {
        setOpen(false);
        setEdit1(false);
        setEdit2(false);
        setEdit3(false);
        request();
    };

    const handleListItemClick = (tag) => {
        if (tag) {
            setOpen(false);
            setView(true);
        } else {
            document.getElementById('imageselect').click();
        }
    };

    const viewHandleClose = () => {
        setView(false);
    };

    const fileCompress = async (file) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1500,
            useWebWorker: true
        };
        try {
            const compressedFile = await imageCompression(file, options);
            await uploadToServer(compressedFile); // write your own logic
        } catch (error) {
            console.log(error);
        }
    };
    const uploadToServer =  (file) => {
        const role = localStorage.getItem("Role");
        const username = localStorage.getItem("User_Name");
        const reader = new FileReader();
       reader.onloadend = function() {
        console.log(reader.result);
          axios.post("http://localhost:3001/UpdateImage",{
            role: role,
            username: username, 
            imageValue: reader.result,
        }).then((res) => {
            if (res.data[0][0].status === 0) {
            //   setdatas(res.data[0][0]);
              request();
              setOpen(false);
            }
          })

         

         }
         reader.readAsDataURL(file);
    };
    const handleChange = (e) => {
        fileCompress(e.target.files[0]);
    };
    const callback1 = () => {
        setEdit1(false);
        request();
    };
    const callback2 = () => {
        setEdit2(false);
        request();
    };
    return (
        <div>
            <Page title="Profile">
                <Dialog open={edit1} fullWidth>
                    <Close
                        style={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            cursor: 'pointer',
                            backgroundColor: '#333',
                            color: '#fff',
                            borderRadius: '100%'
                        }}
                        onClick={handleClose}
                    />
                    <DialogTitle>Change Details</DialogTitle>
                    <DialogContent>
                    <UpdateDetails data={datas} close={callback1}/>
                    </DialogContent>
                </Dialog>

                <Dialog open={edit2} fullWidth>
                    <Close
                        style={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            cursor: 'pointer',
                            backgroundColor: '#333',
                            color: '#fff',
                            borderRadius: '100%'
                        }}
                        onClick={handleClose}
                    />
                    <DialogTitle>Change Address</DialogTitle>
                    <DialogContent>
                        {/* <AddressChange callback={callback2} data={datas} /> */}
                    </DialogContent>
                </Dialog>

                <Dialog open={edit3} fullWidth>
                    <Close
                        style={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            cursor: 'pointer',
                            backgroundColor: '#333',
                            color: '#fff',
                            borderRadius: '100%'
                        }}
                        onClick={handleClose}
                    />
                    <DialogTitle>Change Details</DialogTitle>
                    <DialogContent>
                        {/* <BankChange callback={callback1} data={datas} /> */}
                    </DialogContent>
                </Dialog>
                <Dialog open={view}>
                    <ImageStyle src={proImg} alt='' />
                    <Close
                        style={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            cursor: 'pointer',
                            backgroundColor: '#333',
                            color: '#fff',
                            borderRadius: '100%'
                        }}
                        onClick={viewHandleClose}
                    />
                </Dialog>
                <Dialog onClose={handleClose} open={open}>
                    <List sx={{ pt: 0 }}>
                        <ListItem button onClick={() => handleListItemClick(1)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#112833', color: '#fff' }}>
                                    <AccountBoxIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="View Logo" />
                        </ListItem>
                    </List>
                    <List sx={{ pt: 0 }}>
                        <ListItem button onClick={() => handleListItemClick(0)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#112833', color: '#fff' }}>
                                    <EditIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Change Logo" />
                            <input
                                id="imageselect"
                                type="file"
                                accept="image/*"
                                multiple={false}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                        </ListItem>
                    </List>
                </Dialog>
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Profile
                    </Typography>
                    
                    <BalanceBidAmount mid={mid}/>

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
                                onClick={() => { setOpen(true) }}
                            >
                                <img
                                    src={proImg}
                                    alt=""
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
                                <EditIcon sx={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }} onClick={() => { setEdit1(true) }} />
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        First Name
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.fname}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Last Name
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.lname}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Phone Number
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                    {datas && datas.number}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        Email
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       {datas && datas.email}
                                    </Typography>
                                </Stack>
                               
                               { localStorage.getItem("Role") === "Player" &&
                               
                          
                                <Stack direction='row' sx={{ justifyContent: 'space-between', padding: 2 }}>
                                    <Typography variant="h6" style={{ color: '#555' }}>
                                        You are Auctioned By Team
                                    </Typography>
                                    <Typography variant="body2" style={{ color: '#555' }}>
                                       {Team && Team}
                                    </Typography>
                                </Stack>
                                }

                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        </div>
    );
}
