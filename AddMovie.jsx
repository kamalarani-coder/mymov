import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emptyForm = {
  title: "",
  genre: "Action",
  year: "",
  rating: "",
  poster: "",
  description: ""
};

export default function AddMovie({ onAddMovie }) {
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title required");
      return;
    }

    onAddMovie({
      title: form.title.trim(),
      genre: form.genre,
      year: Number(form.year) || new Date().getFullYear(),
      rating: Number(form.rating) || 0,
      poster:
        form.poster.trim() ||
        "https://via.placeholder.com/400x600?text=Movie+Poster",
      description: form.description.trim() || "No description provided."
    });

    setForm(emptyForm);
    navigate("/dashboard");
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Add Movie</h1>
      </header>

      <form onSubmit={handleSubmit} className="form-card">
        <label className="input-label">
          Title
          <input
            className="input"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Movie title"
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
              placeholder="2024"
            />
          </label>

          <label className="input-label">
            Rating
            <input
              className="input"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="8.5"
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
            placeholder="https://..."
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
            placeholder="Short description"
          />
        </label>

        <button type="submit" className="btn-primary">
          Save Movie
        </button>
      </form>
    </div>
  );
}