import { Button, Col, Row } from 'antd';
import _ from 'lodash';
import React from 'react';

const PhoneList = ({ listPhone, onSelectPhone }) => {
  const handleClick = (phone) => () => {
    
    onSelectPhone(phone)
  }

  if (_.isEmpty(listPhone)) {
    return null;
  }

  return (
    <Row gutter={18}>
      {_.map(listPhone, phone => {
        const { friendlyName } = phone;
        return (
          <Col sm={{ span: 8 }} className="my-2">
            <Button key={friendlyName} onClick={handleClick(phone)} size="large" block>
              {friendlyName}
            </Button>
          </Col>
        )
      })}
    </Row>
  )
}

export default PhoneList
