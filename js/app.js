(function(){
var $=function(i){return document.getElementById(i)},K='sf_session',T='sf_tpl',SS='sf_sessions',H=document.documentElement,CT='Confidential \u2013 Executive Search';
var VR='\n\nVoice & format rules: Write in plain, direct executive English. Lead with the conclusion. Keep paragraphs to three sentences or fewer and prefer bullets. No hype, filler or emojis. Never invent facts; mark assumptions and unverified items clearly. Use Markdown headings (#, ##).';
var B={
'Executive Brief':'Act as an elite executive recruiter. Using the CV and Job Description below, write a formal Executive Brief with these sections: Candidate Snapshot, Career Narrative, Fit Against the Mandate, Risks and Mitigations, Recommendation.',
'Market Intelligence Pack':'Act as a senior executive search researcher. From the CV and Job Description below, produce a Market Intelligence Pack: target companies, comparable titles, compensation signals, talent pools, and approach angles.',
'Company Cheat Sheet':'Act as a chief of staff briefing a founder. From the Job Description and CV below, produce a one-page Company Cheat Sheet: business model, stage, leadership, news to verify, likely interview themes, and ten sharp questions.',
'Candidate Outreach Message':'Act as an executive search consultant writing a first-touch message to a passive candidate. Using the CV and Job Description below, write a LinkedIn message under 120 words and a follow-up email under 150 words. Personalise with one specific achievement from the CV, describe the opportunity without confidential details, and end with a low-pressure call to action.',
'Client / Prospect Research Brief':'Act as a research lead preparing a founder for a client or prospect meeting. From the input below, produce a Research Brief: company overview, market position, leadership, recent developments to verify, likely hiring needs, conversation openers, and risks.',
'Role Spec / Job Spec Generator':'Act as a talent strategist. From the Job Description and client needs below, write a Role Spec: purpose of the role, key outcomes at 6 and 12 months, responsibilities, must-have and nice-to-have criteria, reporting line, and screening questions.',
'LinkedIn Post Angle':'Act as a ghostwriter for a founder. Using the material below, propose five LinkedIn post angles, each with a hook line, three supporting points, and a closing question. Then draft the strongest angle in under 180 words.',
'Weekly Marketing Summary':'Act as a marketing lead writing for a founder. From the notes below, write a Weekly Marketing Summary: headline results, what worked, what did not, key numbers (only those provided), next week priorities, and decisions needed.',
'LinkedIn Content Calendar':'Act as a ghostwriter planning a week of LinkedIn content for a founder. From the brief or Job Description below, create five distinct post angles, one per weekday: Story, Contrarian, Insight, Listicle, Teaser. For each give a hook line, the core point, a 120 to 180 word draft, and a closing question. Never reveal confidential client or candidate details.',
'Engagement & Reactivation Helper':'Act as a chief of staff supporting a founder. From the material below, write five thoughtful comments (two to three sentences each) to post on industry peers LinkedIn posts, and three short reactivation DMs (under 60 words each) for stale candidate or client threads. Every message must add value, reference something specific, and avoid generic check-in phrasing.',
'Quick BD Research Pack':'Act as a business development researcher. From the Job Description below, produce a one-page Quick BD Research Pack: a company overview (what they do, stage, market), five approach angles tied to their hiring need, and three conversation openers. Mark anything unverified.',
'Target List Builder':'Act as a sourcing specialist. From the Job Description below, extract the core requirements (must-haves, nice-to-haves, seniority signals), then build a boolean search string for LinkedIn Recruiter with grouped titles, skills and exclusions, plus a list of 15 competitor or adjacent companies to source from, each with a one-line reason. Flag companies to verify.',
'SOP & Process Documenter':'Act as an operations lead. Turn the raw notes below into a Standard Operating Procedure: purpose, trigger, owner, tools needed, a numbered step-by-step checklist, common mistakes, and a done-when criterion, so the workflow never has to be explained again. List any missing information as questions to confirm.',
'Daily Morning Checklist':'Act as an operations lead supporting a Founders Associate. Turn the pasted role responsibilities and current priorities into a sequenced daily checklist: a first-30-minutes routine, time-boxed priority blocks, recurring admin and follow-ups, and an end-of-day wrap-up. Put urgent and founder-dependent items first.'};
var D={};Object.keys(B).forEach(function(k){D[k]=B[k]+VR});
function ld(k,f){try{var v=JSON.parse(localStorage.getItem(k));return v||f}catch(e){return f}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var tpl=ld(T,null),S=ld(K,{}),ss=ld(SS,{});
if(!tpl)tpl=D;else if(!ld('sf_v4',0)){tpl=Object.assign({},D,tpl);sv(T,tpl)}
sv('sf_v4',1);
function note(t){$('msg').textContent=t;setTimeout(function(){$('msg').textContent=''},2500)}
function today(){return new Date().toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'})}
function short(ts){return new Date(ts).toLocaleDateString(undefined,{month:'short',day:'numeric'})}
function opts(s,list,keep){s.innerHTML='';list.forEach(function(n){var o=document.createElement('option');o.value=o.textContent=n;s.appendChild(o)});if(keep&&list.indexOf(keep)>-1)s.value=keep}
function showT(){var n=$('tsel').value;$('tname').value=n;$('tbody').value=tpl[n]||''}
function refresh(n){var l=Object.keys(tpl);opts($('fmt'),l,n||S.fmt);opts($('tsel'),l,n||$('tsel').value);showT()}
function sessList(keep){var s=$('ssel');s.innerHTML='';Object.keys(ss).sort(function(a,b){return ss[b].at-ss[a].at}).forEach(function(n){var o=document.createElement('option');o.value=n;o.textContent=n+' ('+short(ss[n].at)+')';s.appendChild(o)});if(keep&&ss[keep])s.value=keep}
function cnt(i,o){var t=$(i).value.trim(),w=t?t.split(/\s+/).length:0;$(o).textContent=w+(w===1?' word, ':' words, ')+$(i).value.length+' characters'}
function ct(){cnt('cv','cvc');cnt('jd','jdc')}
function save(){S={cv:$('cv').value,jd:$('jd').value,fmt:$('fmt').value,ai:$('ai').value,conf:$('conf').checked,ctext:$('ctext').value};sv(K,S)}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function inl(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')}
var MR=/^\s*(?:[-*\u2022]\s+)?(?:\*\*)?([A-Za-z][A-Za-z \/&]{1,28}?)(?::\s*\*\*|\*\*:|:)\s*(.*)$/,KN=/^(target role|candidate|recommendation|client|prepared (for|by)|date|location|current role|company|role)$/i;
function meta(L){var i=0,pre=[],m=[],x;while(i<L.length&&/^\s*$/.test(L[i]))i++;
if(i<L.length&&/^#{1,3}\s/.test(L[i])){pre.push(L[i]);i++;while(i<L.length&&/^\s*$/.test(L[i]))i++}
while(i<L.length&&(x=L[i].match(MR))){m.push(x);i++}
if(m.length<2||!m.some(function(y){return KN.test(y[1].trim())}))return null;
return{pre:pre,items:m,rest:L.slice(i)}}
function md(t){var o=[],ul=0,L=t.split(/\r?\n/),mt=meta(L);function cl(){if(ul){o.push('</ul>');ul=0}}
function ln(l){var m;
if(m=l.match(/^(#{1,3})\s+(.*)/)){cl();o.push('<h'+m[1].length+'>'+inl(m[2])+'</h'+m[1].length+'>')}
else if(m=l.match(/^\s*[-*\u2022]\s+(.*)/)){if(!ul){o.push('<ul>');ul=1}o.push('<li>'+inl(m[1])+'</li>')}
else if(/^\s*$/.test(l)){cl()}else{cl();o.push('<p>'+inl(l)+'</p>')}}
if(mt){mt.pre.forEach(ln);o.push('<div class="meta-header">'+mt.items.map(function(x){var v=x[2].trim();return '<div'+(v.length>70?' class="wide"':'')+'><strong>'+esc(x[1].trim())+':</strong> '+inl(v)+'</div>'}).join('')+'</div>');L=mt.rest}
L.forEach(ln);cl();return o.join('')}
function pv(){var c=$('conf').checked;$('ctext').disabled=!c;var h=md($('ai').value);
if(!h){$('pv').innerHTML='<p class="ph">Your formatted brief appears here.</p>';return}
var t=esc($('ctext').value.trim()||CT),d=today();
$('pv').innerHTML=(c?'<div class="ch">'+t+' \u2013 '+d+'</div>':'')+h+(c?'<div class="cf">'+t+'</div>':'')}
function gen(){save();var f=$('fmt').value,v=$('voice').value.trim(),mk=/linkedin|marketing|engagement|reactivation/i.test(f);$('out').value=(tpl[f]||'')+(mk&&v?'\n\nCRITICAL: Write in this exact voice, tone, and formatting style:\n'+v:'')+'\n\n=== CANDIDATE CV / LINKEDIN PROFILE ===\n'+($('cv').value.trim()||'[not provided]')+'\n\n=== JOB DESCRIPTION / CLIENT NEEDS ===\n'+($('jd').value.trim()||'[not provided]')+'\n\n=== END OF INPUT ===';note(mk&&!v?'Prompt ready. Tip: add writing samples under Voice Lock.':'Master prompt ready.')}
function copy(){var t=$('out').value;
function fb(){$('out').select();try{document.execCommand('copy');note('Copied.')}catch(e){note('Press Ctrl+C to copy.')}}
if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(function(){note('Copied.')},fb);else fb()}
function handoff(url){if(!$('out').value)gen();copy();if(url)window.open(url,'_blank','noopener')}
function day(){return new Date().toISOString().slice(0,10)}
function dl(t,ty,n){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:ty}));a.download=n;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},1000)}
$('gen').onclick=gen;
$('cp').onclick=function(){if(!$('out').value)return note('Generate a prompt first.');copy()};
$('cpc').onclick=function(){handoff('https://claude.ai/new')};
$('cpg').onclick=function(){handoff('https://chatgpt.com')};
$('txt').onclick=function(){var t=$('out').value;if(!t)return note('Generate a prompt first.');
dl(t,'text/plain','master-prompt-'+day()+'.txt');note('Downloaded.')};
$('clr').onclick=function(){if(!confirm('Clear the CV, job description, prompt and pasted output?'))return;
['cv','jd','out','ai'].forEach(function(i){$(i).value=''});$('conf').checked=false;ct();pv();save();note('Cleared.')};
document.addEventListener('keydown',function(e){var t=e.target;
if((e.metaKey||e.ctrlKey)&&e.key==='Enter'&&t.tagName==='TEXTAREA'&&t.closest('#t1')&&!t.readOnly){e.preventDefault();gen()}});
$('ssave').onclick=function(){var n=$('sname').value.trim();if(!n)return note('Name the session first.');
ss[n]={cv:$('cv').value,jd:$('jd').value,fmt:$('fmt').value,at:Date.now()};sv(SS,ss);sessList(n);note('Session saved.')};
$('sload').onclick=function(){var n=$('ssel').value,s=ss[n];if(!s)return note('No saved session.');
$('cv').value=s.cv;$('jd').value=s.jd;
var has=!!tpl[s.fmt];if(has)$('fmt').value=s.fmt;
s.at=Date.now();sv(SS,ss);sessList(n);$('sname').value=n;ct();gen();
note(has?'Session loaded.':'Session loaded. Its template no longer exists, so "'+$('fmt').value+'" is selected.');
$('out').scrollIntoView({behavior:'smooth',block:'center'})};
function auto(){return $('jd').value.replace(/\s+/g,' ').trim().slice(0,25)}
$('sname').onfocus=function(){if(!this.value.trim())this.value=auto()};
$('sdup').onclick=function(){var n=$('sname').value.trim()||auto();$('sname').value=(n||'Untitled')+' (copy)';$('out').value='';note('Duplicated as an unsaved draft. Click Save Session to keep it.')};
$('sjson').onclick=function(){var n=$('sname').value.trim()||auto()||'session',sl=n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'session';
dl(JSON.stringify({name:n,format:$('fmt').value,cv:$('cv').value,jd:$('jd').value,exported:new Date().toISOString()},null,2),'application/json',sl+'-'+day()+'.json');note('Session exported.')};
$('voice').oninput=function(){sv('sf_voice',this.value)};
$('sdel').onclick=function(){var n=$('ssel').value;if(!ss[n])return note('No saved session.');if(!confirm('Are you sure you want to delete this session?'))return;delete ss[n];sv(SS,ss);sessList();note('Session deleted.')};
var DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday'],ST=['Draft','Ready','Posted'],PL=ld('sf_plan',{});
function planBuild(){var w=$('plan');w.innerHTML='';DAYS.forEach(function(d){
var p=PL[d]||(PL[d]={t:'',s:'Draft'}),r=document.createElement('div');r.className='pr';r.dataset.s=p.s;
r.innerHTML='<strong class="pd">'+d+'</strong><input aria-label="'+d+' topic or angle" placeholder="Topic / Angle"><select aria-label="'+d+' status">'+ST.map(function(x){return '<option>'+x+'</option>'}).join('')+'</select><button type="button" aria-label="Clear '+d+'">Clear</button>';
var i=r.querySelector('input'),s=r.querySelector('select'),b=r.querySelector('button');i.value=p.t;s.value=p.s;
function up(){p.t=i.value;p.s=s.value;r.dataset.s=p.s;sv('sf_plan',PL)}
i.oninput=up;s.onchange=up;b.onclick=function(){i.value='';s.value='Draft';up()};w.appendChild(r)})}
$('tsel').onchange=showT;
$('tsave').onclick=function(){var n=$('tname').value.trim();if(!n||!$('tbody').value.trim())return note('Add a name and instructions.');tpl[n]=$('tbody').value;sv(T,tpl);S.fmt=n;refresh(n);save();note('Template saved.')};
$('tnew').onclick=function(){$('tname').value='';$('tbody').value='';$('tname').focus()};
$('tdel').onclick=function(){var n=$('tsel').value;if(Object.keys(tpl).length<2)return note('Keep at least one template.');delete tpl[n];sv(T,tpl);S.fmt='';refresh();note('Template deleted.')};
$('treset').onclick=function(){if(!confirm('Restore all '+Object.keys(D).length+' default templates? Any edits to defaults will be overwritten. Templates you created yourself are kept.'))return;
tpl=Object.assign({},tpl,D);sv(T,tpl);refresh($('fmt').value);save();note('Default templates restored.')};
document.querySelectorAll('nav button').forEach(function(b){b.onclick=function(){document.querySelectorAll('nav button,.tab').forEach(function(e){e.classList.remove('on')});b.classList.add('on');$(b.dataset.t).classList.add('on')}});
$('pdf').onclick=function(){pv();window.print()};
$('conf').onchange=function(){save();pv()};
$('ctext').oninput=function(){save();pv()};
var hd=$('hd');
$('help').onclick=function(){if(hd.showModal)hd.showModal();else hd.setAttribute('open','')};
function hclose(){if(hd.close)hd.close();else hd.removeAttribute('open')}
$('hx').onclick=hclose;
hd.addEventListener('click',function(e){if(e.target===hd)hclose()});
$('th').onclick=function(){var c=H.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');H.dataset.theme=c==='dark'?'light':'dark';sv('sf_theme',H.dataset.theme)};
var th=ld('sf_theme',null);if(th)H.dataset.theme=th;
['cv','jd','fmt','ai'].forEach(function(i){$(i).oninput=$(i).onchange=function(){save();if(i==='ai')pv();if(i==='cv'||i==='jd')ct()}});
planBuild();$('voice').value=ld('sf_voice','');refresh();sessList();['cv','jd','ai'].forEach(function(i){$(i).value=S[i]||''});$('conf').checked=!!S.conf;$('ctext').value=S.ctext||CT;ct();pv();
})();
