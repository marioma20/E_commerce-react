import React from 'react';
import style from './footer.module.css';

const {footerContainer} = style;
function Footer() {
  return (
    <div>
          <div className={footerContainer}>© 2024 Our Ecom. All rights reserved.</div>
    </div>
  )
}

export default Footer;
