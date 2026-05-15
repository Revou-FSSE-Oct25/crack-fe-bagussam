import { create } from 'zustand';
import { MOCK_COURSES } from '../utils/constants';

export const useCourseStore = create((set) => ({
  coursesDb: [],
  allEnrollments: [
    { id: 'en1', studentName: 'Top Student', courseId: 'c1', title: 'Fullstack Web Development', status: 'ACTIVE', invoice: 'INV/2026/001', score: 85, amount: 1500000, progress: 0 },
    { id: 'en2', studentName: 'Top Student', courseId: 'c2', title: 'UI/UX Design Masterclass', status: 'COMPLETED', invoice: 'INV/2026/002', score: 95, amount: 1200000, progress: 100 },
    { id: 'en3', studentName: 'Top Student', courseId: 'c3', title: 'Digital Marketing 101', status: 'PENDING_PAYMENT', invoice: 'INV/2026/003', amount: 950000, progress: 0 },
    { id: 'en4', studentName: 'Trial User', courseId: 'c1', title: 'Fullstack Web Development', status: 'PENDING_VERIFICATION', invoice: 'INV/2026/004', amount: 1500000, progress: 0 },
  ],
  checkedInModules: [],
  completedModules: [],
  uploadedFiles: {},

  activeModule: null,
  activeModuleId: null,
  activeVideo: null,
  selectedCourse: null,

  // Setters (Bisa menerima function (prev => ...) seperti useState bawaan React)
  setCoursesDb: (data) => set({ coursesDb: data }),
  setAllEnrollments: (fn) => set((state) => ({ allEnrollments: typeof fn === 'function' ? fn(state.allEnrollments) : fn })),
  setCheckedInModules: (data) => set({ checkedInModules: data }),
  setCompletedModules: (data) => set({ completedModules: data }),
  setUploadedFiles: (fn) => set((state) => ({ uploadedFiles: typeof fn === 'function' ? fn(state.uploadedFiles) : fn })),
  
  setActiveModule: (fn) => set((state) => ({ activeModule: typeof fn === 'function' ? fn(state.activeModule) : fn })),
  setActiveModuleId: (id) => set({ activeModuleId: id }),
  setActiveVideo: (url) => set({ activeVideo: url }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
}));