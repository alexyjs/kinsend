import {
  SingleLineTextCFIcon,
  ParagraphCFIcon,
  SingleChoiceRadioCFIcon,
  SingleChoiceSelectCFIcon,
  CheckBoxCFIcon,
} from "../assets/svg";

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

export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const PHONE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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

export const OPTION_FIELDS = [
  "Gender",
  "Birthday",
  "Twitter",
  "Instagram",
  "LinkedIn",
  "Job Title",
  "Company",
  "Industry",
];

export const PLACEHOLDER_COLOR = {
  primaryColor: 'rgba(224, 240, 250, 1)',
  secondaryColor: 'rgba(224, 240, 250, 0.5)',
};

export const CUSTOM_FIELD_TYPE = {
  INPUT: "SINGLE_TEXT",
  TEXTAREA: "PARAGRAPH_TEXT",
  RADIO: "RADIO",
  SELECT: "SELECT",
  CHECKBOX: "CHECK_BOXS",
};

export const CUSTOM_FIELD_ICON = {
  INPUT: SingleLineTextCFIcon,
  TEXTAREA: ParagraphCFIcon,
  RADIO: SingleChoiceRadioCFIcon,
  SELECT: SingleChoiceSelectCFIcon,
  CHECKBOX: CheckBoxCFIcon,
};

export const CUSTOM_FIELD_LABEL = {
  INPUT: "single line text",
  TEXTAREA: "paragraph text",
  RADIO: "single choice (radio)",
  SELECT: "single choice (select)",
  CHECKBOX: "checkboxes",
};

export const CUSTOM_FIELD_OPTIONS = [
  {
    icon: CUSTOM_FIELD_ICON.INPUT,
    type: CUSTOM_FIELD_TYPE.INPUT,
    label: CUSTOM_FIELD_LABEL.INPUT,
  },
  {
    icon: CUSTOM_FIELD_ICON.TEXTAREA,
    type: CUSTOM_FIELD_TYPE.TEXTAREA,
    label: CUSTOM_FIELD_LABEL.TEXTAREA,
  },
  {
    icon: CUSTOM_FIELD_ICON.RADIO,
    type: CUSTOM_FIELD_TYPE.RADIO,
    label: CUSTOM_FIELD_LABEL.RADIO,
  },
  {
    icon: CUSTOM_FIELD_ICON.SELECT,
    type: CUSTOM_FIELD_TYPE.SELECT,
    label: CUSTOM_FIELD_LABEL.SELECT,
  },
  {
    icon: CUSTOM_FIELD_ICON.CHECKBOX,
    type: CUSTOM_FIELD_TYPE.CHECKBOX,
    label: CUSTOM_FIELD_LABEL.CHECKBOX,
  },
];
