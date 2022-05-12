import React,{useState} from 'react';
import {Box,Typography} from '@material-ui/core'

export function Category(props){

  const {categoryName,imageURL,category,setID} = props;
  let [bgColor]=useState("black");

  return(
    <Box
      component="Box"
      sx={{
        alignItems:'center',
        width:'100%',
        height:50,
        display:"flex"
      }}
      key={category.categoryid}
      color={bgColor}
      onClick={()=>{setID(category)}}
    >
      <img src={imageURL} alt='' style={{width:50,height:'80%',marginRight:5,borderRadius:30}}/>
      <Typography variant="normal">
        {categoryName}
      </Typography>
    </Box>
  );

}
