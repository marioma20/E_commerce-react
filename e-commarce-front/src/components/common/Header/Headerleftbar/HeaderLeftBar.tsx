import React from 'react';
import { getCartTotalQuantitySelector } from '@store/selector';
import { useAppSelector } from '@store/hooks';
import WishListIcon from '@assets/svg/wishlist.svg?react';
import CartICon from '@assets/svg/cart (1).svg?react';
import HeaderCounter from '../headerCounter/HeaderCounter';
import style from './HeaderLeftBar.module.css';

const {headerLeftBar} = style;
const HeaderLeftBar =() => {
    const totalQuantityWishList = useAppSelector((state) => state.WishListReducer.itemsId.length);
    const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  return (
 <>
     <div className={headerLeftBar}>
      <HeaderCounter
        to="wishlist"
        title="Wishlist"
        totalQuantity={totalQuantityWishList}
        svgIcon={<WishListIcon title="wishlist" />}
      />
      <HeaderCounter
        to="cart"
        title="Cart"
        totalQuantity={cartTotalQuantity}
        svgIcon={<CartICon title="cart" />}
      />
    </div>
 </>
  )
}

export default HeaderLeftBar;
