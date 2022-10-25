import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="bg-white content">
      <div className="container">
        <h2>Page not found</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    </div>
  );
};
