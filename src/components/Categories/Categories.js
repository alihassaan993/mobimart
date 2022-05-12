import React from "react";

import {CategoryTable} from './CategoryTable.js';
import CategoryIcon from '@mui/icons-material/Category';
import {PageHeader} from '../PageHeader.js';

export function Categories() {

  return (
    <div>
    <PageHeader
      title="Category"
      subTitle="Categories of Products can be configured here."
      icon={<CategoryIcon />}
    />
      <CategoryTable />
    </div>
  )
}
