import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

const InstructorWalletPage = ({ user, instructorEarnings, withdrawals, handlers, getText }) => {
  const { handleWithdrawFunds } = handlers;
  
  // Logic Filter: If the user isn't the mock initial instructor, clear their earnings history
  const myEarnings = user.email === 'guru@lms.com' ? instructorEarnings : [];

  return (
    <div className="space-y-10">
      {/* WALLET CARD */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-12 rounded-[3rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <p className="opacity-70 text-sm font-black uppercase tracking-[0.3em] mb-2">{getText('availableBalance')}</p>
          <h3 className="text-6xl font-black tracking-tighter italic">Rp {user.balance?.toLocaleString() || 0}</h3>
        </div>
        <button 
          onClick={handleWithdrawFunds}
          className="bg-white text-green-700 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          {getText('withdraw')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* EARNINGS HISTORY */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
          <h4 className="font-black text-xl mb-8 uppercase tracking-widest opacity-40 dark:text-slate-400">{getText('earningsHistory')}</h4>
          
          {myEarnings.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed dark:border-slate-700 rounded-3xl opacity-50">
              <p className="font-bold italic">No transaction history yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myEarnings.map((tr, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border dark:border-slate-700 hover:scale-[1.01] transition-all gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                      <ArrowUpRight size={20}/>
                    </div>
                    <div>
                      <p className="font-black dark:text-white">{getText('feeReceived')}: {tr.from}</p>
                      <p className="text-[10px] opacity-40 uppercase font-black tracking-widest mt-1 dark:text-slate-400">{tr.course}</p>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="font-black text-green-600 text-xl leading-none">+ Rp {tr.amount.toLocaleString()}</p>
                    <p className="text-[8px] opacity-40 font-black uppercase mt-1 dark:text-slate-400">{getText('statusSuccess')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WITHDRAWAL HISTORY */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
          <h4 className="font-black text-xl mb-8 uppercase tracking-widest opacity-40 dark:text-slate-400">Withdrawal History</h4>
          
          {withdrawals.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed dark:border-slate-700 rounded-3xl opacity-50">
              <p className="font-bold italic">No withdrawal history yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {withdrawals.map((wd) => (
                <div key={wd.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border dark:border-slate-700 hover:scale-[1.01] transition-all gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-2xl flex items-center justify-center shrink-0">
                      <ArrowDownLeft size={20}/>
                    </div>
                    <div>
                      <p className="font-black dark:text-white">Bank Transfer</p>
                      <p className="text-[10px] opacity-40 uppercase font-black tracking-widest mt-1 dark:text-slate-400">{wd.date}</p>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="font-black text-slate-800 dark:text-white text-xl leading-none">- Rp {wd.amount.toLocaleString()}</p>
                    <p className="text-[8px] font-black uppercase mt-1 text-yellow-500 flex items-center justify-end gap-1"><Clock size={10}/> {wd.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorWalletPage;