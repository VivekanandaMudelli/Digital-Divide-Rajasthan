const segments = [
  {id:1, title:'Digitally‑Excluded Households'},
  {id:2, title:'Basic Connectivity Users'},
  {id:3, title:'Regional‑Language Dependent Users'},
  {id:4, title:'School‑Age Learners'},
  {id:5, title:'Rural Service‑Oriented Users'},
  {id:6, title:'Mobile‑Only Entertainment Users'},
  {id:7, title:'Digitally‑Assisted Small Business Owners'},
  {id:8, title:'Urban Digital Learners & Aspirants'},
  {id:9, title:'Formal Digital Workforce Users'},
  {id:10, title:'Hyper‑Connected Household Environments'}
];

const nav = document.getElementById('nav');
const main = document.getElementById('main');

// Build navigation chips
segments.forEach(s => {
  const btn = document.createElement('button');
  btn.className = 'chip';
  btn.innerText = s.id + '. ' + s.title.split(' ')[0];
  btn.onclick = () => document.getElementById('seg-' + s.id).scrollIntoView({behavior: 'smooth', block: 'start'});
  btn.setAttribute('aria-label', s.title);
  nav.appendChild(btn);
});

// Highlight nav on intersection (scrolling)
const chips = Array.from(document.querySelectorAll('.chip'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.id.split('-')[1];
      chips.forEach((c, i) => c.classList.toggle('active', (i + 1) == id));
    }
  });
}, { root: main, threshold: 0.6 });

document.querySelectorAll('.segment').forEach(s => observer.observe(s));

// Helper functions attached to window for HTML onclick attributes
window.scrollToNext = function(nextId) {
  const el = document.getElementById(nextId);
  if(el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
}

window.scrollToTop = function() {
  main.scrollTo({top: 0, behavior: 'smooth'});
}

// Back-to-top button event listener
document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('backTop');
  if(backBtn) {
    backBtn.addEventListener('click', window.scrollToTop);
  }
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
  const visibleIndex = segments.findIndex(s => {
    const el = document.getElementById('seg-' + s.id);
    if(!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.top < window.innerHeight / 2;
  });
  
  if(e.key === 'ArrowDown') {
    e.preventDefault();
    const next = segments[visibleIndex + 1];
    if(next) window.scrollToNext('seg-' + next.id);
  }
  
  if(e.key === 'ArrowUp') {
    e.preventDefault();
    const prev = segments[visibleIndex - 1];
    if(prev) window.scrollToNext('seg-' + prev.id);
  }
});