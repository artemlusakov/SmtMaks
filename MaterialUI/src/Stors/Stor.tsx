// CM421Stor.js
import { create } from "zustand";

interface CompletedTasksState {
  completedTasks: number;
  setCompletedTasks: (value: number) => void;
  fetchCompletedTasks: () => void;
}

interface DataItem {
  datetime: string;
  message: string;
}

export const useCompletedTasks = create<CompletedTasksState>((set) => ({
  completedTasks: 0,
  setCompletedTasks: (value: number) => set({ completedTasks: value }),
  fetchCompletedTasks: async () => {
    try {
      const response = await fetch('./Operate.json');
      const data: DataItem[] = await response.json();
      if (Array.isArray(data)) {
        const pcbRecords = data.filter(item => item.message.includes('[LMEvent::RID_EVENT_PCB]'));
        set({ completedTasks: pcbRecords.length });
      } else {
        console.error('Received data is not an array');
        set({ completedTasks: 0 });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}));
