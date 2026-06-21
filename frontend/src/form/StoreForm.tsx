import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useCreateStore } from "../hooks/admin/useCreateStore";
import type { CreateStoreInput } from "../types/admin.types";
import { storeSchema } from "../validations/admin.schema";
import { useStoreOwners } from "../hooks/admin/useStoreOwners";

type Props = {
  onClose: () => void;
};

function StoreForm({ onClose }: Props) {
  const createStoreMutation = useCreateStore();
  const { data, isLoading } = useStoreOwners();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateStoreInput>({
    resolver: yupResolver(storeSchema),
    mode: "onChange",
  });

  const onSubmit = (data: CreateStoreInput) => {
    createStoreMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Store Name */}
      <div>
        <label className="block mb-2 text-sm font-medium">Store Name</label>

        <input
          {...register("name")}
          placeholder="Amazon Store"
          className={`w-full rounded-lg border px-4 py-3 transition
          ${
            errors.name
              ? "border-red-500"
              : "border-gray-300 focus:outline-blue-500"
          }`}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 text-sm font-medium">Email</label>

        <input
          {...register("email")}
          placeholder="store@gmail.com"
          className={`w-full rounded-lg border px-4 py-3 transition
          ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 focus:outline-blue-500"
          }`}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block mb-2 text-sm font-medium">Address</label>

        <textarea
          rows={4}
          {...register("address")}
          placeholder="Enter address"
          className={`w-full resize-none rounded-lg border px-4 py-3 transition
          ${
            errors.address
              ? "border-red-500"
              : "border-gray-300 focus:outline-blue-500"
          }`}
        />

        {errors.address && (
          <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Owner */}
      <div>
        <label className="block mb-2 text-sm font-medium">Owner</label>

        <select
          {...register("ownerId")}
          disabled={isLoading || data?.data.length === 0}
          className={`w-full rounded-lg border px-4 py-3
  ${
    errors.ownerId ? "border-red-500" : "border-gray-300 focus:outline-blue-500"
  }
  disabled:bg-gray-100 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <option>Loading owners...</option>
          ) : data?.data.length === 0 ? (
            <option>No store owners found</option>
          ) : (
            <>
              <option value="">Select Owner</option>

              {data?.data.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </>
          )}
        </select>

        {errors.ownerId && (
          <p className="mt-1 text-sm text-red-500">{errors.ownerId.message}</p>
        )}

        {errors.ownerId && (
          <p className="mt-1 text-sm text-red-500">{errors.ownerId.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border cursor-pointer border-gray-300 px-5 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!isValid || createStoreMutation.isPending}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createStoreMutation.isPending ? "Creating..." : "Create Store"}
        </button>
      </div>
    </form>
  );
}

export default StoreForm;
