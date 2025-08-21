import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SubjectInput = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState("");        // Number of subjects
  const [subjects, setSubjects] = useState([]);  // Subject names
  const [step, setStep] = useState("count");     // Step: "count" or "names"

  // Step 1: Handle number of subjects
  const handleCountSubmit = (e) => {
    e.preventDefault();
    const num = Number(count);
    if (num > 0) {
      setSubjects(Array(num).fill("")); // create array with empty strings
      setStep("names");
    } else {
      alert("Please enter a valid number of subjects!");
    }
  };

  // Handle changes to each subject name
  const handleSubjectChange = (index, value) => {
    const updated = [...subjects];
    updated[index] = value;
    setSubjects(updated);
  };

  // Step 2: Handle subject names submit
  const handleNamesSubmit = (e) => {
    e.preventDefault();
    if (subjects.every((s) => s.trim() !== "")) {
      alert("Subjects submitted: " + subjects.join(", "));
       navigate("/home");
    } else {
      alert("Please fill all subject names!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-96 mx-auto mt-10">
      {step === "count" && (
        <>
          <h2 className="text-xl font-bold mb-4 mt-4 text-center">Enter Number of Subjects</h2>
          <form onSubmit={handleCountSubmit} className="space-y-3 text-center">
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="Number of Subjects"
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Next
            </button>
          </form>
        </>
      )}

      {step === "names" && (
        <>
          <h2 className="text-xl font-bold mb-4 mt-4 text-center">Enter Subject Names</h2>
          <form onSubmit={handleNamesSubmit} className="space-y-3 text-center">
            {subjects.map((sub, i) => (
              <div key={i} className="mb-3">  {/* mb-3 adds spacing between lines */}
                <input
                  type="text"
                  placeholder={`Subject ${i + 1}`}
                  value={sub}
                  onChange={(e) => handleSubjectChange(i, e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 text-dark py-2 rounded-md hover:bg-blue-700"
            >
              Submit Subjects
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SubjectInput;
