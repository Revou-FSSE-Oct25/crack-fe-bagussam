import React from 'react';
import { TrendingUp } from 'lucide-react';

const DashboardPage = ({ user, totalRevenue, getText }) => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* KARTU KHUSUS ADMIN */}
        {user.role === 'ADMIN' && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-xl">
            <p className="opacity-70 text-xs font-bold uppercase mb-2">{getText('platformRev')}</p>
            <h3 className="text-4xl font-black tracking-tighter">Rp {totalRevenue.toLocaleString()}</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black bg-white/20 py-1.5 px-3 rounded-lg w-fit">
              <TrendingUp size={14}/> Live Updates
            </div>
          </div>
        )}

        {/* KARTU KHUSUS GURU */}
        {user.role === 'INSTRUCTOR' && (
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-[2.5rem] text-white shadow-xl">
            <p className="opacity-70 text-xs font-bold uppercase mb-2">{getText('instructorEarn')}</p>
            <h3 className="text-4xl font-black tracking-tighter">Rp {user.balance?.toLocaleString() || 0}</h3>
          </div>
        )}

        {/* KARTU KHUSUS SISWA */}
        {user.role === 'STUDENT' && (
          <div className="bg-gradient-to-br from-purple-600 to-fuchsia-700 p-8 rounded-[2.5rem] text-white shadow-xl">
            <p className="opacity-70 text-xs font-bold uppercase mb-2">{getText('learningProg')}</p>
            <h3 className="text-4xl font-black tracking-tighter">92% ✅</h3>
          </div>
        )}

        {/* GENERAL STATS */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
          <p className="opacity-40 text-xs font-black uppercase tracking-widest mb-2">{getText('activeStudents')}</p>
          <h3 className="text-4xl font-black dark:text-white">1,420</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
          <p className="opacity-40 text-xs font-black uppercase tracking-widest mb-2">{getText('completedExams')}</p>
          <h3 className="text-4xl font-black dark:text-white">850</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;