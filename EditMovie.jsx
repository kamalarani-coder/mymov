import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const emptyForm = {
  title: "",
  genre: "Action",
  year: "",
  rating: "",
  poster: "",
  description: ""
};

export default function EditMovie({ movies, onUpdateMovie }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const movie = movies.find((m) => m.id === Number(id));
    if (!movie) return;

    setForm({
      title: movie.title,
      genre: movie.genre,
      year: String(movie.year),
      rating: String(movie.rating),
      poster: movie.poster,
      description: movie.description
    });
  }, [id, movies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateMovie(Number(id), {
      title: form.title.trim(),
      genre: form.genre,
      year: Number(form.year) || new Date().getFullYear(),
      rating: Number(form.rating) || 0,
      poster:
        form.poster.trim() ||
        "https://via.placeholder.com/400x600?text=Movie+Poster",
      description: form.description.trim() || "No description provided."
    });

    navigate("/dashboard");
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Edit Movie</h1>
      </header>

      <form onSubmit={handleSubmit} className="form-card">
        <label className="input-label">
          Title
          <input
            className="input"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </label>

        <label className="input-label">
          Genre
          <select
            className="input"
            name="genre"
            value={form.genre}
            onChange={handleChange}
          >
            <option>Action</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Horror</option>
          </select>
        </label>

        <div className="form-row">
          <label className="input-label">
            Year
            <input
              className="input"
              name="year"
              value={form.year}
              onChange={handleChange}
            />
          </label>

          <label className="input-label">
            Rating
            <input
              className="input"
              name="rating"
              value={form.rating}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="input-label">
          Poster URL
          <input
            className="input"
            name="poster"
            value={form.poster}
            onChange={handleChange}
          />
        </label>

        <label className="input-label">
          Description
          <textarea
            className="input textarea"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="btn-primary">
          Update Movie
        </button>
      </form>
    </div>
  );
}