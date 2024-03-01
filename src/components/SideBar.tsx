import type { EmployeeData } from '../data/EmployeeData.model';
import type { EmployeeFilters } from './Search';
import Search from './Search';
import Setting from './Setting';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SideBar() {
  const { error, status, data } = useQuery<
    unknown,
    Error | null,
    Array<EmployeeData>
  >({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      return response.json();
    },
  });
  type Filter = Array<
    [(typeof EmployeeFilters)[number]['name'], string]
  >;
  const [filters, setFilters] = useState<Filter>([]);
  const employeeList = filters.reduce((empList, eachFilter) => {
    const [filterName, filterValue] = eachFilter;
    return empList.filter(employee =>
      employee[filterName].match(filterValue)
    );
  }, data ?? []);
  return (
    <section id='side-bar'>
      <h1>
        <Search
          onComplete={filter => setFilters(pre => [...pre, filter])}
        />
        <Setting />
      </h1>
      <section>
        {filters.map(filter => (
          <li key={`${filter[0]}${filter[1]}`}>
            <span>{filter[0]}:</span>
            <span>{filter[1]}</span>
          </li>
        ))}
      </section>
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
