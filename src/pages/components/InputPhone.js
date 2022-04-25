import CountryPhoneInput from 'antd-country-phone-input'
import { useState } from 'react'


const PhoneInput = () => {
  const [value, setValue] = useState({ short: 'US' })
  console.log(value);
  return (
    <CountryPhoneInput size='large' value={value} onChange={setValue}/>
  )
}

export default PhoneInput
