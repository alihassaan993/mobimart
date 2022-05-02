import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import CategoryIcon from '@mui/icons-material/Category';
import {PageHeader} from '../PageHeader.js';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import InventoryIcon from '@mui/icons-material/Inventory';

import {ProductsList} from './ProductsList';

export function Products() {

  return (
    <div>
    <PageHeader
      title="Inventory"
      subTitle="All Products are listed here"
      icon={<InventoryIcon />}
    />
    <ProductsList/>
    </div>
  )
}
