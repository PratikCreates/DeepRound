// --- DeepRound Professional Dashboard Logic ---

// --- 1. DATA MODELS & LOCAL STORAGE ---
let assets = JSON.parse(localStorage.getItem('deepround_assets')) || []; // Combined Resumes and Codebases
let companies = JSON.parse(localStorage.getItem('deepround_companies')) || [];
let sessionsHistory = JSON.parse(localStorage.getItem('deepround_sessions')) || [];
let projects = JSON.parse(localStorage.getItem('deepround_projects')) || [];

function saveAssets() { localStorage.setItem('deepround_assets', JSON.stringify(assets)); }
function saveCompanies() { localStorage.setItem('deepround_companies', JSON.stringify(companies)); }
function saveSessions() { localStorage.setItem('deepround_sessions', JSON.stringify(sessionsHistory)); }
function saveProjects() { localStorage.setItem('deepround_projects', JSON.stringify(projects)); }

// Toast System
window.showToast = function(title, message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="toast-title">${title}</div><div class="toast-message">${message}</div>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

if(companies.length === 0) {
  companies = [{ id: '1', name: 'Acme Corp', priority: 'High', rounds: ['Technical Screen', 'System Design'], jds: [{id:'j1', title: 'Senior Backend Engineer', content: 'Must know Go and k8s'}], selectedAssetId: '' }];
  saveCompanies();
}

let currentSessionTranscript = [];

// --- 2. NAVIGATION ---
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");

function navigateTo(pageId) {
  pages.forEach(p => p.classList.remove("active"));
  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  }
  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.dataset.page === pageId) item.classList.add("active");
  });
  
  if(pageId === 'home') renderOverview();
  if(pageId === 'dumpflex') renderAssets();
  if(pageId === 'drives') renderCompanies();
  if(pageId === 'profile') renderProjects();
  if(pageId === 'voice') initVoiceSessionFlow();
  if(pageId === 'accurate-context') { /* nothing to init yet */ }
}

navItems.forEach(item => item.addEventListener("click", () => navigateTo(item.dataset.page)));

// --- 3. OVERVIEW PAGE (TRANSCRIPT HISTORY) ---
const modalOverlay = document.getElementById("modalOverlay");
const transcriptModal = document.getElementById("transcriptModal");

function renderOverview() {
  const tbody = document.getElementById("recentSessionsTableBody");
  const statSessions = document.getElementById("statSessions");
  const statRating = document.getElementById("statRating");
  if(statSessions) statSessions.textContent = sessionsHistory.length;
  if(sessionsHistory.length > 0) {
    const sum = sessionsHistory.reduce((acc, cur) => acc + parseInt(cur.rating), 0);
    if(statRating) statRating.textContent = (sum / sessionsHistory.length).toFixed(1);
  }
  if(!tbody) return;
  tbody.innerHTML = "";
  if (sessionsHistory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center p-4 text-muted">No sessions completed yet.</td></tr>`;
    return;
  }
  const sorted = [...sessionsHistory].reverse().slice(0, 10);
  sorted.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="font-medium">${s.companyName}<br><span class="text-sm text-muted">${s.roundMode}</span></td>
      <td class="text-sm text-muted">${new Date(s.date).toLocaleDateString()}</td>
      <td><div class="flex gap-1 text-warning">${Array(5).fill(0).map((_, i) => `<i class="${i < s.rating ? 'ph-fill' : 'ph'} ph-star"></i>`).join('')}</div></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="viewTranscript('${s.id}')">
          <i class="ph ph-chat-text"></i> View Log
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.viewTranscript = (sessionId) => {
  const session = sessionsHistory.find(s => s.id === sessionId);
  if(!session) return;
  
  const logContainer = document.getElementById("transcriptModalLog");
  logContainer.innerHTML = "";
  
  if(!session.transcript || session.transcript.length === 0) {
    logContainer.innerHTML = `<div class="text-center p-8 text-muted">No transcript data found for this session.</div>`;
  } else {
    session.transcript.forEach(msg => {
      const div = document.createElement("div");
      div.className = `message ${msg.type}`;
      div.textContent = msg.text;
      logContainer.appendChild(div);
    });
  }
  
  modalOverlay.classList.remove("hidden");
  transcriptModal.classList.remove("hidden");
};

document.getElementById("closeTranscriptModal")?.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
  transcriptModal.classList.add("hidden");
});


