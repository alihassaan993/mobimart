import TextField from "@material-ui/core/TextField";
import React, { useState,useEffect} from "react";
import { InputAdornment,Button, Paper,Grid,makeStyles,Box ,DataGrid} from "@material-ui/core";
import DnsIcon from '@mui/icons-material/Dns';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DiscountIcon from '@mui/icons-material/Discount';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MenuItem from '@mui/material/MenuItem';

import {URL,IMGURL} from '../commons.js';

const initialValues = {
  productname:'',
  productdesc:'',
  productunit:'',
  productcode:'',
  imageURL:'',
  unitprice:'',
  discount:''
}

const productUnits=[
  {value:'item',label:'item'},
  {value:'kg',label:'kg'},
  {value:'litre',label:'litre'},
  {value:'packet',label:'packet'}
]

const useStyles = makeStyles(theme=>({
   root:{
     '&. MuiFormControl-root':{
       width:'80%',
       margin:theme.spacing(1)
     }
   }
}))

export function ProductForm(props){

  let {product,categoryID,refresh,setOpen}=props;
  const [values,setValues] = useState();
  const classes = useStyles();
  let imageChangeFlag=false;

  const  handleSubmit = async() =>
    {
      try{
        const requestOptions = {
              method: 'POST',
              headers: { 'Access-Control-Allow-Origin': '*' }
          };

        let targetURL=URL+'webapi/product/';
        const myFile = document.querySelector("input[type=file]").files[0];
        const data = new FormData();
        data.append("productImage", myFile);
        if(product!=""){
          data.append("productID",product.productid);
        }else{
          data.append("productID",0);
        }



        data.append("productName", values.productname);data.append("categoryID", categoryID);
        data.append("productCode", values.productcode);

        data.append("imageURL", values.imageurl);
        data.append("productUnit", values.productunit);data.append("discount", values.discount);
        data.append("unitPrice", values.unitprice);data.append("productDesc", values.productdesc);
        data.append("storeID",1);

        const res = await fetch(targetURL, {
            method: 'POST',
            body: data
        });
        const responseData= await res;

        refresh(categoryID);
        setOpen(false);


      }catch(exception){
        alert("Unable to save product at this time. Please try again later");
      }

    };

  const handleReset = () => {
    document.getElementById("productForm").reset();
  }

  const handleInputChange = e => {
    const {name,value} = e.target
    //alert(values.productdesc);
    setValues({
      ...values,
      [name]:value
    })
  }

  const handleImageChange = e => {
    const {name,value} = e.target
    imageChangeFlag=true;
    setValues({
      ...values,
      [name]:value
    })
  }


  useEffect(() => {
    if(product===""){
      product=initialValues;
    }
    setValues(product);
  }, []);

  return(
    <Paper style={{paddingLeft:10,paddingRight:10}}>
    <form id="productForm" className={classes.root}>
    <Grid container spacing={2} >
      <Grid item xs={6}>
        <TextField
          required
          variant="outlined"
          onChange={handleInputChange}
          name="productname"
          defaultValue={product.productname}
          label={"Product Name"} //optional
          style={{width:'100%'}}
          inputProps={{
            maxLength: 60,
          }}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                <DnsIcon color="grey"/>
              </InputAdornment>
          ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="productdesc"
          defaultValue={product.productdesc}
          label={"Product Description"} //optional
          style={{width:'100%'}}
          required
          inputProps={{
            maxLength: 200,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="productcode"
          defaultValue={product.productcode}
          label={"Product Code"} //optional
          style={{width:'100%'}}
          inputProps={{
            maxLength: 30,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="productunit"
          defaultValue={product.productunit}
          label={"Product Unit"} //optional
          style={{width:'100%'}}
          required
          select

        >
        {productUnits.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          variant="outlined"
          onChange={handleInputChange}
          name="unitprice"
          defaultValue={product.unitprice}
          label={"Unit Price"} //optional
          style={{width:'100%'}}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                <MonetizationOnIcon/>
              </InputAdornment>
          ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="file"
          variant="outlined"
          onChange={handleImageChange}
          name="imageurl"
          label={"Product Image"} //optional
          style={{width:'100%'}}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {product!=""&&(
                <img src={IMGURL + product.imageurl} style={{height:50,width:50}}/>
              )}
              <CameraAltIcon/>
            </InputAdornment>
          ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          variant="outlined"
          onChange={handleInputChange}
          name="discount"
          defaultValue={product.discount}
          label={"Discount"} //optional
          style={{width:'100%'}}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                <DiscountIcon/>
              </InputAdornment>
          ),
          }}
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
