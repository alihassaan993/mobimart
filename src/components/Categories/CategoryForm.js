import TextField from "@material-ui/core/TextField";
import React, { useState} from "react";
import { Button, Paper,Grid,makeStyles} from "@material-ui/core";

const initialValues = {
  storeID:"1",
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

  const handleSubmit = () => alert(values);
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
    <form className={classes.root}>
    <Grid container spacing={2} >
      <Grid item xs={12} md={12}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="categoryName"
          value={values.categoryName}
          label={"Category Name"} //optional
          style={{width:'100%'}}
        />
      </Grid>
      <Grid item xs={12} md={12}>
      <TextField
          type="file"
          variant="outlined"
          name="imageURL"
          label={"Category Image"} //optional
          style={{width:'100%'}}
        />
      </Grid>
      <Grid item xs={12}>
        <div align="center">
          <Button color="primary" style={{margin:10}} onClick={handleSubmit} variant="contained">Submit</Button>
          <Button onClick={handleReset} variant="contained">Reset</Button>
        </div>
      </Grid>
    </Grid>
    </form>
    </Paper>
  );


}
