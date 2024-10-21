import React from 'react';
import WishList from '@assets/svg/wishlist.svg?react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './HeaderWishList.module.css';
import { useAppSelector } from '@store/hooks';
const {container, totalNum,iconWrapper, pumpAnimate} = style;
function HeaderWishList() {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector((state) => state.WishListReducer.itemsId)

  const quantityStyle = `${totalNum} ${
    isAnimate ? pumpAnimate : ""
  }`;

  useEffect(()=>{

    if (!totalQuantity) {
      return;
    }

    setIsAnimate(true);

    const depouns = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return ()=>{
      clearTimeout(depouns)
    }
  }, [totalQuantity]);

  return (

    <div className={container} onClick={()=>navigate('/wishList')}>
    <div className={iconWrapper}>
      <WishList title="basket icon" />
      {totalQuantity.length > 0 && 
      (<div className={quantityStyle}>{totalQuantity.length}</div>)}
    </div>
    <h3>WishList</h3>
  </div>
  )
}

export default HeaderWishList;
