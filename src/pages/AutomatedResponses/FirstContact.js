import React, { useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FirstContactForm from "../../components/FirstContact/FirstContactForm";
import {
  getFirstContactSettingsAsync,
  selectAutomatedResponses,
} from "../../redux/automatedResponsesReducer";
import LayoutComponent from "./../../components/Layout";

const FirstContact = () => {
  const dispatch = useDispatch();
  const { firstContactSettings } = useSelector(selectAutomatedResponses);

  useEffect(() => {
    dispatch(getFirstContactSettingsAsync());
  }, [dispatch]);

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
