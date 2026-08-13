(() => {
  const lessons = window.COURSE || [];
  const grid = document.getElementById('courseGrid');
  const dialog = document.getElementById('lessonDialog');
  const lessonContent = document.getElementById('lessonContent');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const progressText = document.getElementById('progressText');
  const resetButton = document.getElementById('resetProgress');
  const filters = [...document.querySelectorAll('.filter')];
  const key = 'iot-agri-course-progress-v1';

  const loadProgress = () => {
    try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
    catch { return new Set(); }
  };
  let completed = loadProgress();

  const saveProgress = () => localStorage.setItem(key, JSON.stringify([...completed]));

  const escapeHtml = (text='') => text.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const list = items => `<ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
  const checklist = items => `<ul class="lab-checklist">${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;

  function updateProgress() {
    const n = lessons.filter(l => completed.has(l.id)).length;
    const pct = lessons.length ? Math.round(n / lessons.length * 100) : 0;
    progressBar.style.width = `${pct}%`;
    progressPercent.textContent = `${pct}%`;
    progressText.textContent = `${n} / ${lessons.length} bài`;
  }

  function render(filter='all') {
    grid.innerHTML = '';
    lessons.filter(l => filter === 'all' || l.level === filter).forEach(l => {
      const article = document.createElement('article');
      article.className = 'lesson-card';
      article.innerHTML = `
        <div class="lesson-top"><span class="lesson-number">Bài ${String(l.id).padStart(2,'0')} • Chặng ${l.stage}</span><span class="level">${l.level}</span></div>
        <h3>${escapeHtml(l.title)}</h3>
        <p>${escapeHtml(l.summary)}</p>
        <div class="lesson-meta"><span>⏱ ${l.duration}</span><span>🎯 ${l.objectives.length} mục tiêu</span><span>🧪 Lab</span></div>
        <div class="lesson-actions">
          <button class="open-lesson" type="button" data-id="${l.id}">Mở bài học</button>
          <label class="complete-wrap"><input type="checkbox" data-complete="${l.id}" ${completed.has(l.id) ? 'checked' : ''}> Hoàn thành</label>
        </div>`;
      grid.appendChild(article);
    });
  }

  function openLesson(id) {
    const l = lessons.find(x => x.id === id);
    if (!l) return;
    lessonContent.innerHTML = `
      <article class="lesson-body">
        <p class="eyebrow">BÀI ${String(l.id).padStart(2,'0')} • CHẶNG ${l.stage} • ${escapeHtml(l.level)} • ${escapeHtml(l.duration)}</p>
        <h1>${escapeHtml(l.title)}</h1>
        <p class="lead">${escapeHtml(l.summary)}</p>

        <h2>1. Sau bài này bạn làm được gì?</h2>${list(l.objectives)}

        <h2>2. Bản chất & nguyên lý</h2>
        ${l.core.map(p => `<p>${escapeHtml(p)}</p>`).join('')}

        <h2>3. Kiến trúc / luồng logic</h2>
        <pre>${escapeHtml(l.architecture)}</pre>

        <h2>4. Thực hành — làm ngay</h2>${checklist(l.lab)}

        <h2>5. Tiêu chí kiểm chứng</h2>${checklist(l.verify)}

        <h2>6. Ưu và nhược điểm</h2>
        <div class="mini-grid">
          <div><h3>Ưu điểm</h3>${list(l.pros)}</div>
          <div><h3>Nhược / giới hạn</h3>${list(l.cons)}</div>
        </div>

        <h2>7. Cơ sở xác thực</h2>
        <div class="source-note">${list(l.sources)}<p>Xem định dạng APA và liên kết nguồn tại <a href="REFERENCES.md">REFERENCES.md</a>.</p></div>

        <div class="quiz" data-quiz="${l.id}">
          <h2>Checkpoint</h2>
          <p><strong>${escapeHtml(l.quiz.q)}</strong></p>
          <div class="quiz-options">${l.quiz.options.map((o,i)=>`<button class="quiz-option" type="button" data-answer="${i}">${escapeHtml(o)}</button>`).join('')}</div>
          <div class="quiz-feedback" aria-live="polite"></div>
        </div>
      </article>`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
  }

  grid.addEventListener('click', e => {
    const open = e.target.closest('[data-id]');
    if (open) openLesson(Number(open.dataset.id));
  });

  grid.addEventListener('change', e => {
    const cb = e.target.closest('[data-complete]');
    if (!cb) return;
    const id = Number(cb.dataset.complete);
    cb.checked ? completed.add(id) : completed.delete(id);
    saveProgress();
    updateProgress();
  });

  lessonContent.addEventListener('click', e => {
    const option = e.target.closest('.quiz-option');
    if (!option) return;
    const quizEl = option.closest('.quiz');
    const l = lessons.find(x => x.id === Number(quizEl.dataset.quiz));
    if (!l) return;
    const chosen = Number(option.dataset.answer);
    quizEl.querySelectorAll('.quiz-option').forEach((b,i) => {
      b.disabled = true;
      if (i === l.quiz.answer) b.classList.add('correct');
    });
    const feedback = quizEl.querySelector('.quiz-feedback');
    if (chosen === l.quiz.answer) {
      feedback.textContent = `✓ Đúng. ${l.quiz.explain}`;
    } else {
      option.classList.add('wrong');
      feedback.textContent = `Chưa đúng. ${l.quiz.explain}`;
    }
  });

  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter);
  }));

  resetButton.addEventListener('click', () => {
    if (!confirm('Đặt lại toàn bộ tiến độ 18 bài trên trình duyệt này?')) return;
    completed = new Set();
    saveProgress();
    render(document.querySelector('.filter.active')?.dataset.filter || 'all');
    updateProgress();
  });

  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });

  render();
  updateProgress();
})();
