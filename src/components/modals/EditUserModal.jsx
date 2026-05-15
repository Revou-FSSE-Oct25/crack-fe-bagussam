import React from 'react';
import { X } from 'lucide-react';

const EditUserModal = ({ isOpen, onClose, onSubmit, data, darkMode, isLoading }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-slate-900'} animate-in fade-in`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black">Edit User</h3>
          <button onClick={onClose} className="opacity-50 hover:opacity-100"><X size={24}/></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="fullname" defaultValue={data.name} required placeholder="Full Name" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none" />
          <input name="email" defaultValue={data.email} required type="email" placeholder="Email Address" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none" />
          <select name="role" defaultValue={data.role} required className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none bg-transparent font-bold">
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Teacher / Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button disabled={isLoading} className="w-full py-4 bg-green-600 text-white font-black rounded-2xl mt-2 hover:bg-green-700 transition-all">
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;