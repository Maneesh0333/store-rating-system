import Modal from "../common/Model";
import RateForm from "../../form/RateForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  storeId: string;
  currentRating?: number | null;
};

function RateModal({
  isOpen,
  onClose,
  storeId,
  currentRating,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        currentRating
          ? "Update Rating"
          : "Rate Store"
      }
    >
      <RateForm
        storeId={storeId}
        currentRating={currentRating}
        onClose={onClose}
      />
    </Modal>
  );
}

export default RateModal;