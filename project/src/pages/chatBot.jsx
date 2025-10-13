import React, { useState } from "react";
import qaData from "../components/qAData";
import CustomNavbar from "../components/navbar";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋! I am your Study Assistant. Ask me only study-related questions. I am here to assist you",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.toLowerCase();

    // 1. Check study-related answers
    let reply = "";
    let found = false;
    for (const qa of qaData) {
      if (qa.keywords.some((word) => userMessage.includes(word))) {
        reply = qa.answer;
        found = true;
        break;
      }
    }

    // 2. Off-topic handling
    if (!found) {
      reply =
        "⚠ Stay focused! This chatbot is strictly for study purposes 📚. Ask me about your courses. Keep working hard 💪.";
    }

    setMessages([
      ...messages,
      { sender: "user", text: input },
      { sender: "bot", text: reply },
    ]);
    setInput("");
  };

  if (!isOpen) {
    // ✅ Show only robo icon when closed
    return (
        <>
            <CustomNavbar />
            <div 
                style={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "100vh" // full page height
                }}
            >
                <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
                Click the below icon for clarifying your doubts
                </h2>

                <div style={styles.chatIcon} onClick={() => setIsOpen(true)}>
                🤖
                </div>
            </div>
        </>
      
    );
  }

  return (
    <div style={styles.fullScreenChat}>
      <div style={styles.header}>
        Study Chatbot
        <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>
          ✖
        </button>
      </div>
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "bot" ? "left" : "right",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                background: msg.sender === "bot" ? "#e0e0e0" : "#007bff",
                color: msg.sender === "bot" ? "black" : "white",
                padding: "8px 12px",
                borderRadius: "12px",
                display: "inline-block",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          type="text"
          placeholder="Ask about your courses..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button style={styles.button} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatIcon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    fontSize: "40px",
    cursor: "pointer",
    background: "#007bff",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  fullScreenChat: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "white",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    zIndex: 2000,
  },
  header: {
    background: "#ad11b8",
    color: "white",
    padding: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ccc",
  },
  input: {
    flex: 1,
    border: "none",
    padding: "10px",
    outline: "none",
  },
  button: {
    border: "none",
    padding: "10px 15px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default Chatbot;