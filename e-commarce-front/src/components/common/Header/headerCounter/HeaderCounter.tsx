import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '@components/ecommerce/headerbasket/headerbasket.module.css';
const {container, totalNum,iconWrapper, pumpAnimate} = style;

type HeaderCounterProps = {
    totalQuantity: number;
    svgIcon: React.ReactNode;
    title: string;
    to: string;
  };
  
const HeaderCounter = ({  totalQuantity,svgIcon,title,to}: HeaderCounterProps) =>{
    const navigate = useNavigate();
    const [isAnimate, setIsAnimate] = useState(false);
   const quantityStyle = `${totalNum} ${ isAnimate ? pumpAnimate : "" }`;
   
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
    <div className={container} onClick={()=>navigate(to)}>
    <div className={iconWrapper}>
        {svgIcon}
      {totalQuantity > 0 && 
      (<div className={quantityStyle}>{totalQuantity}</div>)}
    </div>
    <h3>{title}</h3>
  </div>
  )
}

export default HeaderCounter
