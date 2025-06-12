import React, { useState } from 'react';
import { Calendar, Plus, Edit2, Trash2, Users } from 'lucide-react';

const VacationTracker = () => {
  // Sample data with Swedish vacation types
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
    { id: 1, employeeId: 1, weeks: [25, 26, 27], type: 'Semester (Annual Leave)', year: 2025 },
    { id: 2, employeeId: 2, weeks: [30, 31], type: 'Semester (Annual Leave)', year: 2025 },
    { id: 3, employeeId: 3, weeks: [15, 16, 17, 18], type: 'Föräldraledighet (Parental Leave)', year: 2025 }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newVacation, setNewVacation] = useState({
    employeeId: '',
    weeks: '',
    type: vacationTypes[0],
    year: 2025
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
    if (newVacation.employeeId && newVacation.weeks) {
      const weeksArray = newVacation.weeks.split(',').map(w => parseInt(w.trim())).filter(w => w >= 1 && w <= 52);
      if (weeksArray.length > 0) {
        setVacations([...vacations, {
          id: Date.now(),
          employeeId: parseInt(newVacation.employeeId),
          weeks: weeksArray,
          type: newVacation.type,
          year: newVacation.year
        }]);
        setNewVacation({ employeeId: '', weeks: '', type: vacationTypes[0], year: 2025 });
        setShowAddForm(false);
      }
    }
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

  const getEmployeeVacations = (employeeId) => {
    return vacations.filter(v => v.employeeId === employeeId);
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
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Team Vacation Tracker</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Vacation
            </button>
            <button
              onClick={() => setShowEmployeeForm(!showEmployeeForm)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Users className="h-4 w-4" />
              {editingEmployee ? 'Edit Employee' : 'Add Employee'}
            </button>
          </div>
        </div>

        {showEmployeeForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Job Title/Role"
                value={newEmployee.role}
                onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Manager Name"
                value={newEmployee.manager}
                onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Vacation</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={newVacation.employeeId}
                onChange={(e) => setNewVacation({...newVacation, employeeId: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Week numbers (e.g., 25,26,27)"
                value={newVacation.weeks}
                onChange={(e) => setNewVacation({...newVacation, weeks: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={newVacation.type}
                onChange={(e) => setNewVacation({...newVacation, type: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {vacationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
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
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Vacation Calendar - 2025</h2>
                <p className="text-sm text-gray-600 mt-1">Current week: {currentWeek}</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 min-w-[200px]">
                        Employee
                      </th>
                      {getWeeksArray().map(week => (
                        <th key={week} className={`px-2 py-3 text-center text-xs font-medium uppercase tracking-wider min-w-[40px] ${
                          week === currentWeek ? 'bg-yellow-100 text-yellow-800' : 'text-gray-500'
                        }`}>
                          {week}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map(employee => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 sticky left-0 bg-white z-10 border-r border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-xs text-gray-500">{employee.role} • Manager: {employee.manager}</div>
                            </div>
                            <div className="flex gap-1 ml-2">
                              <button
                                onClick={() => handleEditEmployee(employee)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Edit employee"
                              >
                                <Edit2 className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleRemoveEmployee(employee.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Remove employee"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </td>
                        {getWeeksArray().map(week => (
                          <td key={week} className={`px-1 py-3 text-center ${
                            week === currentWeek ? 'bg-yellow-50' : ''
                          }`}>
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
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Vacation Types
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {vacationTypes.map(type => (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${getTypeColor(type).replace('text-', 'bg-').replace('-800', '-500')}`}></div>
                    <span className="text-sm text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Active Vacations</h3>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {vacations.map(vacation => {
                  const employee = employees.find(emp => emp.id === vacation.employeeId);
                  return (
                    <div key={vacation.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{employee?.name}</div>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getTypeColor(vacation.type)}`}>
                          {vacation.type}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Weeks: {vacation.weeks.join(', ')}
                        </div>
                      </div>
                      <button
                        onClick={() => removeVacation(vacation.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
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
  );
};

export default VacationTracker;
