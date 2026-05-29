import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, CameraIcon } from '../../components/icons';
import { Button } from '../../components/buttons';
import '../communication/Communication.css';

const TAGS = [
  'Sąsiedzi',
  'Usługi',
  'Zwierzęta',
  'Porządek',
  'Infrastruktura',
  'Inne'
];

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState(TAGS[0]);
  const [content, setContent] = useState('');
  
  const [photoName, setPhotoName] = useState(null);
  const photoInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      initials: 'TY',
      title: title.trim(),
      meta: 'Ty • przed chwilą',
      tag: tag,
      replies: 0,
      content: content.trim(),
      photo: photoName 
    };

    const saved = localStorage.getItem('forum_posts');
    const existingPosts = saved ? JSON.parse(saved) : [];
    localStorage.setItem('forum_posts', JSON.stringify([newPost, ...existingPosts]));

    navigate('/communication');
  };

  return (
    <div className="communication-wrapper">
      <header className="communication-header">
        <h1 className="communication-title">Nowy wpis</h1>
        <p className="communication-subtitle">Podziel się informacją lub zapytaj sąsiadów.</p>
      </header>

      <section className="communication-card">
        <form className="communication-form" onSubmit={handleSubmit}>
          
          <div className="communication-field">
            <label className="communication-label" htmlFor="post-title">
              Tytuł wpisu
            </label>
            <input
              id="post-title"
              type="text"
              className="communication-input"
              placeholder="Napisz zwięzły tytuł..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="communication-field">
            <label className="communication-label" htmlFor="post-tag">
              Kategoria
            </label>
            <div className="communication-select-wrap">
              <select
                id="post-tag"
                className="communication-select"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                {TAGS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDownIcon
                width={16}
                height={16}
                className="communication-select-chevron"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="communication-field">
            <label className="communication-label" htmlFor="post-content">
              Treść wiadomości
            </label>
            <textarea
              id="post-content"
              className="communication-textarea"
              placeholder="Opisz swój temat szczegółowo..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Dolny pasek z akcjami (zdjęcie + przyciski publikacji) */}
          <div className="communication-form-actions">
            <label className="communication-photo-btn" htmlFor="post-photo">
              <CameraIcon width={18} height={18} aria-hidden="true" />
              {photoName ? photoName : "Dodaj zdjęcie (opcjonalnie)"}
              <input
                ref={photoInputRef}
                id="post-photo"
                type="file"
                accept="image/*"
                className="communication-photo-input"
                onChange={handlePhotoChange}
              />
            </label>

            <div className="communication-form-buttons">
              <Button
                type="button"
                className="communication-btn communication-btn--cancel"
                onClick={() => navigate('/communication')}
              >
                Anuluj
              </Button>
              <Button
                type="submit"
                className="communication-btn"
                disabled={!title.trim() || !content.trim()}
              >
                Opublikuj wpis
              </Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}