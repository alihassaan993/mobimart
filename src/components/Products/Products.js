import React from "react";
import {PageHeader} from '../PageHeader.js';
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
