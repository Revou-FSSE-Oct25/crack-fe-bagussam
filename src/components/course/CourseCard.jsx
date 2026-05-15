import React from 'react';
import { Layers, ArrowUpRight } from 'lucide-react';

const CourseCard = ({ course, onClick, getText }) => {
  return (
    <div 
      className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 flex flex-col cursor-pointer hover:-translate-y-2 transition-all shadow-sm group" 
      onClick={() => onClick(course)}
    >
      <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-3xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Layers size={32}/>
      </div>
      <h3 className="text-2xl font-black mb-2 dark:text-white">{course.title}</h3>
      <p className="text-sm opacity-50 mb-8 dark:text-slate-400">
        {getText('tutor')} {course.admin?.name || course.instructorName || 'Expert'}
      </p>
      <div className="mt-auto pt-8 border-t dark:border-slate-800 flex justify-between items-center">
        <p className="font-black text-xl text-blue-600">
          Rp {course.price?.toLocaleString() || 0}
        </p>
        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
          <ArrowUpRight size={18}/>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;