import TextField from "@material-ui/core/TextField";
import React, { useState,useEffect} from "react";
import { FormControlLabel,Radio,RadioGroup,MenuItem,Button, Paper,Grid,makeStyles} from "@material-ui/core";
import {URL} from '../commons.js';
import {ConfirmDialog} from '../ConfirmDialog';

const initialValues = {
  username:"",
  password:"",
  fullname:"",
  userrole:"",
  status:""
}

const userRoles=[
  {value:'storeAdmin',label:'Store Admin'},
  {value:'storeUser',label:'Store User'}
]

const useStyles = makeStyles(theme=>({
   root:{
     '&. MuiFormControl-root':{
       width:'80%',
       margin:theme.spacing(1)
     }
   }
}))

export function UserForm(props){

  const [values,setValues] = useState();
  const [editPassword] = useState(false);
  const classes = useStyles();
  let {setOpen,fetchUsers,user,setNotify}=props;
  const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''});


    useEffect(() => {
      console.log(user.userid);
      if(user==="0"){
        user=initialValues;
      }
      setValues(user);
    }, []);



  const  handleSubmit = async(event) => {
    event.preventDefault();
    try{

      setConfirmDialog({...confirmDialog,isOpen:false});

      let targetURL=URL+"webapi/user/";

      const res = await fetch(targetURL,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                    "userID":user.userid,
                    "userName":values.username,
                    "password":values.password,
                    "fullName":values.fullname,
                    "userRole":values.userrole,
                    "storeID":1,
                    "status":values.status
                  })

      });
      const responseData= await res.json();
      if(responseData.status!=="Fail"){
        setNotify({isOpen:true,message:responseData.message,type:'success'})
        fetchUsers(1);
        setOpen(false);
      }else{
        setNotify({isOpen:true,message:responseData.message,type:'error'})
      }

    }catch(exception){
      alert("Unable to save product at this time. Please try again later");
    }
  }

  const handleReset = () => setValues(initialValues);

  const handleInputChange = e => {
    const {name,value} = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  return(
    <Paper style={{paddingLeft:10,paddingRight:10}}>
    <form className={classes.root}  onSubmit={handleSubmit}>
    <Grid container spacing={2} >
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          required
          onChange={handleInputChange}
          name="fullname"
          defaultValue={user.fullname}
          label={"Full Name"} //optional
          style={{width:'100%'}}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          required
          onChange={handleInputChange}
          name="username"
          defaultValue={user.username}
          label={"User Name"} //optional
          style={{width:'100%'}}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
         disabled={editPassword}
          variant="outlined"
          required
          onChange={handleInputChange}
          name="password"
          type="password"
          defaultValue={user.password}
          label={"Password"} //optional
          style={{width:'100%'}}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          required
          onChange={handleInputChange}
          name="userrole"
          defaultValue={user.userrole}
          label={"User Role"} //optional
          style={{width:'100%'}}
          select
        >
        {userRoles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <RadioGroup
        aria-labelledby="user-status"
        name="status"
        defaultValue={user.status}
        onChange={handleInputChange}
        required
        >
        <FormControlLabel value="active" control={<Radio />} label="Active" control={<Radio required={true} />}/>
        <FormControlLabel value="inactive" control={<Radio />} label="InActive" control={<Radio required={true} />}/>
        </RadioGroup>
      </Grid>

      <Grid item xs={12}>
        <div align="center">
          <Button color="primary" style={{margin:10}}
          type="submit"
          variant="contained">Submit</Button>
          <Button onClick={handleReset} variant="contained">Reset</Button>
        </div>
      </Grid>
    </Grid>
    </form>
    <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
    </Paper>
  );


}
