import React from "react";
import { makeStyles } from '@mui/styles';
import { Paper } from "@mui/material";
import  InputText  from "./InputText.js";
import { MessageLeft, MessageRight } from "./Message.js";

const useStyles = makeStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  });

export default function Chat() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          <MessageLeft
            message="HELLO"
            timestamp="00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Riyas"
            avatarDisp={true}
          />
          <MessageLeft
            message="HOW ARE YOU"
            timestamp="00:00"
            photoURL=""
            displayName="Riyas"
            avatarDisp={false}
          />
          <MessageRight
            message="FINE"
            timestamp="00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Me"
            avatarDisp={true}
          />
          <MessageRight
            message="WHAT YOU WANT"
            timestamp="00:00"
            photoURL=""
            displayName="Me"
            avatarDisp={false}
          />
          <MessageLeft
            message="FUCK"
            timestamp="00:00"
            photoURL="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            displayName="Riyas"
            avatarDisp={true}
          />
          <MessageLeft
            message="HELLO"
            timestamp="00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Riyas"
            avatarDisp={true}
          />
          <MessageLeft
            message="HOW ARE YOU"
            timestamp="00:00"
            photoURL=""
            displayName="Riyas"
            avatarDisp={false}
          />
          <MessageRight
            message="FINE"
            timestamp="00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Me"
            avatarDisp={true}
          />
          <MessageRight
            message="WHAT YOU WANT"
            timestamp="00:00"
            photoURL=""
            displayName="Me"
            avatarDisp={false}
          />
          <MessageLeft
            message="FUCK"
            timestamp="00:00"
            photoURL="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            displayName="Riyas"
            avatarDisp={true}
          />
        </Paper>
        <InputText />
      </Paper>
    </div>
  );
}