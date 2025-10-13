//RelaxationModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import MiniGame from "./miniGame";
import MeditationVideo from "./meditation";
import FunFacts from "./funFacts";

function RelaxationModal({ show, onClose, onResume }) {
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 min
  const [activeTab, setActiveTab] = useState("game"); // default tab
  const [quote, setQuote] = useState("");
  const [finished, setFinished] = useState(false); // indicates timer finished

  // Timer effect
  useEffect(() => {
    if (!show) return;
    setSecondsLeft(600);
    setFinished(false);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFinished(true); // timer finished
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show]);

  // Fetch random quote
  useEffect(() => {
    if (show) {
      const quotes = [
        "Relax, breathe, you’re doing great",
        "Little breaks make big differences",
        "A fresh mind learns faster",
      ];
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [show]);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div>
      <Modal show={show} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Relaxation Break</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-muted">{quote}</p>

          {/* Tabs */}
          <div className="d-flex justify-content-center mb-3">
            <Button
              variant={activeTab === "game" ? "primary" : "outline-primary"}
              className="mx-1"
              onClick={() => setActiveTab("game")}
            >
              Mini Game
            </Button>
            <Button
              variant={activeTab === "video" ? "primary" : "outline-primary"}
              className="mx-1"
              onClick={() => setActiveTab("video")}
            >
              Meditation Video
            </Button>
            <Button
              variant={activeTab === "facts" ? "primary" : "outline-primary"}
              className="mx-1"
              onClick={() => setActiveTab("facts")}
            >
              Fun Facts
            </Button>
          </div>

          {/* Tab content */}
          {activeTab === "game" && <MiniGame />}
          {activeTab === "video" && <MeditationVideo />}
          {activeTab === "facts" && <FunFacts />}

          {/* Timer + Progress */}
          <div className="mt-3">
            <ProgressBar
              now={(secondsLeft / 600) * 100}
              label={`${minutes}:${secs.toString().padStart(2, "0")}`}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          {!finished && (
            <Button variant="secondary" onClick={onClose}>
              Skip & Return to Study
            </Button>
          )}
          {finished && (
            <Button
              variant="success"
              onClick={() => {
                onResume(); // resume study in parent
                onClose();
              }}
            >
              Resume Study ⏳
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RelaxationModal;
