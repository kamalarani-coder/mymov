import MovieCard from "../../components/MovieCard.jsx";

export default function Home({ movies }) {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Movies</h1>
          <p>Browse all movies added by admin.</p>
        </div>
      </header>

      <div className="movie-grid">
        {movies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          movies.map((m) => <MovieCard key={m.id} movie={m} />)
        )}
      </div>
    </div>
  );
}