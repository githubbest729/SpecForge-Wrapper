(function(){
var $=function(i){return document.getElementById(i)},K='sf_session',T='sf_tpl',H=document.documentElement;
var D={'Executive Brief':'Act as an elite executive recruiter. Using the CV and Job Description below, write a formal Executive Brief with these sections: Candidate Snapshot, Career Narrative, Fit Against the Mandate, Risks and Mitigations, Recommendation. Use Markdown headings (#, ##) and bullet points. Never invent facts; flag gaps explicitly.',
'Market Intelligence Pack':'Act as a senior executive search researcher. From the CV and Job Description below, produce a Market Intelligence Pack: target companies, comparable titles, compensation signals, talent pools, and approach angles. Use Markdown headings and bullets. State assumptions and mark anything unverified.',
'Company Cheat Sheet':'Act as a chief of staff briefing a founder. From the Job Description and CV below, produce a one-page Company Cheat Sheet: business model, stage, leadership, news to verify, likely interview themes, and ten sharp questions. Use Markdown headings and bullets.'};
function ld(k,f){try{return JSON.parse(localStorage.getItem(k))||f}catch(e){return f}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var tpl=ld(T,D),S=ld(K,{});
function note(t){$('msg').textContent=t;setTimeout(function(){$('msg').textContent=''},2500)}
function opts(s,keep){s.innerHTML='';Object.keys(tpl).forEach(function(n){var o=document.createElement('option');o.value=o.textContent=n;s.appendChild(o)});if(keep&&tpl[keep])s.value=keep}
function showT(){var n=$('tsel').value;$('tname').value=n;$('tbody').value=tpl[n]||''}
function refresh(n){opts($('fmt'),n||S.fmt);opts($('tsel'),n||$('tsel').value);showT()}
function save(){S={cv:$('cv').value,jd:$('jd').value,fmt:$('fmt').value,ai:$('ai').value};sv(K,S)}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function inl(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')}
function md(t){var o=[],ul=0;function cl(){if(ul){o.push('</ul>');ul=0}}
t.split(/\r?\n/).forEach(function(l){var m;
if(m=l.match(/^(#{1,3})\s+(.*)/)){cl();o.push('<h'+m[1].length+'>'+inl(m[2])+'</h'+m[1].length+'>')}
else if(m=l.match(/^\s*[-*\u2022]\s+(.*)/)){if(!ul){o.push('<ul>');ul=1}o.push('<li>'+inl(m[1])+'</li>')}
else if(/^\s*$/.test(l)){cl()}else{cl();o.push('<p>'+inl(l)+'</p>')}});cl();return o.join('')}
function pv(){$('pv').innerHTML=md($('ai').value)||'<p class="ph">Your formatted brief appears here.</p>'}
$('gen').onclick=function(){save();$('out').value=(tpl[$('fmt').value]||'')+'\n\n=== CANDIDATE CV / LINKEDIN PROFILE ===\n'+($('cv').value.trim()||'[not provided]')+'\n\n=== JOB DESCRIPTION / CLIENT NEEDS ===\n'+($('jd').value.trim()||'[not provided]')+'\n\n=== END OF INPUT ===';note('Master prompt ready.')};
$('cp').onclick=function(){var t=$('out').value;if(!t)return note('Generate a prompt first.');
function fb(){$('out').select();try{document.execCommand('copy');note('Copied.')}catch(e){note('Press Ctrl+C to copy.')}}
if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(function(){note('Copied.')},fb);else fb()};
$('tsel').onchange=showT;
$('tsave').onclick=function(){var n=$('tname').value.trim();if(!n||!$('tbody').value.trim())return note('Add a name and instructions.');tpl[n]=$('tbody').value;sv(T,tpl);S.fmt=n;refresh(n);save();note('Template saved.')};
$('tnew').onclick=function(){$('tname').value='';$('tbody').value='';$('tname').focus()};
$('tdel').onclick=function(){var n=$('tsel').value;if(Object.keys(tpl).length<2)return note('Keep at least one template.');delete tpl[n];sv(T,tpl);S.fmt='';refresh();note('Template deleted.')};
document.querySelectorAll('nav button').forEach(function(b){b.onclick=function(){document.querySelectorAll('nav button,.tab').forEach(function(e){e.classList.remove('on')});b.classList.add('on');$(b.dataset.t).classList.add('on')}});
$('pdf').onclick=function(){pv();window.print()};
$('th').onclick=function(){var c=H.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');H.dataset.theme=c==='dark'?'light':'dark';sv('sf_theme',H.dataset.theme)};
var th=ld('sf_theme',null);if(th)H.dataset.theme=th;
['cv','jd','fmt','ai'].forEach(function(i){$(i).oninput=$(i).onchange=function(){save();if(i==='ai')pv()}});
refresh();['cv','jd','ai'].forEach(function(i){$(i).value=S[i]||''});pv();
})();
