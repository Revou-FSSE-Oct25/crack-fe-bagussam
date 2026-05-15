import React from 'react';
import { AlertCircle } from 'lucide-react';

const SettingsPage = ({ user, sysSettings, toggleSetting, getText }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border dark:border-slate-800 shadow-sm">
      <h3 className="text-3xl font-black mb-10 tracking-tighter dark:text-white">{getText('sysConfig')}</h3>
      
      {/* Read-only warning if user is not the Master Admin */}
      {user.email !== 'admin@lms.com' && (
        <div className="mb-8 p-5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 rounded-2xl text-xs font-black flex items-center gap-3">
          <AlertCircle size={20}/> VIEW ONLY MODE: Only admin@lms.com can modify global system settings.
        </div>
      )}

      <div className="space-y-6">
        {/* Toggle 1: Maintenance Mode */}
        <div className={`p-8 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border dark:border-slate-700 flex justify-between items-center transition-all ${user.email !== 'admin@lms.com' && 'opacity-60'}`}>
          <div>
            <p className="font-black text-lg dark:text-white">{getText('maintMode')}</p>
            <p className="text-sm opacity-50 font-medium dark:text-slate-400">{getText('maintDesc')}</p>
          </div>
          <div onClick={() => toggleSetting('maintenanceMode', sysSettings.maintenanceMode)} className={`w-16 h-8 rounded-full relative cursor-pointer transition-all ${sysSettings.maintenanceMode ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-slate-300 dark:bg-slate-700'}`}>
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${sysSettings.maintenanceMode ? 'right-1' : 'left-1'}`}></div>
          </div>
        </div>

        {/* Toggle 2: Email Verification */}
        <div className={`p-8 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border dark:border-slate-700 flex justify-between items-center transition-all ${user.email !== 'admin@lms.com' && 'opacity-60'}`}>
          <div>
            <p className="font-black text-lg dark:text-white">{getText('emailVerify')}</p>
            <p className="text-sm opacity-50 font-medium dark:text-slate-400">{getText('emailVerifyDesc')}</p>
          </div>
          <div onClick={() => toggleSetting('emailVerification', sysSettings.emailVerification)} className={`w-16 h-8 rounded-full relative cursor-pointer transition-all ${sysSettings.emailVerification ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-slate-300 dark:bg-slate-700'}`}>
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${sysSettings.emailVerification ? 'right-1' : 'left-1'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;