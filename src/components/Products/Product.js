import React from 'react'
import {Button,Box,Avatar,Typography} from '@material-ui/core'


export function Product(props){

  const {imageURL,title,subTitle,children,product,setOpen,setProduct}=props;


  return (
    <div>
      <Button variant="contained" color="primary"
        style={{width:'100%', height:100,
        backgroundImage: `url(${imageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
       onClick={()=>{setProduct(product);setOpen(true)}}
      >
      </Button>
      <Typography variant = "h6" >
        {title}
      </Typography>
      <Typography variant = "normal">
        {subTitle}
      </Typography>
    </div>
  );
}
