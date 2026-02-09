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
        content: "AI Chat is the core conversational interface. Chat with powerful language models running entirely on your device. Model Selection: Choose from GGUF llama.cpp quantized models or MLX Apple framework models. Import custom GGUF models from Hugging Face. Conversation Modes: Standard Mode for direct conversation, Chat Flow Mode for multi-agent conversations. Context Window: Determines how much conversation history the AI can see. Adjustable in Settings. Attachments: Images with OCR or VLM analysis, Documents PDFs and text files, URLs fetched and converted to markdown. Reasoning and Thinking: Models like DeepSeek and Qwen 3 show chain-of-thought in collapsible Thinking section. Tool Calling: Web Search, Web Fetch, Calculator built-in tools. Chat Settings: Temperature, System Prompt, Context Size, Show Reasoning, Auto-play Voice.",
        keywords: "chat conversation model GGUF MLX context window attachments reasoning thinking tool calling temperature system prompt"
    },
    {
        title: "Knowledge Libraries",
        url: "knowledge-libraries.html",
        section: "Core Guides",
        content: "Knowledge Libraries are dedicated AI memory spaces for specific projects. Uses similarity search vector embeddings to find relevant document chunks. Documents split into chunks and indexed locally. All processing on-device. Creating a Library: Open Knowledge tab, tap New Library, add documents. Adding Content: PDF Documents, Text Files, Web Pages, Images with OCR, Notes. Using Libraries in Chat: Activate library in AI Chat toolbar, ask questions, view sources. Managing Libraries: Edit, Rename, Delete, create multiple libraries. Tips: Keep libraries focused, use descriptive file names, regularly update, combine with AI Roles.",
        keywords: "knowledge library RAG documents PDF text web pages images notes vector embeddings similarity search project memory"
    },
    {
        title: "Voice Notes",
        url: "voice-notes.html",
        section: "Core Guides",
        content: "Voice Notes lets you record audio, transcribe in real-time, and process with AI. Recording Audio: Real-time transcription with WhisperKit, background recording on iOS, import existing audio files. Transcription powered by Whisper model locally via WhisperKit: word-level timestamps, multiple languages, automatic punctuation. AI Processing: Summarization, Translation, Key points extraction, Custom processing. Word-Level Navigation: Tap any word to jump to that moment in the recording. Language Support: Many languages including English, Chinese, Japanese, Spanish, French.",
        keywords: "voice notes recording transcription WhisperKit audio speech-to-text summarization translation languages"
    },
    {
        title: "Text-to-Speech",
        url: "text-to-speech.html",
        section: "Core Guides",
        content: "Text-to-Speech capabilities for converting text into natural-sounding speech. TTS Engines: Apple Voices built-in speech synthesis, Kokoro TTS advanced neural TTS engine running on-device. Usage: TTS Tab for direct text input, speaker icon on AI chat responses, auto-play mode. Speech Speed: Range 0.5x to 2.0x, default 1.0x, test button for preview. Auto-Play Responses: Automatically speak AI responses for hands-free experience.",
        keywords: "text-to-speech TTS Kokoro Apple voices speech speed auto-play voice synthesis"
    },
    {
        title: "Web Search",
        url: "web-search.html",
        section: "Core Guides",
        content: "Built-in AI-powered web search. How it works: Query sent to search engine, app fetches content from top results, local AI analyzes and synthesizes information, structured summary with source citations. Usage: Navigate to AI Search tab, enter query in natural language, review synthesized results. Source References: Click source links, see which parts came from which sources, verify information. Tool Calling Integration: Models can automatically trigger web searches in regular chat when they need current information.",
        keywords: "web search online browse AI analysis source citations tool calling internet"
    },
    {
        title: "Vision Models",
        url: "vision-models.html",
        section: "Core Guides",
        content: "Vision Language Models VLM let you analyze images, screenshots, diagrams, and documents. Supported Models: GGUF llama.cpp vision models, MLX vision models like Qwen3 VL, Cloud API vision models. Identified by VLM tag in model picker. Usage: Select VLM model, attach image via camera or library, ask about the image. VLM vs OCR Processing: VLM models process raw pixels directly, non-VLM models use OCR text extraction. Camera Integration on iOS: Scan documents, analyze whiteboards, read signs, identify objects.",
        keywords: "vision models VLM images screenshots diagrams OCR camera analysis visual"
    },
    {
        title: "Chat Flows",
        url: "chat-flows.html",
        section: "Core Guides",
        content: "Chat Flows create multi-agent conversations with multiple specialized AI participants. Each participant has Name, System prompt, and Model. Participants take turns responding. Creating a Flow: Open model picker, switch to Chat Flow tab, create new flow, add participants. Managing Participants: Add from Roles, create custom, reorder by drag, edit, remove. Running a Flow: Enable Use Custom Flow toggle, start new conversation, all participants respond in sequence. Example Flows: Business Planning Team, Content Creation Team, Code Review Team. Flow resets to default on new conversation.",
        keywords: "chat flows multi-agent collaborative AI teams participants workflow automation"
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
