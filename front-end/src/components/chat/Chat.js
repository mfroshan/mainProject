import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { Paper } from "@mui/material";
// import  InputText  from "./InputText.js";
import { MessageLeft, MessageRight } from "./Message.js";
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";


const useStyles = makeStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      boxShadow: "-1px 0px 7px #9E9E9E",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      boxShadow: "1px 3px 1px #9E9E9E",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      width: "40vw",
      height: "70vh",
      display: "flex",
      alignItems: "center",
      
      justifyContent: "center",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    },
    wrapForm : {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: "auto"
  },
  wrapText  : {
      width: "100%"
  },
  button: {
      margin: 1,
  },
  });
var socket;
export default function Chat(props) {
  
  console.log(props.data.mid);

  const classes = useStyles();


    
  const [Typing, setTyping] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const [msg,setmsg] = useState();

  const [ msgList, setMsgList] = useState([]);
      
  var current = new Date();

  const Chatdisplay = () => {

    axios.post("http://localhost:3001/chat",{
      mid:props.data.mid,
    }).then((res) => {
      
   if(res.data[0]){
    console.log(res.data);
    console.log(res.data[0]);
    setMsgList(res.data[0])
    console.log(msgList.teamId);
      }
   else{
    setMsgList([]);
   }
    }).catch((error) => {
      console.log(error);
        console.log('No internet connection found. App is running in offline mode.');
      });
  }
  
      
  // let matchid = localStorage.getItem("MacthID");

      useEffect(() => {
          
        Chatdisplay()

if(!socket){
    socket = io('http://localhost:3001')

   //  console.log(socket);   

    socket.on("connection",()=> {
    //  setSocket(true)
     console.log(socket);
   });
    
    socket.emit("join-chat",props.data.mid,props.data.teamid);
  
    socket.emit("join",1);

     socket.on("receive-msg",(msg,mid,fname,lname,teamid)=>{
      if(props.data.mid===mid){
        console.log(msg+mid);
        setMsgList(msgList =>[...msgList,
          {
        "name":fname+lname,
        "timeStamp": current.toLocaleTimeString(),
        "message":msg,
        "teamId":teamid
      }])
      }
    })

   }

    }, [])

   

    let sendOnChange = (e) => {
      setmsg(e.target.value);
      console.log(msg);
      socket.emit("chat-typing",props.data.mid);
    }

    let sendMsg = () =>{
      document.getElementById("standard-text").value = '';
      socket.emit("send-chat",msg,props.data.mid,props.data.fname,props.data.lname,props.data.teamid);
    }
  
    const TeamID = localStorage.getItem("TeamID");

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          {msgList && msgList.map((data)=>{
            console.log(parseInt(data.teamId));
            console.log(TeamID);
              if(parseInt(data.teamId) === parseInt(TeamID)){
                  return(
                    <MessageRight
                      message={data.message}
                      timestamp={data.timeStamp}
                    />
                  );
              }
              else{
                return(
                  <MessageLeft
                    message={data.message}
                    timestamp={data.timeStamp}
                    displayName={data.name}
                  />
                );
            }
          })

          }
        </Paper>
        <div className={classes.wrapForm}>
            <TextField
                onChange={sendOnChange}
                id="standard-text"
                label="Message"
                className={classes.wrapText}
                //margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.button}
            onClick={sendMsg}
            >
                <SendIcon />
                
            </Button>
            </div>
      </Paper>
    </div>
  );
}