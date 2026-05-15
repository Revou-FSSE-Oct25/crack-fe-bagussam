import React from 'react';
import { X } from 'lucide-react';

const AddCourseModal = ({ isOpen, onClose, onSubmit, darkMode, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} animate-in fade-in zoom-in`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black">Create Course</h3>
          <button onClick={onClose} className="opacity-50 hover:opacity-100"><X size={24}/></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="title" required placeholder="Course Title" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none" />
          <textarea name="desc" required placeholder="Description" rows="2" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none"></textarea>
          <input name="learn" required placeholder="What will they learn? (comma separated)" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none" />
          <input name="price" type="number" required placeholder="Price (Rp)" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none" />
          <button disabled={isLoading} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl mt-2 hover:bg-blue-700 transition-all">
            {isLoading ? "Processing..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;