import React, { useState } from 'react';
import { X, Award, ChevronRight, AlertCircle } from 'lucide-react';

export default function TakeExamModal({ isOpen, onClose, examData, courseData, onSubmit, darkMode }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!isOpen || !examData) return null;

  // 3 Dynamic Default Questions as fallback
  const defaultQuestions = [
    { 
      id: 1, 
      text: `What is the primary core objective of understanding ${examData.title}?`, 
      options: ['To master the fundamental concepts and best practices', 'To skip documentation and guess', 'To memorize without understanding', 'None of the above'], 
      correctIndex: 0 
    },
    { 
      id: 2, 
      text: 'Which of the following is considered an industry-standard practice for this subject?', 
      options: ['Ignoring errors', 'Consistent daily learning and implementation', 'Copying code without analyzing', 'Relying solely on AI without checking'], 
      correctIndex: 1 
    },
    { 
      id: 3, 
      text: 'How do you successfully apply the knowledge from this module into a real-world project?', 
      options: ['By giving up early', 'By complaining to the admin', 'By building projects, testing, and debugging continuously', 'By watching videos without practicing'], 
      correctIndex: 2 
    },
  ];

  // Gunakan soal dinamis jika ada, jika tidak gunakan default
  const questions = (courseData?.examQuestions && courseData.examQuestions.length > 0) 
    ? courseData.examQuestions 
    : defaultQuestions;

  const handleOption = (idx) => setAnswers({ ...answers, [currentQ]: idx });

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      let correctCount = 0;
      questions.forEach((q, i) => { 
        // Mengamankan kompatibilitas antara "correct" (lama) dan "correctIndex" (baru)
        const targetCorrect = q.correctIndex !== undefined ? Number(q.correctIndex) : q.correct;
        if (answers[i] === targetCorrect) correctCount++; 
      });
      const finalScore = Math.round((correctCount / questions.length) * 100);
      
      onSubmit(examData.id, examData.title, finalScore);
      setCurrentQ(0);
      setAnswers({});
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className={`w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative ${darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'}`}>
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-red-100 hover:text-red-500 transition-all"><X size={20} /></button>
        
        <h2 className="text-3xl font-black mb-2 flex items-center gap-3"><Award className="text-blue-600" size={32}/> Final Exam</h2>
        <p className="text-sm font-bold opacity-60 mb-10 tracking-widest">{examData.title}</p>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-black uppercase tracking-widest bg-blue-100 text-blue-600 px-3 py-1 rounded-lg">Question {currentQ + 1} of {questions.length}</span>
          </div>
          <h3 className="text-2xl font-bold mb-8 leading-snug">{questions[currentQ].text}</h3>
          
          <div className="space-y-4">
            {questions[currentQ].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleOption(idx)} className={`w-full text-left p-6 rounded-2xl border-2 font-bold transition-all ${answers[currentQ] === idx ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 shadow-md' : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <button disabled={answers[currentQ] === undefined} onClick={handleNext} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest disabled:opacity-50 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-blue-600/20">
          {currentQ < questions.length - 1 ? 'Next Question' : 'Submit Exam'} <ChevronRight size={20}/>
        </button>
      </div>
    </div>
  );
}