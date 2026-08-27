const GTM_ID = "GTM-TJ9758RG";

// Keep analytics available site-wide without making third-party tags part of the
// critical rendering path. A real interaction starts GTM immediately; otherwise
// it starts after the initial page experience has settled.
const loader = `(function(w,d,s,l,i){
  w[l]=w[l]||[];
  var loaded=false;
  var events=['pointerdown','keydown','touchstart'];
  var timer;
  function cleanup(){events.forEach(function(e){w.removeEventListener(e,load,true)});w.clearTimeout(timer)}
  function load(){
    if(loaded)return;
    loaded=true;
    cleanup();
    w[l].push({'gtm.start':Date.now(),event:'gtm.js'});
    var first=d.getElementsByTagName(s)[0];
    var tag=d.createElement(s);
    var suffix=l!=='dataLayer'?'&l='+l:'';
    tag.async=true;
    tag.src='https://www.googletagmanager.com/gtm.js?id='+i+suffix;
    first.parentNode.insertBefore(tag,first);
  }
  events.forEach(function(e){w.addEventListener(e,load,{capture:true,passive:true,once:true})});
  function schedule(){if(!loaded)timer=w.setTimeout(load,30000)}
  if(d.readyState==='complete')schedule();else w.addEventListener('load',schedule,{once:true});
})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function GoogleTagManager() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: loader }} />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
