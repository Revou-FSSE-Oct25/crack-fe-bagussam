import React from 'react';
import { Plus, Edit, Trash2, Video, Clock, ClipboardList } from 'lucide-react';

const InstructorModulesPage = ({ courses = [], user, setters, handlers, getText }) => {
  // DITAMBAHKAN: setIsExamEditorOpen ke dalam destructuring setters
  const { setIsFormCourseOpen, setTargetCourseId, setIsFormModuleOpen, setSelectedCourseForModules, setIsModuleEditorOpen, setEditCourseData, setIsFormEditCourseOpen, setIsExamEditorOpen } = setters;
  const { onDeleteCourse } = handlers;

  // EXTREME SAFETY: Memastikan courses selalu berbentuk Array
  const safeCourses = Array.isArray(courses) ? courses : [];

  const myCourses = safeCourses.filter(c => 
    c?.instructorName === user?.name || 
    c?.admin?.name === user?.name || 
    c?.instructor === user?.name ||
    c?.id?.startsWith('custom-')
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-black tracking-tighter dark:text-white">{getText('manageModules')}</h2>
        <button onClick={() => setIsFormCourseOpen(true)} className="px-6 py-3 bg-blue-600 text-white font-black rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg">
          <Plus size={20}/> {getText('addCourse')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {myCourses.map(course => {
          const modules = course.modules || course.modulesList || [];
          return (
            <div key={course.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-blue-500 transition-all">
              <div>
                <h3 className="text-2xl font-black mb-6 tracking-tight dark:text-white leading-tight">{course.title}</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center text-sm font-bold border-b dark:border-slate-800 pb-3">
                    <span className="opacity-50 dark:text-slate-400">{getText('totalModules')}</span>
                    <span className="text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">{modules.length} {getText('videosCount')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold pt-1">
                    <span className="opacity-50 dark:text-slate-400">{getText('lastUpdated')}</span>
                    <span className="dark:text-white flex items-center gap-1 opacity-70"><Clock size={14}/> Recent</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-2 mb-4">
                  <button onClick={() => { setTargetCourseId(course.id); setIsFormModuleOpen(true); }} className="flex-1 py-3 bg-green-100 text-green-700 font-black rounded-xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                    <Video size={14}/> Video
                  </button>
                  {/* MODIFIED: Tombol Exam sekarang membuka Modal Exam Editor */}
                  <button onClick={() => { setSelectedCourseForModules(course); setIsExamEditorOpen(true); }} className="flex-1 py-3 bg-purple-100 text-purple-700 font-black rounded-xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                    <ClipboardList size={14}/> Exam
                  </button>
                </div>
                
                <button onClick={() => { setSelectedCourseForModules(course); setIsModuleEditorOpen(true); }} className="w-full py-3 mb-6 border-2 border-blue-600 text-blue-600 font-black rounded-xl flex items-center justify-center hover:bg-blue-50 transition-all text-[10px] uppercase tracking-widest">
                  {getText('accessEditor')}
                </button>
                
                <div className="pt-4 border-t dark:border-slate-800 flex justify-end gap-3">
                  <button onClick={() => { setEditCourseData(course); setIsFormEditCourseOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600"><Edit size={18}/></button>
                  <button onClick={() => onDeleteCourse(course.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18}/></button>
                </div>
              </div>
            </div>
          );
        })}

        <div onClick={() => setIsFormCourseOpen(true)} className="border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-slate-400 hover:text-blue-600 transition-all cursor-pointer min-h-[300px]">
          <Plus size={48} className="mb-4 opacity-50"/>
          <p className="font-black text-xl">{getText('addCourse')}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorModulesPage;