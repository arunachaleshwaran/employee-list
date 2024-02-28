import type { EmployeeData } from '../mock-server/EmployeeData.model';
import { useQuery } from 'react-query';

export default function SideBar() {
  const {
    isLoading,
    error,
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
      <h2>Employee List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {employeeList?.map(user => (
            <li key={user.id}>
              {user.name} - {user.manager}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
