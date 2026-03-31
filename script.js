const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  ring.style.left   = e.clientX + 'px';
  ring.style.top    = e.clientY + 'px';
});

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

function openGame(title, url) {
  if (!url || url.includes('YOUR_GODOT')) {
    alert('⚠️ Replace the URL with your actual Godot HTML5 export path.\n\nExport from Godot: Project → Export → HTML5\nThen upload the folder and link the index.html here.');
    return;
  }
  document.getElementById('modal-title').textContent = title;
  document.getElementById('game-frame').src = url;
  document.getElementById('play-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGame() {
  document.getElementById('play-modal').classList.remove('open');
  document.getElementById('game-frame').src = '';
  document.body.style.overflow = '';
}

document.getElementById('play-modal').addEventListener('click', function(e) {
  if (e.target === this) closeGame();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeGame();
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--text)'
      : '';
  });
});