// --- 4. PROJECT PORTFOLIO ---
const projectModal = document.getElementById("projectModal");
document.getElementById("openAddProjectModalBtn")?.addEventListener("click", () => {
  document.getElementById("projectTitleInput").value = ""; document.getElementById("projectStackInput").value = ""; document.getElementById("projectDescInput").value = "";
  document.getElementById("modalOverlay").classList.remove("hidden"); projectModal.classList.remove("hidden");
});
document.getElementById("closeProjectModal")?.addEventListener("click", () => { document.getElementById("modalOverlay").classList.add("hidden"); projectModal.classList.add("hidden"); });
document.getElementById("saveProjectBtn")?.addEventListener("click", () => {
  const title = document.getElementById("projectTitleInput").value.trim(); 
  const stackStr = document.getElementById("projectStackInput").value.trim(); 
  const desc = document.getElementById("projectDescInput").value.trim();
  if(title && desc) { 
    projects.push({ id: 'proj_' + Date.now(), title, stack: stackStr.split(',').map(s=>s.trim()).filter(Boolean), desc }); 
    saveProjects(); 
    renderProjects(); 
    document.getElementById("modalOverlay").classList.add("hidden"); 
    projectModal.classList.add("hidden"); 
    showToast('Project Saved', `${title} added to your portfolio.`, 'success');
  } else {
    showToast('Validation Error', 'Title and Description are required.', 'warning');
  }
});
function renderProjects() {
  const container = document.getElementById("projectsList"); if(!container) return; container.innerHTML = "";
  if(projects.length === 0) { container.innerHTML = `<div class="text-center p-4 text-muted border border-border-strong rounded border-dashed">No projects added.</div>`; return; }
  projects.forEach(p => {
    const card = document.createElement("div"); card.className = "project-card";
    const tags = p.stack.map(s => `<span class="tech-tag">${s}</span>`).join('');
    card.innerHTML = `<div class="flex justify-between items-start"><h3>${p.title}</h3><button class="btn btn-ghost btn-sm text-danger p-0" onclick="deleteProject('${p.id}')"><i class="ph ph-trash"></i></button></div><div class="tech-stack">${tags}</div><p>${p.desc}</p>`;
    container.appendChild(card);
  });
}
window.deleteProject = (id) => { projects = projects.filter(p => p.id !== id); saveProjects(); renderProjects(); };


// --- 5. DUMPFLEX & ASSETS ---
const resumeUpload = document.getElementById("resumeUpload"); const resumeNameModal = document.getElementById("resumeNameModal"); const codebaseModal = document.getElementById("codebaseModal");
let pendingResumeFile = null;

resumeUpload?.addEventListener("change", (e) => {
  if (e.target.files.length) { pendingResumeFile = e.target.files[0]; document.getElementById("newResumeNameInput").value = pendingResumeFile.name.split('.')[0]; modalOverlay.classList.remove("hidden"); resumeNameModal.classList.remove("hidden"); document.getElementById("resumeExtractingUI").classList.add("hidden"); }
});
document.getElementById("closeResumeModal")?.addEventListener("click", () => { modalOverlay.classList.add("hidden"); resumeNameModal.classList.add("hidden"); resumeUpload.value = ""; });
document.getElementById("saveResumeBtn")?.addEventListener("click", () => {
  const name = document.getElementById("newResumeNameInput").value.trim() || pendingResumeFile.name; const extUI = document.getElementById("resumeExtractingUI"); extUI.classList.remove("hidden");
  setTimeout(() => { assets.push({ id: 'res_' + Date.now(), type: 'Resume/Doc', name: name, details: "Extracted: Python, Distributed Systems, SQL" }); saveAssets(); modalOverlay.classList.add("hidden"); resumeNameModal.classList.add("hidden"); resumeUpload.value = ""; extUI.classList.add("hidden"); renderAssets(); renderCompanies(); }, 1500);
});
document.getElementById("openCodebaseModalBtn")?.addEventListener("click", () => { document.getElementById("codebaseRawInput").value = ""; document.getElementById("codebaseExtractingUI").classList.add("hidden"); document.getElementById("codebaseExtractingUI").innerHTML = '<i class="ph ph-spinner animate-spin"></i> Parsing repo via Advanced AI...'; modalOverlay.classList.remove("hidden"); codebaseModal.classList.remove("hidden"); });
document.getElementById("closeCodebaseModal")?.addEventListener("click", () => { modalOverlay.classList.add("hidden"); codebaseModal.classList.add("hidden"); });
document.getElementById("saveCodebaseBtn")?.addEventListener("click", async () => {
  const rawUrl = document.getElementById("codebaseRawInput").value.trim();
  const extUI = document.getElementById("codebaseExtractingUI");
  if(!rawUrl) return;
  extUI.classList.remove("hidden");
  
  try {
    const res = await fetch("/api/extract_repo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: rawUrl })
    });
    const data = await res.json();
    if(data.error) throw new Error(data.error);
    
    assets.push({ id: 'repo_' + Date.now(), type: 'Codebase', name: data.name, details: data.summary });
    saveAssets(); modalOverlay.classList.add("hidden"); codebaseModal.classList.add("hidden"); renderAssets(); renderCompanies();
    showToast('Codebase Extracted', `Successfully parsed ${data.name}.`, 'success');
  } catch (err) {
    extUI.classList.add("hidden");
    showToast('Extraction Failed', err.message, 'error');
  }
});
function renderAssets() {
  const tbody = document.getElementById("resumeTableBody"); if(!tbody) return; tbody.innerHTML = "";
  if (assets.length === 0) { tbody.innerHTML = `<tr><td colspan="4" class="text-center p-4 text-muted">No assets uploaded yet.</td></tr>`; return; }
  assets.forEach(a => { const tr = document.createElement("tr"); tr.innerHTML = `<td class="font-medium">${a.name}</td><td><span class="badge badge-neutral">${a.type}</span></td><td class="text-sm text-muted">${a.details}</td><td><button class="btn btn-ghost btn-sm text-danger" onclick="deleteAsset('${a.id}')">Delete</button></td>`; tbody.appendChild(tr); });
}
window.deleteAsset = (id) => { assets = assets.filter(a => a.id !== id); saveAssets(); renderAssets(); renderCompanies(); };

