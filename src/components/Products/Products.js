import React from "react";
import {PageHeader} from '../PageHeader.js';
import InventoryIcon from '@mui/icons-material/Inventory';

import {ProductsList} from './ProductsList';

export function Products() {

  return (
    <div>
    <PageHeader
      title="Product"
      subTitle="Please select Category, Products of Category will than list"
      icon={<InventoryIcon />}
    />
    <ProductsList/>
    </div>
  )
}
