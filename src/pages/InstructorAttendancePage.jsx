import React from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';

const InstructorAttendancePage = ({ user, courses = [], allEnrollments = [], getText }) => {
  // 1. Find Course IDs owned ONLY by the currently logged-in instructor
  const myCourseIds = courses
    .filter(c => c.admin?.name === user?.name || c.instructorName === user?.name || c.adminId === user?.id)
    .map(c => c.id);

  // 2. Filter students ONLY if they are enrolled in the instructor's courses
  const activeStudents = allEnrollments.filter(en => 
    (en.status === 'ACTIVE' || en.status === 'READY_FOR_EXAM') &&
    myCourseIds.includes(en.courseId)
  );

  return (
    <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <h3 className="text-2xl font-black tracking-tighter dark:text-white">{getText('studentTrack')}</h3>
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700">
          <Calendar size={18} className="text-blue-600"/>
          <span className="text-sm font-black uppercase tracking-widest dark:text-white">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {activeStudents.length === 0 ? (
          <div className="py-10 text-center border-2 border-dashed dark:border-slate-700 rounded-3xl opacity-50">
            <p className="font-bold italic text-slate-500">No active students found in your courses.</p>
          </div>
        ) : (
          activeStudents.map((en) => (
            <div key={en.id} className="flex flex-col md:flex-row justify-between items-center p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border dark:border-slate-700 gap-4">
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center font-black text-blue-600 border dark:border-slate-700 shrink-0">
                  {en.studentName.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-lg dark:text-white">{en.studentName}</p>
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{en.title}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-4 bg-green-500 text-white rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-md"><CheckCircle size={22}/></button>
                <button className="p-4 bg-red-500 text-white rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-md"><XCircle size={22}/></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InstructorAttendancePage;