import React from "react";
import { NavLink } from "react-router-dom";
import ContactImportHistoryTable from "../../../components/ContactImport/ContactImportHistoryTable";

import LayoutComponent from "./../../../components/Layout";

const ContactImportHistory = () => {
  return (
    <LayoutComponent className="settings-page" title="Setting">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl">Import History</h1>
        <NavLink
          to={`/settings/csv-contacts-import`}
          className="text-base text-primary"
        >
          Import
        </NavLink>
      </div>
      <div className="mt-4 md:mt-7">
        <ContactImportHistoryTable />
      </div>
    </LayoutComponent>
  );
};

export default ContactImportHistory;
