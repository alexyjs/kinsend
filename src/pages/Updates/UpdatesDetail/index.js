import React, { useEffect } from "react";
import { Button, Row, Col, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { format, isAfter } from "date-fns";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import {
  selectUpdates,
  getUpdatesDetailAsync,
  getUpdatesAsync,
  deleteUpdatesAsync,
  resetUpdatesAsync,
} from "../../../redux/updatesReducer";
import { LayoutComponent } from "../../../components";
import SideBarUpdate from "../components/SideBarUpdate";
import { LinkIcon } from "../../../assets/svg";
import { useModal } from "../../../hook/useModal";
import DeleteScheduleModal from "../components/DeleteScheduleModal";

import "./styles.less";

const AddNewUpdates = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { updatesId } = useParams();
  const { updates, updatesDetail, isDeleted } = useSelector(selectUpdates);
  const {
    bounced,
    bouncedPercent,
    byInternational,
    byLocal,
    cleaned,
    cleanedPercent,
    clicked,
    clickedPercent,
    deliveredByMms,
    deliveredBySms,
    deliveredMMSPercent,
    deliveredNumbers,
    deliveredPercent,
    deliveredSMSPercent,
    domesticPercent,
    internationalPercent,
    linkNumbers,
    notResponse,
    optedOut,
    optedOutResponded,
    recipients,
    responded,
    responsePercent,
  } = updatesDetail?.reporting || {};
  const {
    close: closeDelete,
    show: showDelete,
    visible: visibleDelete,
  } = useModal();

  const isShowEditable =
    updatesDetail &&
    (updatesDetail.triggerType !== "Once" ||
      (updatesDetail.triggerType === "Once" &&
        isAfter(new Date(updatesDetail.datetime), new Date())));

  const handleDelete = () => {
    dispatch(deleteUpdatesAsync(updatesId));
  };

  useEffect(() => {
    if (isDeleted) {
      navigate("/updates");
      dispatch(resetUpdatesAsync());
    }
  }, [navigate, isDeleted]);

  useEffect(() => {
    if (updatesId) {
      dispatch(getUpdatesDetailAsync(updatesId));
    }
  }, [updatesId]);

  useEffect(() => {
    dispatch(getUpdatesAsync());
  }, []);

  if (!updatesDetail) {
    return null;
  }

  return (
    <LayoutComponent className="updates-detail-page">
      <div className="flex">
        <div className="flex-auto px-3 2xl:px-5">
          <Row className="w-full mt-3">
            {isShowEditable && (
              <Col className="w-full flex justify-end my-5">
                <Button
                  type="primary"
                  size="large"
                  className="w-48"
                  onClick={showDelete}
                >
                  Delete
                </Button>
                <NavLink to={`/updates/scheduled/${updatesId}`}>
                  <Button type="primary" size="large" className="w-48	ml-3">
                    Edit Update
                  </Button>
                </NavLink>
              </Col>
            )}
            <Col className="w-full">
              <div
                className="updates-detail-message"
                dangerouslySetInnerHTML={{
                  __html: updatesDetail.message
                    .replace(/<fname>/gi, `&lt;fname&gt;`)
                    .replace(/<lname>/gi, `&lt;lname&gt;`)
                    .replace(/<name>/gi, `&lt;name&gt;`)
                    .replace(/<mobile>/gi, `&lt;mobile&gt;`)
                    .replace(/<form>/gi, `&lt;form&gt;`),
                }}
              ></div>
              <p>
                <span className="text-primary">
                  {updatesDetail.progress === "Scheduled" ? "Schedule" : "Sent"}
                </span>
                &nbsp;
                {format(
                  new Date(updatesDetail.datetime),
                  "MMM dd yyyy hh:mm aa"
                )}{" "}
                To&nbsp;
                <span className="text-primary">
                  {updatesDetail.triggerType}
                </span>
              </p>
              <Divider className="my-10" />
              <div className="flex justify-between">
                <div className="report-item">
                  <span className="report-amount text-primary">
                    {recipients}
                  </span>
                  <span className="report-desc">recipients</span>
                </div>
                <div className="flex">
                  <div className="report-item">
                    <span className="report-amount">{responsePercent}%</span>
                    <span className="report-desc">Responded</span>
                  </div>
                  <div className="report-item ml-3">
                    <span className="report-amount">{clickedPercent}%</span>
                    <span className="report-desc">Clicked</span>
                  </div>
                </div>
              </div>
              <Divider className="my-10 border-primary" />
              <h4 className="text-3xl text-center mb-10">Delivery</h4>
              <div className="flex justify-between">
                <div className="report-item">
                  <span className="report-amount text-primary">
                    {recipients}
                  </span>
                  <span className="report-desc">recipients</span>
                </div>
                <div className="flex">
                  <div className="report-item">
                    <span className="report-amount">{deliveredPercent}%</span>
                    <span className="report-desc">Delivered</span>
                  </div>
                  <div className="report-item ml-3">
                    <span className="report-amount">{bouncedPercent}%</span>
                    <span className="report-desc">Bounced</span>
                  </div>
                  <div className="report-item ml-3">
                    <span className="report-amount">{cleanedPercent}%</span>
                    <span className="report-desc">Cleaned</span>
                  </div>
                </div>
              </div>
              <Divider className="my-5" />
              <div>
                <div className="report-title">By Message Type</div>
                <div className="flex justify-between">
                  <span className="report-desc">Delivered as SMS</span>
                  <span className="report-desc">
                    {deliveredBySms}({deliveredSMSPercent}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="report-desc">Delivered as MMS</span>
                  <span className="report-desc">
                    {deliveredByMms}({deliveredMMSPercent}%)
                  </span>
                </div>
              </div>
              <Divider className="my-5" />
              <div>
                <div className="report-title">By Message Type</div>
                <div className="flex justify-between">
                  <span className="report-desc">Domestic (United States)</span>
                  <span className="report-desc">
                    {byLocal}({domesticPercent}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="report-desc">International</span>
                  <span className="report-desc">
                    {byInternational}({internationalPercent}%)
                  </span>
                </div>
              </div>
              <Divider className="my-10 border-primary" />
              <h4 className="text-3xl text-center mb-10">Response</h4>
              <div className="flex justify-between">
                <div className="report-item">
                  <span className="report-amount text-primary">
                    {responsePercent}%
                  </span>
                  <span className="report-desc">responsed</span>
                </div>
                <div className="report-item">
                  <span className="report-amount">{optedOut}%</span>
                  <span className="report-desc">opted Out</span>
                </div>
              </div>
              {responded?.length ? (
                <>
                  <Divider className="my-10" />
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <div className="update-item-circle bg-primary text-2xl text-white uppercase">
                        {responded[0]?.firstName[0]}
                        {responded[0]?.lastName[0]}
                      </div>
                      {responded?.length > 1 ? (
                        <>
                          <div className="update-item-circle text-md text-primary ml-2 mr-3">
                            +${responded?.length - 1}
                          </div>
                          <div className="flex flex-col justify-center update-item-circle-content">
                            <span>{responded?.length - 1} Responded</span>
                            <span className="update-item-circle-content-desc">
                              {responded[0]?.firstName} and{" "}
                              {responded?.length - 1} others
                            </span>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div>
                      {/* <Button type="primary" className="mr-2">
                        View
                      </Button>
                      <Button>Send Update</Button> */}
                    </div>
                  </div>
                </>
              ) : null}
              {notResponse?.length ? (
                <>
                  <Divider className="my-10" />
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <div className="update-item-circle bg-primary text-2xl text-white uppercase">
                        {notResponse[0]?.firstName[0]}
                        {notResponse[0]?.lastName[0]}
                      </div>
                      {notResponse?.length > 1 ? (
                        <>
                          <div className="update-item-circle text-md text-primary ml-2 mr-3">
                            +{notResponse?.length - 1}
                          </div>
                          <div className="flex flex-col justify-center update-item-circle-content">
                            <span>
                              {notResponse?.length - 1} Didn't Respond
                            </span>
                            <span className="update-item-circle-content-desc">
                              {notResponse[0]?.firstName} and{" "}
                              {notResponse?.length - 1} others
                            </span>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div>
                      {/* <Button type="primary" className="mr-2">
                        View
                      </Button>
                      <Button>Send Update</Button> */}
                    </div>
                  </div>
                </>
              ) : null}
              <Divider className="my-10 border-primary" />
              <h4 className="text-3xl text-center mb-10">Click Through</h4>
              <div className="flex justify-between">
                <div className="report-item">
                  <span className="report-amount text-primary">
                    {clickedPercent}%
                  </span>
                  <span className="report-desc">Clicked</span>
                </div>
                <div className="report-item">
                  <span className="report-amount">{linkNumbers}</span>
                  <span className="report-desc">Links</span>
                </div>
              </div>
              {clicked.map((clickedItem) => (
                <>
                  <Divider className="my-10" />
                  <div className="flex justify-between items-center">
                    <div className="flex text-primary link truncate">
                      <LinkIcon className="mr-3" />
                      <span className="truncate">{clickedItem.link}</span>
                    </div>
                    <div className="inline-flex ml-3">
                      <span className="pr-5 text-xl font-bold">
                        {clickedItem?.clicked?.length +
                          clickedItem?.unClicked?.length}
                      </span>
                      {/* <Button type="primary" className="mr-2">
                        View
                      </Button>
                      <Button>Send Update</Button> */}
                    </div>
                  </div>
                  {clickedItem?.clicked?.length ? (
                    <>
                      <Divider className="my-10" />
                      <div className="flex justify-between items-center">
                        <div className="flex">
                          <div className="update-item-circle bg-primary text-2xl text-white uppercase">
                            {clickedItem?.clicked[0]?.clickedItem?.clicked[0]}
                            {responded[0]?.lastName[0]}
                          </div>
                          {clickedItem?.clicked?.length > 1 ? (
                            <>
                              <div className="update-item-circle text-md text-primary ml-2 mr-3">
                                +${clickedItem?.clicked?.length - 1}
                              </div>
                              <div className="flex flex-col justify-center update-item-circle-content">
                                <span>
                                  {clickedItem?.clicked?.length - 1} Clicked
                                </span>
                                <span className="update-item-circle-content-desc">
                                  {clickedItem?.clicked[0]?.firstName} and{" "}
                                  {clickedItem?.clicked?.length - 1} others
                                </span>
                              </div>
                            </>
                          ) : null}
                        </div>
                        <div>
                          {/* <Button type="primary" className="mr-2">
                            View
                          </Button>
                          <Button>Send Update</Button> */}
                        </div>
                      </div>
                    </>
                  ) : null}
                  {clickedItem?.unClicked?.length ? (
                    <>
                      <Divider className="my-10" />
                      <div className="flex justify-between items-center">
                        <div className="flex">
                          <div className="update-item-circle bg-primary text-2xl text-white uppercase">
                            {
                              clickedItem?.unClicked[0]?.clickedItem
                                ?.unClicked[0]
                            }
                            {responded[0]?.lastName[0]}
                          </div>
                          {clickedItem?.unClicked?.length > 1 ? (
                            <>
                              <div className="update-item-circle text-md text-primary ml-2 mr-3">
                                +${clickedItem?.unClicked?.length - 1}
                              </div>
                              <div className="flex flex-col justify-center update-item-circle-content">
                                <span>
                                  {clickedItem?.unClicked?.length - 1} Didn't
                                  Click
                                </span>
                                <span className="update-item-circle-content-desc">
                                  {clickedItem?.unClicked[0]?.firstName} and{" "}
                                  {clickedItem?.unClicked?.length - 1} others
                                </span>
                              </div>
                            </>
                          ) : null}
                        </div>
                        <div>
                          {/* <Button type="primary" className="mr-2">
                            View
                          </Button>
                          <Button>Send Update</Button> */}
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ))}
            </Col>
          </Row>
        </div>
        <SideBarUpdate data={updates} />
        <DeleteScheduleModal
          visible={visibleDelete}
          handleOk={handleDelete}
          handleCancel={closeDelete}
        />
      </div>
    </LayoutComponent>
  );
};

export default AddNewUpdates;
