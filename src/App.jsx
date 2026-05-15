import React, { useState, useEffect } from 'react';
import { BookOpen, LogOut, Sun, Moon, LayoutDashboard, Layers, GraduationCap, ClipboardList, Award, DollarSign, Users, Settings, MonitorPlay, UserCheck, Wallet } from 'lucide-react';
import { MOCK_COURSES } from './utils/constants';

// --- STORES ---
import { useUIStore } from './store/useUIStore';
import { useAuthStore } from './store/useAuthStore';
import { useCourseStore } from './store/useCourseStore';
import { useAdminStore } from './store/useAdminStore';

// --- UI COMPONENTS & PAGES ---
import { ModalGlobal, LanguageToggle, SidebarItem, DocumentViewer } from './components/UIComponents';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CatalogPage from './pages/CatalogPage';
import InstructorModulesPage from './pages/InstructorModulesPage';
import UsersPage from './pages/UsersPage';
import VerifyPaymentPage from './pages/VerifyPaymentPage';
import StudentPaymentPage from './pages/StudentPaymentPage';
import StudentCoursesPage from './pages/StudentCoursesPage';
import StudentExamsPage from './pages/StudentExamsPage';
import StudentCertificatesPage from './pages/StudentCertificatesPage';
import SettingsPage from './pages/SettingsPage';
import InstructorWalletPage from './pages/InstructorWalletPage';
import InstructorAttendancePage from './pages/InstructorAttendancePage';
import CourseDetails from './components/course/CourseDetails';

// --- MODALS ---
import AddCourseModal from './components/modals/AddCourseModal';
import AddModuleModal from './components/modals/AddModuleModal';
import AddUserModal from './components/modals/AddUserModal';
import EditUserModal from './components/modals/EditUserModal';
import EditCourseModal from './components/modals/EditCourseModal';
import MaterialEditorModal from './components/modals/MaterialEditorModal';
import TakeExamModal from './components/modals/TakeExamModal';
import ExamEditorModal from './components/modals/ExamEditorModal'; // <-- IMPORT EXAM EDITOR

