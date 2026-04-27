import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bot, Sparkle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

const AIWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 👋 Auto greeting
  useEffect(() => {
    setMessages([
      {
        type: "ai",
        text: "Hi! I’m your AI Health Assistant. Describe your symptoms 😊",
      },
    ]);
  }, []);

  const analyze = async () => {
    if (!input) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/ai/analyze`, {
        symptoms: input,
      });

      const data = res.data;

      const aiMessage = {
        type: "ai",
        text: `Doctor: ${data.doctor}
Tests: ${data.tests.join(", ")}
Urgency: ${data.urgency}
Advice: ${data.advice}`,
        raw: data,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
      {/* 🔘 Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#05adea",
          padding: "15px",
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          animation: "pulse 2s infinite",
        }}
      >
        <Sparkle size={24} color="white" />
      </div>

      {/* 💬 Chat Box */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "320px",
            height: "440px",
            backgroundColor: "white",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#05adea",
              color: "white",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <span>AI Assistant</span>
            <X style={{ cursor: "pointer" }} onClick={() => setOpen(false)} />
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.type === "user" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background:
                      msg.type === "user" ? "#007bff" : "#f1f1f1",
                    color: msg.type === "user" ? "white" : "black",
                    padding: "8px",
                    borderRadius: "10px",
                    maxWidth: "80%",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </span>

                {/* 📅 Book button for AI message */}
                {msg.raw && (
                  <div>
                    <button
                      style={{
                        marginTop: "5px",
                        fontSize: "12px",
                        padding: "5px",
                      }}
                      onClick={() =>
                        navigate(
                          `/doctors?specialization=${msg.raw.doctor}`
                        )
                      }
                    >
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>
            ))}

            {loading && <p>AI is typing...</p>}
          </div>

          {/* Input */}
          <div style={{ padding: "20px", display: "flex" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter symptoms..."
              style={{ flex: 1, padding: "8px" }}
            />
            <button onClick={analyze}>➤</button>
          </div>

          <p style={{ fontSize: "10px", textAlign: "center", color: "gray" }}>
            AI suggestions only. Not a diagnosis.
          </p>
        </div>
      )}

      {/* 🔥 Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default AIWidget;