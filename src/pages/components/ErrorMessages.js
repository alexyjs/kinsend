import React from 'react'
import _ from 'lodash';
import { Typography } from 'antd';
const ErrorMessages = ({ errors }) => {
  if (_.isEmpty(errors)) {
    return null;
  }
  return (
    _.map(_.castArray(errors), (message, index) => {
      return <Typography.Text key={index} type="danger">{_.upperFirst(message)}</Typography.Text>
    })
  )
}

export default ErrorMessages;
