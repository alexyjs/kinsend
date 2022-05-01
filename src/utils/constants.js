export const INFO_FROM = {
  facebook: {
    key: 'facebook',
    value: 'facebook',
    title: 'Facebook',
    name: 'Facebook'
  },
  google: {
    key: 'google',
    value: 'google',
    title: 'Google',
    name: 'Google'
  },
  socialMedia: {
    key: 'socialMedia',
    value: 'socialMedia',
    title: 'Social Media',
    name: 'Social Media'
  },
}

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PHONE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const STORAGE_AUTH_KEY = 'auth';


export const PLANS_DATA = {
  starter: {
    key: 'starter',
    code: 'starter',
    name: 'STARTER',
    prices: '$19.99/m',
    subcribers: 100,
    messages: 1000,
    descriptions: [
      '10¢ / Subscriber*',
      `1¢ / Message* 
      *Extra for MMS, Voice & International`,
      'Segmentation & Automation',
      'Same-day Setup',
      'Discord Member Group',
      'Basic Insights'
    ]
  },
  growth: {
    key: 'growth',
    code: 'growth',
    name: 'GROWTH',
    prices: '$99.99/m',
    subcribers: 550,
    messages: 5500,
    descriptions: [
      '8¢ / Subscriber*',
      `1¢ / Message* 
      *Extra for MMS, Voice & International`,
      'Segmentation & Automation',
      'Same-day Setup',
      'Discord Member Group',
      'Basic Insights'
    ]
  },
  hightValue: {
    key: 'hightValue',
    code: 'hightValue',
    name: 'HIGH VOLUME',
    prices: '$499+/m',
    subcribers: '4500+',
    messages: '45k+',
    descriptions: [
      '1¢ / Subscriber*',
      `1¢ / Message* 
      *Extra for MMS, Voice & International`,
      'Segmentation & Automation',
      'Dedicated Support',
      'Discord Member Group',
      'Advanced Analytics'
    ]
  },
}
