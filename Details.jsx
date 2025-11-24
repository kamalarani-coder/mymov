import { useParams, useNavigate } from "react-router-dom";

export default function Details({ movies }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return (
      <div className="page">
        <p>Movie not found.</p>
        <button className="btn-secondary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="page details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-hero">
        <div className="details-hero-left">
          <img
            src={movie.poster}
            alt={movie.title}
            className="details-poster"
          />
        </div>

        <div className="details-hero-right">
          <h1 className="details-title">{movie.title}</h1>

          <div className="details-tags">
            <span className="chip chip-genre">{movie.genre}</span>
            <span className="chip">{movie.year}</span>
            <span className="chip">⭐ {movie.rating}</span>
          </div>

          <p className="details-desc">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
}