import UserForm from "../../form/UserForm";
import Modal from "../common/Model";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddUserModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add User">
      <UserForm onClose={onClose} />
    </Modal>
  );
};

export default AddUserModal;