// --- 6. COMPANY DRIVES ---
const companyModal = document.getElementById("companyModal");
document.getElementById("openAddCompanyModalBtn")?.addEventListener("click", () => { document.getElementById("companyNameInput").value = ""; document.getElementById("companyUrlInput").value = ""; document.getElementById("companyExtractingUI").classList.add("hidden"); modalOverlay.classList.remove("hidden"); companyModal.classList.remove("hidden"); });
document.getElementById("closeCompanyModal")?.addEventListener("click", () => { modalOverlay.classList.add("hidden"); companyModal.classList.add("hidden"); });
document.getElementById("autoExtractBtn")?.addEventListener("click", () => { const extUI = document.getElementById("companyExtractingUI"); extUI.classList.remove("hidden"); setTimeout(() => { document.getElementById("companyNameInput").value = "Analyzed Tech Corp"; extUI.innerHTML = `<i class="ph ph-check text-success"></i> Details scraped successfully.`; }, 1500); });
document.getElementById("saveCompanyBtn")?.addEventListener("click", () => { const name = document.getElementById("companyNameInput").value.trim() || "Unknown Company"; const priority = document.getElementById("companyPriorityInput").value; companies.push({ id: 'comp_' + Date.now(), name: name, priority: priority, rounds: ['Initial Screen'], jds: [], selectedAssetId: '' }); saveCompanies(); modalOverlay.classList.add("hidden"); companyModal.classList.add("hidden"); renderCompanies(); });
function renderCompanies() {
  const container = document.getElementById("companiesList"); if(!container) return; container.innerHTML = "";
  if (companies.length === 0) { container.innerHTML = `<div class="panel p-8 text-center text-muted">No companies added.</div>`; return; }
  const priorityScore = { "High": 3, "Medium": 2, "Low": 1 }; const sorted = [...companies].sort((a,b) => priorityScore[b.priority] - priorityScore[a.priority]);
  sorted.forEach(c => {
    const priorityClass = c.priority === "High" ? "badge-success" : c.priority === "Medium" ? "badge-warning" : "badge-neutral";
    let assetOptions = `<option value="">-- Assign Profile / Repo --</option>`; assets.forEach(a => { assetOptions += `<option value="${a.id}" ${c.selectedAssetId === a.id ? 'selected' : ''}>[${a.type}] ${a.name}</option>`; });
    let jdsHtml = c.jds.map(jd => `<div class="jd-item"><span class="text-sm font-medium">${jd.title}</span><button class="btn btn-ghost btn-sm text-danger" onclick="deleteJD('${c.id}', '${jd.id}')"><i class="ph ph-trash"></i></button></div>`).join(""); let roundsHtml = c.rounds.map(r => `<span class="round-tag">${r}</span>`).join("");
    const card = document.createElement("div"); card.className = "company-card";
    card.innerHTML = `
      <div class="company-card-header" onclick="this.parentElement.classList.toggle('expanded')"><div class="flex items-center gap-4"><span class="company-name">${c.name}</span><span class="badge ${priorityClass}">${c.priority} Priority</span></div><i class="ph ph-caret-down expand-icon"></i></div>
      <div class="company-card-body">
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Assigned Asset Context</label><select class="form-input" onchange="updateCompanyAsset('${c.id}', this.value)">${assetOptions}</select></div>
          <div class="form-group"><label class="form-label">Interview Rounds</label><div class="round-tags">${roundsHtml}</div><div class="flex gap-2 mt-2"><input type="text" id="roundInput_${c.id}" class="form-input btn-sm" placeholder="Add round..."><button class="btn btn-secondary btn-sm" onclick="addRound('${c.id}')">Add</button></div></div>
          <div class="form-group col-span-2 mt-4"><div class="flex justify-between items-center mb-2"><label class="form-label mb-0">Job Descriptions</label><button class="btn btn-secondary btn-sm" onclick="addJD('${c.id}')"><i class="ph ph-plus"></i> Upload JD</button></div><div class="jd-list">${jdsHtml || '<span class="text-sm text-muted">No JDs attached.</span>'}</div></div>
        </div>
        <div class="flex justify-end mt-4 pt-4 border-t border-strong"><button class="btn btn-ghost text-danger" onclick="deleteCompany('${c.id}')">Delete Company</button></div>
      </div>
    `;
    container.appendChild(card);
  });
}
window.updateCompanyAsset = (compId, assetId) => { const comp = companies.find(c => c.id === compId); if(comp) { comp.selectedAssetId = assetId; saveCompanies(); } }; window.deleteCompany = (id) => { companies = companies.filter(c => c.id !== id); saveCompanies(); renderCompanies(); }; window.addRound = (compId) => { const input = document.getElementById(`roundInput_${compId}`); if(input.value.trim()) { const comp = companies.find(c => c.id === compId); comp.rounds.push(input.value.trim()); saveCompanies(); renderCompanies(); } }; window.addJD = (compId) => { const comp = companies.find(c => c.id === compId); comp.jds.push({ id: 'jd_'+Date.now(), title: 'Uploaded JD - ' + new Date().toLocaleTimeString(), content: 'Mock JD' }); saveCompanies(); renderCompanies(); }; window.deleteJD = (compId, jdId) => { const comp = companies.find(c => c.id === compId); comp.jds = comp.jds.filter(j => j.id !== jdId); saveCompanies(); renderCompanies(); };

