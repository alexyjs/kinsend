import React from "react";
import ContactImportForm from "../../../components/ContactImport/ContactImportForm";

import LayoutComponent from "./../../../components/Layout";

const ContactImport = () => {
  return (
    <LayoutComponent className="settings-page" title="Setting">
      <h1>
        Contact Import
      </h1>
      <div className="mt-6">
        <ContactImportForm />
      </div>
    </LayoutComponent>
  );
};

export default ContactImport;
