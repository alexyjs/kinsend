import { DEFAULT_FIELDS, OPTION_FIELDS } from "../../utils/constants";

export const extractInfoFromRawContacts = (rawContacts) => {
  const copyRawContacts = rawContacts.slice();
  const rawFields = copyRawContacts.shift();
  const colValues = transpose(copyRawContacts);

  return {
    rawFields,
    colValues
  }
}

export const mapFieldsFromRawContacts = (rawContacts, onMatch, customFields = []) => {
  const customFieldLabels = customFields.map(customField => customField.label);
  const kinsendFields = [...DEFAULT_FIELDS, ...OPTION_FIELDS, ...customFieldLabels];
  const rawFields = rawContacts[0].map(field => field.replace(/ /g,'').toLowerCase());
  
  rawFields.forEach((rawField, index) => {
    const matchedField = kinsendFields.find(kinsendField => rawField === kinsendField.replace(/ /g,'').toLowerCase());

    if (matchedField) {
      onMatch(index, matchedField);
    }
  });
}

const transpose = (matrix) => {
  let [row] = matrix
  return row.map((value, column) => matrix.map(row => row[column]));
}
