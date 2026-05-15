import React from 'react';
import { MonitorPlay, PlayCircle, CheckCircle } from 'lucide-react';

const PlaylistSidebar = ({ 
  modules, 
  activeModuleId, 
  completedModules, 
  isModuleCheckedIn, 
  onSelectModule, 
  onToggleCompletion, 
  getText,
  isCourseFinished // status === 'COMPLETED' or 'READY_FOR_EXAM'
}) => {
  return (
    <div className="w-full lg:w-96 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm h-fit">
      <h3 className="font-black text-xl mb-8 flex items-center gap-2 dark:text-white">
        <MonitorPlay size={24} className="text-blue-600"/> {getText('playlist')}
      </h3>
      <div className="space-y-3">
        {modules.map((m, i) => {
          const isCompleted = completedModules.includes(m.id) || isCourseFinished;
          const isActive = activeModuleId === m.id;

          return (
            <div 
              key={m.id} 
              onClick={() => isModuleCheckedIn && onSelectModule(m)} 
              className={`p-5 rounded-2xl flex items-start gap-3 transition-all ${
                !isModuleCheckedIn && !isActive ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
              } ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              {isCompleted ? (
                <CheckCircle size={20} className="text-green-300 mt-0.5 shrink-0"/>
              ) : (
                <PlayCircle size={20} className="mt-0.5 shrink-0"/>
              )}
              
              <div className="flex-1">
                <p className="font-black text-sm leading-tight">{m.title}</p>
                {isActive && !isCompleted && isModuleCheckedIn && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleCompletion(m.id); }} 
                    className="mt-3 text-[10px] font-black bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/40 uppercase tracking-widest"
                  >
                    {getText('markDone')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistSidebar;