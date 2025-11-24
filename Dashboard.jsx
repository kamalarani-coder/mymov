import { Link } from "react-router-dom";

export default function Dashboard({ movies, onDeleteMovie }) {
  const handleDelete = (id) => {
    if (!window.confirm("Delete this movie?")) return;
    onDeleteMovie(id);
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Admin Dashboard</h1>
        <Link to="/admin/add" className="btn-primary">
          ➕ Add Movie
        </Link>
      </header>

      <div className="table-wrapper">
        <table className="movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td colSpan="5">No movies found</td>
              </tr>
            ) : (
              movies.map((m) => (
                <tr key={m.id}>
                  <td>{m.title}</td>
                  <td>{m.genre}</td>
                  <td>{m.year}</td>
                  <td>{m.rating}</td>
                  <td>
                    <Link
                      to={`/admin/edit/${m.id}`}
                      className="btn-link"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn-link danger"
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}