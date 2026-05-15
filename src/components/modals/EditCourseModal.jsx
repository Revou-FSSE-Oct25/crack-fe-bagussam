import React from 'react';
import { X } from 'lucide-react';

const EditCourseModal = ({ isOpen, onClose, onSubmit, data, darkMode }) => {
  if (!isOpen || !data) return null;

  // Split description and "learn" items using the ||| separator
  const descParts = (data.description || '').split('|||');
  const mainDesc = descParts[0];
  const learnItems = descParts[1] || '';

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} animate-in fade-in zoom-in`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black">Edit Course</h3>
          <button onClick={onClose}><X size={24}/></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="title" defaultValue={data.title} required className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 outline-none" />
          <textarea name="desc" defaultValue={mainDesc} required rows="2" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 outline-none"></textarea>
          <input name="learn" defaultValue={learnItems} required className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 outline-none" />
          <input name="price" defaultValue={data.price} type="number" required className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 outline-none" />
          <button className="w-full py-4 bg-green-600 text-white font-black rounded-2xl mt-2">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;