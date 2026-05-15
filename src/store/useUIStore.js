import { create } from 'zustand';
import { translations } from '../utils/constants';

export const useUIStore = create((set, get) => ({
  darkMode: false,
  lang: 'EN',
  view: 'dashboard',
  isLoading: false,
  
  // Global Alert/Confirm Modal State
  modal: { isOpen: false, title: '', message: '', isConfirm: false, onConfirm: null },

  // Actions
  setDarkMode: (val) => set({ darkMode: val }),
  setLang: (val) => set({ lang: val }),
  setView: (val) => set({ view: val }),
  setIsLoading: (val) => set({ isLoading: val }),
  
  // Global Modal Actions
  showAlert: (title, message) => set({ 
    modal: { isOpen: true, title, message, isConfirm: false, onConfirm: null } 
  }),
  showConfirm: (title, message, onConfirm) => set({ 
    modal: { isOpen: true, title, message, isConfirm: true, onConfirm } 
  }),
  closeModal: () => set((state) => ({ 
    modal: { ...state.modal, isOpen: false } 
  })),

  // Translation Helper
  getText: (key) => {
    const currentLang = get().lang;
    return translations[currentLang][key] || key;
  },

  // State for other form modals
  formModals: {
    isFormCourseOpen: false,
    isFormUserOpen: false,
    isFormModuleOpen: false,
    isFormEditOpen: false,
    isFormEditCourseOpen: false,
    isModuleEditorOpen: false,
    showAddUserPass: false
  },
  setFormModal: (name, isOpen) => set((state) => ({
    formModals: { ...state.formModals, [name]: isOpen }
  })),
}));