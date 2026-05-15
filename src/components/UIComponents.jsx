import React from 'react';
import { CheckCircle, AlertCircle, Eye, X, FileText } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';
import { useAuthStore } from '../store/useAuthStore';

export const ModalGlobal = () => {
  const { modal, closeModal, darkMode } = useUIStore();
  
  if (!modal.isOpen) return null;

  const handleConfirm = () => {
    if (modal.onConfirm) modal.onConfirm();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className={`w-full max-w-sm p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center ${darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'}`}>
        
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${modal.isConfirm ? 'bg-red-100 text-red-600' : (modal.title === 'Success' || modal.title === 'Berhasil' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600')}`}>
          {modal.title === 'Success' || modal.title === 'Berhasil' ? <CheckCircle size={40}/> : <AlertCircle size={40}/>}
        </div>

        <h3 className="text-2xl font-black mb-2">{modal.title}</h3>
        <p className="opacity-60 text-sm font-medium mb-8 leading-relaxed">{modal.message}</p>
        
        <div className="flex w-full gap-4">
          {modal.isConfirm && (
            <button onClick={closeModal} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-2xl text-xs uppercase tracking-widest">
              Cancel
            </button>
          )}
          <button 
            onClick={modal.isConfirm ? handleConfirm : closeModal} 
            className={`flex-1 py-4 font-black rounded-2xl uppercase tracking-widest text-xs text-white shadow-lg ${modal.isConfirm ? 'bg-red-600 shadow-red-500/20' : 'bg-blue-600 shadow-blue-500/20'}`}
          >
            {modal.isConfirm ? 'Yes, Delete' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const LanguageToggle = () => {
  const { lang, setLang } = useUIStore();
  return (
    <button onClick={() => setLang(lang === 'EN' ? 'ID' : 'EN')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-sm text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all dark:text-white">
      <img src={lang === 'EN' ? "https://flagcdn.com/w20/gb.png" : "https://flagcdn.com/w20/id.png"} alt="flag" className="w-4 h-3 object-cover rounded-sm" />
      {lang}
    </button>
  );
};

export const SidebarItem = ({ icon: Icon, labelKey, targetView, roles = [] }) => {
  const { view, setView, getText } = useUIStore();
  const { user } = useAuthStore();

  // Role Protection
  if (roles.length > 0 && user && !roles.includes(user.role)) return null;
  
  const isActive = view === targetView;

  return (
    <button 
      onClick={() => setView(targetView)} 
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'opacity-40 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white'}`}
    >
      <Icon size={22} /> {getText(labelKey)}
    </button>
  );
};

export const DocumentViewer = ({ isOpen, onClose, files }) => {
  const { darkMode } = useUIStore();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
      <div className={`w-full max-w-4xl h-[80vh] flex flex-col rounded-[3rem] overflow-hidden ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
        <div className="p-6 flex justify-between items-center border-b dark:border-slate-800">
          <h3 className="font-black text-xl flex items-center gap-2 text-blue-600"><Eye size={24}/> Document Preview</h3>
          <button onClick={onClose} className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"><X size={24}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-10 grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase opacity-40 tracking-widest text-center">Transfer Receipt</p>
            {files?.proof ? (
              <img src={typeof files.proof === 'string' ? files.proof : URL.createObjectURL(files.proof)} className="w-full rounded-2xl border-4 border-white dark:border-slate-800 shadow-2xl" alt="proof" />
            ) : (
              <div className="p-20 border-2 border-dashed rounded-3xl opacity-20 text-center font-black">No proof uploaded</div>
            )}
          </div>
          <div className="space-y-4 text-center">
            <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Signed Document</p>
            {files?.doc ? (
              <div className="p-10 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex flex-col items-center justify-center gap-6 border-2 border-blue-200 dark:border-blue-800/30">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30"><FileText size={40} /></div>
                <div>
                  <p className="font-black text-lg text-blue-600">{files.doc.name || 'Document File'}</p>
                  <p className="text-xs opacity-50 font-bold mt-1">Status: Valid Signature Attached</p>
                </div>
                <span className="text-[10px] bg-green-500 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest">UPLOADED OK</span>
              </div>
            ) : (
              <div className="p-20 border-2 border-dashed rounded-3xl opacity-20 text-center font-black">No document uploaded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};