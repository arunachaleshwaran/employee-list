import { EmployeeList } from './data/EmployeeList';
import { createServer } from 'miragejs';

createServer({
  routes() {
    this.get('/api/users', () => EmployeeList);
    this.post('/api/change-manager', (_, request) => {
      const { employeeId, managerId } = JSON.parse(
        request.requestBody
      ) as { employeeId: string; managerId: string };
      const employee = EmployeeList.find(i => i.id === employeeId);
      if (employee) employee.manager = managerId;
      else throw new Error('Employee not found');
      return { message: 'success' };
    });
  },
});
