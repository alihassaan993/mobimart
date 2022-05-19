import React from "react";
import {PageHeader} from '../PageHeader.js';
import InventoryIcon from '@mui/icons-material/Inventory';

import {ProductsList} from './ProductsList';

export function Products() {

  return (
    <div>
    <PageHeader
      title="Product"
      subTitle="Please choose Category."
      icon={<InventoryIcon />}
    />
    <ProductsList/>
    </div>
  )
}
