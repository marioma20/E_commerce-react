import React from 'react';
import Logo from '@assets/svg/cart (1).svg?react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import { useNavigate } from 'react-router-dom';
import { getCartTotalQuantitySelector } from '@store/selector';
import style from './headerbasket.module.css';
const {container, totalNum,iconWrapper, pumpAnimate} = style;
function Headerbasket() {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);

  const quantityStyle = `${totalNum} ${
    isAnimate ? pumpAnimate : ""
  }`;

  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

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
    <div className={container} onClick={()=>navigate('/cart')}>
    <div className={iconWrapper}>
      <Logo title="basket icon" />
      {totalQuantity > 0 && 
      (<div className={quantityStyle}>{totalQuantity}</div>)}
    </div>
    <h3>Cart</h3>
  </div>
  )
}

export default Headerbasket;
