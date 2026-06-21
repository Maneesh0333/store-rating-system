import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { useSubmitRating } from "../hooks/user/useSubmitRating";
import { useUpdateRating } from "../hooks/user/useUpdateRating";

type Props = {
  storeId: string;
  currentRating?: number | null;
  onClose: () => void;
};

function RateForm({ storeId, currentRating, onClose }: Props) {
  const [rating, setRating] = useState(0);

  const submitMutation = useSubmitRating();
  const updateMutation = useUpdateRating();

  useEffect(() => {
    setRating(currentRating || 0);
  }, [currentRating]);

  const isPending = submitMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      storeId,
      rating,
    };

    if (currentRating) {
      updateMutation.mutate(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      submitMutation.mutate(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="mb-4 text-sm text-gray-500">Select your rating</p>

        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={isPending}
              onClick={() => setRating(star)}
              className="transition hover:scale-110"
            >
              <Star
                size={36}
                className={
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        {rating > 0
          ? `You selected ${rating} star${rating > 1 ? "s" : ""}`
          : "Please select a rating"}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="rounded-lg border cursor-pointer border-gray-300 px-5 py-2 hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={rating === 0 || isPending}
          className="rounded-lg bg-blue-600 cursor-pointer px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? currentRating
              ? "Updating..."
              : "Submitting..."
            : currentRating
              ? "Update Rating"
              : "Submit Rating"}
        </button>
      </div>
    </form>
  );
}

export default RateForm;
