import TextField from "@material-ui/core/TextField";
import React, { useState} from "react";
import { Button, Paper,Grid,makeStyles} from "@material-ui/core";
import {User} from '../Users/User.js';
import {FileUpload} from '../FileUpload';
import {URL,IMGURL} from '../commons.js';

const initialValues = {
  categoryName:"",
  imageURL:""
}

const useStyles = makeStyles(theme=>({
   root:{
     '&. MuiFormControl-root':{
       width:'80%',
       margin:theme.spacing(1)
     }
   }
}))

export function CategoryForm(){

  const [values,setValues] = useState(initialValues);
  const classes = useStyles();

  // useEffect (()=>{
  //
  //   alert("value changed");
  //
  // },[values.categoryName])

  const handleSubmit = async() => {
    let myFile="";
    let fileName="";
    try{
        if(document.querySelector("input[type=file]").files.lenght!=0){
          myFile=document.querySelector("input[type=file]").files[0];
        }
        if(myFile!=null){
          await FileUpload(myFile);
          fileName=myFile.name;  
        }
          
        let data=data = new FormData();
        data.append("categoryID",0);
        data.append("categoryName",values.categoryName);
        data.append("imageURL",fileName);
        data.append("storeID",User.getStoreID());
    
        const res = await fetch(URL+"/categories/save", {
          method: 'POST',
          headers:
          {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(Object.fromEntries(data.entries()))
    
      });
      const responseData= await res;
    }catch(error){
      alert(error);
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
      <Grid item xs={12} md={12}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="categoryName"
          value={values.categoryName}
          label={"Category Name"} //optional
          style={{width:'100%'}}
          required
        />
      </Grid>
      <Grid item xs={12} md={12}>
      <TextField
          type="file"
          variant="outlined"
          name="imageURL"
          label={"Category Image"} //optional
          style={{width:'100%'}}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <div align="center">
          <Button type="submit" color="primary" style={{margin:10}} variant="contained">Submit</Button>
          <Button onClick={handleReset} variant="contained">Reset</Button>
        </div>
      </Grid>
    </Grid>
    </form>
    </Paper>
  );


}
