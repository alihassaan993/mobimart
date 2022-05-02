import React, { useState,useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl } from '@mui/material';

import {User} from './User.js';
import {Products} from '../Products/Products.js';
import {Header} from '../Header.js';
import {myStyle} from '../../styles.js';
import {Notification} from '../Notification';

import {URL,IMGURL} from '../commons.js';


const initialValues = {
  userName:"alihassaan",
  password:"alihassaan"
}

export function Login(){

  const [values,setValues] = useState(initialValues);
  const [loginFlag,setLoginFlag] = useState(false);
  const [notify,setNotify]=useState({isOpen:false,message:'',type:''});
  const classes=myStyle();
  const [menuItem,setMenuItem]=useState(<Products/>);

    const  login = async(event) => {
      event.preventDefault();
      console.log("Fetching Users");
      try{

        const res = await fetch(URL+"webapi/user/login/",{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            userName:values.userName,
            password:values.password,
            storeID:1
          })
        });

        const responseData= await res.json();

        if(responseData.status!="Fail"){
          let responseStr = JSON.parse(responseData.response)
          User.setName(responseStr.fullName);
          setLoginFlag(true);
        }else{
          setNotify({isOpen:true,message:responseData.message,type:'error'});
        }

      }catch(exception){
        console.log(exception);
        setNotify({isOpen:true,message:'Unable to communicate to server. Please check your internet connection!!!',type:'error'});
      }


  }

  const handleInputChange = e => {
    const {name,value} = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  return(
    <div>
    {!loginFlag&&(
        <Container component="main" maxWidth="xs">
        <form className={classes.root} onSubmit={login}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <TextField
              margin="normal"
              required
              onChange={handleInputChange}
              fullWidth
              value={values.userName}
              label="User Name"
              name="userName"
              error={values.userName === "It is a mandatory field"}
              helperText={values.userName === "" ? "This field is mandatory" : " "}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleInputChange}
              name="password"
              label="Password"
              value={values.password}
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </form>
          <Notification setNotify={setNotify} notify={notify}/>
          </Container>

    )}

      {loginFlag&&(
          <div className={classes.appMain}>
            <Header
              setMenuItem={setMenuItem}
              setLoginFlag={setLoginFlag}
            />
            {menuItem}
          </div>

      )}
    </div>
  );
}
