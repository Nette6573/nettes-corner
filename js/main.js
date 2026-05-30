// Shared post page JS

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Reading progress bar
const bar = document.getElementById('readingProgress');
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  bar.style.width = scrollHeight ? (scrollTop / scrollHeight * 100) + '%' : '0%';
});

// TOC active state
const tocLinks = document.querySelectorAll('.toc-item a');
const headings = document.querySelectorAll('.article-body h2, .article-body h3');
if (tocLinks.length && headings.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector('.toc-item a[href="#' + e.target.id + '"]');
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  headings.forEach(h => obs.observe(h));
}

// Newsletter button
function subscribeNL(btn) {
  btn.textContent = '✓ You\'re in!';
  btn.style.background = '#4A3F3A';
  btn.disabled = true;
}

// Share
function share(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const links = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    copy: null
  };
  if (platform === 'copy') {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = document.querySelector('[onclick="share(\'copy\')"]');
      if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => btn.textContent = 'Copy Link', 2000); }
    });
  } else {
    window.open(links[platform], '_blank', 'width=600,height=400');
  }
}