// --- 7. VOICE SESSION PIPELINE & CONNECTION ---
const voiceCompanySelection = document.getElementById("voiceCompanySelection"); const voicePipelineSelection = document.getElementById("voicePipelineSelection"); const voiceSessionPrep = document.getElementById("voiceSessionPrep"); const voiceSession = document.getElementById("voiceSession"); const postSessionView = document.getElementById("postSessionView");
let targetCompanyId = null; let targetCompanyName = ""; let currentRoundMode = null;

function initVoiceSessionFlow() {
  voiceCompanySelection.classList.remove("hidden"); voicePipelineSelection.classList.add("hidden"); voiceSessionPrep.classList.add("hidden"); voiceSession.classList.add("hidden"); postSessionView.classList.add("hidden");
  const select = document.getElementById("pipelineCompanySelect"); select.innerHTML = `<option value="">-- Choose a Company --</option>`; companies.forEach(c => { select.innerHTML += `<option value="${c.id}">${c.name}</option>`; }); select.addEventListener("change", () => { document.getElementById("loadPipelineBtn").disabled = select.value === ""; });
}
document.getElementById("loadPipelineBtn")?.addEventListener("click", () => { targetCompanyId = document.getElementById("pipelineCompanySelect").value; const comp = companies.find(c => c.id === targetCompanyId); if(!comp) return; targetCompanyName = comp.name; document.getElementById("pipelineCompanyName").textContent = comp.name; voiceCompanySelection.classList.add("hidden"); voicePipelineSelection.classList.remove("hidden"); });
document.getElementById("pipelineBackBtn")?.addEventListener("click", () => { voicePipelineSelection.classList.add("hidden"); voiceCompanySelection.classList.remove("hidden"); });

function generateDefaultPrompt() {
  const comp = companies.find(c => c.id === targetCompanyId); const ta = document.getElementById("prepCustomPrompt");
  let prompt = `You are an interviewer for ${comp.name}. We are conducting the '${currentRoundMode}' round. `;
  if (currentRoundMode === "Panic Mode") { prompt = "PANIC MODE: The user is entering a coding test/interview in 5 minutes. DO NOT BE CONVERSATIONAL. Provide extremely fast, 1-line code snippets, exact SQL syntax, and rapid-fire concepts only. Prioritize speed and brevity above all else."; } 
  else if (currentRoundMode === "Resume Screening") { prompt += "Grill me aggressively on the bullet points of my resume. Ask for specific metrics and technical decisions I made."; } 
  else if (currentRoundMode === "Online Assessment") { prompt += "Do NOT ask me to code. Instead, ask me to verbally explain the optimal Data Structure and Algorithm for a problem, and its Time/Space complexity."; } 
  else if (currentRoundMode.includes("Tech")) { prompt += "Give me a complex engineering problem. I will verbally solve it. Probe into edge cases and algorithmic bottlenecks."; if (projects.length > 0) { prompt += "\n\nAsk me specific architectural questions about my portfolio projects:\n"; projects.forEach(p => { prompt += `- ${p.title} (Built with: ${p.stack.join(', ')}). ${p.desc}\n`; }); } } 
  else if (currentRoundMode === "Managerial Round") { prompt += "Focus heavily on technical tradeoffs, resolving team conflicts, and handling high-pressure project deadlines."; } 
  else if (currentRoundMode === "HR & Behavioral") { prompt += "Use the STAR method. Ask about my weaknesses, times I failed, and how I align with company culture."; }
  if(comp.selectedAssetId && currentRoundMode !== "Panic Mode") { const asset = assets.find(r => r.id === comp.selectedAssetId); if(asset) prompt += `\nAsset Context [${asset.type}]: ${asset.name} - ${asset.details}.`; }
  ta.value = prompt;
}

