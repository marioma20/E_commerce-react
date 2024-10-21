import React from 'react';
import { LottieHandler } from '@components/feedback/layout';
import { Row, Col } from 'react-bootstrap';
type GridList<T> = {
    records: T[];
    renderitem: (record: T) => React.ReactNode;
    emptyMessage: string;
}

type HasId = {id?: number};
const Grid_List = <T extends HasId > ({records, renderitem, emptyMessage}: GridList<T>) => {
    const categoriesList = records.length > 0 ? records.map((record)=>{
        return(
          <>
            <Col xs={6} key={record.id} md={3} className="d-flex justify-content-center mb-5 mt-2">
              {renderitem(record)}
          </Col>
          </>
        );
      }) : <LottieHandler type="empty" message={emptyMessage}/>;
  return (
    <>
      <Row>
      {categoriesList}
    </Row>
    </>
  )
}

export default Grid_List;
