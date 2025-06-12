<div className="space-y-6">
              <div className="bg-grayconst { useState } = React;

// Icon components using SVG
const CalendarIcon = () => (
  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const UsersIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const EditIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const VacationTracker = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Anna Andersson', role: 'Developer', manager: 'Lars Nilsson' },
    { id: 2, name: 'Erik Johansson', role: 'Designer', manager: 'Lars Nilsson' },
    { id: 3, name: 'Maria Lindberg', role: 'Developer', manager: 'Lars Nilsson' },
    { id: 4, name: 'Lars Nilsson', role: 'Manager', manager: 'CEO' },
    { id: 5, name: 'Sofia Karlsson', role: 'QA Engineer', manager: 'Lars Nilsson' }
  ]);

  const vacationTypes = [
    'Semester (Annual Leave)',
    'Föräldraledighet (Parental Leave)',
    'Sjukfrånvaro (Sick Leave)',
    'VAB (Care of Sick Child)',
    'Kompledighet (Comp Time)',
    'Studieledighet (Study Leave)',
    'Pappaledighet (Paternity Leave)',
    'Mammaledighet (Maternity Leave)'
  ];

  const [vacations, setVacations] = useState([
    { id: 1, employeeId: 1, weeks: [25, 26, 27], type: 'Semester (Annual Leave)', year: 2025, description: 'Summer vacation in Greece' },
    { id: 2, employeeId: 2, weeks: [30, 31], type: 'Semester (Annual Leave)', year: 2025, description: 'Family time' },
    { id: 3, employeeId: 3, weeks: [15, 16, 17, 18], type: 'Föräldraledighet (Parental Leave)', year: 2025, description: 'Newborn care' }
  ]);

  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const [newVacation, setNewVacation] = useState({
    employeeId: '',
    weeks: '',
    type: vacationTypes[0],
    year: 2025,
    description: ''
  });
  
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    manager: ''
  });

  const currentWeek = Math.ceil((new Date().getTime() - new Date(2025, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));

  const getWeeksArray = () => {
    const weeks = [];
    for (let i = 1; i <= 52; i++) {
      weeks.push(i);
    }
    return weeks;
  };

  const handleAddVacation = () => {
    const weeksToUse = selectedWeeks.length > 0 ? selectedWeeks : 
                      (newVacation.weeks ? newVacation.weeks.split(',').map(w => parseInt(w.trim())).filter(w => w >= 1 && w <= 52) : []);
    
    if (newVacation.employeeId && weeksToUse.length > 0) {
      setVacations([...vacations, {
        id: Date.now(),
        employeeId: parseInt(newVacation.employeeId),
        weeks: weeksToUse,
        type: newVacation.type,
        year: newVacation.year,
        description: newVacation.description || ''
      }]);
      setNewVacation({ employeeId: '', weeks: '', type: vacationTypes[0], year: 2025, description: '' });
      setSelectedWeeks([]);
      setShowAddForm(false);
    }
  };

  const handleWeekClick = (week) => {
    if (!isSelecting) return;
    
    setSelectedWeeks(prev => {
      if (prev.includes(week)) {
        return prev.filter(w => w !== week);
      } else {
        return [...prev, week].sort((a, b) => a - b);
      }
    });
  };

  const getWeekRange = (weeks) => {
    if (!weeks || weeks.length === 0) return '';
    if (weeks.length === 1) return `Week ${weeks[0]}`;
    
    const sorted = [...weeks].sort((a, b) => a - b);
    const ranges = [];
    let start = sorted[0];
    let end = sorted[0];
    
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === end + 1) {
        end = sorted[i];
      } else {
        ranges.push(start === end ? `${start}` : `${start}-${end}`);
        start = end = sorted[i];
      }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    
    return `Week${ranges.length > 1 ? 's' : ''} ${ranges.join(', ')}`;
  };

  const getDateRange = (weeks) => {
    if (!weeks || weeks.length === 0) return '';
    
    const getDateFromWeek = (week) => {
      const jan1 = new Date(2025, 0, 1);
      const days = (week - 1) * 7;
      const date = new Date(jan1.getTime() + days * 24 * 60 * 60 * 1000);
      return date;
    };
    
    const sorted = [...weeks].sort((a, b) => a - b);
    const startDate = getDateFromWeek(sorted[0]);
    const endDate = getDateFromWeek(sorted[sorted.length - 1] + 1);
    endDate.setDate(endDate.getDate() - 1); // End of week
    
    const formatDate = (date) => {
      return date.toLocaleDateString('sv-SE', { 
        month: 'short', 
        day: 'numeric' 
      });
    };
    
    if (sorted.length === 1) {
      return formatDate(startDate);
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.role) {
      setEmployees([...employees, {
        id: Date.now(),
        name: newEmployee.name,
        role: newEmployee.role,
        manager: newEmployee.manager || 'N/A'
      }]);
      setNewEmployee({ name: '', role: '', manager: '' });
      setShowEmployeeForm(false);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee({
      name: employee.name,
      role: employee.role,
      manager: employee.manager
    });
    setShowEmployeeForm(true);
  };

  const handleUpdateEmployee = () => {
    if (editingEmployee && newEmployee.name && newEmployee.role) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id 
          ? { ...emp, name: newEmployee.name, role: newEmployee.role, manager: newEmployee.manager || 'N/A' }
          : emp
      ));
      setEditingEmployee(null);
      setNewEmployee({ name: '', role: '', manager: '' });
      setShowEmployeeForm(false);
    }
  };

  const handleRemoveEmployee = (employeeId) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
    setVacations(vacations.filter(v => v.employeeId !== employeeId));
  };

  const removeVacation = (id) => {
    setVacations(vacations.filter(v => v.id !== id));
  };

  const isWeekOff = (employeeId, week) => {
    return vacations.some(v => v.employeeId === employeeId && v.weeks.includes(week));
  };

  const getVacationTypeForWeek = (employeeId, week) => {
    const vacation = vacations.find(v => v.employeeId === employeeId && v.weeks.includes(week));
    return vacation ? vacation.type : '';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Semester (Annual Leave)': 'bg-blue-100 text-blue-800',
      'Föräldraledighet (Parental Leave)': 'bg-pink-100 text-pink-800',
      'Sjukfrånvaro (Sick Leave)': 'bg-red-100 text-red-800',
      'VAB (Care of Sick Child)': 'bg-orange-100 text-orange-800',
      'Kompledighet (Comp Time)': 'bg-green-100 text-green-800',
      'Studieledighet (Study Leave)': 'bg-purple-100 text-purple-800',
      'Pappaledighet (Paternity Leave)': 'bg-cyan-100 text-cyan-800',
      'Mammaledighet (Maternity Leave)': 'bg-rose-100 text-rose-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjgiIGN5PSIxNiIgcj0iOCIgZmlsbD0iIzAwMCIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMTYiIHI9IjYiIGZpbGw9IiMwMDAiLz48dGV4dCB4PSI0MCIgeT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwMDAiPlZveWFkbzwvdGV4dD48L3N2Zz4="
                alt="Voyado" 
                className="h-10"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">Team Vacation Tracker</h1>
                <p className="text-gray-400 text-sm mt-1">Manage team availability and time off</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsSelecting(!isSelecting);
                  setSelectedWeeks([]);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isSelecting 
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                📅 {isSelecting ? 'Stop Selecting' : 'Select Dates'}
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon />
                Add Vacation
              </button>
              <button
                onClick={() => setShowEmployeeForm(!showEmployeeForm)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <UsersIcon />
                {editingEmployee ? 'Edit Employee' : 'Add Employee'}
              </button>
            </div>
          </div>

          {isSelecting && selectedWeeks.length > 0 && (
            <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
              <p className="text-yellow-100">
                Selected weeks: {selectedWeeks.join(', ')} ({getDateRange(selectedWeeks)})
                <button 
                  onClick={() => setSelectedWeeks([])}
                  className="ml-4 text-yellow-300 hover:text-yellow-100"
                >
                  Clear selection
                </button>
              </p>
            </div>
          )}

          {showEmployeeForm && (
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Job Title/Role"
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Manager Name"
                  value={newEmployee.manager}
                  onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <button
                    onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1"
                  >
                    {editingEmployee ? 'Update' : 'Add'}
                  </button>
                  {editingEmployee && (
                    <button
                      onClick={() => {
                        setEditingEmployee(null);
                        setNewEmployee({ name: '', role: '', manager: '' });
                        setShowEmployeeForm(false);
                      }}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {showAddForm && (
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Add New Vacation</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <select
                  value={newVacation.employeeId}
                  onChange={(e) => setNewVacation({...newVacation, employeeId: e.target.value})}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Week numbers (e.g., 25,26,27)"
                  value={selectedWeeks.length > 0 ? selectedWeeks.join(',') : newVacation.weeks}
                  onChange={(e) => setNewVacation({...newVacation, weeks: e.target.value})}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={selectedWeeks.length > 0}
                />
                <select
                  value={newVacation.type}
                  onChange={(e) => setNewVacation({...newVacation, type: e.target.value})}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {vacationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newVacation.description}
                  onChange={(e) => setNewVacation({...newVacation, description: e.target.value})}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddVacation}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
                  <h2 className="text-xl font-semibold text-white">Vacation Calendar - 2025</h2>
                  <p className="text-gray-300 text-sm mt-1">Current week: {currentWeek}</p>
                  {isSelecting && (
                    <p className="text-yellow-300 text-sm mt-1">🖱️ Click on week numbers to select dates</p>
                  )}
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sticky left-0 bg-gray-700 z-10 min-w-[200px]">
                          Employee
                        </th>
                        {getWeeksArray().map(week => (
                          <th 
                            key={week} 
                            className={`px-2 py-3 text-center text-xs font-medium uppercase tracking-wider min-w-[40px] cursor-pointer transition-colors ${
                              week === currentWeek ? 'bg-yellow-600 text-white' : 
                              selectedWeeks.includes(week) ? 'bg-blue-600 text-white' :
                              isSelecting ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-400'
                            }`}
                            onClick={() => handleWeekClick(week)}
                          >
                            {week}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {employees.map(employee => (
                        <tr key={employee.id} className="hover:bg-gray-700">
                          <td className="px-4 py-3 sticky left-0 bg-gray-800 z-10 border-r border-gray-700">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm font-medium text-white">{employee.name}</div>
                                <div className="text-xs text-gray-400">{employee.role} • Manager: {employee.manager}</div>
                              </div>
                              <div className="flex gap-1 ml-2">
                                <button
                                  onClick={() => handleEditEmployee(employee)}
                                  className="text-blue-400 hover:text-blue-300 p-1"
                                  title="Edit employee"
                                >
                                  <EditIcon />
                                </button>
                                <button
                                  onClick={() => handleRemoveEmployee(employee.id)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                  title="Remove employee"
                                >
                                  <TrashIcon />
                                </button>
                              </div>
                            </div>
                          </td>
                          {getWeeksArray().map(week => (
                            <td 
                              key={week} 
                              className={`px-1 py-3 text-center ${
                                week === currentWeek ? 'bg-yellow-900' : ''
                              }`}
                            >
                              {isWeekOff(employee.id, week) && (
                                <div className={`w-6 h-6 rounded-full mx-auto ${
                                  getTypeColor(getVacationTypeForWeek(employee.id, week)).replace('text-', 'bg-').replace('-800', '-500')
                                }`} title={getVacationTypeForWeek(employee.id, week)}>
                                </div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <UsersIcon />
                    Vacation Types
                  </h3>
                </div>
                <div className="p-4 space-y-2">
                  {vacationTypes.map(type => (
                    <div key={type} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${getTypeColor(type).replace('text-', 'bg-').replace('-800', '-500')}`}></div>
                      <span className="text-sm text-gray-300">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white">Active Vacations</h3>
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {vacations.map(vacation => {
                    const employee = employees.find(emp => emp.id === vacation.employeeId);
                    return (
                      <div key={vacation.id} className="flex items-start justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-white">{employee?.name}</div>
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getTypeColor(vacation.type)}`}>
                            {vacation.type}
                          </div>
                          <div className="text-sm text-gray-300 mt-1">
                            {getWeekRange(vacation.weeks)} ({getDateRange(vacation.weeks)})
                          </div>
                          {vacation.description && (
                            <div className="text-sm text-gray-400 mt-1 italic">
                              "{vacation.description}"
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeVacation(vacation.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    );
                  })}
                  {vacations.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No vacations scheduled</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<VacationTracker />, document.getElementById('root'));
