import EditProfileForm from "../../form/EditProfileForm";
import Modal from "./Model";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    address: string;
  };
};

function EditProfileModal({ isOpen, onClose, user }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <EditProfileForm user={user} onClose={onClose} />
    </Modal>
  );
}

export default EditProfileModal;
