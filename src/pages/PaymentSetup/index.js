import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button, Col, Form, Modal, Row } from 'antd'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentMethodAsync, selectAddPaymentSuccess, selectUpdatedUserSuccess } from '../../redux/userReducer'
import { PLANS_DATA } from '../../utils/constants'
import { PlanModal } from '../components'
import { useModal } from '../hook/useModal'
// import SelectNumberModal from './SelectNumberModal'

const PaymentSetup = () => {
  const { close, show, visible } = useModal();
  const { updatedUserSuccess } = useSelector(selectUpdatedUserSuccess);
  const { addPaymentSuccess } = useSelector(selectAddPaymentSuccess);
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [selectedPlanCode, setSelectedPlanCode] = useState(PLANS_DATA.starter.code);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSelectPlan = (code) => {
    setSelectedPlanCode(code);
  }

  const handleFinish = async (values) => {

    if (!stripe || !elements) {
      return;
    }
    setIsStripeLoading(true);

    try {
      const card = elements.getElement(CardElement);
      const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      })

      setIsStripeLoading(false);

      if (cardError) {
        return;
      }

      dispatch(addPaymentMethodAsync({
        paymentMethod,
        code: selectedPlanCode
      }))
    } catch (e) {
      setIsStripeLoading(false)
    }
  }

  const { name, prices } = useMemo(() => {
    return _.get(PLANS_DATA, selectedPlanCode, PLANS_DATA.starter);
  }, [selectedPlanCode])

  useEffect(() => {
    if (addPaymentSuccess) {
      show && show();
    }
  }, [addPaymentSuccess, show])

  return (
    <>  <div className="grid place-items-center min-h-screen">
      <div className="container mx-auto px-4 max-w-lg">
        <h3 className="font-bold text-center text-2xl mb-6">Account Setup</h3>
        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{}}>
          <Row justify='end'>
            <Col>
              <Button type="text" onClick={show}>Change Plan</Button>
            </Col>
          </Row>
          <Form.Item
            name="cardNumber"
            label={`${name} (${prices})`}
            rules={[
              {
                required: true,
                message: 'Please input card number',
              },
              {
                validator(__, value) {
                  console.log('card value', value);

                  if (_.get(value, 'error')) {
                    return Promise.reject(_.get(value, 'error.message'))
                  }
                  // if (EMAIL_REGEX.test(value) || !value) {
                  return Promise.resolve()
                  // }
                  // return Promise.reject(new Error('The email is invalid'))
                },
              },
            ]}
            shouldUpdate
          >
            <CardElement
              onChange={data => console.log('data', data)}
              className='card-element'
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }} />
          </Form.Item>
          {/* <Row wrap={false} gutter={28}>
          <Col>
            <Form.Item shouldUpdate>
              {() => {
                return (
                  <Form.Item label="Expiry" name="month" >
                    <Input size="large" placeholder="Month" />
                  </Form.Item>
                )

              }}
            </Form.Item>
          </Col>
          <Col>
            <Form.Item shouldUpdate>
              {() => {
                return (
                  <Form.Item label="&nbsp;" name="year">
                    <Input size="large" placeholder="Year" />
                  </Form.Item>
                )
              }}
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="CVV" name="cvv">
              <Input size="large" placeholder="" />
            </Form.Item>
          </Col>
        </Row> */}
          <Row justify="end" className="mt-6">
            <Col>
              <Form.Item noStyle shouldUpdate>
                <Button
                  className="min-w-200"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isStripeLoading}
                >
                  Next
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <PlanModal
          handleCancel={close}
          handleOk={(code) => {
            handleSelectPlan(code);
            close();
          }}
          visible={visible}
        />
      </div>
    </div>
    </>
  )
}

export default PaymentSetup
