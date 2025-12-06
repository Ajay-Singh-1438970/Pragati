function NotFound() {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white text-center px-3"
    >
      {/* Animated Bootstrap spinner (as the animation effect) */}
      <div 
        className="spinner-border text-light mb-4" 
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      ></div>

      <h1 className="display-4 fw-bold">You seem to be lost...</h1>
      <p className="lead mt-2 mb-4">
        This page does not exist or might have been moved.
      </p>

      <a href="/" className="btn btn-outline-light btn-lg">
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;
