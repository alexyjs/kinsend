import React from 'react'
import _ from 'lodash';
import { Typography } from 'antd';
import classnames from 'classnames'

const ErrorMessages = ({ errors, classNames }) => {
  if (_.isEmpty(errors)) {
    return null;
  }
  return (
    _.map(_.castArray(errors), (message, index) => {
      return <Typography.Text className={classnames("block text-center", classNames)} key={index} type="danger">{_.upperFirst(message)}</Typography.Text>
    })
  )
}

export default ErrorMessages;
