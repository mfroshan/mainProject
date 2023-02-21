import React from 'react'
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';


const useStyles = makeStyles({
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


 const InputText = () => {
    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Message"
                className={classes.wrapText}
                //margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.button}>
                <SendIcon />
            </Button>
            </form>
        </>
    )
}
export default InputText;