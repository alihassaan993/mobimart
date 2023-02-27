import TextField from "@material-ui/core/TextField";
import React, { useState,useEffect} from "react";
import { InputAdornment,Button, Paper,Grid,makeStyles} from "@material-ui/core";
import DnsIcon from '@mui/icons-material/Dns';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DiscountIcon from '@mui/icons-material/Discount';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MenuItem from '@mui/material/MenuItem';       
import {FileUpload} from '../FileUpload';
import AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

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
 
const s3 = new S3({
  //region:process.env.REACT_APP_REGION,
  region:'ap-south-1',
  accessKeyId:'AKIA6QZ27NOPLTVMQ5FU',
  secretAccessKey:'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'
  //accessKeyId:process.env.REACT_APP_ACCESS_ID,
  //secretAccessKey: process.env.REACT_APP_ACCESS_KEY
});

export function ProductForm(props){

  let {product,categoryID,refresh,setOpen}=props;
  const [values,setValues] = useState();
  const classes = useStyles();
  //let imageChangeFlag=false;

  const  handleSubmit = async(event) =>
    {
      event.preventDefault();
      try{
  

        let targetURL=URL+'/product/';
        let myFile = null;
        let fileName="";
        const data = new FormData();

        if(product!==""){
          data.append("productID",product.productID);
          fileName=product.imageurl;
        }else{
          data.append("productID",0);
        }

        if(document.querySelector("input[type=file]").files.lenght!=0){
          myFile=document.querySelector("input[type=file]").files[0];
        }
          
        
        //console.log(myFile);
        if(myFile!=null){
          console.log("File is not null + " + myFile);
          try{
            const formData = new FormData();
            const base64 = await convertFileToBase64(myFile);
            formData.append('file', myFile);
      
            const options = {
              method: 'POST',
              body: formData,
              headers : {
                'x-file-name': myFile.name
              }
            };
            const res = await fetch(URL+'/utilities/upload',options);

            //alert(res.toString());
              
          }catch(exception){
            alert(exception);
          }

          alert("File uploaded successfully!!");

          fileName=myFile.name;  
       
        }
          

        data.append("productName", values.productName);data.append("categoryID", categoryID);
        data.append("productCode", values.productCode);

        data.append("imageURL", fileName);
        data.append("productUnit", values.productUnit);data.append("discount", values.discount);
        data.append("unitPrice", values.unitPrice);data.append("productDesc", values.productDesc);
        data.append("storeID",1);

        console.log("Data " + JSON.stringify(Object.fromEntries(data.entries())));

        // const res = await fetch(URL+'/product/', {
        //     method: 'POST',
        //     headers:
        //     {
        //       'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify(Object.fromEntries(data.entries()))

        // });
        // const responseData= await res;

        //refresh(categoryID);
        //setOpen(false);
        

      }catch(exception){
        console.log(exception);
        //alert("Problem while saving product");
        alert("Unable to save product at this time. Please try again later " + exception);
      }

    };

    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
      });
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
    <form className={classes.root}  onSubmit={handleSubmit}>
    <Grid container spacing={2} >
      <Grid item xs={12} md={6}>
        <TextField
          required
          variant="outlined"
          onChange={handleInputChange}
          name="productName"
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
          name="productDesc"
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
          name="productCode"
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
          name="productUnit"
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
          name="unitPrice"
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
          <Button color="primary" style={{margin:10}} type="submit" variant="contained">Submit</Button>
          <Button onClick={handleReset} variant="contained">Reset</Button>
        </div>
      </Grid>
    </Grid>
    </form>
    </Paper>
  );


}
