import React from 'react';
import { History, Eye, CheckCircle, XCircle } from 'lucide-react';

const VerifyPaymentPage = ({ pendingPayments, history, handlers, getText }) => {
  return (
    <div className="space-y-10">
      {/* Pending List Section */}
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
        <h3 className="text-2xl font-black mb-8 uppercase tracking-widest text-xs opacity-50 dark:text-slate-400">{getText('payWaitList')}</h3>
        <div className="space-y-4">
          {pendingPayments.length === 0 ? <p className="opacity-50 text-sm">No pending payments.</p> : null}
          {pendingPayments.map((tx) => (
            <div key={tx.id} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border dark:border-slate-700 hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">
                  {tx.studentName?.charAt(0) || 'S'}
                </div>
                <div>
                  <p className="font-black text-lg dark:text-white">{tx.studentName}</p>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{tx.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <button onClick={() => handlers.onViewDocs(tx)} className="text-xs font-black text-blue-500 underline flex items-center gap-1">
                  <Eye size={16}/> {getText('viewDocs')}
                </button>
                <div className="flex gap-3 ml-6">
                  <button onClick={() => handlers.onApprove(tx.id)} className="px-8 py-3 bg-blue-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-md">Approve</button>
                  <button onClick={() => handlers.onReject(tx.id)} className="px-8 py-3 bg-red-500/10 text-red-500 text-[10px] font-black rounded-xl border border-red-500/20 uppercase tracking-widest">Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Table Section */}
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border dark:border-slate-800 shadow-sm">
        <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-green-600"><History size={24}/> {getText('history')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b dark:border-slate-800 text-[10px] uppercase opacity-40 font-black">
              <tr><th className="pb-4 px-4 text-center">No</th><th className="pb-4 px-4">Student</th><th className="pb-4 px-4">Course</th><th className="pb-4 px-4">Amount</th><th className="pb-4 px-4">Status</th></tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              {history.length === 0 ? <tr><td colSpan="5" className="py-10 text-center opacity-30 text-xs italic font-bold">No approved transactions.</td></tr> : null}
              {history.map((h, i) => (
                <tr key={h.id} className="text-sm font-bold opacity-80 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-5 px-4 text-center opacity-40 dark:text-white italic">{i+1}</td>
                  <td className="py-5 px-4 dark:text-white">{h.studentName}</td>
                  <td className="py-5 px-4 dark:text-white">{h.title}</td>
                  <td className="py-5 px-4 dark:text-white">Rp {h.amount?.toLocaleString()}</td>
                  <td className="py-5 px-4">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase">SUCCESS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerifyPaymentPage;