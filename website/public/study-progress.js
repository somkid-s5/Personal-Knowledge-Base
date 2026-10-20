// Browser-only learning progress; the JSON is generated from one curated learning plan.
(async () => {
  const containers = document.querySelectorAll('[data-learning-course]');
  if (!containers.length) return;
  try {
    const response = await fetch('/Personal-Knowledge-Base/learning-paths.json');
    if (!response.ok) return;
    const paths = await response.json();
    const completed = (entry) => {
      try {
        const key = 'smart-learning:v2:completed:' + entry.id;
        const prior = 'smart-learning:v1:completed:' + entry.legacyId;
        if (localStorage.getItem(key) === null && localStorage.getItem(prior) === '1') localStorage.setItem(key, '1');
        localStorage.removeItem(prior);
        return localStorage.getItem(key) === '1';
      } catch { return false; }
    };
    for (const container of containers) {
      const course = container.getAttribute('data-learning-course');
      const entries = paths[course] || [];
      if (!entries.length) continue;
      const stage = container.getAttribute('data-stage-index');
      if (stage !== null) {
        const subset = entries.filter(entry => String(entry.stage) === stage);
        container.textContent = '✅ เรียนแล้ว ' + subset.filter(completed).length + '/' + subset.length + ' บท';
        continue;
      }
      const count = entries.filter(completed).length;
      const next = entries.find(entry => !completed(entry));
      const status = container.querySelector('.course-resume span');
      const label = container.classList.contains('course-resume') ? container.querySelector('span') : status;
      const link = container.querySelector('a[data-course-next]');
      if (label) label.textContent = '✅ เรียนแล้ว ' + count + '/' + entries.length + ' บท';
      if (link) {
        link.href = next ? next.url : '/Personal-Knowledge-Base/' + course + '/';
        link.textContent = next ? (count ? 'เรียนต่อ →' : 'เริ่มบทแรก →') : 'ทบทวนอีกครั้ง →';
        if (next) link.title = next.title;
      }
    }
  } catch {
    // Notes and navigation remain available if storage or the metadata file fails.
  }
})();
