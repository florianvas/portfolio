(function () {
  var buttons = document.querySelectorAll('.seg button');
  var items = document.querySelectorAll('.works article');
  var chain = document.querySelectorAll('.chain li');
  function apply(f) {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === f)); });
    items.forEach(function (a) { a.hidden = !(f === 'all' || a.dataset.tags.indexOf(f) !== -1); });
    var allHidden = true;
    chain.forEach(function (li, i) {
      var a = document.getElementById('etape-' + (i + 1));
      li.hidden = a ? a.hidden : false;
      if (!li.hidden) allHidden = false;
    });
    document.querySelector('.chain-wrap').hidden = allHidden;
  }
  buttons.forEach(function (b) { b.addEventListener('click', function () { apply(b.dataset.filter); }); });

  var copy = document.getElementById('copy');
  var out = document.getElementById('copied');
  var mail = document.getElementById('mail');
  function fallback() {
    var r = document.createRange(); r.selectNodeContents(mail);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    out.textContent = 'Adresse sélectionnée, copie-la à la main.';
  }
  copy.addEventListener('click', function () {
    try {
      navigator.clipboard.writeText(mail.textContent).then(function () {
        out.textContent = 'Adresse copiée.';
      }, fallback);
    } catch (e) { fallback(); }
  });
})();
