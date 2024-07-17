// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './components/Question';
import Timer from './components/Timer';
import ResultPage from './components/ResultPage';

const questions = [
  {
    "question": "What is the powerhouse of the cell?",
    "type": "radio",
    "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
    "answer": "Mitochondria"
},
{
    "question": "What is the main component of plant cell walls?",
    "type": "radio",
    "options": ["Cellulose", "Chitin", "Peptidoglycan", "Glycogen"],
    "answer": "Cellulose"
},
{
    "question": "What is the function of ribosomes?",
    "type": "radio",
    "options": ["DNA replication", "Protein synthesis", "Lipid metabolism", "Cell division"],
    "answer": "Protein synthesis"
},
{
    "question": "Which organelle is responsible for photosynthesis?",
    "type": "radio",
    "options": ["Mitochondria", "Chloroplast", "Golgi apparatus", "Endoplasmic reticulum"],
    "answer": "Chloroplast"
},
{
    "question": "What type of bond holds the two strands of DNA together?",
    "type": "radio",
    "options": ["Covalent bonds", "Ionic bonds", "Hydrogen bonds", "Peptide bonds"],
    "answer": "Hydrogen bonds"
},
{
    "question": "Which of the following are types of RNA?",
    "type": "checkbox",
    "options": ["mRNA", "tRNA", "rRNA", "cDNA"],
    "answer": ["mRNA", "tRNA", "rRNA"]
},
{
    "question": "Which of the following are products of cellular respiration?",
    "type": "checkbox",
    "options": ["Oxygen", "Carbon dioxide", "Water", "Glucose"],
    "answer": ["Carbon dioxide", "Water"]
},
{
    "question": "Which of these are characteristics of prokaryotic cells?",
    "type": "checkbox",
    "options": ["No nucleus", "Membrane-bound organelles", "Circular DNA", "Cell wall"],
    "answer": ["No nucleus", "Circular DNA", "Cell wall"]
},
{
    "question": "Which of the following are macromolecules?",
    "type": "checkbox",
    "options": ["Proteins", "Lipids", "Carbohydrates", "Water"],
    "answer": ["Proteins", "Lipids", "Carbohydrates"]
},
{
    "question": "Which are considered as the building blocks of proteins?",
    "type": "checkbox",
    "options": ["Nucleotides", "Amino acids", "Fatty acids", "Monosaccharides"],
    "answer": ["Amino acids"]
},
{
    "question": "What is the primary role of DNA in cells?",
    "type": "text",
    "answer": "Store genetic information"
},
{
    "question": "Name the process by which plants make their food.",
    "type": "text",
    "answer": "Photosynthesis"
},
{
    "question": "What is the basic unit of life?",
    "type": "text",
    "answer": "Cell"
},
{
    "question": "What is the term for the diffusion of water across a semipermeable membrane?",
    "type": "text",
    "answer": "Osmosis"
},
{
    "question": "Which biological molecule is primarily responsible for storing energy?",
    "type": "text",
    "answer": "Carbohydrates"
},
    {
        "question": "Choose the correct order of the stages of mitosis.",
        "type": "dropdown",
        "options": [
            "Prophase, Metaphase, Anaphase, Telophase",
            "Metaphase, Prophase, Anaphase, Telophase",
            "Anaphase, Prophase, Metaphase, Telophase",
            "Telophase, Anaphase, Metaphase, Prophase"
        ],
        "answer": "Prophase, Metaphase, Anaphase, Telophase"
    },
    {
        "question": "Which type of cell division results in gametes?",
        "type": "dropdown",
        "options": [
            "Mitosis",
            "Meiosis",
            "Binary fission",
            "Budding"
        ],
        "answer": "Meiosis"
    },
    {
        "question": "Which process converts glucose into pyruvate?",
        "type": "dropdown",
        "options": [
            "Glycolysis",
            "Krebs cycle",
            "Electron transport chain",
            "Photosynthesis"
        ],
        "answer": "Glycolysis"
    },
    {
        "question": "Which kingdom do mushrooms belong to?",
        "type": "dropdown",
        "options": [
            "Plantae",
            "Animalia",
            "Fungi",
            "Protista"
        ],
        "answer": "Fungi"
    },
    {
        "question": "Which biomolecule are enzymes classified under?",
        "type": "dropdown",
        "options": [
            "Carbohydrates",
            "Lipids",
            "Proteins",
            "Nucleic acids"
        ],
        "answer": "Proteins"
    }

];

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const saveAnswers = () => {
    const start = currentPage * 5;
    for (let i = start; i < start + 5; i++) {
      const inputs = document.getElementsByName(`question${i}`);
      const q = questions[i];
      switch (q.type) {
        case 'radio':
          inputs.forEach(input => {
            if (input.checked) {
              setAnswers(prevAnswers => {
                const newAnswers = [...prevAnswers];
                newAnswers[i] = input.value;
                return newAnswers;
              });
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
          setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[i] = selectedOptions;
            return newAnswers;
          });
          break;
        case 'text':
        case 'dropdown':
          setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[i] = inputs[0].value;
            return newAnswers;
          });
          break;
      }
    }
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
    setCurrentPage(4); // Show results page
  };

  return (
    <div className="App">
      {currentPage < 4 ? (
        <div id="quiz-container">
          <Question
            currentPage={currentPage}
            questions={questions}
            answers={answers}
          />
          <div id="navigation">
            {currentPage !== 0 && (
              <button id="prev-btn" onClick={prevPage}>Previous</button>
            )}
            {currentPage !== 3 && (
              <button id="next-btn" onClick={nextPage}>Next</button>
            )}
            {currentPage === 3 && (
              <button id="submit-btn" onClick={submitQuiz}>Submit</button>
            )}
          </div>
          <Timer timeLeft={timeLeft} />
        </div>
      ) : (
        <ResultPage score={score} />
      )}
    </div>
  );
};

export default App;
