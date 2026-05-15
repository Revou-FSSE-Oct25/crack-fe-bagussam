import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, ClipboardList } from 'lucide-react';

export default function ExamEditorModal({ isOpen, onClose, course, onSave, darkMode }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (course) setQuestions(course.examQuestions || []);
  }, [course]);

  if (!isOpen || !course) return null;

  const addQuestion = () => setQuestions([...questions, { text: '', options: ['', '', '', ''], correctIndex: 0 }]);
  const updateQ = (idx, field, value) => { const newQ = [...questions]; newQ[idx][field] = value; setQuestions(newQ); };
  const updateOpt = (qIdx, optIdx, value) => { const newQ = [...questions]; newQ[qIdx].options[optIdx] = value; setQuestions(newQ); };
  const removeQ = (idx) => setQuestions(questions.filter((_, i) => i !== idx));

  const handleSave = () => {
    onSave(course.id, questions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 shadow-2xl relative ${darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'}`}>
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:text-red-500 transition-all"><X size={20} /></button>
        
        <h2 className="text-2xl font-black mb-1 flex items-center gap-2"><ClipboardList className="text-purple-600"/> Exam Editor</h2>
        <p className="text-sm font-bold opacity-50 mb-8">{course.title}</p>

        <div className="space-y-6 mb-8">
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="p-6 border-2 border-slate-100 dark:border-slate-800 rounded-2xl relative group bg-slate-50 dark:bg-slate-800/50">
              <button onClick={() => removeQ(qIdx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 size={18}/></button>
              <label className="block text-xs font-black uppercase opacity-50 mb-2">Question {qIdx + 1}</label>
              <input value={q.text} onChange={(e) => updateQ(qIdx, 'text', e.target.value)} placeholder="Enter question text here..." className="w-full p-3 rounded-xl border dark:border-slate-700 dark:bg-slate-900 font-bold mb-4 focus:ring-2 focus:ring-purple-500 outline-none" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2">
                    <span className="font-black text-sm opacity-50">{['A','B','C','D'][optIdx]}</span>
                    <input value={opt} onChange={(e) => updateOpt(qIdx, optIdx, e.target.value)} placeholder={`Option ${['A','B','C','D'][optIdx]}`} className="flex-1 p-2.5 rounded-lg border dark:border-slate-700 dark:bg-slate-900 text-sm font-bold focus:ring-2 focus:ring-purple-500 outline-none" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-black uppercase opacity-50">Correct Answer:</label>
                <select value={q.correctIndex} onChange={(e) => updateQ(qIdx, 'correctIndex', Number(e.target.value))} className="p-2 rounded-lg border dark:border-slate-700 dark:bg-slate-900 text-sm font-bold bg-white text-green-600 focus:outline-none">
                  {['Option A', 'Option B', 'Option C', 'Option D'].map((opt, idx) => <option key={idx} value={idx}>{opt}</option>)}
                </select>
              </div>
            </div>
          ))}
          
          <button onClick={addQuestion} className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-2 font-black text-slate-500 hover:text-purple-600 hover:border-purple-300 transition-all">
            <Plus size={20}/> Add New Question
          </button>
        </div>

        <button onClick={handleSave} className="w-full py-4 bg-purple-600 text-white font-black rounded-2xl shadow-xl hover:bg-purple-700 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2">
          <Save size={18}/> Save Exam Questions
        </button>
      </div>
    </div>
  );
}