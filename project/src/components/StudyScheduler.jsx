import React, { useState, useEffect, useCallback } from "react";
import { Button, ProgressBar, Modal } from "react-bootstrap";
import RelaxationModal from "../components/relaxation";
import "../styles/StudyScheduler.css";

const StudySchedulerGantt = () => {
  const [hours, setHours] = useState(0);
  const [minutesInput, setMinutesInput] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const [isStudying, setIsStudying] = useState(false);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [studyTimeLeft, setStudyTimeLeft] = useState(0); // seconds

  const [showRelaxPrompt, setShowRelaxPrompt] = useState(false);
  const [showRelaxModal, setShowRelaxModal] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // ✅ Blocker popup

  // Generate schedule
  const handleGenerate = () => {
    if ((!hours && !minutesInput) || subjects.length === 0) return;

    const totalMinutes = hours * 60 + minutesInput;
    const timePerSubject = Math.floor(totalMinutes / subjects.length);

    const scheduleList = subjects.map((sub, idx) => ({
      subject: sub.trim(),
      start: idx * timePerSubject,
      end: (idx + 1) * timePerSubject,
    }));

    setSchedule(scheduleList);
    setCurrentSubjectIndex(0);
  };

  // Start study session
  const startStudy = () => {
    if (!schedule.length) return;
    setIsStudying(true);
    setStudyTimeLeft(
      (schedule[currentSubjectIndex].end - schedule[currentSubjectIndex].start) * 60
    );
  };

  // Study timer effect
  useEffect(() => {
    if (!isStudying || studyTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setStudyTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsStudying(false);

          // ✅ Show blocker success popup
          setShowSuccessPopup(true);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStudying, studyTimeLeft]);

  const nextStudySession = useCallback(() => {
    if (currentSubjectIndex + 1 < schedule.length) {
        setCurrentSubjectIndex((idx) => idx + 1);
        setStudyTimeLeft(
        (schedule[currentSubjectIndex + 1].end - schedule[currentSubjectIndex + 1].start) * 60
        );
        setIsStudying(true);
    } else {
        setShowRelaxModal(false);
        setShowRelaxPrompt(false);
        setIsStudying(false);
    }
    }, [currentSubjectIndex, schedule]);


  // Relaxation decision prompt timer (5 mins)
  useEffect(() => {
    if (!showRelaxPrompt) return;

    let decisionTime = 300; // 5 minutes
    const promptTimer = setInterval(() => {
      decisionTime -= 1;
      if (decisionTime <= 0) {
        clearInterval(promptTimer);
        setShowRelaxPrompt(false);
        nextStudySession(); // skip relaxation automatically
      }
    }, 1000);

    return () => clearInterval(promptTimer);
  }, [showRelaxPrompt, nextStudySession]);

  const minutes = Math.floor(studyTimeLeft / 60);
  const seconds = studyTimeLeft % 60;

  // Overall progress
  const totalMinutes = schedule.length
    ? schedule[schedule.length - 1].end
    : 0;
  const completedMinutes =
    schedule.length > 0
      ? schedule[currentSubjectIndex]?.start +
        ((schedule[currentSubjectIndex].end - schedule[currentSubjectIndex].start) *
          (1 - studyTimeLeft / ((schedule[currentSubjectIndex].end - schedule[currentSubjectIndex].start) * 60)))
      : 0;

  const overallProgress = totalMinutes ? (completedMinutes / totalMinutes) * 100 : 0;

  return (
    <div className="study-scheduler-container">
      {/* Input Section */}
      <div className="d-flex gap-3">
        <div className="mb-3">
            <label>Enter study time(in hrs):</label>
            <input
            type="number"
            className="form-control"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            min={0}
            />
        </div>

        <div className="mb-3">
            <label>Enter study time(in mins):</label>
            <input
            type="number"
            className="form-control"
            value={minutesInput}
            onChange={(e) => setMinutesInput(Number(e.target.value))}
            min={0}
            max={59}
            />
        </div>
      </div>

      <div className="mb-3">
        <label>Subjects (comma separated):</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) =>
            setSubjects(e.target.value.split(",").map((s) => s.trim()))
          }
        />
      </div>

      <Button variant="primary" onClick={handleGenerate} className="me-2">
        Generate Schedule
      </Button>

      {/* Display schedule */}
      {schedule.length > 0 && (
        <div className="mt-4">
          <h4>📅 Your Schedule</h4>
          <ul className="list-group mb-3">
            {schedule.map((s, idx) => (
              <li key={idx} className="list-group-item">
                {s.subject} → {s.start} min to {s.end} min
              </li>
            ))}
          </ul>

          {!isStudying && !showRelaxPrompt && !showRelaxModal && !showSuccessPopup && (
            <div className="mb-3">
              <p>Shall we start studying? 📚</p>
              <Button variant="success" onClick={startStudy}>
                Start Studying
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Current Study */}
      {isStudying && (
        <div className="mt-3">
          <h5>Studying: {schedule[currentSubjectIndex].subject}</h5>
          <ProgressBar
            now={
              (studyTimeLeft /
                ((schedule[currentSubjectIndex].end -
                  schedule[currentSubjectIndex].start) *
                  60)) *
              100
            }
            label={`${minutes}:${seconds.toString().padStart(2, "0")}`}
            className="mb-2"
          />
          <ProgressBar
            now={overallProgress}
            label={`Overall Progress: ${Math.floor(overallProgress)}%`}
          />
        </div>
      )}

      {/* Success Blocker Modal */}
      <Modal show={showSuccessPopup} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>🎉 Task Completed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully completed "{schedule[currentSubjectIndex]?.subject}".
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowSuccessPopup(false);
              setShowRelaxPrompt(true); // Show relax prompt after clicking Next
            }}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Relaxation decision prompt (5 min) */}
      {showRelaxPrompt && (
        <div className="relax-prompt">
          <p>Do you want to take a relaxation break? ⏳</p>
          <Button
            variant="light"
            className="me-2"
            onClick={() => {
              setShowRelaxModal(true);
              setShowRelaxPrompt(false);
            }}
          >
            Yes, relax
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowRelaxPrompt(false);
              nextStudySession();
            }}
          >
            No, continue studying
          </Button>
        </div>
      )}

      {/* Relaxation Modal */}
      <RelaxationModal
        show={showRelaxModal}
        onClose={() => {
          setShowRelaxModal(false);
          nextStudySession();
        }}
        onResume={() => {
          setShowRelaxModal(false);
          nextStudySession();
        }}
      />
    </div>
  );
};

export default StudySchedulerGantt;
