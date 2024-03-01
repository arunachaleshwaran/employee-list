import { EmployeeList } from './data/EmployeeList';
import { createServer } from 'miragejs';

createServer({
  routes() {
    this.get('/api/users', () => EmployeeList);
  },
});
