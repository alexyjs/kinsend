import { mapContacts } from "./helpers";

describe('mapContacts', () => { 
  it('should convert raw contacts using mapped fields', () => {
    const rawContacts = JSON.parse('[["First Name","Last Name","Phone","Email","Job Title","Company","Address1","Address2","City","State/Province","Country Code","Zip Code","Tags","Birthday","Instagram","Twitter","Amount Spent"],["John","Doe","+12025550169","j@shopify.com","Software Developer","Disruptive Multimedia","123 Fake Street","210 Another Fake Address","Ottawa","ON","CA","a1b2c3","customer;friend","10/21/94","@instagram","@twitter","16.10"]]');
    const mappedFields = JSON.parse('[{"from":0,"to":"FIRST NAME"},{"from":1,"to":"LAST NAME"},{"from":2,"to":"PHONE"},{"from":3,"to":"EMAIL"},{"from":5,"to":"COMPANY"},{"from":13,"to":"BIRTHDAY"},{"from":14,"to":"INSTAGRAM"},{"from":15,"to":"TWITTER"},{"from":16,"to":"Amount Spent"}]');

    console.log(mapContacts(rawContacts, mappedFields));
  });
})
