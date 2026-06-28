// Scroll-spy: highlight the sub-nav link of the section in view
const navLinks = Array.from(document.querySelectorAll('.subnav a'));
const byId = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));
const sections = Array.from(document.querySelectorAll('main section[id]'));

const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = byId.get(e.target.id);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
sections.forEach(s => spy.observe(s));

// Copy BibTeX
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const target = document.querySelector(btn.dataset.copyTarget);
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.innerText.trim());
      const old = btn.textContent;
      btn.textContent = 'Copied ✓';
      setTimeout(() => (btn.textContent = old), 1600);
    } catch (_) {
      const r = document.createRange();
      r.selectNode(target);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
    }
  });
});
