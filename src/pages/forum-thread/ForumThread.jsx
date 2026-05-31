import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/buttons';
import { ChatBubbleIcon, FlagIcon, ThumbUpIcon, ShareIcon } from '../../components/icons';
import { useAuth } from '../../firebase/AuthContext';
import '../communication/Communication.css';

const FORUM_THREADS = [
  { id: 'missing-cat-23322', initials: 'AM', title: 'Zaginął kot (MCO) - Blok B', meta: 'Anna M. • 2 godz. temu', tag: 'Zwierzęta', replies: 12, content: 'Drodzy sąsiedzi, dzisiaj rano (ok. godziny 7:00) mój kot, Leon, wymknął się z mieszkania na parterze. Leon jest biało-rudy, ma charakterystyczną plamkę na nosie i zielone oczy. Jest dość płochliwy, ale reaguje na imię.\n\nOstatni raz był widziany przez sąsiada przy placu zabaw między blokiem A i B. Bardzo proszę o kontakt, jeśli ktokolwiek go widział lub wie, gdzie może się chować. Miał na sobie niebieską obrożę z adresatką.' },
  { id: 'plumber-43423', initials: 'PL', title: 'Rekomendacja hydraulika?', meta: 'Piotr L. • wczoraj', tag: 'Usługi', replies: 7, content: 'Cześć! Szukam sprawdzonego hydraulika do drobnej usterki w łazience (cieknący kran i wymiana syfonu). Macie kogoś godnego polecenia z naszej okolicy, kto nie zedrze milionów?' },
  { id: 'noise-56564', initials: 'KB', title: 'Hałas w nocy – co robić?', meta: 'Kasia B. • 2 dni temu', tag: 'Porządek', replies: 5, content: 'Sąsiedzi z klatki C, czy Wy też słyszycie od kilku dni regularne stukanie po godzinie 23:00? Nie potrafię zlokalizować piętra, ale niesie się po pionie. Ktoś coś wie?' },
  { id: 'bicycle-34432', initials: 'MT', title: 'Stojaki rowerowe przy wejściu', meta: 'Marek T. • 3 dni temu', tag: 'Infrastruktura', replies: 9, content: 'Złożyłem wniosek do administracji o zamontowanie dodatkowych stojaków w kształcie odwróconego U przed blokiem D. Aktualne wyrwikółka to dramat. Kto z Was by z tego korzystał? Możemy zebrać podpisy.' },
  { id: 'playground-24423', initials: 'JG', title: 'Propozycje dot. placu zabaw', meta: 'Joanna G. • tydzień temu', tag: 'Sąsiedzi', replies: 18, content: 'Zbliża się wiosna. Warto byłoby pomyśleć o odświeżeniu placu zabaw. Brakuje huśtawki dla najmniejszych dzieci. Zgłaszam ten temat pod dyskusję, dajcie znać co myślicie.' },
  { id: 'internet-42442', initials: 'RS', title: 'Polecany dostawca internetu', meta: 'Rafał S. • tydzień temu', tag: 'Usługi', replies: 21, content: 'Będę się wkrótce wprowadzał. Jakiego dostawcę internetu polecacie w naszym bloku? Zależy mi na stabilnym łączu do pracy zdalnej, najlepiej światłowód.' },
];

const DUMMY_AUTHORS = ['Jan K.', 'Maria W.', 'Tomasz P.', 'Agnieszka S.', 'Michał R.', 'Karolina Z.', 'Paweł M.'];
const DUMMY_CONTENTS = [
  'Trzymam kciuki za pomyślne rozwiązanie sprawy!',
  'Dzięki za info, będę miał to na uwadze.',
  'U mnie sytuacja wygląda podobnie.',
  'Podbijam temat, bardzo ważna sprawa.',
  'Czy zgłaszałeś to już do administracji?',
  'Super inicjatywa, masz mój pełny poparcie.',
  'Zgadzam się w 100% z przedmówcą.'
];