document.querySelectorAll(".pipeline-step").forEach(step => {
  step.addEventListener("click", () => {
    currentRoundMode = step.dataset.round; document.getElementById("prepModeName").textContent = currentRoundMode; document.getElementById("activeSessionModeName").textContent = currentRoundMode;
    const voiceSelect = document.getElementById("prepVoiceSelect"); if(currentRoundMode.includes("Managerial")) voiceSelect.value = "Charon"; else if(currentRoundMode === "Panic Mode") voiceSelect.value = "Puck"; else if(currentRoundMode.includes("HR")) voiceSelect.value = "Zephyr"; else voiceSelect.value = "Puck"; 
    generateDefaultPrompt(); document.getElementById("prepCustomizationPanel").classList.add("hidden"); document.getElementById("customizationCaret").style.transform = "rotate(0deg)"; voicePipelineSelection.classList.add("hidden"); voiceSessionPrep.classList.remove("hidden"); window.scrollTo(0,0);
  });
});

document.getElementById("prepBackBtn")?.addEventListener("click", () => { voiceSessionPrep.classList.add("hidden"); voicePipelineSelection.classList.remove("hidden"); });
document.getElementById("prepGeneratePromptBtn")?.addEventListener("click", generateDefaultPrompt);
document.getElementById("toggleCustomizationBtn")?.addEventListener("click", () => { const panel = document.getElementById("prepCustomizationPanel"); const caret = document.getElementById("customizationCaret"); if(panel.classList.contains("hidden")) { panel.classList.remove("hidden"); caret.style.transform = "rotate(180deg)"; } else { panel.classList.add("hidden"); caret.style.transform = "rotate(0deg)"; } });
document.querySelectorAll(".chip").forEach(chip => { chip.addEventListener("click", () => { const ta = document.getElementById("prepCustomPrompt"); ta.value += (ta.value ? " " : "") + chip.dataset.inject; }); });

// Init Session
document.getElementById("prepStartEngineBtn")?.addEventListener("click", () => { voiceSessionPrep.classList.add("hidden"); voiceSession.classList.remove("hidden"); currentSessionTranscript = []; resetSessionUI(); });
document.getElementById("voiceEndBtn")?.addEventListener("click", () => { if (geminiClient && geminiClient.isConnected()) geminiClient.disconnect(); voiceSession.classList.add("hidden"); document.getElementById("postSessionModeName").textContent = `${targetCompanyName} - ${currentRoundMode}`; const stars = document.querySelectorAll("#starRatingSelector i"); stars.forEach(s => { s.classList.remove("active"); s.classList.replace("ph-fill", "ph"); }); document.getElementById("postSessionRatingValue").value = "0"; document.getElementById("postSessionNotes").value = ""; postSessionView.classList.remove("hidden"); resetSessionUI(); });

const voiceOrb = document.getElementById("voiceOrb"); const voiceStatus = document.getElementById("voiceStatus"); const connectBtn = document.getElementById("connectBtn"); const micBtn = document.getElementById("micBtn"); const disconnectBtn = document.getElementById("disconnectBtn"); const chatLog = document.getElementById("chat-log");

function resetSessionUI() { chatLog.innerHTML = ""; setOrbState("ready"); connectBtn.classList.remove("hidden"); connectBtn.disabled = false; micBtn.classList.add("hidden"); disconnectBtn.classList.add("hidden"); document.getElementById("textInput").value = ""; }
function setOrbState(state) { voiceOrb.className = "audio-orb"; if (state === "listening") voiceOrb.classList.add("listening"); if (state === "speaking") voiceOrb.classList.add("speaking"); const labels = { ready: "Ready to connect", connecting: "Connecting...", listening: "Listening...", speaking: "Speaking..." }; voiceStatus.textContent = labels[state] || state; }

