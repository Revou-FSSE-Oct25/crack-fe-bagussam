import React from 'react';
import { ClipboardList, CheckCircle, Lock, Award } from 'lucide-react';

export default function StudentExamsPage({ allEnrollments, handlers, getText }) {
  const { handleTakeExam } = handlers;
  
  // Hanya tampilkan kursus yang sudah dibayar (ACTIVE, READY_FOR_EXAM, COMPLETED)
  const examList = allEnrollments.filter(en => ['ACTIVE', 'READY_FOR_EXAM', 'COMPLETED'].includes(en.status));

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight dark:text-white">Final Exams</h2>
        <p className="opacity-50 font-bold mt-1">Take exams and earn your certificates</p>
      </div>

      {examList.length === 0 ? (
        <div className="p-10 border-2 border-dashed rounded-3xl text-center opacity-50 font-bold">
          No exams available yet. Enroll and complete a course first!
        </div>
      ) : (
        <div className="grid gap-6">
          {examList.map(en => (
            <div key={en.id} className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-[2rem] border dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-blue-500 transition-all">
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{en.title}</h3>
                <div className="flex items-center gap-3 text-xs font-black tracking-widest uppercase">
                  {en.status === 'COMPLETED' ? (
                    <span className="text-green-500 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg">Graduated</span>
                  ) : en.status === 'READY_FOR_EXAM' ? (
                    <span className="text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">Ready</span>
                  ) : (
                    <span className="text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">In Progress</span>
                  )}
                  <span className="opacity-50">Progress: {en.progress || 0}%</span>
                </div>
              </div>
              
              <div>
                {en.status === 'COMPLETED' ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-black px-6 py-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50">
                    <CheckCircle size={24} /> 
                    <span className="text-lg">Score: {en.score || 100}</span>
                  </div>
                ) : en.status === 'READY_FOR_EXAM' ? (
                  <button onClick={() => handleTakeExam(en.id, en.title)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-500/30 uppercase tracking-widest text-sm">
                    <ClipboardList size={20} /> Take Exam
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 px-6 py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 font-bold text-sm uppercase tracking-widest">
                    <Lock size={18} /> Finish Modules First
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}