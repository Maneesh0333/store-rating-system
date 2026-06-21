type Props = {
  message: string;
  refetch: ()=> void;
}

function ErrorPage({message, refetch}: Props) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-3">
        <h2 className="text-2xl font-semibold">{message}</h2>
        <button
          onClick={refetch}
          className="flex items-center font-semibold gap-2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
  )
}

export default ErrorPage