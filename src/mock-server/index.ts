import { EmployeeList } from './EmployeeList';
import { createServer } from 'miragejs';

createServer({
  routes() {
    this.get('/api/users', () => EmployeeList);
  },
});