const mediaHandler = new MediaHandler();
const geminiClient = new GeminiClient({
  onOpen: () => { updateConnectionStatus(true); setOrbState("listening"); connectBtn.classList.add("hidden"); micBtn.classList.remove("hidden"); disconnectBtn.classList.remove("hidden"); const customPrompt = document.getElementById("prepCustomPrompt").value; const selectedVoice = document.getElementById("prepVoiceSelect").value; geminiClient.sendText(`System Context: [Voice:${selectedVoice}] [Round:${currentRoundMode}]. ${customPrompt}`); },
  onMessage: (event) => { if (typeof event.data === "string") { try { const msg = JSON.parse(event.data); if (msg.type === "interrupted" || msg.type === "turn_complete") { if (msg.type === "interrupted") mediaHandler.stopAudioPlayback(); setOrbState("listening"); } else if (msg.type === "user") { appendMessage("user", msg.text); } else if (msg.type === "gemini") { appendMessage("gemini", msg.text); } } catch (e) {} } else { setOrbState("speaking"); mediaHandler.playAudio(event.data); } },
  onClose: () => { updateConnectionStatus(false); resetSessionUI(); mediaHandler.stopAudio(); },
  onError: () => { updateConnectionStatus(false); resetSessionUI(); connectBtn.textContent = "Retry Connection"; }
});

function appendMessage(type, text) { const div = document.createElement("div"); div.className = `message ${type}`; div.textContent = text; chatLog.appendChild(div); chatLog.scrollTop = chatLog.scrollHeight; currentSessionTranscript.push({ type, text }); }
function updateConnectionStatus(isOnline) { statusDot.className = `status-dot ${isOnline ? "online" : ""}`; statusText.textContent = isOnline ? "System Online" : "System Offline"; }
connectBtn?.addEventListener("click", async () => { setOrbState("connecting"); connectBtn.disabled = true; try { await mediaHandler.initializeAudio(); geminiClient.connect(); } catch (err) { setOrbState("ready"); connectBtn.disabled = false; } });
micBtn?.addEventListener("click", async () => { if (mediaHandler.isRecording) { mediaHandler.stopAudio(); micBtn.textContent = "Enable Microphone"; micBtn.classList.replace("btn-danger", "btn-outline"); } else { await mediaHandler.startAudio((data) => { if (geminiClient.isConnected()) geminiClient.send(data); }); micBtn.textContent = "Mute Microphone"; micBtn.classList.replace("btn-outline", "btn-danger"); } });
disconnectBtn?.addEventListener("click", () => { geminiClient.disconnect(); mediaHandler.stopAudioPlayback(); });
document.getElementById("sendBtn")?.addEventListener("click", sendText); document.getElementById("textInput")?.addEventListener("keypress", (e) => { if (e.key === "Enter") sendText(); });
function sendText() { const input = document.getElementById("textInput"); if (input.value.trim() && geminiClient.isConnected()) { geminiClient.sendText(input.value.trim()); appendMessage("user", input.value.trim()); input.value = ""; } }

document.getElementById("saveSessionFeedbackBtn")?.addEventListener("click", () => { sessionsHistory.push({ id: 'sess_' + Date.now(), companyId: targetCompanyId, companyName: targetCompanyName, roundMode: currentRoundMode, rating: document.getElementById("postSessionRatingValue").value || 0, notes: document.getElementById("postSessionNotes").value, date: new Date().toISOString(), transcript: [...currentSessionTranscript] }); saveSessions(); postSessionView.classList.add("hidden"); voicePipelineSelection.classList.remove("hidden"); });
const stars = document.querySelectorAll("#starRatingSelector i"); stars.forEach(star => { star.addEventListener("mouseover", (e) => { const val = parseInt(e.target.dataset.value); stars.forEach(s => { if(parseInt(s.dataset.value) <= val) s.classList.replace("ph", "ph-fill"); else s.classList.replace("ph-fill", "ph"); }); }); star.addEventListener("click", (e) => { const val = e.target.dataset.value; document.getElementById("postSessionRatingValue").value = val; stars.forEach(s => { if(parseInt(s.dataset.value) <= parseInt(val)) { s.classList.add("active"); s.classList.replace("ph", "ph-fill"); } else { s.classList.remove("active"); s.classList.replace("ph-fill", "ph"); } }); }); });
document.getElementById("starRatingSelector")?.addEventListener("mouseleave", () => { const selectedVal = parseInt(document.getElementById("postSessionRatingValue").value); stars.forEach(s => { if(parseInt(s.dataset.value) <= selectedVal) { s.classList.add("active"); s.classList.replace("ph", "ph-fill"); } else { s.classList.remove("active"); s.classList.replace("ph-fill", "ph"); } }); });

