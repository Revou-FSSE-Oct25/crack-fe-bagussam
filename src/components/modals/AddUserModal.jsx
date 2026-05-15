import React from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const AddUserModal = ({ isOpen, onClose, onSubmit, uiStates, setters, darkMode, getText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-slate-900'} animate-in fade-in`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black">{getText('addUser')}</h3>
          <button onClick={onClose} className="opacity-50 hover:opacity-100"><X size={24}/></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="fullname" required placeholder="Full Name" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 outline-none" />
          <input name="email" required type="email" placeholder="Email Address" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 outline-none" />
          
          <div className="relative">
            <input 
              name="password" required 
              type={uiStates.showAddUserPass ? "text" : "password"} 
              placeholder="Temporary Password" 
              className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 outline-none" 
            />
            <button 
              type="button" 
              onClick={() => setters.setShowAddUserPass(!uiStates.showAddUserPass)} 
              className="absolute right-5 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 text-slate-500"
            >
              {uiStates.showAddUserPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <select name="role" required className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 outline-none bg-transparent font-bold">
            <option value="INSTRUCTOR">Teacher / Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl mt-2">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;