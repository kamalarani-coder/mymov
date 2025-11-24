import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-poster-wrapper">
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
        />
        <span className="movie-rating">⭐ {movie.rating}</span>
      </div>

      <div className="movie-content">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-meta">
          {movie.genre} • {movie.year}
        </p>
        <p className="movie-desc">
          {movie.description.length > 80
            ? movie.description.slice(0, 80) + "..."
            : movie.description}
        </p>

        <div className="movie-actions">
          <Link to={`/movie/${movie.id}`} className="btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}