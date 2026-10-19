(function () {
  var KEY = 'retro-legal-lang';
  var SUPPORTED = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];

  function detect() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('zh') === 0) {
      if (nav.indexOf('cn') !== -1 || nav.indexOf('hans') !== -1 || nav === 'zh') return 'zh-CN';
      return 'zh-TW';
    }
    if (nav.indexOf('ja') === 0) return 'ja';
    if (nav.indexOf('ko') === 0) return 'ko';
    return 'en';
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('nav.langs button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant' : lang === 'zh-CN' ? 'zh-Hans' : lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('nav.langs button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-set-lang'));
      });
    });
    setLang(detect());
  });
})();
