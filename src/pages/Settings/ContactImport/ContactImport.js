import React from "react";
import { NavLink } from "react-router-dom";
import ContactImportForm from "../../../components/ContactImport/ContactImportForm";

import LayoutComponent from "./../../../components/Layout";

const ContactImport = () => {
  return (
    <LayoutComponent className="settings-page" title="Setting">
      <div className="flex justify-between items-center">
        <h1>
          Contact Import
        </h1>
        <NavLink to={`/settings/csv-contacts-import-history`} className="text-base text-primary">
          History
        </NavLink>
      </div>
      <div className="mt-4">
        <ContactImportForm />
      </div>
    </LayoutComponent>
  );
};

export default ContactImport;
