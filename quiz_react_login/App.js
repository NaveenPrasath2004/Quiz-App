import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './components/Question';
import Timer from './components/Timer';
import ResultPage from './components/ResultPage';

const questions = [
  {
    question: "What is the powerhouse of the cell?",
    type: "radio",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
    answer: "Mitochondria",
  },
  {
    question: "What is the main component of plant cell walls?",
    type: "radio",
    options: ["Cellulose", "Chitin", "Peptidoglycan", "Glycogen"],
    answer: "Cellulose",
  },
  {
    question: "What is the function of ribosomes?",
    type: "radio",
    options: ["DNA replication", "Protein synthesis", "Lipid metabolism", "Cell division"],
    answer: "Protein synthesis",
  },
  {
    question: "Which organelle is responsible for photosynthesis?",
    type: "radio",
    options: ["Mitochondria", "Chloroplast", "Golgi apparatus", "Endoplasmic reticulum"],
    answer: "Chloroplast",
  },
  {
    question: "What type of bond holds the two strands of DNA together?",
    type: "radio",
    options: ["Covalent bonds", "Ionic bonds", "Hydrogen bonds", "Peptide bonds"],
    answer: "Hydrogen bonds",
  },
  {
    question: "Which of the following are types of RNA?",
    type: "checkbox",
    options: ["mRNA", "tRNA", "rRNA", "cDNA"],
    answer: ["mRNA", "tRNA", "rRNA"],
  },
  {
    question: "Which of the following are products of cellular respiration?",
    type: "checkbox",
    options: ["Oxygen", "Carbon dioxide", "Water", "Glucose"],
    answer: ["Carbon dioxide", "Water"],
  },
  {
    question: "Which of these are characteristics of prokaryotic cells?",
    type: "checkbox",
    options: ["No nucleus", "Membrane-bound organelles", "Circular DNA", "Cell wall"],
    answer: ["No nucleus", "Circular DNA", "Cell wall"],
  },
  {
    question: "Which of the following are macromolecules?",
    type: "checkbox",
    options: ["Proteins", "Lipids", "Carbohydrates", "Water"],
    answer: ["Proteins", "Lipids", "Carbohydrates"],
  },
  {
    question: "Which are considered as the building blocks of proteins?",
    type: "checkbox",
    options: ["Nucleotides", "Amino acids", "Fatty acids", "Monosaccharides"],
    answer: ["Amino acids"],
  },
  {
    question: "What is the primary role of DNA in cells?",
    type: "text",
    answer: "Store genetic information",
  },
  {
    question: "Name the process by which plants make their food.",
    type: "text",
    answer: "Photosynthesis",
  },
  {
    question: "What is the basic unit of life?",
    type: "text",
    answer: "Cell",
  },
  {
    question: "What is the term for the diffusion of water across a semipermeable membrane?",
    type: "text",
    answer: "Osmosis",
  },
  {
    question: "Which biological molecule is primarily responsible for storing energy?",
    type: "text",
    answer: "Carbohydrates",
  },
  {
    question: "Choose the correct order of the stages of mitosis.",
    type: "dropdown",
    options: [
      "Prophase, Metaphase, Anaphase, Telophase",
      "Metaphase, Prophase, Anaphase, Telophase",
      "Anaphase, Prophase, Metaphase, Telophase",
      "Telophase, Anaphase, Metaphase, Prophase",
    ],
    answer: "Prophase, Metaphase, Anaphase, Telophase",
  },
  {
    question: "Which type of cell division results in gametes?",
    type: "dropdown",
    options: ["Mitosis", "Meiosis", "Binary fission", "Budding"],
    answer: "Meiosis",
  },
  {
    question: "Which process converts glucose into pyruvate?",
    type: "dropdown",
    options: ["Glycolysis", "Krebs cycle", "Electron transport chain", "Photosynthesis"],
    answer: "Glycolysis",
  },
  {
    question: "Which kingdom do mushrooms belong to?",
    type: "dropdown",
    options: ["Plantae", "Animalia", "Fungi", "Protista"],
    answer: "Fungi",
  },
  {
    question: "Which biomolecule are enzymes classified under?",
    type: "dropdown",
    options: ["Carbohydrates", "Lipids", "Proteins", "Nucleic acids"],
    answer: "Proteins",
  },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [timeLeft, setTimeLeft] = useState(120); // Set initial time (2 minutes)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupMode, setSignupMode] = useState(false);
  const [users, setUsers] = useState({});
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return; // Skip timer if not running or timeLeft is 0

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timerRunning]);

  const handleSignup = () => {
    if (username && password) {
      setUsers({ ...users, [username]: password });
      setSignupMode(false);
    }
  };

  const handleLogin = () => {
    if (users[username] === password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const saveAnswers = () => {
    const start = currentPage * 5;
    const newAnswers = [...answers];
    
    for (let i = start; i < start + 5; i++) {
      const inputs = document.getElementsByName(`question${i}`);
      const q = questions[i];
      
      switch (q.type) {
        case 'radio':
          inputs.forEach(input => {
            if (input.checked) {
              newAnswers[i] = input.value;
            }
          });
          break;
        case 'checkbox':
          const selectedOptions = [];
          inputs.forEach(input => {
            if (input.checked) {
              selectedOptions.push(input.value);
            }
          });
          newAnswers[i] = selectedOptions;
          break;
        case 'text':
        case 'dropdown':
          newAnswers[i] = inputs[0].value;
          break;
        default:
          break;
      }
    }
    
    setAnswers(newAnswers);
  };

  const nextPage = () => {
    saveAnswers();
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    saveAnswers();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const submitQuiz = () => {
    saveAnswers();
    let finalScore = 0;
    questions.forEach((q, index) => {
      if (q.type === 'radio' || q.type === 'text' || q.type === 'dropdown') {
        if (answers[index] === q.answer) {
          finalScore++;
        }
      } else if (q.type === 'checkbox') {
        if (JSON.stringify(answers[index]) === JSON.stringify(q.answer)) {
          finalScore++;
        }
      }
    });
    setScore(finalScore);
    setTimerRunning(false); // Stop the timer
    setCurrentPage(4); // Show results page
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div id="login-signup-container">
          {signupMode ? (
            <>
              <h2>Sign Up</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignup}>Sign Up</button>
              <button onClick={() => setSignupMode(false)}>Go to Login</button>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setSignupMode(true)}>Sign Up</button>
            </>
          )}
        </div>
      ) : (
        <>
          <Timer timeLeft={timeLeft} />
          {currentPage < 4 ? (
            <div className="quiz-container">
              {questions.slice(currentPage * 5, (currentPage + 1) * 5).map((q, index) => (
                <Question 
                  key={index} 
                  question={q} 
                  questionIndex={index + currentPage * 5} 
                  savedAnswer={answers[index + currentPage * 5]} 
                />
              ))}
              <div className="navigation">
                {currentPage > 0 && <button onClick={prevPage}>Previous</button>}
                {currentPage < 3 ? (
                  <button onClick={nextPage}>Next</button>
                ) : (
                  <button onClick={submitQuiz}>Submit</button>
                )}
              </div>
            </div>
          ) : (
            <ResultPage score={score} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
