// RelaxationPage.jsx
import React, { useState, useEffect } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import MiniGame from "../components/miniGame";
import MeditationVideo from "../components/meditation";
import FunFacts from "../components/funFacts";
import CustomNavbar from "../components/navbar";

function RelaxationPage() {
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 min
  const [activeTab, setActiveTab] = useState("game");
  const [quote, setQuote] = useState("");
  const [finished, setFinished] = useState(false);

  // Timer
  useEffect(() => {
    setSecondsLeft(600);
    setFinished(false);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Random quote
  useEffect(() => {
    const quotes = [
      "Relax, breathe, you’re doing great",
      "Little breaks make big differences",
      "A fresh mind learns faster",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="d-flex flex-column vh-100">
      <CustomNavbar />
        <div className="container py-4">
        <h2 className="text-center mb-3">Relaxation Break</h2>
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
        <div className="mb-3">
            {activeTab === "game" && <MiniGame />}
            {activeTab === "video" && <MeditationVideo />}
            {activeTab === "facts" && <FunFacts />}
        </div>

        {/* Timer */}
        <ProgressBar
            now={(secondsLeft / 600) * 100}
            label={`${minutes}:${secs.toString().padStart(2, "0")}`}
        />

        {/* Footer actions */}
        <div className="text-center mt-4">
            {!finished && (
            <Button variant="secondary" href="/home">
                Skip & Return to Home
            </Button>
            )}
        </div>
        </div>
    </div>
  );
}

export default RelaxationPage;
