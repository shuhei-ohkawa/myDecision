import { createContext, useContext, useState, type ReactNode } from 'react';
import { students, type Student } from '../data/students';

interface StudentContextType {
  students: Student[];
  activeStudent: Student;
  setActiveStudentId: (id: string) => void;
}

const StudentContext = createContext<StudentContextType | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [activeStudentId, setActiveStudentId] = useState(students[0].id);

  const activeStudent = students.find(s => s.id === activeStudentId) ?? students[0];

  return (
    <StudentContext.Provider value={{ students, activeStudent, setActiveStudentId }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudent must be used within StudentProvider');
  return ctx;
}
