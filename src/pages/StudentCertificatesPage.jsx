import React from 'react';
import { Award, FileText } from 'lucide-react';

const StudentCertificatesPage = ({ certificates, handlers, getText }) => {
  const { handleDownloadCert } = handlers;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {certificates.length === 0 ? (
        <div className="col-span-full py-20 text-center border-2 border-dashed dark:border-slate-700 rounded-3xl opacity-50">
          <p className="font-bold italic text-slate-500">No certificates earned yet. Finish your exams!</p>
        </div>
      ) : (
        certificates.map((cert) => (
          <div key={cert.id} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border-4 border-double dark:border-slate-700 text-center flex flex-col items-center group hover:border-blue-500 transition-all shadow-sm">
            <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mb-8 group-hover:rotate-12 transition-all">
              <Award size={48}/>
            </div>
            <h4 className="font-black text-xl leading-tight mb-3 tracking-tighter italic dark:text-white">{cert.title}</h4>
            <p className="text-[10px] opacity-40 font-black uppercase tracking-widest mb-10 dark:text-slate-400">
              {cert.code} • {cert.date}
            </p>
            <button 
              onClick={() => handleDownloadCert(cert)}
              className="w-full py-5 bg-slate-100 dark:bg-slate-800 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white dark:text-white transition-all shadow-md"
            >
              <FileText size={18}/> {getText('downloadCert')}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentCertificatesPage;