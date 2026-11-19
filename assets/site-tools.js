(() => {
  'use strict';
  const raw = window.UNPREDICTABLE_CONFIG || {};
  const gaId = /^G-[A-Z0-9]{6,18}$/.test(raw.ga4MeasurementId||'') ? raw.ga4MeasurementId : '';
  const pixelId = /^[0-9]{8,25}$/.test(raw.metaPixelId||'') ? raw.metaPixelId : '';
  const endpoint = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(raw.formspreeEndpoint||'') ? raw.formspreeEndpoint : '';
  const panel = document.getElementById('consentPanel');
  const analyticsBox = document.getElementById('consentAnalytics');
  const marketingBox = document.getElementById('consentMarketing');
  const storageKey = 'ua-consent-v1';
  const active = {analytics:false,marketing:false};
  let gaLoaded = false, pixelLoaded = false;
  const hasTracking = Boolean(gaId || pixelId);
  const readStored = () => { try {const v=JSON.parse(localStorage.getItem(storageKey) || 'null'); return v&&typeof v.analytics==='boolean'&&typeof v.marketing==='boolean'?v:null;}catch{return null;} };
  const writeStored = (v) => { try {localStorage.setItem(storageKey,JSON.stringify(v));}catch{} };

  const safeScript = (src) => {const s=document.createElement('script');s.async=true;s.src=src;document.head.append(s);};
  const consentForGoogle=() => ({
    'analytics_storage':active.analytics?'granted':'denied',
    'ad_storage':active.marketing?'granted':'denied',
    'ad_user_data':active.marketing?'granted':'denied',
    'ad_personalization':active.marketing?'granted':'denied'
  });
  function startGA(){
    if(!gaId || gaLoaded || !active.analytics)return;
    gaLoaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied'});
    window.gtag('consent','update',consentForGoogle());
    window.gtag('js',new Date());
    window.gtag('config',gaId,{send_page_view:true});
    safeScript('https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(gaId));
  }
  function startPixel(){
    if(!pixelId || pixelLoaded || !active.marketing)return;
    pixelLoaded=true;
    // Load only after explicit marketing consent; no noscript pixel requests.
    const fbq=window.fbq=function(){fbq.callMethod?fbq.callMethod.apply(fbq,arguments):fbq.queue.push(arguments);};
    if(!window._fbq)window._fbq=fbq;
    fbq.push=fbq;fbq.loaded=true;fbq.version='2.0';fbq.queue=[];
    fbq('init',pixelId);fbq('track','PageView');
    safeScript('https://connect.facebook.net/en_US/fbevents.js');
  }
  function sync(){
    // Never load a third-party analytics/advertising script before affirmative consent.
    if(gaLoaded && typeof window.gtag==='function')window.gtag('consent','update',consentForGoogle());
    startGA();startPixel();
  }
  function apply(v){
    const changedToDenied=(active.analytics&&!v.analytics)||(active.marketing&&!v.marketing);
    active.analytics=Boolean(v.analytics);active.marketing=Boolean(v.marketing);
    writeStored(active);sync();
    if(panel)panel.hidden=true;
    // Revoke existing trackers by reload; they will not be loaded on the next page.
    if(changedToDenied)location.reload();
  }
  const saved=readStored();
  if(saved){active.analytics=saved.analytics;active.marketing=saved.marketing;sync();}
  else if(hasTracking && panel)panel.hidden=false;
  const openPreferences=()=>{
    if(!panel)return;
    analyticsBox.checked=active.analytics;
    marketingBox.checked=active.marketing;
    analyticsBox.disabled=!gaId;
    marketingBox.disabled=!pixelId;
    if(!hasTracking){const message=panel.querySelector('p');if(message)message.textContent='No optional analytics or advertising trackers are configured on this website.';}
    panel.hidden=false;
    analyticsBox.focus();
  };
  document.querySelectorAll('[data-privacy-settings]').forEach(b=>b.addEventListener('click',openPreferences));
  document.getElementById('consentSave')?.addEventListener('click',()=>apply({analytics:analyticsBox.checked,marketing:marketingBox.checked}));
  document.getElementById('consentReject')?.addEventListener('click',()=>apply({analytics:false,marketing:false}));
  document.getElementById('consentAll')?.addEventListener('click',()=>apply({analytics:!!gaId,marketing:!!pixelId}));
  function event(name,detail={}){
    if(gaLoaded && active.analytics && typeof window.gtag==='function')window.gtag('event',name,detail);
    if(pixelLoaded && active.marketing && typeof window.fbq==='function' && name.includes('contact_')){
      window.fbq('trackCustom','ContactClick',{channel:detail.channel||'unknown'});
    }
  }
  window.UNPREDICTABLE_TRACK=event;
  document.addEventListener('click',e=>{
    const a=e.target.closest('[data-track]'); if(!a)return;
    const name=a.dataset.track;
    if(!/^[a-z_]+$/.test(name))return;
    // Do not send names, emails, phone numbers, messages or custom URLs in analytics events.
    const channel=name.includes('whatsapp')?'whatsapp':name.includes('email')?'email':'website';
    event(name,{channel});
  });

  // Optional static-host-compatible form submission. Disabled until a verified form provider URL is configured.
  const form=document.getElementById('briefForm');
  if(form && endpoint){
    window.UA_FORM_API_ENABLED=true;
    form.setAttribute('aria-label','Send a project inquiry to the configured form provider');
    form.dataset.formMode='online-provider';
    const help=form.querySelector('#briefHelp');
    if(help)help.textContent='A sentence or two is enough (12–1,200 characters). This sends your details to the configured form provider after validation.';
    const note=form.querySelector('#formNote');
    const button=form.querySelector('button[type=submit]');
    const fallback=form.querySelector('#mailFallback');
    button.innerHTML='Send Project Inquiry <span aria-hidden="true">↗</span>';
    note.textContent='This form will submit your inquiry to the configured form provider. Please avoid sensitive information.';
    let busy=false;
    const started=Date.now();
    const emailInput=form.querySelector('#clientEmail');
    emailInput.required=true;
    const required=[form.querySelector('#clientName'),emailInput,form.querySelector('#projectMessage')];
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      if(busy)return;
      for(const input of required){
        const value=input.value.trim();
        input.setCustomValidity(input.id==='clientEmail' ? (emailInput.validity.typeMismatch||!value?'Please enter a valid email address.':'') : (value.length < (input.id==='clientName'?2:12)?'Please provide a little more detail.':''));
        if(!input.checkValidity()){input.reportValidity();input.focus();return;}
      }
      if(form.querySelector('#companyWebsite')?.value || Date.now()-started < 2200){
        note.textContent='Please check the form and try again.';return;
      }
      busy=true;button.disabled=true;button.textContent='Sending…';
      if(fallback)fallback.hidden=true;
      const payload={name:form.querySelector('#clientName').value.trim(),email:emailInput.value.trim(),business:form.querySelector('#businessName').value.trim(),service:form.querySelector('#projectType').value,message:form.querySelector('#projectMessage').value.trim()};
      try{
        const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),mode:'cors'});
        if(!response.ok)throw new Error('Submission not accepted');
        note.textContent='Your inquiry was accepted by the configured form provider. I will follow up using the contact details provided.';
        form.reset();event('generate_lead',{method:'form_provider'});
      }catch{
        note.textContent='The online form could not send your inquiry. Please use the email draft or WhatsApp instead.';
        if(fallback){const subject=encodeURIComponent('Project inquiry — '+payload.service);const body=encodeURIComponent('Hello Shamim,\n\n'+payload.name+'\n'+payload.email+'\n'+payload.business+'\n'+payload.message);fallback.href='mailto:shamim.mahbub.hasan@gmail.com?subject='+subject+'&body='+body;fallback.hidden=false;}
      }finally{busy=false;button.disabled=false;button.innerHTML='Send Project Inquiry <span aria-hidden="true">↗</span>';}
    },{capture:true});
  }
})();
