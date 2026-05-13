// ── COUNTDOWN ──
const eventDate = new Date('2026-06-08T09:00:00-03:00');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = eventDate - new Date();

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p class="countdown-live">🔴 O evento está acontecendo agora!</p>';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = pad(days);
  document.getElementById('hours').textContent   = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ── POSTS ──
async function loadPosts() {
  const grid  = document.getElementById('posts-grid');
  const empty = document.getElementById('empty-state');

  try {
    const res   = await fetch('posts.json');
    const posts = await res.json();

    if (!posts || posts.length === 0) {
      empty.style.display = 'block';
      return;
    }

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML = `
        <span class="post-tag">${post.tag}</span>
        <h3>${post.titulo}</h3>
        <p>${post.resumo}</p>
        <span class="post-date">${formatDate(post.data)}</span>
      `;
      grid.appendChild(card);
    });
  } catch {
    empty.style.display = 'block';
  }
}

function formatDate(str) {
  return new Date(str + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
}

loadPosts();
