import React from 'react';
import { X, ReceiptText, FileText, Download, Upload } from 'lucide-react';

const StudentPaymentPage = ({ activeModule, handlers, states, getText }) => {
  const { cancelEnrollment, handleDownloadTemplate, handleConfirmPayment } = handlers;
  const { error, isLoading, proofFile, setProofFile, docFile, setDocFile } = states;

  if (!activeModule) return null;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <button onClick={() => cancelEnrollment(activeModule.id)} className="flex items-center gap-2 text-red-500 font-black hover:gap-4 transition-all uppercase tracking-widest text-xs mb-6">
        <X size={18}/> {getText('cancelEnrollment')}
      </button>
      
      <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border dark:border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16"></div>
        
        <div className="flex justify-between items-center mb-12 border-b dark:border-slate-800 pb-8">
          <h2 className="text-3xl font-black tracking-tighter flex items-center gap-4 dark:text-white">
            <ReceiptText className="text-blue-600" size={32}/> {getText('invoiceTitle')}
          </h2>
          <span className="text-[10px] font-black bg-yellow-500 text-white px-4 py-1.5 rounded-full uppercase tracking-widest">
            {activeModule.status === 'PENDING_VERIFICATION' ? getText('awaitingVerify') : getText('pending')}
          </span>
        </div>

        {error && <div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-xl text-sm font-bold text-center">{error}</div>}

        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div>
            <p className="opacity-40 font-bold text-xs uppercase tracking-widest mb-1 dark:text-slate-400">{getText('selectedCourse')}</p>
            <p className="font-black text-xl mb-6 dark:text-white">{activeModule.title}</p>
            <p className="opacity-40 font-bold text-xs uppercase tracking-widest mb-1 dark:text-slate-400">{getText('totalPayment')}</p>
            <p className="font-black text-3xl text-blue-600 tracking-tighter">Rp {activeModule.amount?.toLocaleString()}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
            <p className="text-[10px] font-black uppercase opacity-40 mb-3 tracking-[0.2em] dark:text-slate-400">{getText('transferMethod')}</p>
            <p className="font-black text-xl mb-1 dark:text-white">BCA: 123-456-7890</p>
            <p className="text-xs font-bold opacity-60 dark:text-slate-400">{getText('accName')}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-black flex items-center gap-2 dark:text-white"><FileText className="text-blue-600" size={18}/> {getText('docApproval')}</h4>
              <p className="text-xs opacity-50 mt-1 dark:text-slate-400">{getText('docDesc')}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleDownloadTemplate} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-lg text-xs font-bold hover:bg-slate-200 flex items-center gap-2">
                <Download size={14}/> {getText('downloadTemplate')}
              </button>
              <label className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-xs font-black cursor-pointer active:scale-95 transition-all">
                {docFile ? docFile.name : getText('uploadSigned')}
                <input type="file" className="hidden" onChange={e => setDocFile(e.target.files[0])} />
              </label>
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 flex flex-col items-center gap-3 text-center">
            <Upload className="opacity-20 mb-2 dark:text-white" size={32} />
            <p className="font-black uppercase tracking-widest text-xs opacity-60 dark:text-slate-300">{getText('proofTransfer')}</p>
            <p className="text-xs opacity-50 mb-2 dark:text-slate-400">{getText('proofDesc')}</p>
            <label className="px-6 py-2.5 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:scale-105 transition-all">
              {proofFile ? proofFile.name : getText('uploadFile')}
              <input type="file" className="hidden" accept="image/*" onChange={e => setProofFile(e.target.files[0])} />
            </label>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button onClick={() => cancelEnrollment(activeModule.id)} className="w-1/3 py-5 border-2 border-slate-200 dark:border-slate-700 dark:text-white font-black rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all uppercase tracking-widest text-sm">
              {getText('cancel')}
            </button>
            <button disabled={!proofFile || !docFile || isLoading} onClick={handleConfirmPayment} className="w-2/3 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 uppercase tracking-widest text-sm disabled:opacity-30">
              {isLoading ? getText('processing') : getText('confirmSend')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPaymentPage;