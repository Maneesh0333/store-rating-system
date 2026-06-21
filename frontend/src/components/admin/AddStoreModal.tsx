import StoreForm from "../../form/StoreForm";
import Modal from "../common/Model";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddStoreModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Store"
    >
      <StoreForm onClose={onClose} />
    </Modal>
  );
};

export default AddStoreModal;