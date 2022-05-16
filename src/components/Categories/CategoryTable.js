import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useEffect,useState} from 'react';
import {Paper,Button} from '@material-ui/core';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {CategoryForm} from './CategoryForm';
import {Popup} from '../Popup.js';
import {IMGURL,URL} from '../commons.js';

const columns:GridColDef[]=[
  {field:'categoryID',headerName:'ID',width:70,flex:1},
  {field:'categoryName',headerName:'Category Name',width:150,flex:1},
  {field:'imageURL',headerName:'Category Image', width:180,flex:1,
  renderCell:(params)=><img src={IMGURL+ params.value} alt='' width="50%" height="50%"/>
}
];


//const URL="http://localhost:8080/MobiMart/";

export function CategoryTable(){

  const [rows,setRows] = useState();
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

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
      const res = await fetch(URL+'/categories/1', requestOptions);
      const responseData= await res.json();
      console.log(responseData);
      setRows(JSON.parse(responseData.response));
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
         getRowId={(row) => row.categoryID}
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
