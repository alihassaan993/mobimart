import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams,GridToolbar } from '@mui/x-data-grid';
import {useEffect,useState} from 'react';
import {Paper,Button,Modal,Box,Typography} from '@material-ui/core';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {CategoryForm} from './CategoryForm';
import {Popup} from '../Popup.js';

const columns:GridColDef[]=[
  {field:'categoryid',headerName:'ID',width:70},
  {field:'categoryname',headerName:'Category Name',width:150},
  {field:'imageurl',headerName:'Category Image', width:180,
  renderCell:(params)=><img src={URL+"/images/" + params.value} width="50%" height="50%"/>
},{
  field:'',headerName:'',width:130,
  renderCell:(params)=><div><ModeEditIcon/><DeleteForeverIcon/></div>
}
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const URL="http://localhost:8080/MobiMart/";

export function CategoryTable(){

  const [rows,setRows] = useState();
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function addButton ()
  {
    return(
    <div align="right">
    <Button style={{padding:10,margin:10,justifyContent:"right"}}
    variant="contained" color="primary" onClick={handleOpen}>+ Add Category</Button>
    </div>
  )
  }

  const requestOptions = {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' }
    };

  useEffect(() => {
    console.log(
      "FETCHING CATEGORIES"
    );
    fetchCategories();
  }, []);

  async function fetchCategories(){
    console.log("Fetching categories");
    try{
      const res = await fetch(URL+'webapi/category/1', requestOptions);
      const responseData= await res.json();
      console.log(responseData);
      setRows(responseData);
      //this.arrayholder = responseData;
    }catch(exception){
      console.log(exception);
      alert("Unable to communicate to server. Please check your internet connection!!!");
    }

  }

 return(
   <Paper style={{padding:20}}>
     <div style={{ height: 300, width: '100%' }}>
       <DataGrid
         rows={rows}
         columns={columns}
         pageSize={5}
         rowsPerPageOptions={[5]}
         getRowId={(row) => row.categoryid}
         checkboxSelection
         components={{
            Toolbar: addButton,
          }}
       />
     </div>
     <Popup
      openPopup={open}
      setOpenPopup={setOpen}
      title="Category Form"
     >
      <CategoryForm/>
     </Popup>
   </Paper>
  );

}
