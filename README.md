# 👨‍💻 Portfolio

### 🔴 **Live Demo:** <a href="https://anutej.us" target="_blank">anutej.us</a>[cite: 7]

> A personal portfolio website built with **React + Vite**, designed to mimic the developer experience of Visual Studio Code.[cite: 7]

## 📖 About The Project

This isn't just a static resume—it's an interactive experience hosted live at **[anutej.us](https://anutej.us)**.[cite: 7]

I built this portfolio to reflect the environment where developers spend most of their time: the IDE.[cite: 7] The application features a fully functional "Editor" interface, an in-memory Virtual File System (VFS) for navigation, an interactive terminal emulator, and a custom-built AI Chatbot that answers questions about my background in real-time.

### ✨ Key Features

* **VS Code Aesthetic**: A pixel-perfect recreation of the VS Code UI, including the sidebar, active tabs, and status bar.[cite: 7]
* **📱 Mobile-First Responsive Design**: 
  * Seamlessly adapts to phones and tablets (under 1024px) without breaking the IDE illusion.
  * Features a custom slide-out Explorer drawer and a Floating Action Button (FAB) for the AI chat modal.
  * Touch-optimized scrolling and spatial alignment.
* **⌨️ Interactive Terminal Emulator**: A built-in terminal with a custom lexical parser. Users can run UNIX-style commands like `ls`, `cd`, `open`, and `uptime` to navigate the portfolio and trigger easter eggs.
* **🤖 Integrated AI Assistant (Spring Boot Backend)**: A built-in chat interface powered by Google Gemini.[cite: 7] The API integration is securely proxied through a custom **Spring Boot backend**, which protects API keys, manages context windows, and serves as a reliable microservice for the frontend assistant.
* **📂 Virtual File System (VFS)**: State management is handled through a custom file system structure, allowing dynamic rendering of windows and active tabs just like a real code editor.
* **🌗 Dynamic Theming**: Fully supported **Light & Dark modes** that instantly switch the entire IDE color palette (editor, sidebar, terminal).[cite: 7]
* **🚀 Continuous Deployment**: Automated deployment pipeline configured via GitHub Actions, building and pushing Vite artifacts directly to GitHub Pages on every commit.

---

## 🏗️ Featured Projects (Within the Portfolio)

The portfolio dynamically renders detailed architectural breakdowns of my recent work, including:
* **OpenStream**: A full-stack microblogging REST API built with Spring Boot, PostgreSQL, and Docker.
* **BERTweet Guard**: A text moderation inference API utilizing LoRA fine-tuning, Focal Loss, and Hugging Face integration.
* **AI Data Extraction**: An OCR pipeline using Qwen LLMs and PostgreSQL to structure metadata from thousands of journal scans.

---

## 🛠️ Tech Stack

* **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)[cite: 7]
* **Backend**: Java + [Spring Boot](https://spring.io/projects/spring-boot) (AI API Proxy)
* **AI Integration**: Google Gemini API via Backend Service
* **State & Routing**: React Hooks & Custom Virtual File System
* **Styling**: CSS Variables, Flexbox, & Media Queries (Custom theming engine)[cite: 7]
* **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (VScode set)[cite: 7]
* **Deployment**: GitHub Pages & GitHub Actions

---

## 💻 Run Locally (Optional)

If you want to explore the frontend code or run this locally:[cite: 7]

1.  **Clone the repository**[cite: 7]
    ```bash
    git clone [https://github.com/anutej-kardele/Portfolio.git](https://github.com/anutej-kardele/Portfolio.git)
    cd Portfolio
    ```

2.  **Install dependencies**[cite: 7]
    ```bash
    npm install
    ```

3.  **Setup Environment**[cite: 7]
    To make the Chatbot work, you will need to point the frontend to the local Spring Boot backend service or provide a development API URL in your `.env` file.
    ```env
    VITE_API_URL=http://localhost:8080/api/chat
    ```

4.  **Start the Server**[cite: 7]
    ```bash
    npm run dev
    ```

---

## 📬 Contact

**Anutej Kardele** GitHub: [@anutej-kardele](https://github.com/anutej-kardele)[cite: 7]  
Website: [anutej.us](https://anutej.us)[cite: 7]
