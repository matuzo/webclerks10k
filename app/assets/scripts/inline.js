if ( "classList" in document.documentElement ) {
  // no-js Klasse entfernen und durch js ersetzen
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

    var request = new XMLHttpRequest();
    request.open('GET', '/content/logic/fullcss.php', true);
    request.send();
}

svgSupport = !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect);

if(!svgSupport) {
  document.documentElement.className += ' no-svg';
}

if(localStorage.getItem('fontsLoaded')) {
  document.querySelector('html').classList.add('fonts-loaded');
}