import React from 'react';
import { memo } from 'react';
import styles from './product.module.css';
import { useAppDispatch } from '@store/hooks';
import { useEffect, useState } from 'react';
import { TProduct } from '@types';
import { actLikeToggle } from '@store/wishlist/WishListSlice';
import Like from '../../../../assets/svg/like.svg?react';
import  LikeFill  from '@assets/svg/like-fill.svg?react';
import { addtocart } from '@store/cart/cartSlice';
import ProductInfo from '../productInfo/ProductInfo';
import { Button, Spinner } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';


const { product, productImg, maximumNotice , wishlistBtn} = styles;

const Product = memo(({id,title,price,img, quantity, max, isLiked, isAuthenticated}: TProduct) => {

  const disputch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const addtocartHandeler = ()=>{
    disputch(addtocart(id));
    setIsBtnDisabled(true);
  }

 
  const LikeToggleHandler = () => {
    if(isAuthenticated){
      if (!isLoading) {
        setIsLoading(true);
        disputch(actLikeToggle(id))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      }
    }else{
      setShowModal(true);
    }

  };
  return (
    <>
  <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
          <ProductInfo title={title} price={price} img={img}>
          <div className={wishlistBtn} onClick={LikeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "You reached to the limit"
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white", width: "100%" }}
            onClick={addtocartHandeler}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </ProductInfo>
  </>
  )
});

export default Product;
