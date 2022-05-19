import * as React from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect,useState} from 'react';
import {Button} from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';

import {Notification} from '../Notification';

import {Popup} from '../Popup.js';
import {UserForm} from './UserForm';
import {URL} from '../commons.js';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LoadingOverlay from 'react-loading-overlay-ts';


const columns:GridColDef[]=[
  {field:'userID',headerName:'ID',flex:1},
  {field:'fullName',headerName:'Full Name',flex:1},
  {field:'userName',headerName:'User Name',flex:1},
  {field:'userRole',headerName:'Role',flex:1},
  {field:'status',headerName:'Status',flex:1},
  {field:'password',headerName:'password',flex:1}
];



export function UserList(){

  let luser={
    userID:0,
    userName:"",
    fullName:"",
    userRole:"",
    status:""
  }

  const [loading,setLoading]=useState(false);
  const [rows,setRows] = useState([]);
  const [open,setOpen] = useState(false);
  const handleOpen = () => {setUser("");setOpen(true);}
  const [user,setUser]=useState();
  const [notify,setNotify]=useState({isOpen:false,message:'',type:''});


  function addButton ()
  {
    return(
    <div align="right">
    <Button style={{padding:10,margin:10,justifyContent:"right"}}
    variant="contained" color="primary" onClick={handleOpen}>+ Add User</Button>
    </div>
  )
  }

  const requestOptions = {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' }
    };

  useEffect(() => {
    console.log(
      "FETCHING USERS"
    );
    fetchUsers(1);
  }, []);

  async function fetchUsers(storeID){
    console.log("Fetching Users");
    try{
      setLoading(true);
      const res = await fetch(URL+'/allusers/'+ storeID, requestOptions);
      const responseData= await res.json();
      setLoading(false);
      //console.log(responseData);
      if(responseData.status!=="Fail"){
        let responseStr=JSON.parse(responseData.response);
        setRows(responseStr);
      }else{
        setNotify({isOpen:true,message:responseData.message,type:'error'});
      }

      //this.arrayholder = responseData;
    }catch(exception){
      console.log(exception);
      alert("Unable to communicate to server. Please check your internet connection!!!");
    }

  }

 return(
   <>
     <div style={{ height: 400, width: '100%'
       ,'& .super-app-theme--header': {
           backgroundColor: 'blue',
         }
       }}
       >
      <LoadingOverlay
        active={loading}
        spinner
        text='Loading Users...'
      >  
      <ListItem onClick={handleOpen} >
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Add User" />
      </ListItem> 
      {rows.map((user)=>(
        <Button variant="outlined" 
          fullWidth style={{height:'80px', marginBottom:10}}
          onClick={()=>{setUser(user);setOpen(true);}}
          >
        <ListItem key={user.userID}>
          <ListItemAvatar>
              <Avatar sx={{bgcolor:user.status==='inactive'?'red':'green'}}>
                    {user.userName.substring(0,1)}
              </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.fullName} secondary={user.userRole}/>
        </ListItem>
        </Button>
      ))} 
    </LoadingOverlay>
     <Popup
      openPopup={open}
      setOpenPopup={setOpen}
      title="User Form"
     >
      <UserForm user={user} fetchUsers={fetchUsers} setOpen={setOpen} setNotify={setNotify}/>
     </Popup>

     <Notification setNotify={setNotify} notify={notify}/>
     </div>
   </>
  );

}
