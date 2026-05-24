/* ===== Common Utilities for ToolWebsite ===== */
(function() {
  'use strict';

  // ---- Mobile nav toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // ---- Search (homepage) ----
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const q = this.value.toLowerCase().trim();
      document.querySelectorAll('.tool-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = q === '' || text.includes(q) ? '' : 'none';
      });
      // Hide empty categories
      document.querySelectorAll('.cat-btn').forEach(btn => {
        const cat = btn.dataset.cat;
        if (!cat) return;
        const visible = Array.from(document.querySelectorAll('.tool-card[data-cat="' + cat + '"]'))
          .some(c => c.style.display !== 'none');
        btn.style.display = visible ? '' : 'none';
      });
    });
  }

  // ---- Category filter ----
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const cat = this.dataset.cat;
      document.querySelectorAll('.tool-card').forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
      if (searchInput) searchInput.value = '';
    });
  });

  // ---- Toast ----
  window.showToast = function(msg, duration) {
    duration = duration || 2200;
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { t.remove(); }, duration);
  };

  // ---- Premium Modal ----
  window.showPremiumModal = function(featureName) {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML =
      '<div class="modal">' +
        '<button class="modal-close">&times;</button>' +
        '<h2>🔒 ' + (featureName || '高级功能') + '</h2>' +
        '<p>该功能为PRO会员专享，升级即可解锁高清导出与批量处理等高级功能。</p>' +
        '<div class="price">¥19.9<small style="font-size:0.5em;font-weight:400">/月</small></div>' +
        '<button class="btn btn-gold">立即升级 PRO</button>' +
        '<p style="margin-top:10px;font-size:0.8rem">已有账号？<a href="#">登录</a></p>' +
      '</div>';
    document.body.appendChild(overlay);

    var close = function() { overlay.remove(); };
    overlay.querySelector('.modal-close').addEventListener('click', close);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    overlay.querySelector('.btn-gold').addEventListener('click', function() {
      window.showToast('感谢支持！支付功能即将上线');
      close();
    });
  };

  // ---- Copy to clipboard ----
  window.copyResult = function(el) {
    var text = el.textContent || el.innerText || el.value || '';
    if (!text.trim()) { window.showToast('没有可复制的内容'); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        window.showToast('已复制到剪贴板');
      }).catch(function() {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); window.showToast('已复制到剪贴板'); } catch(e) { window.showToast('复制失败，请手动选择'); }
    ta.remove();
  }

  // ---- File input from drop zone ----
  window.setupDropZone = function(dropZone, fileInput, onFile) {
    if (!dropZone || !fileInput) return;
    dropZone.addEventListener('click', function() { fileInput.click(); });
    fileInput.addEventListener('change', function() {
      if (this.files && this.files[0]) onFile(this.files[0]);
    });
    dropZone.addEventListener('dragover', function(e) { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', function() { dropZone.classList.remove('drag-over'); });
    dropZone.addEventListener('drop', function(e) {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
    });
  };

  // ---- Format file size ----
  window.formatSize = function(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  };
})();