// --- 8. MAKE ME BETTER (COACHING & MENTIONS) ---
const improveTextInput = document.getElementById("improveTextInput");
const mentionDropdown = document.getElementById("mentionDropdown");
const improveChipsContainer = document.getElementById("improveChipsContainer");
const improveChatLog = document.getElementById("improveChatLog");
const improveSendBtn = document.getElementById("improveSendBtn");
const coachingStatus = document.getElementById("coachingStatus");

let selectedCoachingSessions = [];

// Coaching Gemini Client (Text Only)
// Note: In reality, we could reuse the same backend websocket. We instantiate a separate text-only handler.
const coachingClient = new GeminiClient({
  onOpen: () => {
    coachingStatus.textContent = "Online"; coachingStatus.className = "badge badge-success";
    // Send optimized context when connecting
    const contextStr = selectedCoachingSessions.map(s => `\n--- Session: ${s.companyName} (${s.roundMode}) ---\nTranscript:\n${JSON.stringify(s.transcript)}`).join('\n');
    coachingClient.sendText(`System Context: You are an expert technical interview coach. The user is providing past transcripts for review. Do NOT conduct an interview. Analyze their answers, point out technical inaccuracies, and suggest structural improvements. Optimized Context Data: ${contextStr}`);
  },
  onMessage: (event) => {
    if (typeof event.data === "string") {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "gemini") { appendCoachMessage("gemini", msg.text); }
      } catch (e) {}
    }
  },
  onClose: () => { coachingStatus.textContent = "Offline"; coachingStatus.className = "badge badge-neutral"; },
  onError: () => { coachingStatus.textContent = "Error"; coachingStatus.className = "badge badge-warning"; }
});

function appendCoachMessage(type, text) {
  const div = document.createElement("div"); div.className = `message ${type}`; div.textContent = text;
  improveChatLog.appendChild(div); improveChatLog.scrollTop = improveChatLog.scrollHeight;
}

improveTextInput?.addEventListener("keyup", (e) => {
  const val = improveTextInput.value;
  const atIndex = val.lastIndexOf("@");
  
  if (atIndex !== -1) {
    const query = val.slice(atIndex + 1).toLowerCase();
    const validSessions = sessionsHistory.filter(s => s.transcript && s.transcript.length > 0 && `${s.companyName} ${s.roundMode}`.toLowerCase().includes(query));
    
    if (validSessions.length > 0) {
      mentionDropdown.innerHTML = "";
      validSessions.forEach(s => {
        const li = document.createElement("li"); li.className = "mention-item";
        li.innerHTML = `<span class="mention-item-title">${s.companyName} - ${s.roundMode}</span><span class="mention-item-date">${new Date(s.date).toLocaleDateString()}</span>`;
        li.addEventListener("click", () => {
          // Select session
          if(!selectedCoachingSessions.find(x => x.id === s.id)) {
            selectedCoachingSessions.push(s);
            renderCoachChips();
          }
          // Remove the @ query from input
          improveTextInput.value = val.slice(0, atIndex);
          mentionDropdown.classList.add("hidden");
          improveTextInput.focus();
        });
        mentionDropdown.appendChild(li);
      });
      mentionDropdown.classList.remove("hidden");
    } else {
      mentionDropdown.classList.add("hidden");
    }
  } else {
    mentionDropdown.classList.add("hidden");
  }
});

// Hide dropdown on click outside
document.addEventListener("click", (e) => { if(e.target !== improveTextInput) mentionDropdown.classList.add("hidden"); });

function renderCoachChips() {
  improveChipsContainer.innerHTML = "";
  selectedCoachingSessions.forEach(s => {
    const chip = document.createElement("div"); chip.className = "context-chip";
    chip.innerHTML = `@${s.companyName} - ${s.roundMode} <i class="ph ph-x cursor-pointer" onclick="removeCoachChip('${s.id}')"></i>`;
    improveChipsContainer.appendChild(chip);
  });
}
window.removeCoachChip = (id) => { selectedCoachingSessions = selectedCoachingSessions.filter(s => s.id !== id); renderCoachChips(); };

function sendCoachMessage() {
  const text = improveTextInput.value.trim();
  if (text) {
    if(!coachingClient.isConnected()) {
      coachingStatus.textContent = "Connecting..."; coachingStatus.className = "badge badge-warning";
      coachingClient.connect();
      // Wait for connection to open before sending user message
      setTimeout(() => { if(coachingClient.isConnected()) { coachingClient.sendText(text); appendCoachMessage("user", text); improveTextInput.value = ""; } }, 1000);
    } else {
      coachingClient.sendText(text); appendCoachMessage("user", text); improveTextInput.value = "";
    }
  }
}

improveSendBtn?.addEventListener("click", sendCoachMessage);
improveTextInput?.addEventListener("keypress", (e) => { if (e.key === "Enter" && !mentionDropdown.classList.contains("hidden") === false) sendCoachMessage(); });


