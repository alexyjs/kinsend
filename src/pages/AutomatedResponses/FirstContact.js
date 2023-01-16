import { Button, Switch } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FirstContactForm from "../../components/FirstContact/FirstContactForm";
import { toggleFirstContactAsync } from "../../redux/automatedResponsesReducer";

import LayoutComponent from "./../../components/Layout";

const FirstContact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <LayoutComponent className="first-contact-page" title="First Contact">
      <div>
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex items-center justify-between md:justify-start">
              <h1 className="text-3xl md:text-4xl">
                First Contact
              </h1>
              <Switch className="ml-5" defaultChecked onChange={(checked) => dispatch(toggleFirstContactAsync(checked))} />
            </div>
            <div className="max-w-4xl mt-2 md:mt-4">
              Customize the automatic response that attempts to send non-subscribers to your subscriber intake form when they text you for the first time. 
              There will be a 2 min human-emulated delay before your automated response is selected. 
              If they don't complete the form after 30 min, you can trigger an additional reminder message. 
              We don’t allow more than 2 messages to be sent to non-subscribers.
            </div>
          </div>
          <div className="flex">
            <Button
              type="primary"
              size="large"
              className="inline-flex items-center px-10 mt-5 md:mt-0 m-auto"
              onClick={() => console.log}
            >
              Save
            </Button>
          </div>
        </div>
        <hr className="text-gray-2 my-8" />
        <div className="mb-8">
          <FirstContactForm />
        </div>
      </div>
    </LayoutComponent>
  );
};

export default FirstContact;
