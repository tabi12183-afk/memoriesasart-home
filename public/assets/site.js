(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      menu.classList.toggle('open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
      if (!isOpen) menu.querySelector('a')?.focus();
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); toggle.focus(); }
      if (e.key === 'Tab' && menu.classList.contains('open')) {
        const links = [...menu.querySelectorAll('a')];
        const first = links[0], last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); toggle.focus(); }
        else if (e.shiftKey && document.activeElement === toggle) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); toggle.focus(); }
      }
    });
    window.matchMedia('(min-width: 801px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  }
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const target = document.getElementById(group.dataset.filterGroup);
    if (!target) return;
    const buttons = [...group.querySelectorAll('[data-filter]')];
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      const selected = button.dataset.filter;
      let count = 0;
      target.querySelectorAll('[data-category]').forEach(item => {
        const visible = selected === 'all' || item.dataset.category.split(' ').includes(selected);
        item.hidden = !visible;
        if (visible) count++;
      });
      const status = document.getElementById(group.dataset.filterGroup + '-status');
      if (status) status.textContent = count + (count === 1 ? ' result' : ' results');
    }));
    const requested = new URLSearchParams(window.location.search).get('category');
    if (requested) buttons.find(b => b.dataset.filter === requested)?.click();
  });
  const dialog = document.querySelector('.lightbox');
  if (dialog) {
    const preview = dialog.querySelector('img');
    const caption = dialog.querySelector('.lightbox-caption');
    let active = 0, visible = [], opener = null;
    function show(index) {
      if (!visible.length) return;
      active = (index + visible.length) % visible.length;
      const item = visible[active];
      const original = item.querySelector('img');
      preview.src = item.dataset.full || original.currentSrc || original.src;
      preview.alt = original.alt;
      caption.textContent = (active + 1) + ' / ' + visible.length + ' · ' + original.alt;
    }
    document.querySelectorAll('[data-gallery]').forEach(item => item.addEventListener('click', () => {
      visible = [...document.querySelectorAll('[data-gallery]')].filter(el => !el.hidden);
      opener = item;
      show(visible.indexOf(item));
      dialog.showModal();
      document.body.classList.add('lightbox-open');
    }));
    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-prev]').addEventListener('click', () => show(active - 1));
    dialog.querySelector('[data-next]').addEventListener('click', () => show(active + 1));
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { document.body.classList.remove('lightbox-open'); opener?.focus(); });
    dialog.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(active + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(active - 1); }
    });
  }
  const inquiryTitle = document.querySelector('.inquiry-details h2');
  const service = new URLSearchParams(window.location.search).get('service');
  const serviceLabels = {'Weddings':'Your wedding story.','Portraits':'Your portrait story.','Family portraits':'Your family story.','Newborn portraits':'Your newest chapter.','Maternity portraits':'Your next chapter.','Fine-art children':'Your little daydream.','Pet portraits':'Your favorite companion.','Commercial':'Your brand story.','Real estate':'Your property project.'};
  if (inquiryTitle && serviceLabels[service]) inquiryTitle.textContent = serviceLabels[service];
})();
