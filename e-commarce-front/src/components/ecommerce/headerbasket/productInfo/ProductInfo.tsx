import React from 'react';
import styles from "./cartitem.module.css";
import styleProps from './ProductInfo.module.css';
type ProductInfoProps ={
    title: string;
    img: string;
    price: number;
    quantity?: number;
    direction?: "row" | "column";
    children?: React.ReactNode;
    style?: React.CSSProperties;
}


function ProductInfo({title, img, price,quantity ,direction="row", children, style}:ProductInfoProps) {
  return (
    <div className={`${styleProps[`product-${direction}`]}`} style={style}>
    <div className={`${styleProps[`productImg-${direction}`]}`}>
      <img src={img} alt={title} />
    </div>
    <div className={`${styleProps[`productInfo-${direction}`]}`}>
      <h2 title={title}>{title}</h2>
      <h3>{price.toFixed(2)} EGP</h3>
      {quantity && <h3>Total Quantity: {quantity}</h3>}
      {quantity && <h3>Price Total: {(quantity * price).toFixed(2)}</h3>}
      {children}
    </div>
  </div>
  )
}

export default ProductInfo;
