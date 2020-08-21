import React, {useState , useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [userObject, setuserObject] = useState()
  const classes = useStyles();
  const [hiddenFlag , sethiddenFlag] = useState(false)

  useEffect( () => {
    axios.get("/api/user/who")
        .then(res => {
            setuserObject(res.data[0])
            sethiddenFlag(true)
        })
  },[])
  const handdleTextChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setuserObject(userObject => ({
      ...userObject,
      [name]: value
  }));
  };
  const updateUser = async() => {
    await axios({
        method: 'put',
        url: '/api/user/update',
        data: {
            userObject
        }
      }).then(function (response) {
          window.location = "/App/HOME"
      });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modify User Info
        </Typography>
        

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange ={handdleTextChange}
                name="Name"
                variant="outlined"
                fullWidth
                value = {hiddenFlag ? userObject.Name : ""}
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange ={handdleTextChange}
                variant="outlined"
                fullWidth
                required
                value = {hiddenFlag ? userObject.HP : ""}
                label="HP"
                name="HP"
                autoComplete="lname"
              />
            </Grid>

            
             <Grid item xs={12} sm={6}>
              <TextField
                onChange ={handdleTextChange}
                value = {hiddenFlag ? userObject.address : ""}
                name="address"
                variant="outlined"
                fullWidth
                label="address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange ={handdleTextChange}
                variant="outlined"
                fullWidth
                value = {hiddenFlag ? userObject.site : ""}
                label="site"
                name="site"
              />
            </Grid> 
            

            <Grid item xs={12}>
                <TextField 
                    onChange ={handdleTextChange}
                    value = {hiddenFlag ? userObject.id : ""} 
                    fullWidth 
                    name = "id"  
                    label="Email Address" 
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange ={handdleTextChange}
                variant="outlined"
                value = {hiddenFlag ? userObject.password : ""} 
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
           
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick ={updateUser}
          >
            수정
          </Button>
          
        
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}