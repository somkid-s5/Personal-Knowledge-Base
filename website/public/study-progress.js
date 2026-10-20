// Browser-only study progress. No account or server-side tracking.
(async () => {
  const containers = document.querySelectorAll('[data-learning-course]');
  if (!containers.length) return;
  try {
    const response = await fetch('/Personal-Knowledge-Base/learning-paths.json');
    if (!response.ok) return;
    const paths = await response.json();
    for (const container of containers) {
      const key = container.getAttribute('data-learning-course');
      const entries = paths[key] || [];
      if (!entries.length) continue;
      const completed = (entry) => {
        try { return localStorage.getItem('smart-learning:v1:completed:' + entry.id) === '1'; }
        catch { return false; }
      };
      const count = entries.filter(completed).length;
      const next = entries.find(entry => !completed(entry));
      const status = container.querySelector('.course-resume span');
      const link = container.querySelector('a[data-course-next]');
      if (status) status.textContent = '✅ เรียนแล้ว ' + count + '/' + entries.length + ' บท';
      if (link) {
        link.href = next ? next.url : '/Personal-Knowledge-Base/' + key + '/';
        link.textContent = next ? (count ? 'เรียนต่อ →' : 'เริ่มบทแรก →') : 'ทบทวนอีกครั้ง →';
        if (next) link.title = next.title;
      }
    }
  } catch {
    // The website remains fully navigable if storage or JSON is unavailable.
  }
})();
