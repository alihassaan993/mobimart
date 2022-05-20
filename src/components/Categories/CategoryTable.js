import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import {useEffect,useState} from 'react';
import {Paper,Button} from '@material-ui/core';

import {CategoryForm} from './CategoryForm';
import {Popup} from '../Popup.js';
import {IMGURL,URL} from '../commons.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import LoadingOverlay from 'react-loading-overlay-ts';


//const URL="http://localhost:8080/MobiMart/";

export function CategoryTable(){

  
  const [loading,setLoading]=useState(false);
  const [rows,setRows] = useState([]);
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


  useEffect(() => {
    console.log(
      "FETCHING CATEGORIES"
    );
    fetchCategories();
  }, []);

  async function fetchCategories(){
    console.log("Fetching categories");
    try{
      setLoading(true);
      const res = await fetch(URL+'/categories/1');
      const responseData= await res.json();
      setLoading(false);
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
    <LoadingOverlay
      active={loading}
      spinner
      text='Loading Categories...'
    > 
     <div style={{ height: '100%', width: '100%' }}>
      <List>
          <ListItem onClick={handleOpen} >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add Category" />
          </ListItem>  
          {rows.map((item)=>(
            <Button variant="outlined" fullWidth style={{height:'80px', marginBottom:10}}>
            <ListItem>
              <ListItemAvatar>
                  <Avatar>
                    <img src={IMGURL+item.imageURL} style={{width:50,height:'80%'}}/>
                  </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.categoryName} />
            </ListItem>
            </Button>
          ))}    

  
      </List>
     </div>
     </LoadingOverlay>
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
