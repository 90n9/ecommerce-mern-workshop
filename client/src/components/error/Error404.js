import { Link } from "react-router-dom";

function Error404() {
  return (
    <>
      <h1 className="text-center py-4">
        <span className="border-bottom border-2 border-primary display-1">404</span>
      </h1>
      <div className="text-center">
        <p className="h2">Page not found.</p>
        <p className="text-muted h5 mt-4">Looks like this page doesn't exist.</p>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary">
            Back to <span className="fa fa-home"></span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Error404;