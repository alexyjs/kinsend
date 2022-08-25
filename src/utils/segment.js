import { formatOptions } from "./";

export const SEGMENT_FILTER_TYPE = formatOptions([
  "Added Last Month",
  "Added Last Week",
  "Added This Month",
  "Added This Week",
  "Added This Year",
  "Age",
  "Contact is Archived",
  "Assigned No Is",
  "Birthday",
  "Birthdays This Month",
  "Birthdays This Week",
  "Birthdays Today",
  "Company",
  "Has been Contacted",
  "Contacted Last Month",
  "Contacted Last Week",
  "Contacted This Month",
  "Contacted This Week",
  "Contacted This Year",
  "Created Date",
  "Is Customer",
  "Email",
  "Is Facebook Contact",
  // "Form Completed",
  "Has Gender",
  "Contact is Hidden",
  "Industry",
  "Job Title",
  "Last Contacted",
  "Last Updated",
  "Clicked",
  "Lives In",
  // "Messages Exchanged",
  // "Messages Incoming",
  // "Messages Outgoing",
  "Mobile",
  // "Has Purchased",
  // "Purchased",
  // "Responded",
  // "Revenue",
  "Include Segment",
  // "Sent Update",
  "Is Subscribed",
  "Is Tagged",
  "Is VIP",
]);

export const INDUSTRY_SEGMENT_FILTER_CONDITION = [
  {
    label: "Exist",
    value: "Exist",
  },
  {
    label: "Doesn't exist",
    value: "Doesn't exist",
  },
  {
    label: "Is",
    value: "Is",
  },
  {
    label: "Contains",
    value: "Contains",
  },
  {
    label: "Starts with",
    value: "Starts with",
  },
];
// "Exist", "Doesn't exist", "Is", "Contains", "Starts with"]

export const LOCATION_SEGMENT_FILTER_CONDITION = [
  {
    label: "Lives in",
    value: "Lives in",
  },
  {
    label: "Doesn't live in",
    value: "Doesn't live in",
  },
];

export const TAG_SEGMENT_FILTER_CONDITION = [
  {
    label: "Is Tagged",
    value: "Is Tagged",
  },
  {
    label: "Isn't Tagged",
    value: "Isn't Tagged",
  },
];

export const SEGMENT_SEGMENT_FILTER_CONDITION = [
  {
    label: "Include Segment",
    value: "Include Segment",
  },
  {
    label: "Exclude Segment",
    value: "Exclude Segment",
  },
];

export const AGE_SEGMENT_FILTER_CONDITION = [
  {
    label: "Is",
    key: "Is",
  },
  {
    label: "Above",
    key: "Above",
  },
  {
    label: "Below",
    key: "Below",
  },
  {
    label: "Is & Above",
    key: "IsAndAbove",
  },
  {
    label: "Is & Below",
    key: "IsAndBelow",
  },
];
