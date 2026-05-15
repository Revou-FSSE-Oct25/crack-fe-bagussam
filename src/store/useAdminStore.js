import { create } from 'zustand';

export const useAdminStore = create((set) => ({
  usersDb: [],
  sysSettings: { maintenanceMode: false, emailVerification: true },
  pendingPayments: [],
  totalPlatformRevenue: 245800000,
  instructorEarnings: [
    { id: 'w1', date: '04 May 2026', from: 'Top Student', amount: 500000, type: 'Course Fee', course: 'Fullstack Web Dev' },
    { id: 'w2', date: '02 May 2026', from: 'Rudi Tabuti', amount: 500000, type: 'Course Fee', course: 'Fullstack Web Dev' },
  ],
  certificates: [
    { id: 'cert1', title: 'UI/UX Design Masterclass', date: '15 Feb 2026', code: 'EDU-UIUX-9921' }
  ],
  // --- NEW STATE: WITHDRAWAL HISTORY ---
  withdrawals: [],

  // Setters
  setUsersDb: (data) => set({ usersDb: data }),
  setSysSettings: (fn) => set((state) => ({ sysSettings: typeof fn === 'function' ? fn(state.sysSettings) : fn })),
  setPendingPayments: (data) => set({ pendingPayments: data }),
  setTotalPlatformRevenue: (fn) => set((state) => ({ totalPlatformRevenue: typeof fn === 'function' ? fn(state.totalPlatformRevenue) : fn })),
  
  // --- NEW ACTION ---
  addWithdrawal: (data) => set((state) => ({ withdrawals: [data, ...state.withdrawals] })),
}));