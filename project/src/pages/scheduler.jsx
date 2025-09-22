// App.js
import React, { useState } from "react";
import StudySchedulerGantt from "../components/StudyScheduler";
import RelaxationModal from "../components/relaxation";
import CustomNavbar from "../components/navbar";

function Scheduler() {
  const [showRelax, setShowRelax] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const handleStudyComplete = () => {
    // after a study session, open relaxation modal
    setShowRelax(true);
  };

  return (
    <div>
      <CustomNavbar overallProgress={overallProgress} />
      <div className="container mt-3">
        
        <h2 className="text-center m-4 text-primary">📚 Study & Relaxation Scheduler</h2>

        {/* Study Scheduler */}
        <StudySchedulerGantt onSessionEnd={handleStudyComplete} setOverallProgress={setOverallProgress} />

        {/* Relaxation Modal */}
        <RelaxationModal
          show={showRelax}
          onClose={() => setShowRelax(false)}
        />
      </div>
    </div>
  );
}

export default Scheduler;

