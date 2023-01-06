import {
  SingleLineTextCFIcon,
  ParagraphCFIcon,
  SingleChoiceRadioCFIcon,
  SingleChoiceSelectCFIcon,
  CheckBoxCFIcon,
} from "../assets/svg";

export const INFO_FROM = {
  facebook: {
    key: "facebook",
    value: "facebook",
    title: "Facebook",
    name: "Facebook",
  },
  google: {
    key: "google",
    value: "google",
    title: "Google",
    name: "Google",
  },
  socialMedia: {
    key: "socialMedia",
    value: "socialMedia",
    title: "Social Media",
    name: "Social Media",
  },
};

export const STORAGE_AUTH_KEY = "auth";

export const PLANS_DATA = {
  starter: {
    key: "starter",
    code: "starter",
    name: "STARTER",
    prices: "$19.99/m",
    subcribers: 100,
    messages: 1000,
    descriptions: [
      "10¢ / Subscriber*",
      `1¢ / Message* 
      *Extra for MMS, Voice & International`,
      "Segmentation & Automation",
      "Same-day Setup",
      "Discord Member Group",
      "Basic Insights",
    ],
  },
  growth: {
    key: "growth",
    code: "growth",
    name: "GROWTH",
    prices: "$99.99/m",
    subcribers: 550,
    messages: 5500,
    descriptions: [
      "8¢ / Subscriber*",
      `1¢ / Message* 
      *Extra for MMS, Voice & International`,
      "Segmentation & Automation",
      "Same-day Setup",
      "Discord Member Group",
      "Basic Insights",
    ],
  },
  hightValue: {
    key: "hightValue",
    code: "hightValue",
    name: "HIGH VOLUME",
    prices: "$499+/m",
    subcribers: "4500+",
    messages: "45k+",
    descriptions: [
      "1¢ / Subscriber*",
      `1¢ / Message* 
      *Extra for MMS, Voice & International`,
      "Segmentation & Automation",
      "Dedicated Support",
      "Discord Member Group",
      "Advanced Analytics",
    ],
  },
};

// export const OPTION_FIELDS = [
//   "Gender",
//   "Birthday",
//   "Twitter",
//   "Instagram",
//   "LinkedIn",
//   "Job Title",
//   "Company",
//   "Industry",
// ];

export const OPTION_FIELDS = [
  "GENDER",
  "BIRTHDAY",
  "TWITTER",
  "INSTAGRAM",
  "LINKEDIN",
  "JOB",
  "TITLE",
  "COMPANY",
  "INDUSTRY",
];

export const DEFAULT_FIELDS = [
  "FIRST NAME",
  "LAST NAME",
  "PHONE",
  "EMAIL",
  "LOCATION"
];

export const INDUSTRY = ["Tech", "Music", "Fashion", "Other"];

export const getDays = () => {
  const result = [];
  for (let i = 1; i <= 31; i++) {
    result.push(i);
  }
  return result;
};

export const getMonths = () => {
  const result = [
    {
      value: 1,
      label: "January",
    },
    {
      value: 2,
      label: "February",
    },
    {
      value: 3,
      label: "March",
    },
    {
      value: 4,
      label: "April",
    },
    {
      value: 5,
      label: "May",
    },
    {
      value: 6,
      label: "June",
    },
    {
      value: 7,
      label: "July",
    },
    {
      value: 8,
      label: "August",
    },
    {
      value: 9,
      label: "September",
    },
    {
      value: 10,
      label: "October",
    },
    {
      value: 11,
      label: "November",
    },
    {
      value: 12,
      label: "December",
    },
  ];
  return result;
};

export const getYears = () => {
  const result = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  for (let i = currentYear; i > 1900; i--) {
    result.push(i);
  }
  return result;
};

export const PLACEHOLDER_COLOR = {
  primaryColor: "rgba(224, 240, 250, 1)",
  secondaryColor: "rgba(224, 240, 250, 0.5)",
};

export const CUSTOM_FIELD_TYPE = {
  INPUT: "SINGLE_TEXT",
  PARAGRAPH_TEXT: "PARAGRAPH_TEXT",
  RADIO: "RADIO",
  SELECT: "SELECT",
  CHECKBOX: "CHECK_BOXS",
};

export const GENDER_OPTIONS = ["Male", "Female", "Other"];

export const CUSTOM_FIELD_ICON = {
  INPUT: SingleLineTextCFIcon,
  PARAGRAPH_TEXT: ParagraphCFIcon,
  RADIO: SingleChoiceRadioCFIcon,
  SELECT: SingleChoiceSelectCFIcon,
  CHECKBOX: CheckBoxCFIcon,
};

export const CUSTOM_FIELD_LABEL = {
  INPUT: "single line text",
  PARAGRAPH_TEXT: "paragraph text",
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
    icon: CUSTOM_FIELD_ICON.PARAGRAPH_TEXT,
    type: CUSTOM_FIELD_TYPE.PARAGRAPH_TEXT,
    label: CUSTOM_FIELD_LABEL.PARAGRAPH_TEXT,
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

export const DURATION_TYPE = {
  TIME_FROM_TRIGGER: "TIME_FROM_TRIGGER",
  UNTIL_NEXT_DAY: "UNTIL_NEXT_DAY",
  UNTIL_NEXT_DAY_OF_WEEK: "UNTIL_NEXT_DAY_OF_WEEK",
  UNTIL_NEXT_DAY_OF_MONTH: "UNTIL_NEXT_DAY_OF_MONTH",
  UNTIL_DATE: "UNTIL_DATE",
};

export const DELAY_TYPE = [
  {
    label: "Time from trigger",
    value: DURATION_TYPE.TIME_FROM_TRIGGER,
  },
  {
    label: "Until Next Day",
    value: DURATION_TYPE.UNTIL_NEXT_DAY,
  },
  {
    label: "Until Next Day of Week",
    value: DURATION_TYPE.UNTIL_NEXT_DAY_OF_WEEK,
  },
  {
    label: "Until Next Day of Month",
    value: DURATION_TYPE.UNTIL_NEXT_DAY_OF_MONTH,
  },
  {
    label: "Until Date",
    value: DURATION_TYPE.UNTIL_DATE,
  },
];

export const DAY_OF_WEEK_TYPE = [
  {
    label: "Sunday",
    value: "Sunday",
  },
  {
    label: "Monday",
    value: "Monday",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
  },
  {
    label: "Thursday",
    value: "Thursday",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Saturday",
    value: "Saturday",
  },
];

export const MONTH_TYPE = [
  {
    label: "Jan",
    value: "Jan",
  },
  {
    label: "Feb",
    value: "Feb",
  },
  {
    label: "Mar",
    value: "Mar",
  },
  {
    label: "Apr",
    value: "Apr",
  },
  {
    label: "May",
    value: "May",
  },
  {
    label: "Jun",
    value: "Jun",
  },
  {
    label: "Jul",
    value: "Jul",
  },
  {
    label: "Aug",
    value: "Aug",
  },
  {
    label: "Sep",
    value: "Sep",
  },
  {
    label: "Oct",
    value: "Oct",
  },
  {
    label: "Nov",
    value: "Nov",
  },
  {
    label: "Dec",
    value: "Dec",
  },
];

export const AUTOMATION_STATUS = {
  ENABLE: "ENABLE",
  DISABLE: "DISABLE",
};

export const FORM_SETTINGS_STATUS = {
  ENABLE: "ENABLE",
  DISABLE: "DISABLE",
};

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
