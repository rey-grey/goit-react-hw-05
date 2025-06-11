import { Link } from 'react-router-dom';
import './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404 — Page Not Found</h1>
      <p>This page didn`t make the final cut.</p>
      <Link to="/" className="home-link">Back to Home</Link>
    </div>
  );
}
