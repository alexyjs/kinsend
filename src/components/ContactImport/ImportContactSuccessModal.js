import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CloseModalIcon } from "../../assets/svg";
import { resetMappedFields } from "../../redux/settingsReducer";

const ImportContactSuccessModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onReview = () => {
    dispatch(resetMappedFields());
    navigate('/settings/csv-contacts-import-history');
  };

  return (
    <>
      <Modal
        visible={true}
        onOk={onReview}
        onCancel={onReview}
        footer={null}
        closeIcon={<CloseModalIcon />}
        destroyOnClose={true}
        centered
        className="small-modal"
      >
        <div className="justify-center">
          <h3 className="font-bold text-center text-4xl mb-5">Your Import is Complete</h3>
          <div className="mt-5">
            <p className="text-center">Your CSV file is successfully imported into Kinsend.</p>
            <div className="flex justify-center mt-5">
              <Button
                type="primary"
                size="large"
                className={`next-btn inline-flex items-center px-12 mt-3 md:mt-0'}`}
                onClick={onReview}
              >
                REVIEW
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
 
export default ImportContactSuccessModal;