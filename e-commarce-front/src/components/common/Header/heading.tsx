import React from 'react';
import { memo } from 'react';

const Heading = memo( ({ title }: { title: string })  =>{
  return (
    <h2 className='mb-5 mt-5' style={{fontSize: "26px", color:"gray"}}>
      {title}
    </h2>
  )
});

export default Heading;
