<div align="center">
  <h1>🚀 DeepRound</h1>
  <p><strong>A Hyper-Modern, Telemetry-Driven Mock Interview Simulator</strong></p>
</div>

<br>

## 🌟 Overview
DeepRound is a dynamic, end-to-end interview pipeline tailored for tech professionals. Built to replicate the rigor of real-world hiring, it provides a comprehensive 7-stage interview track, evaluating candidates and building precise professional profiles.

## ✨ Features
- **The Pipeline:** A complete 7-stage journey from Resume Screening to HR Rounds, mapping to real-world tech recruitment standards.
- **AccurateContext Engine:** A dynamic profiling reverse-interview that quizzes you (via text or voice) to extract a highly accurate professional context.
- **DumpFlex Assets:** Seamlessly extract and auto-summarize your repositories and codebases into highly-usable context assets.
- **"Make Me Better" Coaching:** A dedicated coaching engine that reads your past session transcripts and provides tactical, actionable feedback.
- **Panic Mode:** 5-minute pre-test cramming modes simulating rapid-fire technical questions to sharpen your reflexes.
- **Voice Interactions:** Full-duplex voice support using Web Speech APIs and real-time backend WebSockets for a realistic interview flow.

## 🛠 Tech Stack
- **Frontend:** Vanilla JavaScript, HTML, and highly customized Vanilla CSS. Designed for pure speed and dynamic, glassmorphism aesthetics without bulky frameworks.
- **Backend:** Python FastAPI running Uvicorn for asynchronous, high-performance data handling.
- **AI Engine:** Powered by state-of-the-art Large Language Models for real-time WebSocket conversational interviews, codebase extraction, and context generation.

## 🚀 Status
**MVP Phase 1 Status**: Development is currently in progress. 
- [x] Basic UI & Application Structure
- [x] Backend Setup & Voice Architecture
- [ ] Integration Polish

## 💻 Setup Instructions

1. **Install Python dependencies:**
   ```bash
   pip install fastapi uvicorn requests openai python-dotenv
   ```
2. **Environment Variables:**
   Create a `.env` file in the root directory and configure the required API keys (refer to `.env.example`).
   *(Note: The app features graceful fallbacks. If certain keys are omitted, the agents will return simulated high-quality mock data for UI testing).*
3. **Run the Server:**
   ```bash
   python main.py
   ```
4. **Access the App:**
   Open `http://localhost:8000` in your browser.

## 🛡 High Standards & Resilience
DeepRound is built with robustness in mind. The UI features a global animated Toast Notification system (no disruptive pop-ups), and the backend includes graceful degrading logic that prevents the UI from breaking even if API limits are hit.
