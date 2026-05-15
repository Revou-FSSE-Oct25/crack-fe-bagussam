import React from 'react';
import { X } from 'lucide-react';

const EditModuleModal = ({ isOpen, onClose, onSubmit, data, darkMode }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl ${darkMode ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-900'} animate-in zoom-in`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black">Edit Video</h3>
          <button onClick={onClose} className="opacity-50 hover:opacity-100"><X size={24}/></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="title" defaultValue={data.title} required className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none" />
          <input name="videoUrl" defaultValue={data.videoUrl || data.video} required className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none" />
          <button className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl mt-2 hover:bg-blue-700 transition-all">
            Update Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModuleModal;