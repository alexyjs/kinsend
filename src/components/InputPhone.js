import CountryPhoneInput from "antd-country-phone-input";

const DEFAULT_PHONE = {
  phone: undefined,
  code: 1,
  short: "US",
};

const InputPhone = (props) => {
  return <CountryPhoneInput size="large" {...props} />;
};

export default InputPhone;
