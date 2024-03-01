import type { EmployeeData } from '../mock-server/EmployeeData.model';
import { Setting } from './Setting';
import { useQuery } from '@tanstack/react-query';

export default function SideBar() {
  const {
    error,
    status,
    data: employeeList,
  } = useQuery<unknown, Error | null, Array<EmployeeData>>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      return response.json();
    },
  });
  return (
    <section id='side-bar'>
      <h1>
        <span className='title'>Employee List</span>
        <Setting />
      </h1>
      {status === 'pending' && <div className='loader' />}
      {status === 'error' && <p>Error: {error?.message}</p>}
      {status === 'success' && (
        <ul>
          {employeeList.map(user => (
            <li key={user.id}>
              <div className='name'>{user.name}</div>
              <div className='designation'>{user.designation}</div>
              <div className='manager'>{user.manager}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
