(function(){
  const qs=(s,r=document)=>r.querySelector(s); const qsa=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const cfg=window.APP_CONFIG||{}; const featuredAgents=window.FEATURED_AGENTS||[]; const teaserAgents=window.TEASER_AGENTS||[];
  let selectedRisk='low'; let selectedModules=new Set(['Intent Parser']);
  const safeText=(v,f='')=>(v===undefined||v===null||v==='')?f:String(v);

  function applyConfig(){
    qsa('[data-brand]').forEach(el=>el.textContent=cfg.brandName||'Intent-0n');
    qsa('[data-tagline]').forEach(el=>el.textContent=cfg.tagline||'Users plant financial intents. Agents compete to harvest the best outcome.');
    qsa('[data-subtagline]').forEach(el=>el.textContent=cfg.subtagline||'Intent-first DeFi, powered by competing agents.');
    qsa('[data-logo]').forEach(img=>{img.src=cfg.logoPath||'assets/logo-white.png';img.alt=(cfg.brandName||'Intent-0n')+' logo'});
    qsa('[data-support-name]').forEach(el=>el.textContent=cfg.supportBotName||'Yuki Support');
    const statsRoot=qs('[data-hero-stats]');
    if(statsRoot&&cfg.heroStats){statsRoot.innerHTML=cfg.heroStats.map(s=>`<div class="stat-card"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('')}
  }
  function metricColorByRisk(r){return r<=3?'var(--green)':r<=6?'var(--warn)':'var(--danger)'}
  function placeholder(agent){return `<div class="media-placeholder"><div class="placeholder-label">${agent.label||agent.status}<small>drop video later</small></div></div>`}
  function featuredCard(agent,opt={}){return `<article class="agent-card" data-agent-id="${agent.id}" tabindex="0" role="button" aria-label="Open ${agent.name} details"><div class="agent-media">${placeholder(agent)}<video src="${agent.media}" muted playsinline loop preload="metadata"></video></div><div class="agent-body"><div class="agent-top"><div><h3 class="agent-title">${agent.name}</h3><div class="agent-tagline">${agent.tagline}</div></div><span class="agent-badge ${agent.type}">${agent.label}</span></div><p class="agent-desc">${opt.short?agent.role:agent.description}</p><div class="skills-row">${agent.skills.slice(0,3).map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div><div class="agent-stats"><div><div class="val">${agent.apy}%</div><div class="lbl">APY</div></div><div><div class="val" style="color:${metricColorByRisk(agent.riskScore)}">${agent.riskScore}/10</div><div class="lbl">Risk</div></div><div><div class="val">${agent.fee}%</div><div class="lbl">Fee</div></div><div><div class="val">${agent.winRate}%</div><div class="lbl">Win</div></div></div><div class="click-hint">Click to reveal profile + skills</div></div></article>`}
  function teaserCard(agent){return `<article class="teaser-card" data-teaser-id="${agent.id}" tabindex="0" role="button"><span class="teaser-status">${agent.status}</span><h3>${agent.name}</h3><p>${agent.specialization}</p><div class="skills-row" style="margin-top:.75rem;margin-bottom:0"><span class="skill-tag">${agent.label}</span><span class="skill-tag">${agent.signal}</span></div></article>`}

  function renderAgentMarket(){
    qsa('[data-agent-grid]').forEach(root=>{const limit=Number(root.dataset.limit||featuredAgents.length);root.innerHTML=featuredAgents.slice(0,limit).map(a=>featuredCard(a,{short:root.dataset.short==='true'})).join('')});
    qsa('[data-teaser-grid]').forEach(root=>{const limit=Number(root.dataset.limit||teaserAgents.length);root.innerHTML=teaserAgents.slice(0,limit).map(teaserCard).join('')});
    setupAgentCardEvents(); setupVideoBehavior();
  }
  function setupVideoBehavior(){
    qsa('video').forEach(v=>{v.addEventListener('error',()=>v.classList.add('video-missing')); v.addEventListener('loadeddata',()=>v.classList.remove('video-missing'))});
    qsa('.agent-card').forEach(card=>{const video=qs('video',card); if(!video)return; const play=()=>video.play().catch(()=>{}); const pause=()=>video.pause(); card.addEventListener('mouseenter',play);card.addEventListener('mouseleave',pause);card.addEventListener('focus',play);card.addEventListener('blur',pause)});
    qsa('[data-autoplay-video]').forEach(v=>v.play().catch(()=>{}));
  }
  function setupAgentCardEvents(){
    qsa('[data-agent-id]').forEach(card=>{card.onclick=()=>openAgentModal(card.dataset.agentId);card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openAgentModal(card.dataset.agentId)}}});
    qsa('[data-teaser-id]').forEach(card=>{card.onclick=()=>openTeaserModal(card.dataset.teaserId);card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openTeaserModal(card.dataset.teaserId)}}});
  }
  function ensureModal(){let root=qs('#agent-modal-root'); if(root)return root; root=document.createElement('div'); root.id='agent-modal-root'; root.className='modal-backdrop'; document.body.appendChild(root); root.addEventListener('click',e=>{if(e.target===root)closeAgentModal()}); document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAgentModal()}); return root}
  function openAgentModal(id){const agent=featuredAgents.find(a=>a.id===id); if(!agent)return; const root=ensureModal(); root.innerHTML=`<div class="agent-modal" role="dialog" aria-modal="true"><div class="modal-hero"><div class="modal-media">${placeholder(agent)}<video src="${agent.media}" muted playsinline loop autoplay></video></div><div class="modal-content"><button class="modal-close" onclick="window.closeAgentModal()">×</button><span class="agent-badge ${agent.type}">${agent.label} · ${agent.status}</span><h3>${agent.name}</h3><p class="agent-tagline" style="font-size:.82rem;margin:.35rem 0 1rem">${agent.tagline}</p><p class="agent-desc" style="font-size:.95rem">${agent.description}</p><div class="detail-metrics" style="margin-top:1rem"><div class="detail-metric"><b>${agent.apy}%</b><span>Expected APY</span></div><div class="detail-metric"><b>${agent.riskScore}/10</b><span>Risk Score</span></div><div class="detail-metric"><b>${agent.fee}%</b><span>Fee</span></div><div class="detail-metric"><b>${agent.winRate}%</b><span>Win Rate</span></div></div></div></div><div class="detail-grid"><div class="detail-box"><h4>Characteristics</h4><ul>${agent.characteristics.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="detail-box"><h4>Installed Skills</h4><ul>${agent.skills.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="detail-box"><h4>Best For</h4><ul>${agent.bestFor.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="detail-box"><h4>Agent Personality</h4><p class="agent-desc">${agent.temperament}</p><p class="agent-desc" style="margin-top:.6rem"><b style="color:var(--accent2)">Sample intent:</b><br>${agent.sampleIntent}</p></div></div></div>`; root.classList.add('open'); document.body.classList.add('no-scroll'); setupVideoBehavior()}
  function openTeaserModal(id){const a=teaserAgents.find(x=>x.id===id); if(!a)return; const root=ensureModal(); root.innerHTML=`<div class="agent-modal"><div style="padding:1.2rem"><button class="modal-close" onclick="window.closeAgentModal()">×</button><span class="agent-badge social">${a.status}</span><h3 style="font-size:2rem;margin-top:.65rem">${a.name}</h3><p class="agent-tagline" style="font-size:.8rem;margin:.35rem 0 1rem">${a.signal}</p><div class="detail-grid" style="padding:0;grid-template-columns:1fr 1fr"><div class="detail-box"><h4>Specialization</h4><p class="agent-desc">${a.specialization}</p></div><div class="detail-box"><h4>Prototype Status</h4><p class="agent-desc">This future agent class is visible to make the network feel bigger than the first six featured builds.</p></div></div></div></div>`; root.classList.add('open'); document.body.classList.add('no-scroll')}
  window.closeAgentModal=function(){const root=qs('#agent-modal-root'); if(root){root.classList.remove('open');root.innerHTML=''} document.body.classList.remove('no-scroll')};

  function initRiskSelector(){qsa('.risk-btn').forEach(btn=>btn.addEventListener('click',()=>{qsa('.risk-btn').forEach(b=>b.classList.remove('active','low','med','high'));btn.classList.add('active',btn.dataset.risk);selectedRisk=btn.dataset.risk}))}
  function textSignals(text){const t=(text||'').toLowerCase();return{safe:/(safe|low risk|protect|stable|preserve|conservative|secure|defensive)/.test(t),hedge:/(hedge|protect|downside|drawdown|bear|loss|risk guard|defense)/.test(t),ai:/(ai|artificial|agent|alpha|exposure|narrative|basket|trend)/.test(t),copy:/(copy|follow|social|proven|community|beginner|passive)/.test(t),aggressive:/(max|maximize|high yield|highest|aggressive|degen|fast|risk on)/.test(t),rebalance:/(rebalance|allocation|split|balance|diversify|portfolio)/.test(t)}}
  function calcScore(agent,risk,goal,intentText){const s=textSignals(intentText);let score=agent.apy-agent.fee;if(risk==='low')score-=agent.riskScore*1.45;if(risk==='med')score-=Math.abs(agent.riskScore-5)*.92+agent.riskScore*.22;if(risk==='high')score+=agent.apy*.28-agent.riskScore*.18;if(goal==='yield'&&agent.id==='stable-farmer')score+=2.2;if(goal==='ai'&&['alpha-hunter','risk-balancer'].includes(agent.id))score+=2.4;if(goal==='rebalance'&&agent.id==='risk-balancer')score+=2.5;if(goal==='hedge'&&agent.id==='hedge-guardian')score+=3.2;if(s.safe&&['stable-farmer','hedge-guardian'].includes(agent.id))score+=2.4;if(s.hedge&&agent.id==='hedge-guardian')score+=3;if(s.ai&&['alpha-hunter','risk-balancer','aggressive-yield'].includes(agent.id))score+=1.8;if(s.copy&&agent.id==='social-copy')score+=3;if(s.aggressive&&['aggressive-yield','alpha-hunter'].includes(agent.id))score+=2.5;if(s.rebalance&&agent.id==='risk-balancer')score+=2.6;return Number(score.toFixed(2))}
  function runCompetition(){const btn=qs('#run-btn'); if(!btn)return; const original=btn.innerHTML; btn.innerHTML='<span class="typing"><span></span><span></span><span></span></span> Agents syncing...'; btn.disabled=true; setTimeout(()=>{btn.innerHTML=original;btn.disabled=false;const goalSel=qs('#goal-sel'),assetSel=qs('#asset-sel'),durSel=qs('#dur-sel');const amount=safeText(qs('#amount-inp')?.value,'5000');const intentText=safeText(qs('#intent-text')?.value).trim();const fallback=`I want ${goalSel?.selectedOptions[0]?.textContent||'a DeFi outcome'} using ${assetSel?.value||'USDC'} for ${durSel?.selectedOptions[0]?.textContent||'30 days'} with ${selectedRisk} risk.`;const finalIntent=intentText||fallback;const scores=featuredAgents.map(a=>({...a,score:calcScore(a,selectedRisk,goalSel?.value,finalIntent)})).sort((a,b)=>b.score-a.score);renderResults(scores,finalIntent,{asset:assetSel?.value||'USDC',duration:durSel?.selectedOptions[0]?.textContent||'30 Days',amount})},900)}
  function renderResults(scores,intentText,meta){const results=qs('#results-section');if(!results)return;const winner=scores[0],max=Math.max(...scores.map(s=>s.score)),min=Math.min(...scores.map(s=>s.score));results.style.display='block';results.innerHTML=`<div class="result-intent"><div class="label">Natural-language intent captured</div><div>${intentText}</div><div class="skills-row" style="margin-top:.75rem;margin-bottom:0"><span class="skill-tag">Asset: ${meta.asset}</span><span class="skill-tag">Amount: $${Number(meta.amount||0).toLocaleString()}</span><span class="skill-tag">Duration: ${meta.duration}</span><span class="skill-tag">Risk: ${selectedRisk.toUpperCase()}</span></div></div><p class="kicker" style="margin-bottom:.8rem">// Agent competition results</p><div class="agent-results" id="agent-cards"></div>`;qs('#agent-cards').innerHTML=scores.map((a,i)=>{const pct=max===min?100:Math.max(8,((a.score-min)/(max-min))*100).toFixed(0);return `<article class="result-card ${i===0?'winner':''}"><div><div><b>${a.name}</b>${i===0?'<span class="winner-badge">Selected Best Match</span>':''}</div><div class="agent-tagline">${a.tagline}</div><div class="result-meta"><div><div class="metric-val">${a.apy}%</div><div class="metric-label">APY</div></div><div><div class="metric-val" style="color:${metricColorByRisk(a.riskScore)}">${a.riskScore}/10</div><div class="metric-label">Risk</div></div><div><div class="metric-val">${a.winRate}%</div><div class="metric-label">Win Rate</div></div><div><div class="metric-val">${a.fee}%</div><div class="metric-label">Fee</div></div></div><div class="score-bar"><div class="score-track"><div class="score-fill" style="width:${pct}%"></div></div></div></div><div class="score-pill">Score ${a.score}</div></article>`}).join('');const route=qs('#exec-section');if(route){route.style.display='block';const flow=qs('#route-flow');if(flow){const nodes=[meta.asset,'Intent-0n Parser','Agent Auction',winner.name.replace(' Agent',''),'Jaine DEX Route','0G Record'];flow.innerHTML=nodes.map((n,i)=>`<span class="route-node">${n}</span>${i<nodes.length-1?'<span class="route-arrow">→</span>':''}`).join('')}}results.scrollIntoView({behavior:'smooth',block:'start'})}
  window.runCompetition=runCompetition;

  function initIntentTextarea(){const txt=qs('#intent-text'),count=qs('#intent-count');if(!txt||!count)return;const u=()=>count.textContent=`${txt.value.length}/240`;txt.addEventListener('input',u);u()}
  function initCreateAgentPage(){const form=qs('#create-agent-form'); if(!form)return;const preview={name:qs('#preview-name'),role:qs('#preview-role'),risk:qs('#preview-risk'),status:qs('#preview-status'),skills:qs('#preview-skills')};const get=id=>qs('#'+id)?.value||'';function update(){preview.name.textContent=get('agent-name')||'Unnamed Agent';preview.role.textContent=get('agent-role')||'No role selected';preview.risk.textContent=get('risk-style')||'Balanced';preview.status.textContent=selectedModules.size?'Ready to install':'Waiting for skills';preview.skills.textContent=selectedModules.size?Array.from(selectedModules).join(', '):'No skills installed'}qsa('#create-agent-form input,#create-agent-form select,#create-agent-form textarea').forEach(el=>el.addEventListener('input',update));qsa('.module-card').forEach(card=>card.addEventListener('click',()=>{const skill=card.dataset.skill;if(selectedModules.has(skill)){selectedModules.delete(skill);card.classList.remove('selected')}else{selectedModules.add(skill);card.classList.add('selected')}update()}));const d=qsa('.module-card').find(card=>card.dataset.skill==='Intent Parser');if(d)d.classList.add('selected');update();qs('#install-btn')?.addEventListener('click',simulateInstall)}
  function simulateInstall(){const box=qs('#install-box'),log=qs('#install-log'),success=qs('#success-card');if(!box||!log||!success)return;box.style.display='block';log.innerHTML='';success.style.display='none';['Parsing agent profile...','Validating intent modules...','Compiling agent memory...','Installing selected skills...','Syncing with Intent-0n...','Generating prototype profile...','Agent ready.'].forEach((step,i)=>setTimeout(()=>{const line=document.createElement('div');line.className='log-line'+(i===6?' ok':'');line.textContent=`${i===6?'✓':'>'} ${step}`;log.appendChild(line);log.scrollTop=log.scrollHeight;if(i===6){success.style.display='block';qs('#preview-status').textContent='Ready'}},i*500))}

function injectSupportBubble() {
  if (qs('#support-wrap')) return;

  const botGif = cfg.supportBotGif || 'assets/yuki-bot.gif';
  const logo = cfg.logoPath || 'assets/logo-white.png';

  const wrap = document.createElement('div');
  wrap.id = 'support-wrap';
  wrap.className = 'support-wrap';

  wrap.innerHTML = `
    <div class="chat-panel" id="chat-panel">
      <div class="chat-head">
        <img src="${botGif}" alt="support">
        <div>
          <div class="chat-title">${cfg.supportBotName || 'Yuki Support'}</div>
          <div class="chat-status">${cfg.supportStatus || 'Prototype assistant online'}</div>
        </div>
      </div>

      <div class="chat-body" id="chat-body">
        <div class="msg bot">
          <img src="${botGif}" class="bot-avatar" alt="">
          <div>${cfg.supportGreeting || 'Hello. How can I help?'}</div>
        </div>
      </div>

      <div class="quick-actions">
        <button data-question="what">What is Intent-0n?</button>
        <button data-question="agents">How do agents work?</button>
        <button data-question="create">Create my agent</button>
        <button data-question="skills">Skill install?</button>
      </div>
    </div>

    <button class="support-bubble" id="support-bubble" aria-label="Open support chat">
      <img src="${cfg.supportBubbleIcon || 'assets/logo-only.png'}" alt="support">
    </button>
  `;

  document.body.appendChild(wrap);

  qs('#support-bubble').addEventListener('click', () => {
    qs('#chat-panel').classList.toggle('open');
  });

  qsa('[data-question]', wrap).forEach(btn => {
    btn.addEventListener('click', () => {
      supportAnswer(btn.dataset.question, btn.textContent);
    });
  });
}

function supportAnswer(key, label) {
  const body = qs('#chat-body');
  const botGif = cfg.supportBotGif || 'assets/yuki-bot.gif';

  const answers = {
    what: 'Intent-0n is an intent-first DeFi prototype. Users describe goals in natural language, then specialized agents compete to produce the best route.',
    agents: 'Agents are different strategy engines. Stable Farmer protects capital, Alpha Hunter seeks upside, Hedge Guardian defends, and more agents can join the future network.',
    create: 'Open the Create Agent page. You can design a persona, pick skills, and simulate one-click installation without touching code.',
    skills: 'Skill installation is simulated here as a future UX: modules like Risk Guard, Intent Parser, and Liquidity Optimizer are selected through UI and installed instantly.'
  };

  body.insertAdjacentHTML(
    'beforeend',
    `
    <div class="msg user-msg">${label}</div>

    <div class="msg bot typing-msg">
      <img src="${botGif}" class="bot-avatar" alt="">
      <div class="typing">
        <span></span><span></span><span></span>
      </div>
    </div>
    `
  );

  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    const typingMsg = body.querySelector('.typing-msg');

    if (typingMsg) {
      typingMsg.classList.remove('typing-msg');
      typingMsg.innerHTML = `
        <img src="${botGif}" class="bot-avatar" alt="">
        <div>${answers[key] || answers.what}</div>
      `;
    }

    body.scrollTop = body.scrollHeight;
  }, 600);
} 
  function markActiveNav(){const path=location.pathname.split('/').pop()||'index.html';qsa('.nav-links a').forEach(a=>{const href=a.getAttribute('href')||'';if((path==='index.html'&&href.includes('index.html'))||(path&&href.includes(path)))a.classList.add('active')})}
  document.addEventListener('DOMContentLoaded',()=>{applyConfig();renderAgentMarket();initRiskSelector();initIntentTextarea();initCreateAgentPage();injectSupportBubble();markActiveNav()});
})();
  window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  const bar = document.querySelector(".scroll-progress");
  if (bar) {
    bar.style.width = progress + "%";
  }
});
