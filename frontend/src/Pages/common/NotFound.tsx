import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-8xl font-extrabold text-blue-600">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-slate-900">Page not found</h2>

      <p className="mt-3 max-w-md text-slate-500">
        The page you are looking for doesn't exist or may have been moved.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to="/"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          Go Home
        </Link>

        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border cursor-pointer border-slate-300 px-5 py-3 transition hover:bg-slate-100"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
