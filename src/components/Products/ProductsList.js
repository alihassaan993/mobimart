import React,{useEffect,useState} from 'react';
import {Paper,Button,Typography,Grid,TableContainer,Table,TableHead,TableRow,TableCell} from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Category} from '../Categories/Category';
import {ToggleButton,ToggleButtonGroup} from '@mui/material';
import {ProductForm} from './ProductForm';
import {Product} from './Product.js';
import {Popup} from '../Popup';
import {URL,IMGURL} from '../commons.js';
import LoadingOverlay from 'react-loading-overlay-ts';
import {Carousel}  from 'react-responsive-carousel';
export function ProductsList(){

  const [data,setData]=useState([]);
  const [categories,setCategories]=useState([]);
  const [category,setCategory]=useState(0);
  const [product,setProduct]=useState();
  const [open,setOpen]=useState(false);
  const [loading,setLoading]=useState(false);

  const [alignment, setAlignment] = React.useState(0);
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  useEffect(() => {
      console.log("FETCHING Categories");
      fetchCategories();
    if(category!==0){
      setCategory(category);
      fetchProducts(category.categoryID);
    }

  }, []);

  useEffect(() => {
    console.log("FETCHING PRODUCTS");
    if(category!==0){
      setCategory(category);
      fetchProducts(category.categoryID);
    }
  }, [category]);

  async function fetchProducts(categoryID){
    console.log("Fetching products");
    try{
      //const res = await fetch(URL+'webapi/product/'+categoryID);
      setLoading(true);
      const res = await fetch(URL+'/product/'+categoryID);
      const responseData= await res.json();
      setLoading(false);
      console.log(responseData);
      setData(JSON.parse(responseData.response));
    }catch(exception){
      console.log(exception);
      alert("Unable to communicate to server. Please check your internet connection!!!");
    }
  }

  async function fetchCategories(){
    console.log("Fetching categories");
    try{
      //const res = await fetch(URL+'webapi/category/1');
      setLoading(true);
      const res = await fetch(URL+'/categories/1');
      const responseData= await res.json();
      setCategories(JSON.parse(responseData.response));
      setLoading(false);
      setCategory(JSON.parse(responseData.response)[0]);
    }catch(exception){
      console.log(exception);
      alert("Unable to communicate to server. Please check your internet connection!!!");
    }
  }

  return(
    <>
        <LoadingOverlay
        active={loading}
        spinner
        text='Loading Products...'
      >   
    <div>
    <Paper color="primary">
      <Carousel showArrows={true} showThumbs={false} centerMode onChange={(index,item)=>fetchProducts(item.key.substring(2))}>
            {categories.map((category)=>(
              <div key={category.categoryID} style={{width:"100%",height:"200px"}}>
              <img src={IMGURL+category.imageURL}/>
              <p className="legend">{category.categoryName}</p>
              </div>
            ))}

      </Carousel>
    </Paper>
    </div>

    <div>&nbsp;
    <Paper>
      <Typography variant="h6">
        &nbsp;{category.categoryName}
      </Typography>
    </Paper>
    </div>        
    <div>
 
      
    <Paper style={{marginTop:10,paddingLeft:10,paddingRight:10}} elevation={3}>
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      {data.map((product,index)=>(
        <Grid item xs={4} sm={4} md={2} key={index}>
        <item>
          <Product imageURL={IMGURL  + product.imageurl} title={product.productName}
            subTitle= {"Unit Price: " + product.unitPrice + "/" + product.productUnit}
            setOpen={setOpen}
            setProduct={setProduct}
            product={product}
            />
        </item>
        </Grid>
      ))}
      {category!=""&&
        <Grid item xs={2} sm={4} md={4}>
          <item>
          <Button variant="contained" color="primary"
            style={{width:100, height:100,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={()=>{setProduct("");setOpen(true)}}
          >
            <AddIcon />
          </Button>
          </item>
        </Grid>     
      }
 
    </Grid>
    </Paper>
    </div>
      <Popup
       openPopup={open}
       setOpenPopup={setOpen}
       title="Product Form"
      >
       <ProductForm product={product}
       categoryID={category.categoryID} refresh={fetchProducts}
       setOpen={setOpen}
       />
      </Popup>

    </LoadingOverlay>
    </>
  );

}