const generateRandomComments = (count) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: `rand-${Date.now()}-${index}`,
    initials: DUMMY_AUTHORS[index % DUMMY_AUTHORS.length].slice(0, 2).toUpperCase(),
    author: DUMMY_AUTHORS[index % DUMMY_AUTHORS.length],
    time: `${index + 1} godz. temu`,
    content: DUMMY_CONTENTS[index % DUMMY_CONTENTS.length],
  }));
};

export default function ForumThread() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  
  const commentInputRef = useRef(null);
  
  const post = useMemo(() => {
    const savedPosts = localStorage.getItem('forum_posts');
    const userPosts = savedPosts ? JSON.parse(savedPosts) : [];
    const allThreads = [...userPosts, ...FORUM_THREADS];
    return allThreads.find(t => t.id === threadId);
  }, [threadId]);

  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getNameParts = () => {
    const firstNameRaw = userData?.firstName ?? '';
    const lastNameRaw = userData?.lastName ?? '';

    if (String(firstNameRaw).trim() || String(lastNameRaw).trim()) {
      return {
        firstName: String(firstNameRaw).trim(),
        lastName: String(lastNameRaw).trim(),
      };
    }

    const displayName = user?.displayName ? String(user.displayName).trim() : '';
    if (!displayName) {
      return { firstName: '', lastName: '' };
    }

    const parts = displayName.split(/\s+/).filter(Boolean);
    return {
      firstName: parts[0] ?? '',
      lastName: parts.slice(1).join(' '),
    };
  };

  const formatAuthor = ({ firstName, lastName }) => {
    const safeFirst = firstName ? firstName[0].toUpperCase() + firstName.slice(1) : '';
    const lastInitial = lastName ? lastName.trim().charAt(0).toUpperCase() : '';

    if (safeFirst && lastInitial) return `${safeFirst} ${lastInitial}.`;
    if (safeFirst) return safeFirst;
    return 'Ty';
  };

  const formatInitials = ({ firstName, lastName }) => {
    const firstInitial = firstName ? firstName.trim().charAt(0) : '';
    const lastInitial = lastName ? lastName.trim().charAt(0) : '';
    const combined = `${firstInitial}${lastInitial}`.toUpperCase();
    if (combined) return combined;

    if (firstName) return firstName.trim().slice(0, 2).toUpperCase();
    if (user?.email) return String(user.email).trim().slice(0, 2).toUpperCase();
    return 'TY';
  };

  const nameParts = getNameParts();
  const myAuthorLabel = formatAuthor(nameParts);
  const myInitials = formatInitials(nameParts);

  useEffect(() => {
    if (!post) return;

    const savedComments = localStorage.getItem(`forum_comments_${threadId}`);
    if (savedComments) {
      try {
        const parsed = JSON.parse(savedComments);
        const upgraded = Array.isArray(parsed)
          ? parsed.map((c) => {
              const isMineByUid = Boolean(user?.uid && c?.authorId && c.authorId === user.uid);
              const isLegacyMine = c?.author === 'Ty' && c?.initials === 'TY';
              const isMine = Boolean(c?.isMine || isMineByUid || isLegacyMine);

              return isMine
                ? {
                    ...c,
                    isMine: true,
                    authorId: user?.uid ?? c?.authorId ?? null,
                    author: myAuthorLabel,
                    initials: myInitials,
                  }
                : c;
            })
          : [];

        setComments(upgraded);
      } catch {
        setComments([]);
      }
    } else {
      const newComments = generateRandomComments(post.replies || 0);
      setComments(newComments);
      localStorage.setItem(`forum_comments_${threadId}`, JSON.stringify(newComments));
    }

    const savedLike = localStorage.getItem(`forum_liked_${threadId}`);
    if (savedLike === 'true') {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [threadId, post]);

  useEffect(() => {
    if (post && comments.length > 0) {
      localStorage.setItem(`forum_comments_${threadId}`, JSON.stringify(comments));
    }
  }, [comments, threadId, post]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: Date.now(),
      initials: myInitials,
      author: myAuthorLabel,
      authorId: user?.uid ?? null,
      isMine: true,
      time: 'przed chwilą',
      content: newCommentText.trim(),
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentText('');
  };

  const handleReplyClick = (authorName, commentContent) => {
    const quoteText = `@${authorName}\n> ${commentContent}\n\n`;
    
    setNewCommentText((prev) => prev ? `${prev}\n${quoteText}` : quoteText);
    
    if (commentInputRef.current) {
      commentInputRef.current.focus();
      commentInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleToggleLike = () => {
    setIsLiked((prev) => {
      const newState = !prev;
      localStorage.setItem(`forum_liked_${threadId}`, String(newState));
      return newState;
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (!post) {
    return (
      <div className="communication-wrapper">
        <header className="communication-header">
          <h1 className="communication-title">Błąd 404</h1>
          <p className="communication-subtitle">Nie znaleziono takiej dyskusji.</p>
          <Button onClick={() => navigate('/communication')} style={{ width: 'fit-content', marginTop: '16px' }}>
            Wróć do forum
          </Button>
        </header>
      </div>
    );
  }

  const [authorName, postTime] = post.meta.split(' • ');
  const baseLikes = post.replies > 0 ? post.replies + 3 : 0;
  const totalLikes = isLiked ? baseLikes + 1 : baseLikes;

  return (
    <div className="communication-wrapper forum-thread-wrapper">
      <header className="communication-header">
        <h1 className="communication-title">Forum Mieszkańców</h1>
        <p className="communication-subtitle" style={{ cursor: 'pointer', transition: 'color 0.15s' }} onClick={() => navigate('/communication')}>
          Komunikacja &rsaquo; Forum Mieszkańców &rsaquo; Dyskusja #{post.id.slice(-4).toUpperCase()}
        </p>
      </header>

      {/* ── Główny post ── */}
      <section className="communication-card forum-post-main">
        
        {/* Autor i Metadane */}
        <div className="forum-post-header">
          <div className="forum-post-author-info">
            <div className="communication-avatar">{post.initials}</div>
            <div>
              <h4 className="forum-author-name">{authorName || post.author || 'Mieszkaniec'}</h4>
              <p className="forum-author-meta">Opublikowano: {postTime || 'Niedawno'}</p>
            </div>
          </div>
          {post.id === 'missing-cat-23322' && <span className="forum-badge-urgent">PILNE</span>}
        </div>

        {/* Treść */}
        <div className="forum-post-body">
          <h2 className="forum-post-title">{post.title}</h2>
          <div className="forum-post-text">
            {post.content ? (
              post.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>Treść dyskusji...</p>
            )}
          </div>
          {post.id === 'missing-cat-23322' && (
            <div className="forum-post-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=800&auto=format&fit=crop" 
                alt="Zaginiony kot" 
                className="forum-post-image"
              />
            </div>
          )}
          {post.id === 'plumber-43423' && (
            <div className="forum-post-image-wrap">
              <img 
                src="https://plus.unsplash.com/premium_photo-1663045495725-89f23b57cfc5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Plumber" 
                className="forum-post-image"
              />
            </div>
          )}
          {post.id === 'bicycle-34432' && (
            <div className="forum-post-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Stojak na rowery" 
                className="forum-post-image"
              />
            </div>
          )}
          {post.photo && post.id !== 'missing-cat-23322' && (
            <div className="forum-post-image-wrap forum-post-image-wrap--attachment">
              [Załączono plik: {post.photo}]
            </div>
          )}
        </div>

        {/* Akcje pod postem */}
        <div className="forum-post-actions">
          <button 
            className={`forum-action-btn ${isLiked ? 'forum-action-btn--liked' : ''}`} 
            onClick={handleToggleLike}
          >
            <ThumbUpIcon width={16} height={16} /> Pomocne ({totalLikes})
          </button>
          {/* Nowe podpięcia pod przyciski Udostępnij i Zgłoś */}
          <button className="forum-action-btn" onClick={() => setIsShareModalOpen(true)}>
            <ShareIcon width={16} height={16} /> Udostępnij
          </button>
          <button className="forum-action-btn" onClick={() => setIsReportModalOpen(true)}>
            <FlagIcon width={16} height={16} /> Zgłoś
          </button>
        </div>
      </section>

      {/* ── Sekcja Komentarzy ── */}
      <section className="forum-comments-section">
        <div className="forum-comments-header">
          <ChatBubbleIcon width={20} height={20} className="communication-theme-text-announcements" />
          <h3 className="forum-comments-title">Komentarze ({comments.length})</h3>
        </div>

        <div className="communication-card forum-comment-add">
          <div className="communication-avatar">{myInitials}</div>
          <form className="forum-comment-form" onSubmit={handleAddComment}>
            <textarea
              ref={commentInputRef}
              className="communication-textarea forum-comment-input"
              placeholder="Dodaj pomocny komentarz..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              rows={3}
            />
            <div className="forum-comment-submit-wrap">
              <Button type="submit" className="communication-btn forum-comment-btn" disabled={!newCommentText.trim()}>
                Dodaj komentarz
              </Button>
            </div>
          </form>
        </div>

        <div className="forum-comments-list">
          {comments.map((comment) => (
            <article key={comment.id} className="communication-card forum-comment-item">
              <div className="forum-comment-avatar-wrap">
                <div className="communication-avatar communication-avatar--small">{comment.initials}</div>
              </div>
              <div className="forum-comment-content">
                <div className="forum-comment-meta">
                  <span className="forum-comment-author">{comment.author}</span>
                  <span className="forum-comment-time">• {comment.time}</span>
                </div>
                <p className="forum-comment-text">{comment.content}</p>
                <button 
                  className="forum-reply-btn" 
                  onClick={() => handleReplyClick(comment.author, comment.content)}
                >
                  Odpowiedz
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── POPUP: ZGŁOŚ ── */}
      {isReportModalOpen && (
        <div className="communication-modal-overlay" onClick={() => setIsReportModalOpen(false)}>
          <div className="communication-modal" onClick={(e) => e.stopPropagation()}>
            <div className="communication-modal__header">
              <div className="communication-modal__title-row">
                <div className="communication-modal__title-group">
                  <h3 className="communication-modal__title">Zgłoszono post</h3>
                  <p className="communication-modal__desc">
                    Dziękujemy za czujność. Zgłoszenie zostało przekazane administracji, która wkrótce przyjrzy się temu wpisowi.
                  </p>
                </div>
              </div>
            </div>
            <div className="communication-modal__actions">
              <Button className="communication-btn" onClick={() => setIsReportModalOpen(false)}>
                Zamknij
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── POPUP: UDOSTĘPNIJ ── */}
      {isShareModalOpen && (
        <div className="communication-modal-overlay" onClick={() => setIsShareModalOpen(false)}>
          <div className="communication-modal" onClick={(e) => e.stopPropagation()}>
            <div className="communication-modal__header">
              <div className="communication-modal__title-row">
                <div className="communication-modal__title-group">
                  <h3 className="communication-modal__title">Udostępnij post</h3>
                  <p className="communication-modal__desc">
                    Skopiuj poniższy adres, aby podzielić się tą dyskusją z innymi.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Pole z widocznym linkiem */}
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border-default)',
              wordBreak: 'break-all',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: 'var(--text-primary)'
            }}>
              {window.location.href}
            </div>

            <div className="communication-modal__actions" style={{ gap: '16px' }}>
              <Button 
                className="communication-btn communication-btn--cancel" 
                onClick={() => {
                  setIsShareModalOpen(false);
                  setIsCopied(false);
                }}
              >
                Anuluj
              </Button>
              <Button className="communication-btn" onClick={handleCopyLink}>
                {isCopied ? 'Skopiowano! ✓' : 'Skopiuj adres'}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}