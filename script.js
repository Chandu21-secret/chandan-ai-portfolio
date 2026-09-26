const progress = document.querySelector('.scroll-progress span');
const line = document.querySelector('.scroll-line');
const topBtn = document.querySelector('.to-top');
const navLinks = [...document.querySelectorAll('.nav nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

const updateScrollUI = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progress) progress.style.width = `${pct}%`;
  if (line) line.style.setProperty('--scroll-pct', `${pct}%`);
  if (topBtn) topBtn.classList.toggle('visible', window.scrollY > 500);
};

window.addEventListener('scroll', updateScrollUI, {passive:true});
updateScrollUI();

if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
}, {threshold:.12, rootMargin:'0px 0px -40px 0px'});

document.querySelectorAll('.reveal, .section, .job, .project, .skill-grid article').forEach(el => revealObserver.observe(el));

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin:'-30% 0px -55% 0px', threshold:0});
sections.forEach(section => navObserver.observe(section));

// subtle mouse parallax for the hero visual
const heroCard = document.querySelector('.hero-card');
if (heroCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroCard.addEventListener('mousemove', e => {
    const r = heroCard.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-.5)*8;
    const y = ((e.clientY-r.top)/r.height-.5)*8;
    heroCard.style.transform = `translate3d(${x}px,${y}px,0)`;
  });
  heroCard.addEventListener('mouseleave', () => heroCard.style.transform='');
}
