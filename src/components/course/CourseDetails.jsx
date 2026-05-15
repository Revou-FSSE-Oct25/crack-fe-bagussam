import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';

const CourseDetails = ({ course, onBack, onEnroll, getText }) => {
  if (!course) return null;

  // Logic to separate Main Description and "What you learn" items
  const rawDesc = course.description || course.desc || '';
  const descParts = rawDesc.split('|||');
  const mainDesc = descParts[0];
  const learnArray = descParts[1] ? descParts[1].split(',') : ['Modern Development Flow'];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase hover:gap-4 transition-all"
      >
        <ArrowLeft size={18}/> {getText('backToCatalog')}
      </button>

      <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border dark:border-slate-800 shadow-xl">
        <div className="bg-blue-100 dark:bg-blue-900/30 w-24 h-24 rounded-3xl flex items-center justify-center text-blue-600 mb-8">
          <BookOpen size={40}/>
        </div>
        
        <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tighter">{course.title}</h2>
        <p className="opacity-70 text-lg leading-relaxed mb-8 dark:text-slate-300">{mainDesc}</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Learn Section */}
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700">
            <h4 className="font-black mb-4 text-xs text-blue-600 uppercase flex gap-2">
              <CheckCircle size={18}/> {getText('whatYouLearn')}
            </h4>
            <ul className="space-y-3 opacity-80 text-sm font-bold dark:text-white">
              {learnArray.map((item, i) => <li key={i}>• {item.trim()}</li>)}
            </ul>
          </div>

          {/* Module List Section */}
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700">
            <h4 className="font-black mb-4 text-xs text-blue-600 uppercase flex gap-2">
              <PlayCircle size={18}/> {getText('modules')}
            </h4>
            <ul className="space-y-3 opacity-80 text-sm font-bold dark:text-white">
              {(course.modules || course.modulesList || []).map((m, i) => (
                <li key={i}>{i+1}. {m.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t dark:border-slate-800">
          <div>
            <p className="text-[10px] opacity-40 font-black uppercase tracking-widest mb-1 dark:text-slate-500">Total Investment</p>
            <p className="text-3xl font-black text-blue-600">Rp {course.price?.toLocaleString() || 0}</p>
          </div>
          <button 
            onClick={() => onEnroll(course)} 
            className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            ENROLL NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;