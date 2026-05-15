import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const UsersPage = ({ users, setters, handlers, getText }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-black tracking-tighter italic dark:text-white">{getText('userDb')}</h3>
        <button 
          onClick={() => setters.setIsFormUserOpen(true)} 
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] flex items-center gap-2 uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20"
        >
          <Plus size={16}/> {getText('addUser')}
        </button>
      </div>
      
      <div className="space-y-4">
        {users.map(u => (
          <div key={u.id} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border dark:border-slate-700 hover:border-blue-500 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-700 flex items-center justify-center font-black text-blue-600">
                {u.name?.charAt(0)}
              </div>
              <div>
                <p className="font-black text-lg leading-tight dark:text-white">{u.name}</p>
                <p className="text-xs font-medium opacity-40 dark:text-slate-400">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] font-black opacity-30 uppercase">{getText('joinedAt')}</p>
                <p className="text-xs font-bold dark:text-slate-300">{u.joined || 'Recent'}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${u.role === 'INSTRUCTOR' ? 'bg-purple-100 text-purple-600' : u.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'}`}>
                {u.role}
              </span>
              <div className="flex gap-2">
                <button onClick={() => { setters.setEditData(u); setters.setIsFormEditOpen(true); }} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm"><Edit size={18}/></button>
                <button onClick={() => handlers.onDeleteUser(u.id, u.email)} className="p-3 text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm"><Trash2 size={18}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;