export default function App() {
  const { view, setView, darkMode, setDarkMode, lang, formModals, setFormModal, getText, showAlert, showConfirm, isLoading, setIsLoading } = useUIStore();
  const { user, logout } = useAuthStore();
  
  const { 
    coursesDb, setCoursesDb, allEnrollments, setAllEnrollments, checkedInModules, setCheckedInModules, 
    completedModules, setCompletedModules, uploadedFiles, setUploadedFiles, activeModule, setActiveModule, 
    activeModuleId, setActiveModuleId, activeVideo, setActiveVideo, selectedCourse, setSelectedCourse 
  } = useCourseStore();

  const { 
    usersDb, setUsersDb, sysSettings, setSysSettings, pendingPayments, setPendingPayments, 
    totalPlatformRevenue, setTotalPlatformRevenue, instructorEarnings, certificates, withdrawals, addWithdrawal
  } = useAdminStore();

  const [proofFile, setProofFile] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [editData, setEditData] = useState(null);
  const [targetCourseId, setTargetCourseId] = useState(null);
  const [viewerFiles, setViewerFiles] = useState({ isOpen: false, data: {} });
  const [uiStates, setUiStates] = useState({ showAddUserPass: false });
  
  const [examModalState, setExamModalState] = useState({ isOpen: false, id: null, title: '' });
  const [isExamEditorOpen, setIsExamEditorOpen] = useState(false); // <-- STATE EXAM EDITOR

  useEffect(() => {
    const initApp = async () => {
      if (user) {
        const localData = localStorage.getItem('eduhub_local_courses');
        let savedCourses = [];
        try {
          const parsed = JSON.parse(localData);
          savedCourses = Array.isArray(parsed) ? parsed : [];
        } catch (e) { savedCourses = []; }
        
        setCoursesDb([...savedCourses, ...MOCK_COURSES]);
        await fetchInitialData(user);
      } else {
        setCoursesDb(MOCK_COURSES);
      }
    };
    initApp();
  }, [user]);

  useEffect(() => { document.documentElement.classList.toggle('dark', darkMode); }, [darkMode]);

  useEffect(() => {
    if (view !== 'courses' && view !== 'instructor_modules') {
      setActiveModule(null);
      setActiveModuleId(null);
      setActiveVideo(null);
    }
  }, [view, setActiveModule, setActiveModuleId, setActiveVideo]);

  const fetchInitialData = async (currentUser) => {
    await fetchCourses();
    if (currentUser.role === 'ADMIN') { fetchUsers(); fetchPendingPayments(); fetchSettings(); }
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('lms_token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/api/courses', { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const serverData = await res.json();
        const serverCourses = Array.isArray(serverData?.data) ? serverData.data : [];
        
        setCoursesDb(prev => {
          const safePrev = Array.isArray(prev) ? prev : [];
          const serverIds = new Set(serverCourses.map(c => c.id));
          const localOnly = safePrev.filter(c => !serverIds.has(c.id));
          return [...serverCourses, ...localOnly];
        });
      }
    } catch (err) { console.warn("Backend offline."); }
  };

  const fetchUsers = async () => { /* Logic */ };
  const fetchSettings = async () => { /* Logic */ };
  const fetchPendingPayments = async () => { /* Logic */ };
  const toggleSystemSetting = async (key, val) => { /* Logic */ };

  // =========================================================================
  // INTEGRASI BACKEND: CREATE COURSE & ADD MODULE
  // =========================================================================

  const submitNewCourse = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const title = e.target.title.value;
    const description = e.target.desc.value;
    const price = e.target.price.value;

    try {
      const token = localStorage.getItem('lms_token');
      
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          instructorFee: 0
        })
      });

      const result = await res.json();

      if (res.ok) {
        setCoursesDb(prev => {
          const safePrev = Array.isArray(prev) ? prev : [];
          return [result.data, ...safePrev];
        });

        setFormModal('isFormCourseOpen', false);
        showAlert("Success", "Course created in Database successfully! 🎉");
      } else {
        showAlert("Error", result.message || "Failed to create course");
      }
    } catch (err) {
      console.error(err);
      showAlert("Error", "Server connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitNewModule = async (e) => { 
    e.preventDefault();
    setIsLoading(true);

    const title = e.target.title.value;
    const videoUrl = e.target.videoUrl.value;

    try {
      const token = localStorage.getItem('lms_token');
      
      const res = await fetch(`http://localhost:5000/api/courses/${targetCourseId}/modules`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ title, videoUrl, content: '' })
      });

      const result = await res.json();

      if (res.ok) {
        setCoursesDb(coursesDb.map(c => 
          c.id === targetCourseId 
            ? { ...c, modules: [...(c.modules || []), result.data] } 
            : c
        ));
        setFormModal('isFormModuleOpen', false); 
        showAlert(getText('success'), "Module saved to Database! 📹");
      } else {
        showAlert("Error", result.message || "Failed to add module");
      }
    } catch (err) {
      console.error(err);
      showAlert("Error", "Server connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = (id) => { 
    showConfirm("Delete Course", "Confirm deletion?", () => { 
      setCoursesDb(prev => prev.filter(c => c.id !== id)); 
      const local = JSON.parse(localStorage.getItem('eduhub_local_courses')) || [];
      const safeLocal = Array.isArray(local) ? local : [];
      localStorage.setItem('eduhub_local_courses', JSON.stringify(safeLocal.filter(c => c.id !== id)));
      showAlert("Success", "Deleted."); 
    }); 
  };

  const handleEditModule = (data) => showAlert("Info", "Module editor active.");

  const handleDeleteModule = (moduleId) => {
    showConfirm("Delete Module", "Are you sure?", () => {
      const updated = coursesDb.map(c => c.id === selectedCourse.id ? { ...c, modules: (c.modules || []).filter(m => m.id !== moduleId) } : c);
      setCoursesDb(updated);
      setSelectedCourse(updated.find(c => c.id === selectedCourse.id));
      showAlert("Success", "Module deleted.");
    });
  };

  // --- SAVE DYNAMIC EXAM QUESTIONS ---
  const handleSaveExamQuestions = (courseId, questions) => {
    setCoursesDb(coursesDb.map(c => c.id === courseId ? { ...c, examQuestions: questions } : c));
    showAlert("Success", "Exam questions saved dynamically!");
  };

  const submitNewUser = async (e) => { /* Logic */ };
  const submitEditUser = async (e) => { /* Logic */ };
  const deleteUser = (id, email) => { /* Logic */ };

  const initiateEnrollment = async (course) => { 
    setIsLoading(true);
    const mockEn = { id: 'en' + Date.now(), studentName: user.name, courseId: course.id, title: course.title, status: 'PENDING_PAYMENT', invoice: `INV/2026/${Math.floor(Math.random()*900)+100}`, amount: course.price, progress: 0 };
    setAllEnrollments([mockEn, ...allEnrollments]); setActiveModule(mockEn);
    setSelectedCourse(null); setProofFile(null); setDocFile(null); setView('payment'); setIsLoading(false);
  };

  const cancelEnrollment = (id) => { showConfirm(getText('cancel'), getText('cancelEnrollConfirm'), () => { setAllEnrollments(allEnrollments.filter(en => en.id !== id)); setView('courses'); }); };
  
  const handleConfirmPayment = async () => { 
    if(!proofFile || !docFile) return showAlert("Error", getText('reqFiles'));
    setIsLoading(true);
    setTimeout(() => {
      setAllEnrollments(prev => prev.map(en => en.id === activeModule.id ? { ...en, status: 'PENDING_VERIFICATION' } : en));
      setUploadedFiles(prev => ({ ...prev, [activeModule.id]: { proof: proofFile, doc: docFile } }));
      showAlert(getText('success'), getText('uploadSuccess')); setView('courses'); setActiveModule(null); setIsLoading(false);
    }, 1000);
  };

  const handleVerifyAdmin = async (txId, isApproved) => { 
    const target = allEnrollments.find(en => en.id === txId);
    if (isApproved && target) {
      setTotalPlatformRevenue(prev => prev + (target.amount || 0));
      setAllEnrollments(prev => prev.map(en => en.id === txId ? { ...en, status: 'ACTIVE' } : en));
    } else {
      setAllEnrollments(prev => prev.map(en => en.id === txId ? { ...en, status: 'FAILED' } : en));
    }
    showAlert(getText('success'), `Payment ${isApproved ? 'Approved' : 'Rejected'}!`);
    setPendingPayments(pendingPayments.filter(p => p.id !== txId));
  };

  const toggleModuleCompletion = async (mId) => { 
    if (!completedModules.includes(mId)) {
      const newCompleted = [...completedModules, mId];
      setCompletedModules(newCompleted); 
      if (activeModule) {
        const cData = coursesDb.find(c => c.id === activeModule.courseId) || MOCK_COURSES.find(c => c.id === activeModule.courseId);
        const courseMods = cData?.modules || cData?.modulesList || [];
        const totalMods = courseMods.length || 1;
        const completedCourseMods = courseMods.filter(m => newCompleted.includes(m.id)).length;
        const isFinishedAll = completedCourseMods >= totalMods;
        setAllEnrollments(prev => prev.map(en => en.id === activeModule.id ? { ...en, progress: isFinishedAll ? 100 : Math.floor((completedCourseMods / totalMods) * 100), status: (isFinishedAll && en.status !== 'COMPLETED') ? 'READY_FOR_EXAM' : en.status } : en));
        setActiveModule(prev => ({ ...prev, progress: isFinishedAll ? 100 : Math.floor((completedCourseMods / totalMods) * 100), status: (isFinishedAll && prev.status !== 'COMPLETED') ? 'READY_FOR_EXAM' : prev.status }));
      }
    }
  };

  const handleCheckIn = async (mId) => { 
    if (!checkedInModules.includes(mId)) {
      setCheckedInModules([...checkedInModules, mId]);
      showAlert(getText('success'), getText('checkInSuccess'));
    }
  };

  const handleExamSubmit = async (enrollmentId, courseTitle, score) => {
    setExamModalState({ isOpen: false, id: null, title: '' });
    setIsLoading(true);

    try {
      const token = localStorage.getItem('lms_token');
      const res = await fetch(`http://localhost:5000/api/enrollments/${enrollmentId}/exam`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ score, courseTitle })
      });

      const result = await res.json();

      if (res.ok) {
        await fetchInitialData(user); 
        showAlert("Exam Success", result.message);
      } else {
        showAlert("Error", result.message);
      }
    } catch (err) {
      showAlert("Error", "Server connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCert = (cert) => {
    const element = document.createElement("a");
    const file = new Blob([`EDUHUB CERTIFICATE\n\nName: ${user.name}\nCourse: ${cert.title}\nID: ${cert.code}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file); element.download = `Certificate_${cert.code}.txt`;
    document.body.appendChild(element); element.click();
  };

  const handleWithdrawFunds = async () => {
    if (user.balance <= 0) return showAlert("Withdrawal Failed", "No funds available.");
    showConfirm("Withdraw Funds", `Withdraw Rp ${user.balance.toLocaleString()}?`, async () => {
      setIsLoading(true);
      setTimeout(() => {
        addWithdrawal({ id: Date.now(), amount: user.balance, date: new Date().toLocaleDateString('en-GB'), status: 'PENDING (Max 7 Days)' });
        const updated = { ...user, balance: 0 };
        localStorage.setItem('lms_user', JSON.stringify(updated));
        useAuthStore.setState({ user: updated });
        showAlert("Processed", "Funds will be transferred within 7 days.");
        setIsLoading(false);
      }, 1500);
    });
  };

  if (!user) return <AuthPage />;

  return (
    <>
      <ModalGlobal darkMode={darkMode} />
      <DocumentViewer isOpen={viewerFiles.isOpen} onClose={() => setViewerFiles({ isOpen: false, data: {} })} files={viewerFiles.data} />

      <AddCourseModal isOpen={formModals.isFormCourseOpen} onClose={() => setFormModal('isFormCourseOpen', false)} onSubmit={submitNewCourse} darkMode={darkMode} isLoading={isLoading} />
      <AddModuleModal isOpen={formModals.isFormModuleOpen} onClose={() => setFormModal('isFormModuleOpen', false)} onSubmit={submitNewModule} darkMode={darkMode} getText={getText} />
      <AddUserModal isOpen={formModals.isFormUserOpen} onClose={() => setFormModal('isFormUserOpen', false)} onSubmit={submitNewUser} uiStates={uiStates} setters={setUiStates} darkMode={darkMode} getText={getText} />
      <EditUserModal isOpen={formModals.isFormEditOpen} onClose={() => { setFormModal('isFormEditOpen', false); setEditData(null); }} onSubmit={submitEditUser} data={editData} darkMode={darkMode} isLoading={isLoading} />
      <EditCourseModal isOpen={formModals.isFormEditCourseOpen} onClose={() => setFormModal('isFormEditCourseOpen', false)} data={selectedCourse} darkMode={darkMode} />
      <MaterialEditorModal isOpen={formModals.isModuleEditorOpen} onClose={() => setFormModal('isModuleEditorOpen', false)} data={selectedCourse} onEditModule={handleEditModule} onDeleteModule={handleDeleteModule} darkMode={darkMode} />
      
      {/* MODAL UJIAN & EDITOR UJIAN */}
      <TakeExamModal isOpen={examModalState.isOpen} onClose={() => setExamModalState({ isOpen: false, id: null, title: '' })} examData={{ id: examModalState.id, title: examModalState.title }} courseData={coursesDb.find(c => c.id === examModalState.id)} onSubmit={handleExamSubmit} darkMode={darkMode} />
      <ExamEditorModal isOpen={isExamEditorOpen} onClose={() => setIsExamEditorOpen(false)} course={selectedCourse} onSave={handleSaveExamQuestions} darkMode={darkMode} />

      <div className={`min-h-screen flex flex-col md:flex-row transition-all duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <aside className={`w-full md:w-80 border-r p-8 flex flex-col ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg"><BookOpen size={24} /></div>
            <span className="text-2xl font-black italic tracking-tighter">EduHub</span>
          </div>
          <nav className="flex-1 space-y-1">
            <SidebarItem icon={LayoutDashboard} labelKey="dashboard" targetView="dashboard" />
            {user.role === 'STUDENT' && (
              <><SidebarItem icon={Layers} labelKey="catalog" targetView="catalog" /><SidebarItem icon={GraduationCap} labelKey="myCourses" targetView="courses" /><SidebarItem icon={ClipboardList} labelKey="exams" targetView="exams" /><SidebarItem icon={Award} labelKey="certs" targetView="certificates" /></>
            )}
            {user.role === 'ADMIN' && (
              <><SidebarItem icon={Users} labelKey="users" targetView="users" /><SidebarItem icon={DollarSign} labelKey="verifyPay" targetView="verify" /><SidebarItem icon={Settings} labelKey="settings" targetView="settings" /></>
            )}
            {user.role === 'INSTRUCTOR' && (
              <><SidebarItem icon={MonitorPlay} labelKey="teaching" targetView="instructor_modules" /><SidebarItem icon={UserCheck} labelKey="attendance" targetView="attendance" /><SidebarItem icon={Wallet} labelKey="wallet" targetView="wallet" /></>
            )}
          </nav>
          <button onClick={logout} className="mt-8 w-full flex items-center gap-4 px-6 py-4 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"><LogOut size={22} /> Logout</button>
        </aside>

        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <header className="flex justify-between items-center mb-12">
            <div><h1 className="text-3xl font-black tracking-tight">{getText(view)}</h1><p className="opacity-50 mt-1 uppercase text-[10px] font-black tracking-[0.2em]">Welcome, {user.name} 🚀</p></div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <button onClick={() => setDarkMode(!darkMode)} className="p-3.5 rounded-2xl border shadow-sm dark:border-slate-800">{darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}</button>
              <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border shadow-sm dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">{user.name.charAt(0)}</div>
                <div><p className="text-xs font-black leading-tight">{user.name}</p><p className="text-[8px] opacity-40 uppercase font-black">{user.role}</p></div>
              </div>
            </div>
          </header>

          {view === 'dashboard' && <DashboardPage user={user} totalRevenue={totalPlatformRevenue} getText={getText} />}
          {view === 'catalog' && <CatalogPage courses={coursesDb} onSelectCourse={(c) => { setSelectedCourse(c); setView('course_details'); }} getText={getText} />}
          {view === 'course_details' && <CourseDetails course={selectedCourse} onBack={() => setView('catalog')} onEnroll={initiateEnrollment} getText={getText} />}
          {view === 'payment' && <StudentPaymentPage activeModule={activeModule} handlers={{ cancelEnrollment, handleDownloadTemplate: () => { const el = document.createElement("a"); const file = new Blob(["EDUHUB LMS APPROVAL DOCUMENT\n\nI hereby agree to the terms and conditions."], {type: 'text/plain'}); el.href = URL.createObjectURL(file); el.download = "EduHub_Approval_Template.txt"; document.body.appendChild(el); el.click(); }, handleConfirmPayment }} states={{ error: '', isLoading, proofFile, setProofFile, docFile, setDocFile }} getText={getText} />}
          {view === 'courses' && <StudentCoursesPage user={user} coursesDb={coursesDb} allEnrollments={allEnrollments} activeModule={activeModule} activeModuleId={activeModuleId} activeVideo={activeVideo} checkedInModules={checkedInModules} completedModules={completedModules} uploadedFiles={uploadedFiles} setters={{ setActiveModule, setActiveModuleId, setActiveVideo, setView, setViewerFiles }} handlers={{ handleCheckIn, toggleModuleCompletion, cancelEnrollment }} getText={getText} />}
          {view === 'exams' && <StudentExamsPage user={user} allEnrollments={allEnrollments} coursesDb={coursesDb} completedModules={completedModules} handlers={{ handleTakeExam: (id, title) => setExamModalState({ isOpen: true, id, title }) }} getText={getText} />}
          {view === 'certificates' && <StudentCertificatesPage certificates={certificates} handlers={{ handleDownloadCert }} getText={getText} />}
          {view === 'wallet' && <InstructorWalletPage user={user} instructorEarnings={instructorEarnings} withdrawals={withdrawals} handlers={{ handleWithdrawFunds }} getText={getText} />}
          {/* UPDATE: Passing setIsExamEditorOpen ke InstructorModulesPage */}
          {view === 'instructor_modules' && <InstructorModulesPage courses={coursesDb} user={user} setters={{ setIsFormCourseOpen: (v) => setFormModal('isFormCourseOpen', v), setTargetCourseId, setIsFormModuleOpen: (v) => setFormModal('isFormModuleOpen', v), setSelectedCourseForModules: setSelectedCourse, setIsModuleEditorOpen: (v) => setFormModal('isModuleEditorOpen', v), setEditCourseData: setSelectedCourse, setIsFormEditCourseOpen: (v) => setFormModal('isFormEditCourseOpen', v), setIsExamEditorOpen }} handlers={{ onDeleteCourse: handleDeleteCourse }} getText={getText} />}
          {view === 'users' && <UsersPage users={usersDb} setters={{ setIsFormUserOpen: (v) => setFormModal('isFormUserOpen', v), setEditData, setIsFormEditOpen: (v) => setFormModal('isFormEditOpen', v) }} handlers={{ onDeleteUser: deleteUser }} getText={getText} />}
          {view === 'verify' && <VerifyPaymentPage pendingPayments={pendingPayments} history={allEnrollments.filter(en => en.status === 'ACTIVE')} handlers={{ onApprove: (id) => handleVerifyAdmin(id, true), onReject: (id) => handleVerifyAdmin(id, false), onViewDocs: (tx) => setViewerFiles({ isOpen: true, data: uploadedFiles[tx.id] || {} }) }} getText={getText} />}
          {view === 'settings' && <SettingsPage user={user} sysSettings={sysSettings} toggleSetting={toggleSystemSetting} getText={getText} />}
          {view === 'attendance' && <InstructorAttendancePage user={user} courses={coursesDb} allEnrollments={allEnrollments} getText={getText} />}
        </main>
      </div>
    </>
  );
}