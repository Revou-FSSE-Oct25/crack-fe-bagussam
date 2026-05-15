import React from 'react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

const MaterialEditorModal = ({ isOpen, onClose, data, onEditModule, onDeleteModule, darkMode }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-50 dark:bg-slate-950 overflow-y-auto p-8 md:p-12 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto">
        <button onClick={onClose} className="flex items-center gap-2 text-blue-600 font-black mb-8 hover:gap-4 transition-all">
          <ArrowLeft size={20}/> Back to Teaching
        </button>
        
        <h2 className="text-4xl font-black mb-2 dark:text-white">{data.title}</h2>
        <p className="opacity-50 uppercase text-xs font-black tracking-widest mb-12 dark:text-slate-400">Manage Course Videos</p>
        
        <div className="space-y-4">
          {(data.modules || []).map((mod, idx) => (
            <div key={mod.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border dark:border-slate-800 flex items-center justify-between group hover:border-blue-500 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black dark:text-white">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-black text-lg dark:text-white">{mod.title}</p>
                  <p className="text-xs opacity-40 font-medium truncate max-w-[200px] dark:text-slate-400">
                    {mod.videoUrl || mod.video}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onEditModule(mod)} 
                  className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  <Edit size={18}/>
                </button>
                <button 
                  onClick={() => onDeleteModule(mod.id)} 
                  className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 size={18}/>
                </button>
              </div>
            </div>
          ))}
          
          {(data.modules || []).length === 0 && (
            <div className="py-20 text-center border-2 border-dashed rounded-[3rem] opacity-30">
              <p className="font-bold italic text-lg">No videos yet. Add your first video!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialEditorModal;