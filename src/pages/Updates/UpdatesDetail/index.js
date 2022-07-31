import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useParams } from "react-router-dom"; 
import "react-datepicker/dist/react-datepicker.css";

import {
  selectUpdates,
  getUpdatesDetailAsync,
  getUpdatesAsync,
} from "../../../redux/updatesReducer";
import { selectUsers } from "../../../redux/userReducer";
import {
  LayoutComponent,
} from "../../../components";
import SideBarUpdate from "../components/SideBarUpdate";

import "./styles.less";

const AddNewUpdates = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUsers);
  let { updatesId } = useParams();
  const { updates, updatesDetail } = useSelector(selectUpdates);

  useEffect(() => {
    if (updatesId) {
      dispatch(getUpdatesDetailAsync(updatesId));
    }
  }, [updatesId]);

  useEffect(() => {
    dispatch(getUpdatesAsync());
  }, []);

  if (!updatesDetail) {
    return null
  }

  return (
    <LayoutComponent className="updates-detail-page p-5">
      <div className="flex">
        {/* <div className="phone-image-frame">
          <div className="">
            <div className="phone-image-header">
              <div
                className="thumbnail-wrapper circular"
                style={{ width: "23px", height: "23px" }}
              >
                <img src={user?.image} alt="" />
              </div>
              <div className="phone-image-name">{user?.firstName}</div>
            </div>
            <div className="phone-image-content">
              <div className="phone-image-content-date">
                {format(new Date(updatesDetail.datetime), "MM/dd/yyyy hh:mm aa")}
              </div>
              <div
                className="phone-image-content-message"
                dangerouslySetInnerHTML={{ __html: updatesDetail.message }}
              ></div>
            </div>
          </div>
        </div> */}
        <div className="flex-auto px-3 2xl:px-5">
          <Row className="w-full">
            <Col className="w-full">
              <Divider className="my-10" />
              <div
                className="updates-detail-message"
                dangerouslySetInnerHTML={{ __html: updatesDetail.message }}
              ></div>
              <p><span className="text-primary">Sent</span> (May 20th, 2022 at 2:48am) To <span className="text-primary">{updatesDetail.triggerType}</span></p>
              <Divider className="my-10" />
              <div className="flex justify-between">
                <div className="report-item">
                  <span className="report-amount">360</span>
                  <span className="report-desc">recipients</span>
                </div>
                <div className="flex">
                  <div className="report-item">
                    <span className="report-amount">4%</span>
                    <span className="report-desc">Responded</span>
                  </div>
                  <div className="report-item ml-3">
                    <span className="report-amount">4%</span>
                    <span className="report-desc">Responded</span>
                  </div>
                </div>
              </div>
              <Divider className="my-10 border-primary" />
              <h4 className="text-3xl text-center mb-10">Delivery</h4>
              <div className="flex justify-between">
                <div className="report-item">
                  <span className="report-amount">360</span>
                  <span className="report-desc">recipients</span>
                </div>
                <div className="flex">
                  <div className="report-item">
                    <span className="report-amount">4%</span>
                    <span className="report-desc">Responded</span>
                  </div>
                  <div className="report-item ml-3">
                    <span className="report-amount">4%</span>
                    <span className="report-desc">Responded</span>
                  </div>
                  <div className="report-item ml-3">
                    <span className="report-amount">4%</span>
                    <span className="report-desc">Responded</span>
                  </div>
                </div>
              </div>
              <Divider className="my-5" />
              <div>
                <div className="report-title">By Message Type</div>
                <div className="flex justify-between">
                  <span className="report-desc">Delivered as SMS</span>
                  <span className="report-desc">258(90%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="report-desc">Delivered as MMS</span>
                  <span className="report-desc">25(10%)</span>
                </div>
              </div>
              <Divider className="my-5" />
              <div>
                <div className="report-title">By Message Type</div>
                <div className="flex justify-between">
                  <span className="report-desc">Domestic (United States)</span>
                  <span className="report-desc">258(90%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="report-desc">Domestic (United States)</span>
                  <span className="report-desc">25(10%)</span>
                </div>
              </div>
              <Divider className="my-10 border-primary" />
              <h4 className="text-3xl text-center mb-10">Response</h4>
              <div className="flex justify-between">
                <div className="report-item">
                  <span className="report-amount text-primary">25%</span>
                  <span className="report-desc">responsed</span>
                </div>
                <div className="report-item">
                  <span className="report-amount">3%</span>
                  <span className="report-desc">opted Out</span>
                </div>
              </div>
              <Divider className="my-10" />
              <div className="flex justify-between">
                <div className="flex">
                  <div className="update-item-circle bg-primary text-2xl text-white">RS</div>
                  <div className="update-item-circle text-md text-primary ml-2 mr-3">+24</div>
                  <div className="flex flex-col justify-center update-item-circle-content">
                    <span>10 Responded</span>
                    <span className="update-item-circle-content-desc">Mikael and 24 others</span>
                  </div>
                </div>
                <div>
                  <Button type="primary" className="mr-2">View</Button>
                  <Button>Send Update</Button>
                </div>
              </div>
              <Divider className="my-10" />
              <div className="flex justify-between">
                <div className="flex">
                  <div className="update-item-circle bg-primary text-2xl text-white">RS</div>
                  <div className="update-item-circle text-md text-primary ml-2 mr-3">+24</div>
                  <div className="flex flex-col justify-center update-item-circle-content">
                    <span>10 Responded</span>
                    <span className="update-item-circle-content-desc">Mikael and 24 others</span>
                  </div>
                </div>
                <div>
                  <Button type="primary" className="mr-2">View</Button>
                  <Button>Send Update</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <SideBarUpdate data={updates} />
      </div>
    </LayoutComponent>
  );
};

export default AddNewUpdates;
