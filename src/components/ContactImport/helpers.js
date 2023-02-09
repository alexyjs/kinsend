import {
  defaultFieldsCamelized,
  DEFAULT_FIELDS,
  OPTION_FIELDS,
} from "../../utils/constants";

export const extractInfoFromRawContacts = (rawContacts) => {
  const contacts = rawContacts.filter((rawContact) => !isRowEmpty(rawContact));

  return {
    rawFields: contacts.shift(),
    colValues: transpose(contacts),
  };
};

export const mapFieldsFromRawContacts = (
  rawContacts,
  onMatch,
  customFields = []
) => {
  const customFieldLabels = customFields.map(
    (customField) => customField.label
  );
  const kinsendFields = [
    ...DEFAULT_FIELDS,
    ...OPTION_FIELDS,
    ...customFieldLabels,
  ];
  const rawFields = rawContacts[0].map((field) =>
    field.replace(/ /g, "").toLowerCase()
  );

  rawFields.forEach((rawField, index) => {
    const matchedField = kinsendFields.find(
      (kinsendField) =>
        rawField === kinsendField.replace(/ /g, "").toLowerCase()
    );

    if (matchedField) {
      onMatch(index, matchedField);
    }
  });
};

export const mapContacts = (rawContacts, mappedFields) => {
  const camelizedMappedFields = mappedFields.map((mappedField) => {
    return {
      from: mappedField.from,
      to: camelize(mappedField.to),
    };
  });

  return removeRedundantRows(rawContacts).map((rawContact) =>
    mapContact(rawContact, camelizedMappedFields)
  );
};

const mapContact = (rawContact, mappedFields) => {
  const mappedContact = mappedFields.reduce(
    (contact, mappedField) => {
      if (defaultFieldsCamelized.includes(mappedField.to)) {
        if (mappedField.to === "phoneNumber") {
          contact[mappedField.to] = transformPhone(
            rawContact[mappedField.from]
          );
        } else {
          contact[mappedField.to] = rawContact[mappedField.from];
        }
      } else {
        contact.metaData[mappedField.to] = rawContact[mappedField.from];
      }

      return contact;
    },
    { metaData: {} }
  );

  mappedContact.metaData = JSON.stringify(mappedContact.metaData);

  return mappedContact;
};

const removeRedundantRows = (rawContacts) => {
  return rawContacts.filter(
    (rawContact, i) => !isRowEmpty(rawContact) && i > 0
  );
};

const camelize = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

const transpose = (matrix) => {
  let [row] = matrix;
  return row.map((value, column) => matrix.map((row) => row[column]));
};

const transformPhone = (phoneString) => {
  // TODO: add transform phone logic
  return {
    phone: phoneString,
    code: 1,
    short: "US",
  };
};

const isRowEmpty = (row) => {
  return row.every((col) => !!!col);
};
