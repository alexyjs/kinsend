import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FirstContactForm from "../../components/FirstContact/FirstContactForm";
import { selectAutomatedResponses } from "../../redux/automatedResponsesReducer";
import LayoutComponent from "./../../components/Layout";

const FirstContact = () => {
  const { firstContactSettings } = useSelector(selectAutomatedResponses);

  return (
    <LayoutComponent className="first-contact-page" title="First Contact">
      <NavLink
        to={`/automated-responses`}
        className="text-base text-primary flex mb-2"
      >
        <ArrowLeftOutlined className="mt-0.5 mr-2" />
        Back
      </NavLink>
      <FirstContactForm initValue={firstContactSettings} />
    </LayoutComponent>
  );
};

export default FirstContact;
