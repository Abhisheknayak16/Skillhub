// Simple JS to power the demo interactions
document.addEventListener('DOMContentLoaded', function(){
  const roleCards = document.querySelectorAll('.role-card');
  let selectedRole = null;
  roleCards.forEach(c => c.addEventListener('click', ()=> {
    roleCards.forEach(x=> x.style.boxShadow = '');
    c.style.boxShadow = '0 8px 30px rgba(24,90,219,0.12)';
    selectedRole = c.dataset.role;
  }));

  document.getElementById('demo-continue').addEventListener('click', ()=>{
    if(!selectedRole){
      alert('Please select a role to continue (Editor or Client).');
      return;
    }
    if(selectedRole === 'editor'){
      showEditor();
    } else {
      showClient();
    }
  });

  document.getElementById('demo-skip').addEventListener('click', ()=>{
    showExplore();
  });

  document.getElementById('open-skill').addEventListener('click', ()=>{
    openModal(skillHtml());
  });
  document.getElementById('open-portfolio').addEventListener('click', ()=>{
    openModal(portfolioHtml());
  });
  document.getElementById('open-feature').addEventListener('click', ()=>{
    openModal(featureHtml());
  });

  document.getElementById('find-matches').addEventListener('click', ()=>{
    const matches = [
      {name:'Aman Kapoor', niche:'Reels, Ads', price:'3,500', verified:true},
      {name:'Priya Singh', niche:'Vlogs, Color Grade', price:'4,200', verified:true},
      {name:'Rohit Mehra', niche:'Ads, Shorts', price:'2,800', verified:false},
    ];
    const container = document.getElementById('matches');
    container.innerHTML = '';
    matches.forEach(m => {
      const div = document.createElement('div');
      div.className = 'editor-card';
      div.innerHTML = `<div class="editor-avatar">${m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
        <div style="flex:1">
          <div style="font-weight:700">${m.name} ${m.verified?'<span style="color:var(--highlight);font-weight:700">★</span>':''}</div>
          <div class="muted">${m.niche}</div>
        </div>
        <div style="text-align:right">₹${m.price}<br/><button class="btn" onclick="contact('${m.name}')">Contact</button></div>`;
      container.appendChild(div);
    });
  });

  document.getElementById('post-public').addEventListener('click', ()=>{
    alert('Project posted publicly to verified editors (demo).');
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);

  // nav buttons
  document.getElementById('btn-hire').addEventListener('click', showExplore);
  document.getElementById('btn-find').addEventListener('click', ()=> { showExplore(); document.getElementById('search').focus(); });

  // helper functions
  function showEditor(){
    hideAll();
    document.getElementById('editor-dashboard').classList.remove('hidden');
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function showClient(){
    hideAll();
    document.getElementById('client-dashboard').classList.remove('hidden');
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function showExplore(){
    hideAll();
    document.getElementById('explore').classList.remove('hidden');
    populateResults();
  }
  function hideAll(){
    document.querySelectorAll('.dashboard').forEach(s=> s.classList.add('hidden'));
  }

  function openModal(html){
    document.getElementById('modal-body').innerHTML = html;
    document.getElementById('modal').classList.remove('hidden');
  }
  function closeModal(){
    document.getElementById('modal').classList.add('hidden');
  }
  window.contact = function(name){
    alert('Contacting ' + name + ' (demo): opens DM / Email / WhatsApp in production.');
  }

  function populateResults(){
    const sample = [
      {name:'Aman Kapoor', niche:'Reels, Ads', price:'3,500', verified:true},
      {name:'Priya Singh', niche:'Vlogs, Color Grade', price:'4,200', verified:true},
      {name:'Rohit Mehra', niche:'Ads, Shorts', price:'2,800', verified:false},
      {name:'Simran Kaur', niche:'Documentary edits', price:'6,000', verified:true},
      {name:'Karan Shah', niche:'YouTube, Thumbnails', price:'2,200', verified:false},
      {name:'Neha Patel', niche:'Reels & Social', price:'1,800', verified:true},
    ];
    const results = document.getElementById('results');
    results.innerHTML = '';
    sample.forEach(s=>{
      const div = document.createElement('div');
      div.className = 'editor-card';
      div.innerHTML = `<div class="editor-avatar">${s.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
        <div style="flex:1">
          <div style="font-weight:700">${s.name} ${s.verified?'<span style="color:var(--highlight);font-weight:700">★</span>':''}</div>
          <div class="muted">${s.niche}</div>
        </div>
        <div style="text-align:right">₹${s.price}<br/><button class="btn" onclick="contact('${s.name}')">Message</button></div>`;
      results.appendChild(div);
    });
  }

  function skillHtml(){
    return `<h3>Skill Test Zone</h3>
      <p>We provide a short raw clip. Upload your edited version to get reviewed by admin/AI.</p>
      <label>Download sample clip: <a href="#" onclick="alert('Download sample (demo)')">sample_clip.mp4</a></label>
      <label>Upload your file:
        <input type="file" id="skill-upload" />
      </label>
      <div style="margin-top:12px"><button class="btn primary" onclick="submitSkill()">Submit for verification</button></div>
      <script>function submitSkill(){ alert('Submitted for review (demo). Admin will verify in production.');}</script>`;
  }
  function portfolioHtml(){
    return `<h3>Portfolio Builder (AI-assisted)</h3>
      <p>Fill basic fields and we will generate a simple portfolio preview.</p>
      <label>Name<input id="pf-name" placeholder="Your name" /></label>
      <label>Bio<textarea id="pf-bio" rows="3"></textarea></label>
      <label>Niche<select id="pf-niche"><option>Reels</option><option>Vlogs</option><option>Ads</option></select></label>
      <div style="margin-top:12px"><button class="btn primary" onclick="generatePortfolio()">Generate Preview</button></div>
      <div id="pf-preview" style="margin-top:12px"></div>
      <script>
        function generatePortfolio(){
          const name = document.getElementById('pf-name').value || 'Your Name';
          const bio = document.getElementById('pf-bio').value || 'Short bio generated by AI: Experienced editor...';
          const niche = document.getElementById('pf-niche').value;
          document.getElementById('pf-preview').innerHTML = '<div style="padding:12px;border-radius:12px;background:#FBFCFD"><h4>'+name+'</h4><div style="color:#6B7280">'+niche+'</div><p>'+bio+'</p><div style="margin-top:8px"><button class="btn">Publish (₹99)</button></div></div>';
        }
      </script>`;
  }
  function featureHtml(){
    return `<h3>Featured Placement</h3><p>Promote your profile to the top of search results for ₹199/week.</p><div style="margin-top:12px"><button class="btn primary" onclick="alert('Checkout (demo)')">Buy Featured (₹199)</button></div>`;
  }
});
