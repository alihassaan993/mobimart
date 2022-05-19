import TextField from "@material-ui/core/TextField";
import React, { useState,useEffect} from "react";
import { InputAdornment,Button, Paper,Grid,makeStyles} from "@material-ui/core";
import DnsIcon from '@mui/icons-material/Dns';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DiscountIcon from '@mui/icons-material/Discount';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MenuItem from '@mui/material/MenuItem';

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

import {URL,IMGURL} from '../commons.js';

const initialValues = {
  productName:'',
  productDesc:'',
  productUnit:'',
  productCode:'',
  imageURL:'',
  unitPrice:'',
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
  //let imageChangeFlag=false;

  const  handleSubmit = async() =>
    {
      try{
  

        let targetURL=URL+'/product/';
        const myFile = document.querySelector("input[type=file]").files[0];
        
        await upload(myFile);

        const data = new FormData();
        //data.append("productImage", myFile);
        if(product!==""){
          data.append("productID",product.productID);
        }else{
          data.append("productID",0);
        }



        data.append("productName", values.productName);data.append("categoryID", categoryID);
        data.append("productCode", values.productCode);

        data.append("imageURL", myFile.name);
        data.append("productUnit", values.productUnit);data.append("discount", values.discount);
        data.append("unitPrice", values.unitPrice);data.append("productDesc", values.productDesc);
        data.append("storeID",1);

        console.log("Data " + JSON.stringify(Object.fromEntries(data.entries())));

        const res = await fetch(targetURL, {
            method: 'POST',
            headers:
            {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(Object.fromEntries(data.entries()))

        });
        const responseData= await res;

        refresh(categoryID);
        setOpen(false);
        

      }catch(exception){
        alert("Unable to save product at this time. Please try again later");
      }

    };

 function upload(myFile){

    
      
      const target = { Bucket:process.env.REACT_APP_BUCKET_NAME, Key:myFile.name, Body:myFile };
      const creds = {accessKeyId:process.env.REACT_APP_ACCESS_ID,secretAccessKey: process.env.REACT_APP_ACCESS_KEY};
      try {

        const parallelUploads3 = new Upload({
          client: new S3Client({region:process.env.REACT_APP_REGION,credentials:creds}),
          leavePartsOnError: false, // optional manually handle dropped parts
          params: target,
        });
    
        parallelUploads3.on("httpUploadProgress", (progress) => {
          console.log(progress);
        });
    
        parallelUploads3.done();
        console.log("File Uploaded Successfully " );

        return IMGURL + myFile.name;

      } catch (e) {
        console.log(e);
      }
  }    

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
    //imageChangeFlag=true;
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
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          onChange={handleInputChange}
          name="productname"
          defaultValue={product.productName}
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
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="productdesc"
          defaultValue={product.productDesc}
          label={"Product Description"} //optional
          style={{width:'100%'}}
          required
          inputProps={{
            maxLength: 200,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="productcode"
          defaultValue={product.productCode}
          label={"Product Code"} //optional
          style={{width:'100%'}}
          inputProps={{
            maxLength: 30,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          name="productunit"
          defaultValue={product.productUnit}
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
      <Grid item xs={12} md={6}>
        <TextField
          type="number"
          variant="outlined"
          onChange={handleInputChange}
          name="unitprice"
          defaultValue={product.unitPrice}
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
      <Grid item xs={12} md={6}>
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
              {product!==""&&(
                <img src={IMGURL + product.imageurl} style={{height:50,width:50}}/>
              )}
              <CameraAltIcon/>
            </InputAdornment>
          ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
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
