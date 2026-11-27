document.getElementById('copyright-year').textContent = new Date().getFullYear();

// custom cursor pill on Writing links, following the mouse
(() => {
  const label = document.getElementById('cursor-label');
  if (!label) return;
  document.addEventListener('mousemove', (e) => {
    label.style.left = e.clientX + 'px';
    label.style.top = e.clientY + 'px';
  });
  const iconEl = document.getElementById('cursor-label-icon');
  const textEl = document.getElementById('cursor-label-text');
  document.querySelectorAll('.item a.title[target="_blank"], .book[target="_blank"]').forEach((link) => {
    link.addEventListener('mouseenter', () => {
      iconEl.innerHTML = `<use href="#icon-${link.dataset.cursorIcon}"></use>`;
      textEl.textContent = link.dataset.cursorText || '';
      label.classList.add('active');
    });
    link.addEventListener('mouseleave', () => label.classList.remove('active'));
  });
})();
// scramble-and-settle hover effect for section headers
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// avatar looks toward the cursor anywhere on the page, using 9 pre-shot frames
(() => {
  const img = document.getElementById('avatar-img');
  if (!img) return;
  const FRAMES = ['Center', 'Top', 'Top-Right', 'Right', 'Below-Right', 'Below', 'Below-Left', 'Left', 'Top-Left'];
  // preload so swapping frames is instant, not a fresh disk fetch each time
  FRAMES.forEach((f) => { new Image().src = `assets/avatar/${f}.png`; });

  const DEAD_ZONE = 24; // px from center before it looks away from Center
  let current = 'Center';
  let rect = img.getBoundingClientRect();
  window.addEventListener('resize', () => { rect = img.getBoundingClientRect(); });

  let queued = false, lastEvent = null;
  const update = () => {
    queued = false;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = lastEvent.clientX - cx;
    const dy = lastEvent.clientY - cy;
    const dist = Math.hypot(dx, dy);

    let next = 'Center';
    if (dist > DEAD_ZONE) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180..180, 0 = right
      if (angle >= -22.5 && angle < 22.5) next = 'Right';
      else if (angle >= 22.5 && angle < 67.5) next = 'Below-Right';
      else if (angle >= 67.5 && angle < 112.5) next = 'Below';
      else if (angle >= 112.5 && angle < 157.5) next = 'Below-Left';
      else if (angle >= 157.5 || angle < -157.5) next = 'Left';
      else if (angle >= -157.5 && angle < -112.5) next = 'Top-Left';
      else if (angle >= -112.5 && angle < -67.5) next = 'Top';
      else next = 'Top-Right';
    }

    if (next !== current) {
      current = next;
      img.src = `assets/avatar/${next}.png`;
    }
  };

  document.addEventListener('mousemove', (e) => {
    lastEvent = e;
    if (!queued) { queued = true; requestAnimationFrame(update); }
  });
})();

document.querySelectorAll('section > h2').forEach((el) => {
  const original = el.textContent;
  let frame = 0, raf = null;

  const scramble = () => {
    frame++;
    el.textContent = original
      .split('')
      .map((ch, i) => {
        if (ch === ' ') return ' ';
        const revealAt = i * 2; // letters lock in left-to-right
        if (frame >= revealAt + 8) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');
    if (frame < original.length * 2 + 8) {
      raf = requestAnimationFrame(scramble);
    } else {
      el.textContent = original;
    }
  };

  el.addEventListener('mouseenter', () => {
    cancelAnimationFrame(raf);
    frame = 0;
    scramble();
  });
});
