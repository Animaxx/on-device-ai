/**
 * On Device AI - Documentation Search Index
 * Pre-built index of all documentation pages for client-side search with Fuse.js
 */

window.DOCS_SEARCH_INDEX = [
    {
        title: "Getting Started",
        url: "getting-started.html",
        section: "Getting Started",
        content: "Install the app, download your first model, and start chatting in minutes. Requirements: iPhone 14+, iPad mini 7th gen, iPad Air 5th gen, iPad Pro 3rd gen, Apple Silicon Macs, Apple Vision Pro. Devices with 6GB+ RAM recommended. Installation: Download from the App Store, open the app, grant permissions for voice features. Download Your First Model: Open the model picker, browse recommended models, tap Download. Model recommendations for iPhones 6-8GB RAM try Gemma 3 4B or Qwen 3 4B. For Macs 16GB+ RAM try Qwen3 VL 32B. Start your first chat by navigating to AI Chat, typing a message, and sending. App navigation includes AI Search, Text to Speech, AI Voice Note, AI Chat, Knowledge, and Settings.",
        keywords: "install download setup requirements iPhone iPad Mac Vision Pro model first chat"
    },
    {
        title: "AI Chat",
        url: "ai-chat.html",
        section: "Core Guides",
        content: "AI Chat is the core conversational interface. Choose downloaded local models, review saved conversation history, and continue a previous chat after loading a model. Model Selection: Choose from GGUF llama.cpp quantized models or MLX Apple framework models. Conversation Modes: Standard Mode for direct conversation, Chat Flow Mode for multi-agent conversations. Attachments: Images, documents, and URLs. Tool Calling: Web Search, Web Fetch, Calculator, memory, HTTP requests, and other enabled tools.",
        keywords: "chat conversation model GGUF MLX history no model loaded attachments reasoning thinking tool calling temperature system prompt"
    },
    {
        title: "Knowledge Libraries",
        url: "knowledge-libraries.html",
        section: "Core Guides",
        content: "Knowledge Libraries are private project spaces for PDFs, notes, saved AI Search results, voice transcripts, TTS text, images, and web captures. Create and edit text documents, add files by picker or drag and drop, import chat or speech history, search and filter files, tune retrieval settings, and activate a library in AI Chat to ask questions from your material.",
        keywords: "knowledge library documents PDF text notes saved search voice transcript TTS history drag drop project memory"
    },
    {
        title: "Text Notes",
        url: "text-notes.html",
        section: "Core Guides",
        content: "Text Notes are quick private notes that belong to a Knowledge Library. Create a quick note, choose a default notes library, open notes from the side menu, edit Markdown or plain text, save changes, move notes between libraries, and create notes from Shortcuts or a home-screen quick action.",
        keywords: "text notes quick note markdown default library side menu shortcuts home screen create note"
    },
    {
        title: "Voice Notes",
        url: "voice-notes.html",
        section: "Core Guides",
        content: "Voice Notes lets you record audio, transcribe in real time, label speakers, process transcripts with AI, and save useful transcript text to a Knowledge Library. Import one transcript or several where batch actions are available. Audio stays in Voice Notes while transcript text becomes editable library context.",
        keywords: "voice notes recording transcription speech-to-text summary translation speaker labels transcript knowledge library import"
    },
    {
        title: "Text-to-Speech",
        url: "text-to-speech.html",
        section: "Core Guides",
        content: "Text-to-Speech converts text into spoken audio with Apple voices, Kokoro, or PocketTTS where available. Use the TTS tab, send AI responses to TTS, export generated audio, adjust speech speed, enable auto-play, and save useful generated text to a Knowledge Library from TTS history.",
        keywords: "text-to-speech TTS Kokoro PocketTTS Apple voices speech speed auto-play export audio knowledge library history"
    },
    {
        title: "Listen Library",
        url: "listen-library.html",
        section: "Core Guides",
        content: "Listen Library is a reading and listening queue for PDFs, Markdown, plain text, HTML, RTF, readable web URLs, pasted text, saved RSS entries, and scanned books. It is separate from Knowledge Libraries, which retrieve document passages into AI Chat. The shelf shows format badges, sentence resume context, audio-ready status, and last-listened timestamps with search, filter, and sort. The reader preserves the source presentation for PDFs, Markdown, plain text, and scanned page images. Row actions include Document Info, Rename, Copy to Knowledge, Move to Knowledge, and Delete. Copy creates an independent snapshot; Move transfers the document out of Listen. Scanned books use free on-device Apple Vision OCR with page capture, organization, correction review, and a split-view reader. Up Next is a durable shared queue with Play Next and Add to Queue, app-global playback, a mini-player, and a sleep timer of 5 to 60 minutes. Word highlighting is word-exact when the engine reports word timing and falls back to sentence or page otherwise. Generated audio is cached up to 2.15 GB and managed from Listening Settings.",
        keywords: "listen library reading listening queue PDF markdown scanned book OCR up next sleep timer resume word highlighting mini-player narration profile copy to knowledge move to knowledge generated audio cache"
    },
    {
        title: "RSS Feeds",
        url: "rss-feeds.html",
        section: "Core Guides",
        content: "RSS Feeds is a top-level listening workspace beside Listen Library that follows RSS 2.0, Atom, and JSON Feed subscriptions. Add Feed offers a bundled curated suggestion catalog or a direct HTTP or HTTPS feed URL; the app does not discover feeds from a website home page. Manual and foreground refresh are free, Background Refresh requires Pro. Filter entries by All, Unread, Played, or Saved. The article reader extracts full text locally with Readability.js, shows the active narration engine, and supports sentence tracking and playback speed. Add Unread, Play Next, and Add to Queue build the shared Up Next queue. Save to Shelf converts an entry into a permanent Listen Library document that stays available offline after unsubscribing.",
        keywords: "RSS Atom JSON Feed subscriptions curated suggestions add feed background refresh unread played saved article reader readability save to shelf up next play next"
    },
    {
        title: "Widgets",
        url: "widgets.html",
        section: "Core Guides",
        content: "Four free widget families are available from the system widget gallery on iPhone, iPad, and Mac: Listen, Voice Note, Text Note, and Quick Actions. visionOS is not included. Listen shows playback status, progress, and an active sleep-timer countdown, and its control acts only on the first item in Up Next. Voice Note opens Apple Speech creation and waits for Record. Text Note opens a new note. Quick Actions offers Play Next, RSS Feeds, Voice Note, and New Text Note. Medium note widgets can show one to three recent notes with an optional title toggle; small, Lock Screen, StandBy, and CarPlay-safe presentations never show user titles. Widgets render read-only snapshots, use a public allowlisted URL contract, never auto-record, and follow the App Language with English fallback.",
        keywords: "widgets home screen lock screen standby quick actions play next recent notes show titles widget privacy app language carplay macOS record voice note hotkey"
    },
    {
        title: "App Help",
        url: "app-help.html",
        section: "Core Guides",
        content: "App Help is a focused help chat that answers English questions about the app using the currently active model plus an immutable bundled help corpus. Find it at Menu then App Help; a one-time announcement introduces it and a New marker stays until opened, and Settings About Reset Model Suggestions and App Help replays the announcement. Sessions stay in memory, are excluded from conversation history, and New Session clears the transcript. There are no attachments, tools, roles, user Knowledge, or editable system prompt. App Help is free, unavailable while connected to a remote inference host, and answers in English only. Do not paste secrets or private document content; diagnostic reports include app version, hardware, and engine logs and omit conversation text, prompts, and attachments.",
        keywords: "app help help assistant support feedback new session English only ephemeral session no tools remote inference host diagnostics privacy where is app help"
    },
    {
        title: "AI Search and Web Search",
        url: "web-search.html",
        section: "Core Guides",
        content: "AI Search reads useful web pages, skips obvious clutter, and returns a source-backed answer. If no model is ready, the screen helps you load or select one. On compact devices you can dismiss the keyboard without clearing the query. Save useful completed searches to a Knowledge Library for later project context.",
        keywords: "web search AI search save search knowledge library source citations model unavailable keyboard internet"
    },
    {
        title: "Vision Models",
        url: "vision-models.html",
        section: "Core Guides",
        content: "Vision Language Models VLM let you analyze images, screenshots, diagrams, and documents. Supported Models: GGUF llama.cpp vision models, MLX vision models like Qwen3 VL, Cloud API vision models. Identified by VLM tag in model picker. Usage: Select VLM model, attach image via camera or library, ask about the image. VLM vs OCR Processing: VLM models process raw pixels directly, non-VLM models use OCR text extraction. Camera Integration on iOS: Scan documents, analyze whiteboards, read signs, identify objects.",
        keywords: "vision models VLM images screenshots diagrams OCR camera analysis visual"
    },
    {
        title: "Shortcuts & Automation",
        url: "shortcuts-automation.html",
        section: "Core Guides",
        content: "Use Siri and Shortcuts to create Text Notes, open conversations or Knowledge Libraries, transcribe audio files, and generate speech from text. Calendar and Reminders tools require permission and review before changes run. Cloud or external contexts may send returned personal data to the selected provider or chat context.",
        keywords: "shortcuts siri automation calendar reminders app intents transcribe audio speak text create note permissions approval"
    },
    {
        title: "Chat Flows",
        url: "chat-flows.html",
        section: "Core Guides",
        content: "Chat Flows create multi-agent conversations with multiple specialized AI participants. Each participant has Name, System prompt, and Model. Participants take turns responding. Creating a Flow: Open model picker, switch to Chat Flow tab, create new flow, add participants. Context Base Selector: Follow Previous Message (default), Use Latest User Message (for fan-out), Use Latest Message From Role. Fan-out Pattern: Multiple participants respond to same input without seeing each other. Summarizer Pattern: Later participant sees all earlier outputs. Message Provenance: Shows 'Based on:' indicator for each response. Managing Participants: Add from Roles, create custom, reorder by drag, edit, remove. Running a Flow: Enable Use Custom Flow toggle, start new conversation, all participants respond in sequence. Example Flows: Business Planning Team, Content Creation Team, Code Review Team. Flow resets to default on new conversation.",
        keywords: "chat flows multi-agent collaborative AI teams participants workflow automation fan-out summarizer context base message provenance based on"
    },
    {
        title: "Roles & Personas",
        url: "roles-personas.html",
        section: "Core Guides",
        content: "AI Roles create specialized AI assistants with unique personalities and expertise. A Role defines Display Name, System Prompt, and Preferred Model. Creating a Role: Open Roles management in Settings or chat toolbar, add role, write system prompt, assign model. Switching Roles: Tap role picker in chat toolbar, select role, behavior changes immediately. Example Roles: Code Assistant, Writing Coach, Research Analyst, Language Tutor, Debate Partner. Roles in Chat Flows: Add participants from existing roles, data is copied, changes to original role won't affect flow participants.",
        keywords: "roles personas AI specialists system prompt personality expertise custom assistant"
    },
    {
        title: "Cloud Providers",
        url: "cloud-providers.html",
        section: "Core Guides",
        content: "Optionally connect to cloud AI providers. Supported Providers: OpenAI GPT-4o, Anthropic Claude, Google Gemini, Groq, OpenRouter, LM Studio, Ollama. Setting Up: Open Settings Cloud Providers, select provider, enter API key stored in Keychain, select model. Switching Between Local and Cloud: Cloud models appear alongside local in model picker, switch any time. Privacy: Cloud always opt-in and off by default, API keys in Keychain, direct connection no proxy, clear UI indicators. Local Servers: Ollama at localhost:11434, LM Studio at localhost:1234, data stays on local network.",
        keywords: "cloud providers OpenAI Anthropic Claude Google Gemini Groq OpenRouter LM Studio Ollama API key"
    }
];