// Init
renderOverview();
renderAssets();
renderCompanies();
renderProjects();

// --- 9. ACCURATE CONTEXT ENGINE ---
const acChatLog = document.getElementById("acChatLog");
const acInputArea = document.getElementById("acInputArea");
const acOptionsContainer = document.getElementById("acOptionsContainer");
const acTextContainer = document.getElementById("acTextContainer");
const acTextInput = document.getElementById("acTextInput");
const acStatus = document.getElementById("acStatus");
let acMessages = [];

function appendAcMessage(type, htmlContent) {
  const div = document.createElement("div"); div.className = `ac-message ${type}`;
  div.innerHTML = htmlContent;
  acChatLog.appendChild(div);
  acChatLog.scrollTop = acChatLog.scrollHeight;
}

document.getElementById("startAcBtn")?.addEventListener("click", () => {
  document.getElementById("startAcBtn").classList.add("hidden");
  fetchNextAcQuestion();
});

async function fetchNextAcQuestion() {
  acInputArea.classList.add("hidden");
  acStatus.textContent = "Thinking..."; acStatus.className = "badge badge-warning";
  
  try {
    const res = await fetch("/api/accurate_context_agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: acMessages })
    });
    const data = await res.json();
    
    if(data.error) throw new Error(data.error);
    
    acMessages.push({ role: "assistant", content: JSON.stringify(data) });
    appendAcMessage("gemini", `<p>${data.question}</p>`);
    
    renderAcInput(data);
    acStatus.textContent = "Waiting for User"; acStatus.className = "badge badge-success";
  } catch(err) {
    acStatus.textContent = "Error"; acStatus.className = "badge badge-danger";
    appendAcMessage("gemini", `<p class="text-danger">Error generating question: ${err.message}</p>`);
    showToast('API Error', err.message, 'error');
  }
}

function renderAcInput(data) {
  acInputArea.classList.remove("hidden");
  acOptionsContainer.innerHTML = "";
  
  if (data.type === "mcq" && data.options && data.options.length > 0) {
    acTextContainer.classList.add("hidden");
    data.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "ac-option-btn";
      btn.innerHTML = `<span>${opt}</span> <button class="ac-option-better-btn" onclick="submitAcAnswer('${opt} (Make it better)', event)"><i class="ph ph-sparkle"></i> Make it better</button>`;
      btn.onclick = (e) => {
        if(e.target.closest('.ac-option-better-btn')) return;
        submitAcAnswer(opt);
      };
      acOptionsContainer.appendChild(btn);
    });
  } else {
    acTextContainer.classList.remove("hidden");
    acOptionsContainer.innerHTML = "";
    acTextInput.value = "";
    acTextInput.focus();
  }
}

window.submitAcAnswer = function(answerText, e) {
  if(e) e.stopPropagation();
  appendAcMessage("user", `<p>${answerText}</p>`);
  acMessages.push({ role: "user", content: answerText });
  fetchNextAcQuestion();
};

document.getElementById("acSendBtn")?.addEventListener("click", () => {
  if(acTextInput.value.trim()) submitAcAnswer(acTextInput.value.trim());
});
document.getElementById("acSkipBtn")?.addEventListener("click", () => submitAcAnswer("I don't want to answer this."));
document.getElementById("acExplainBtn")?.addEventListener("click", () => submitAcAnswer("I don't fully understand the question. Can you explain or provide examples?"));

// Voice Mode via Web Speech API
let acVoiceMode = false;
document.getElementById("acMicBtn")?.addEventListener("click", () => {
  acVoiceMode = true;
  acStatus.textContent = "Listening..."; acStatus.className = "badge badge-success";
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition) { showToast('Not Supported', 'Speech Recognition is not supported in this browser.', 'warning'); return; }
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.onresult = (e) => {
    acTextInput.value = Array.from(e.results).map(r => r[0].transcript).join('');
  };
  recognition.onend = () => {
    acStatus.textContent = "Waiting for User"; acStatus.className = "badge badge-success";
    if(acTextInput.value.trim()) {
      submitAcAnswer(acTextInput.value.trim());
    }
  };
  recognition.start();
});

// Override fetchNextAcQuestion to include TTS if voice mode is active
const originalFetchNext = fetchNextAcQuestion;
fetchNextAcQuestion = async function() {
  await originalFetchNext();
  if (acVoiceMode) {
    const lastMsg = acMessages[acMessages.length - 1];
    if(lastMsg.role === "assistant") {
      try {
        const parsed = JSON.parse(lastMsg.content);
        const utterance = new SpeechSynthesisUtterance(parsed.question);
        window.speechSynthesis.speak(utterance);
      } catch(e){}
    }
  }
};


