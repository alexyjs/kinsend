import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FirstContactForm from "../../components/FirstContact/FirstContactForm";
import { getFirstContactSettingsAsync, selectAutomatedResponses } from "../../redux/automatedResponsesReducer";
import LayoutComponent from "./../../components/Layout";

const FirstContact = () => {
  const dispatch = useDispatch();
  const { firstContactSettings } = useSelector(selectAutomatedResponses);

  useEffect(() => {
    dispatch(getFirstContactSettingsAsync());
  }, [dispatch]);

  return (
    <LayoutComponent className="first-contact-page" title="First Contact">
      <FirstContactForm initValue={firstContactSettings} />
    </LayoutComponent>
  );
};

export default FirstContact;
