// Contador propio sin cookies: visitas, de dónde llegan y clics en WhatsApp.
(function(){
  if (!/bizivan\.es$/.test(location.hostname)) return;
  var W = 'https://bizivan-stats.josugarciandia.workers.dev/hit';
  function send(d){
    var b = JSON.stringify(d);
    try { if (navigator.sendBeacon && navigator.sendBeacon(W, new Blob([b], {type:'text/plain'}))) return; } catch(e){}
    try { fetch(W, {method:'POST', body:b, keepalive:true, mode:'cors'}); } catch(e){}
  }
  send({p: location.pathname, r: document.referrer});
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href*="wa.me"]');
    if (a) send({p: location.pathname, e: 'wa'});
  }, true);
  document.addEventListener('submit', function(ev){
    if (ev.target.dataset && ev.target.dataset.wa) send({p: location.pathname, e: 'wa'});
  }, true);
})();
