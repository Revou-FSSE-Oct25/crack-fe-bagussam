import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const VideoPlayer = ({ videoUrl, isModuleCheckedIn, onCheckIn, currentModuleData, getText }) => {
  return (
    <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 border-slate-800 relative">
      {/* Attendance Guard Overlay */}
      {!isModuleCheckedIn && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl z-10 flex flex-col items-center justify-center p-8 text-center">
          <Clock className="text-blue-500 mb-6 animate-pulse" size={64} />
          <h2 className="text-3xl font-black text-white mb-2">{getText('attendanceReq')}</h2>
          <p className="text-white/50 mb-10 max-w-md">{getText('checkInDesc')}</p>
          <button 
            onClick={() => onCheckIn(currentModuleData?.id)} 
            className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <CheckCircle size={22}/> {getText('checkIn')}
          </button>
        </div>
      )}
      
      {/* The Actual Video */}
      <iframe 
        width="100%" 
        height="100%" 
        src={videoUrl} 
        frameBorder="0" 
        allowFullScreen
        title="Course Video"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;