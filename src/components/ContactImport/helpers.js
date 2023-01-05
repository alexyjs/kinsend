export const extractInfoFromRawContacts = (rawContacts) => {
  const copyRawContacts = rawContacts.slice();
  const rawFields = copyRawContacts.shift();
  const colValues = transpose(copyRawContacts);

  return {
    rawFields,
    colValues
  }
}

const transpose = (matrix) => {
  let [row] = matrix
  return row.map((value, column) => matrix.map(row => row[column]))
}
