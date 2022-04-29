import _ from 'lodash'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../redux/userReducer'
import { SelectNumberModal } from '../components'
import { useModal } from '../hook/useModal'

const Dashboard = () => {
  const { user } = useSelector(selectUsers);
  const { close, show, visible } = useModal()

  useEffect(() => {
    console.log('a')
    if (_.isEmpty(_.get(user, 'twilio'))) {
      show();
    }
  }, [])

  return (
    <div className="mx-5">
      Dashboard

      <SelectNumberModal
        handleCancel={close}
        handleOk={close}
        visible={visible}
      />
    </div>
  )
}

export default Dashboard
