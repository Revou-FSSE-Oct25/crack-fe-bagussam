import React from 'react';
import { ArrowLeft, Clock, CheckCircle, PlayCircle, MonitorPlay, GraduationCap, Eye } from 'lucide-react';
import { MOCK_COURSES } from '../utils/constants';

const StudentCoursesPage = ({ 
  user, coursesDb, allEnrollments, activeModule, activeModuleId, activeVideo, 
  checkedInModules, completedModules, uploadedFiles, 
  setters, handlers, getText 
}) => {
  const { setActiveModule, setActiveModuleId, setActiveVideo, setView, setViewerFiles } = setters;
  const { handleCheckIn, toggleModuleCompletion, cancelEnrollment } = handlers;

  // Logic to find current course and modules
  const currentCourseData = activeModule ? coursesDb.find(c => c.id === activeModule.courseId) || MOCK_COURSES.find(c => c.id === activeModule.courseId) : null;
  const courseModules = currentCourseData?.modules || currentCourseData?.modulesList || [];
  const currentModuleData = currentCourseData ? (courseModules.find(m => m.id === activeModuleId) || courseModules[0]) : null;
  
  const isCurrentCourseFinished = activeModule && (activeModule.status === 'COMPLETED' || activeModule.status === 'READY_FOR_EXAM');
  const isCurrentModuleCheckedIn = currentModuleData ? (
    checkedInModules.includes(currentModuleData.id) || 
    completedModules.includes(currentModuleData.id) || 
    isCurrentCourseFinished
  ) : false;

  // --- CONDITION 1: STUDENT IS INSIDE THE CLASS (VIDEO PLAYER ACTIVE) ---
  if (activeModule && (activeModule.status === 'ACTIVE' || activeModule.status === 'READY_FOR_EXAM' || activeModule.status === 'COMPLETED')) {
    return (
      <div className="space-y-6">
        <button onClick={() => { setActiveModule(null); setActiveModuleId(null); setActiveVideo(null); }} className="flex items-center gap-2 text-blue-600 font-black text-xs mb-2 uppercase tracking-widest">
          <ArrowLeft size={16}/> {getText('backToCourses')}
        </button>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 border-slate-800 relative">
              {!isCurrentModuleCheckedIn && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-xl z-10 flex flex-col items-center justify-center p-8 text-center">
                  <Clock className="text-blue-500 mb-6 animate-pulse" size={64} />
                  <h2 className="text-3xl font-black text-white mb-2">{getText('attendanceReq')}</h2>
                  <p className="text-white/50 mb-10 max-w-md">{getText('checkInDesc')}</p>
                  <button onClick={() => handleCheckIn(currentModuleData?.id)} className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all">
                    <CheckCircle size={22}/> {getText('checkIn')}
                  </button>
                </div>
              )}
              <iframe width="100%" height="100%" src={activeVideo || currentModuleData?.videoUrl || currentModuleData?.video} frameBorder="0" allowFullScreen></iframe>
            </div>

            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
              <h2 className="text-3xl font-black mb-4 tracking-tighter dark:text-white">{activeModule.title}</h2>
              <div className="flex items-center gap-2 text-green-500 font-black text-sm uppercase tracking-widest">
                <CheckCircle size={20}/> 
                {activeModule.status === 'COMPLETED' || activeModule.status === 'READY_FOR_EXAM' 
                  ? courseModules.length 
                  : courseModules.filter(m => completedModules.includes(m.id)).length
                } / {courseModules.length} {getText('completed')}
              </div>
              <p className="opacity-50 mt-4 font-medium dark:text-slate-400">{getText('finishAllModules')}</p>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm h-fit">
            <h3 className="font-black text-xl mb-8 flex items-center gap-2 dark:text-white"><MonitorPlay size={24} className="text-blue-600"/> {getText('playlist')}</h3>
            <div className="space-y-3">
              {courseModules.map((m) => (
                <div key={m.id} onClick={() => isCurrentModuleCheckedIn && setActiveModuleId(m.id) && setActiveVideo(m.videoUrl || m.video)} className={`p-5 rounded-2xl flex items-start gap-3 transition-all ${!isCurrentModuleCheckedIn && currentModuleData?.id !== m.id ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'} ${currentModuleData?.id === m.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white'}`}>
                  {completedModules.includes(m.id) || activeModule.status === 'COMPLETED' || activeModule.status === 'READY_FOR_EXAM' ? <CheckCircle size={20} className="text-green-300 mt-0.5 shrink-0"/> : <PlayCircle size={20} className="mt-0.5 shrink-0"/>}
                  <div className="flex-1">
                    <p className="font-black text-sm leading-tight">{m.title}</p>
                    {currentModuleData?.id === m.id && !completedModules.includes(m.id) && isCurrentModuleCheckedIn && activeModule.status !== 'COMPLETED' && activeModule.status !== 'READY_FOR_EXAM' && (
                      <button onClick={(e) => { e.stopPropagation(); toggleModuleCompletion(m.id); }} className="mt-3 text-[10px] font-black bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/40 uppercase tracking-widest">
                        {getText('markDone')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- CONDITION 2: STUDENT IS IN "MY COURSES" MENU ---
  return (
    <div className="grid gap-6">
      {allEnrollments.filter(en => en.studentName === user.name).map((en) => (
        <div key={en.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-blue-500 transition-all shadow-sm">
          <div className="flex items-center gap-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <GraduationCap size={28}/>
            </div>
            <div>
              <h3 className="text-xl font-black mb-1 dark:text-white">{en.title}</h3>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${en.status === 'ACTIVE' || en.status === 'READY_FOR_EXAM' ? 'bg-green-100 text-green-600' : en.status === 'COMPLETED' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                {en.status === 'PENDING_VERIFICATION' ? getText('awaitingVerify') : en.status === 'PENDING_PAYMENT' ? getText('awaitingPayment') : en.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            {(en.status === 'ACTIVE' || en.status === 'READY_FOR_EXAM' || en.status === 'COMPLETED') ? (
              <button onClick={() => { 
                setActiveModule(en); 
                const cData = coursesDb.find(c => c.id === en.courseId) || MOCK_COURSES.find(c => c.id === en.courseId); 
                setActiveModuleId((cData?.modules || cData?.modulesList || [])[0]?.id); 
              }} className="flex-1 md:flex-none px-10 py-4 bg-blue-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                {getText('enterClass')}
              </button>
            ) : (
              <>
                <button onClick={() => cancelEnrollment(en.id)} className="flex-1 md:flex-none px-8 py-4 border-2 border-red-500/20 text-red-500 font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-red-50 transition-all">
                  {getText('cancel')}
                </button>
                <button onClick={() => { 
                  if (en.status === 'PENDING_PAYMENT') { setActiveModule(en); setView('payment'); }
                  else { setViewerFiles({ isOpen: true, data: uploadedFiles[en.id] || {} }) }
                }} className="flex-1 md:flex-none px-8 py-4 bg-blue-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2">
                  {en.status === 'PENDING_PAYMENT' ? getText('continuePayment') : <><Eye size={16}/> {getText('viewDocs')}</>}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentCoursesPage;