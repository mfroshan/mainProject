import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

  const profile = {
    "email":"roshan@gmail.com",
    "dob":"13-10-2001"
  }
  
  const ProfileUI = () => {
    const classes = useStyles();
    const { name, avatarUrl } = profile;
  
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar src={avatarUrl} className={classes.avatar} />
          }
          title={name}
        />
        <CardContent>
          {/* display the user's profile information */}
          <Typography variant="body2" color="textSecondary" component="p">
            Email: {profile.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Date of birth: {profile.dob}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default ProfileUI;