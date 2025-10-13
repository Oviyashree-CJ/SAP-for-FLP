import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "../styles/App.css"; // Custom CSS
import CustomNavbar from "../components/navbar";

//k Data ---
const SUBJECTS = [
  "All",
  "Machine Learning",
  "Computer Networks",
  "Compiler Design",
  "Web Programming",
  "Advanced Databases",
  "Distributed Systems & Computing",
  "Natural Processing and Image Processing",
  "Iot",
];

const VIDEOS = [
  { id: "ml1", title: "Machine Learning Playlist", subject: "Machine Learning", playlistId: "PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF" },
  { id: "ml2", title: "Complete Machine Learning Playlist", subject: "Machine Learning", playlistId: "PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe" },
  { id: "cn1", title: "Computer Networks Complete Playlist", subject: "Computer Networks", playlistId: "PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
  { id: "cn2", title: "Computer Networking Tutorial", subject: "Computer Networks", playlistId: "PL6gx4Cwl9DGBpuvPW0aHa7mKdn_k9SPKO" },
  { id: "cd1", title: "Compiler Design Complete Playlist", subject: "Compiler Design", playlistId: "PLxCzCOWd7aiEKtKSIHYusizkESC42diyc" },
  { id: "cd2", title: "Compiler Design Playlist", subject: "Compiler Design", playlistId: "PL1QH9gyQXfguPNDTsnG90W2kBDQpYLDQr" },
  { id: "wd1", title: "Web Development Tutorials For Beginners", subject: "Web Programming", playlistId: "PLoYCgNOIyGAB_8_iq1cL8MVeun7cB6eNc" },
  { id: "wd2", title: "Web Development Crash Courses", subject: "Web Programming", playlistId: "PLillGF-RfqbYeckUaD1z6nviTp31GLTH8" },
  { id: "db1", title: "Advanced Database Systems", subject: "Advanced Databases", playlistId: "PLSE8ODhjZXjYa_zX-KeMJui7pcN1rIaIJ" },
  { id: "db2", title: "Advanced-Database", subject: "Advanced Databases", playlistId: "PLgj7VaRVWj1d6QI-RZn7OYXpE5N6uEyPO" },
  { id: "ds1", title: "Distributed Systems Lecture Series", subject: "Distributed Systems & Computing", playlistId: "PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB" },
  { id: "ds2", title: "MIT 6.824 Distributed Systems", subject: "Distributed Systems & Computing", playlistId: "PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB" },
  { id: "nlp1", title: "Natural Language Processing Playlist", subject: "Natural Processing and Image Processing", playlistId: "PLmPJQXJiMoUUSqSV7jcqGiiypGmQ_ogtb" },
  { id: "dp1", title: "Digital Image Processing Series", subject: "Natural Processing and Image Processing", playlistId: "PLbwfaPBgAKFEPBg-OFzmjFWmRKKrYigLi" },
  { id: "iot1", title: "Iot Playlist", subject: "Iot", playlistId: "PLbaHYtGdAM1jZ3p8B841jZDdEFolU-XL-" },
  { id: "iot2", title: "Iot Playlist", subject: "Iot", playlistId: "PLoE8JbNF16DoM9t4ECJMz9pAAyd913J4-" },
];

const BOOKS = [
  { id: "b1", title: "Machine Learning - TomMitchell (PDF)", subject: "Machine Learning", file: "/files/ML-TomMitchell.pdf", thumbnail: "/thumbnails/ml-basics.png" },
  { id: "b2", title: "Machine Learning - Advanced (PDF)", subject: "Machine Learning", file: "/files/Machine Lerning-Bishop.pdf", thumbnail: "/thumbnails/ml-advanced.png" },
  { id: "b3", title: "Computer Networks - Basics (PDF)", subject: "Computer Networks", file: "/files/CN-Kurose&Ross.pdf", thumbnail: "/thumbnails/cn.png" },
  { id: "b4", title: "Machine Learning - Sridhar(PDF)", subject: "Machine Learning", file: "/files/ML-Sridhar.pdf", thumbnail: "/thumbnails/ml.png" },
  { id: "b5", title: "Compiler Design - Problems", subject: "Compiler Design", file: "/files/Compilers- AhoLamSethiUllman.pdf", thumbnail: "/thumbnails/cd1.png" },
  { id: "b6", title: "Compiler Design - Notes", subject: "Compiler Design", file: "/files/cd.pdf", thumbnail: "/thumbnails/cd.png" },
  { id: "b7", title: "Web Programming - Notes", subject: "Web Programming", file: "/files/Java1.pdf", thumbnail: "/thumbnails/java1.png" },
  { id: "b8", title: "Web Programming - Guide", subject: "Web Programming", file: "/files/Java2.pdf", thumbnail: "/thumbnails/j2.png" },
  { id: "b9", title: "Advanced Databases - Handbook", subject: "Advanced Databases", file: "/files/Adb-Elmasri.pdf", thumbnail: "/thumbnails/adb.png" },
  { id: "b10", title: "Advanced Databases - Notes", subject: "Advanced Databases", file: "/files/Adb-Silberchatz.pdf", thumbnail: "/thumbnails/adb-sil.png" },
  { id: "b11", title: "Distributed Systems - Lecture Notes", subject: "Distributed Systems & Computing", file: "/files/Dist-Mukhesh.pdf", thumbnail: "/thumbnails/d1.png" },
  { id: "b12", title: "Distributed Systems - Problems", subject: "Distributed Systems & Computing", file: "/files/Dist-Tannenbaum.pdf", thumbnail: "/thumbnails/d2.png" },
  { id: "b13", title: "Natural Processing & Image Processing - Guide", subject: "Natural Processing and Image Processing", file: "/files/NLP-Daniel.pdf", thumbnail: "/thumbnails/nlp.png" },
  { id: "b14", title: "Natural Processing & Image Processing - Notes", subject: "Natural Processing and Image Processing", file: "/files/NLP-Richard.pdf", thumbnail: "/thumbnails/nlp2.png" },
  { id: "b15", title: "IoT - Arshadeep", subject: "Iot", file: "/files/Iot-Arshadeep.pdf", thumbnail: "/thumbnails/iot-basics.png" },
  { id: "b16", title: "IoT - Guide", subject: "Iot", file: "/files/Iot-Misra,Roy.pdf", thumbnail: "/thumbnails/iot.png" },
];

const SUMMARIES = [
  { id: "s1", title: "Machine Learning - Summary", subject: "Machine Learning", text: "Key points for Machine Learning...", file: "/files/ml-summary.pdf", thumbnail: "/thumbnails/sum.png" },
  { id: "s2", title: "Computer Networks - Summary", subject: "Computer Networks", text: "Key points for Computer Networks...", file: "/files/cn-summary.pdf", thumbnail: "/thumbnails/sum.png" },
  { id: "s3", title: "Compiler Design - Summary", subject: "Compiler Design", text: "Key points for Compiler Design...", file: "/files/cd-summary.pdf", thumbnail: "/thumbnails/sum.png" },
  { id: "s4", title: "Web Programming - Summary", subject: "Web Programming", text: "Key points for Web Programming...", file: "/files/wp-summary.pdf", thumbnail: "/thumbnails/sum.png" },
  { id: "s5", title: "Advanced Databases - Summary", subject: "Advanced Databases", text: "Key points for Advanced Databases...", file: "/files/ad-summary.pdf", thumbnail: "/thumbnails/sum.png" },
  { id: "s6", title: "Distributed Systems - Summary", subject: "Distributed Systems & Computing", text: "Key points for Distributed Systems...", file: "/files/ds-summary.pdf", thumbnail: "/thumbnails/sum.png" },
  { id: "s7", title: "NLP & Image Processing - Summary", subject: "Natural Processing and Image Processing", text: "Key points for NLP & Image Processing...", file: "/files/nlp-ip-summary.pdf", thumbnail: "/thumbnails/sum.png" },
  { id: "s8", title: "IoT - Summary", subject: "Iot", text: "Key points for IoT...", file: "/files/iot-summary.pdf", thumbnail: "/thumbnails/sum.png" },
];

// --- Fetch function (mock) ---
function fetchBooksFromDB(subject) {
  return new Promise((res) => {
    setTimeout(() => {
      if (!subject || subject === "All") res(BOOKS);
      else res(BOOKS.filter((b) => b.subject === subject));
    }, 300);
  });
}

// ---------- Reusable Button ----------
function NavActionButton({ onClick, label, style }) {
  return (
    <button
      className="btn text-white me-2"
      style={{ ...style, transition: "all 0.2s" }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ---------- Top Navigation ----------
function TopNav({ selectedSubject, setSelectedSubject, setSelectedPage }) {
  const actionButtonColor = "#0d6efd"; // blue
  const actionButtonShadow = "0 3px 6px rgba(0,0,0,0.2)";

  return (
    <div className="topnav-container mb-3">
      {/* Subject Buttons */}
      <div className="subject-buttons mb-3 d-flex flex-wrap">
        {SUBJECTS.map((s) => (
          <button
            key={s}
            className={`btn me-2 mb-2 ${
              selectedSubject === s
                ? "btn-outline-secondary fw-bold"
                : "btn-outline-light text-dark"
            }`}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
              transition: "all 0.2s",
            }}
            onClick={() => setSelectedSubject(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons d-flex justify-content-center mb-3">
        <NavActionButton
          label="Videos"
          style={{ backgroundColor: actionButtonColor, boxShadow: actionButtonShadow }}
          onClick={() => setSelectedPage("videos")}
        />
        <NavActionButton
          label="Books"
          style={{ backgroundColor: actionButtonColor, boxShadow: actionButtonShadow }}
          onClick={() => setSelectedPage("books")}
        />
        <NavActionButton
          label="Summary"
          style={{ backgroundColor: actionButtonColor, boxShadow: actionButtonShadow }}
          onClick={() => setSelectedPage("summaries")}
        />
      </div>
    </div>
  );
}

// ---------- Pages ----------
function Home() {
  return (
    <div className="container">
      <h2 className="mb-3">Welcome to Courses</h2>
      <p>
        Use the subject buttons above to choose a subject, then click{" "}
        <strong>Videos</strong>, <strong>Books</strong>, or <strong>Summary</strong> to see content.
      </p>
    </div>
  );
}

function VideosPage({ subject }) {
  const list = subject === "All" ? VIDEOS : VIDEOS.filter((v) => v.subject === subject);

  const getVideoUrl = (v) =>
    `https://www.youtube.com/embed?listType=playlist&list=${v.playlistId}`;

  return (
    <div className="container">
      <h3 className="mb-3">Videos — {subject}</h3>
      <div className="row g-3">
        {list.length === 0 && <p>No videos found for this subject.</p>}
        {list.map((v) => (
          <div key={v.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="ratio ratio-16x9">
                <iframe
                  src={getVideoUrl(v)}
                  title={v.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{v.title}</h5>
                <p className="text-muted">Subject: {v.subject}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BooksPage({ subject }) {
  const [books, setBooks] = useState(null);
  const [savedBooks, setSavedBooks] = useState(() => {
    return JSON.parse(localStorage.getItem("savedBooks") || "[]");
  });

  useEffect(() => {
    setBooks(null);
    fetchBooksFromDB(subject).then(setBooks);
  }, [subject]);

  const handleSave = (book) => {
    if (!savedBooks.find((b) => b.id === book.id)) {
      const updated = [...savedBooks, book];
      setSavedBooks(updated);
      localStorage.setItem("savedBooks", JSON.stringify(updated));
      alert(`${book.title} saved!`);
    } else {
      alert(`${book.title} is already saved.`);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-3">Books — {subject}</h3>

      {books === null ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : books.length === 0 ? (
        <p>No books found for this subject.</p>
      ) : (
        <div className="row g-3">
          {books.map((b) => (
            <div key={b.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <img src={b.thumbnail} alt={b.title} className="card-img-top book-card-img" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{b.title}</h5>
                  <p className="text-muted">Subject: {b.subject}</p>
                  <a
                    href={b.file}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-success mb-2"
                  >
                    Open PDF
                  </a>
                  <button
                    className="btn btn-warning mt-auto"
                    onClick={() => handleSave(b)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SummariesPage({ subject }) {
  const [savedSummaries, setSavedSummaries] = useState(() => {
    return JSON.parse(localStorage.getItem("savedSummaries") || "[]");
  });

  const list = subject === "All" ? SUMMARIES : SUMMARIES.filter((s) => s.subject === subject);

  const handleSave = (summary) => {
    if (!savedSummaries.find((s) => s.id === summary.id)) {
      const updated = [...savedSummaries, summary];
      setSavedSummaries(updated);
      localStorage.setItem("savedSummaries", JSON.stringify(updated));
      alert(`${summary.title} saved!`);
    } else {
      alert(`${summary.title} is already saved.`);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-3">Summaries — {subject}</h3>
      {list.length === 0 ? (
        <p>No summaries found for this subject.</p>
      ) : (
        <div className="row g-3">
          {list.map((s) => (
            <div key={s.id} className="col-12 col-md-4">
              <div className="card h-100">
                <img
                  src={s.thumbnail}
                  alt={s.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{s.title}</h5>
                  <p className="card-text">{s.text}</p>
                  <a
                    href={s.file}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary mb-2"
                  >
                    Open PDF
                  </a>
                  <button
                    className="btn btn-warning mt-auto"
                    onClick={() => handleSave(s)}
                  >
                    Save Summary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Main Course Component ----------
export default function Course() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const renderPage = () => {
    switch (selectedPage) {
      case "videos":
        return <VideosPage subject={selectedSubject} />;
      case "books":
        return <BooksPage subject={selectedSubject} />;
      case "summaries":
        return <SummariesPage subject={selectedSubject} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <CustomNavbar />
    <div className="p-3">
      {/* Top Navigation */}
      <TopNav
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        setSelectedPage={setSelectedPage}
      />

      {/* Render the selected page */}
      {renderPage()}
    </div>
    </div>
  );
}
