import React from 'react'

import style from './categories.module.css';

import { Link } from 'react-router-dom';
import { TCategory } from '@types';
const {category, categoryImg, categoryTitle} = style;

function Categories({title, img, prefix}: TCategory) {
  return (
    <div className={category}>
      <Link to={`/categories/products/${prefix}`}>
      <div className={categoryImg}>
      <img
        src={img}
        alt={title}
      />
    </div>
    <h4 className={categoryTitle}>{title}</h4>
      </Link>
  </div>
  )
}

export default Categories
