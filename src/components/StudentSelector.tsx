import { useStudent } from '../contexts/StudentContext';

export default function StudentSelector() {
  const { students, activeStudent, setActiveStudentId } = useStudent();

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {students.map(student => {
        const isActive = student.id === activeStudent.id;
        return (
          <button
            key={student.id}
            onClick={() => setActiveStudentId(student.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm
              transition-all duration-200 whitespace-nowrap border-2
              ${isActive
                ? 'text-white shadow-md scale-105'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
              }
            `}
            style={isActive ? { backgroundColor: student.color, borderColor: student.color } : {}}
          >
            <span className="text-lg">{student.avatar}</span>
            <span>{student.name}</span>
            <span className="text-xs opacity-80">
              {student.grade}年生
            </span>
            {isActive && (
              <span className="ml-1 bg-white bg-opacity-30 rounded-full px-1.5 py-0.5 text-xs">
                {student.totalPoints}pt
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
