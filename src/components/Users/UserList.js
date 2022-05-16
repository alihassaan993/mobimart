import * as React from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect,useState} from 'react';
import {Button} from '@material-ui/core';

import {Notification} from '../Notification';

import {Popup} from '../Popup.js';
import {UserForm} from './UserForm';
import {URL} from '../commons.js';

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
      const res = await fetch(URL+'/allusers/'+ storeID, requestOptions);
      const responseData= await res.json();
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

  function editUser(params: GridCellParams){
    luser.userID = Number(params.row.userID);
    luser.userName = params.row.userName.toString();
    luser.fullName = params.row.fullName.toString();
    luser.userRole = params.row.userRole.toString();
    luser.status = params.row.status.toString();
    luser.password=params.row.password.toString();

    setUser(luser);
    setOpen(true);
  }

 return(
   <>
     <div style={{ height: 400, width: '100%'
       ,'& .super-app-theme--header': {
           backgroundColor: 'blue',
         }
       }}
       >
       <DataGrid
         autoHeight
         rows={rows}
         columns={columns}
         pageSize={5}
         rowsPerPageOptions={[5]}
         getRowId={(row) => row.userID}
         onCellClick={editUser}
         components={{
            Toolbar: addButton,
          }}
          columnVisibilityModel={{
          password: false,
        }}
       />
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
