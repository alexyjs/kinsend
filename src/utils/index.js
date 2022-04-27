import _ from 'lodash'
import { PHONE_REGEX } from './constants'

let formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ('' + str).replace(/\D/g, '')
  //Check if the input is of correct
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    //Remove the matched extension code
    //Change this to format for any country code.
    let intlCode = match[1] ? '+1 ' : ''
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }

  return null
}

export const displayPhoneNumber = (phoneNumber) => {
  console.log(phoneNumber)
  if (_.isEmpty(phoneNumber)) {
    return ''
  }

  const { phone, code } = phoneNumber
  return `+${code} ${formatPhoneNumber(phone)}`
}

export const phoneValidator = {
  validator: async (rule, value) => {
    const phone = _.get(value, 'phone');
    const code = _.get(value, 'code');

    if (!code && !phone) {
      return Promise.resolve()
    }

    if (PHONE_REGEX.test(phone) || !phone) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('The phone is invalid'))
  }
}
