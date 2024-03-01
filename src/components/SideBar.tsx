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
      new RegExp(filterValue, 'ui').exec(employee[filterName])
    );
  }, data ?? []);
  const FILTER_TYPE_INDEX = 0,
    FILTER_VALUE_INDEX = 1;
  return (
    <section id='side-bar'>
      <h1>
        <Search
          onComplete={filter => setFilters(pre => [...pre, filter])}
        />
        <Setting />
      </h1>
      <div id='all-filter'>
        {filters.map((filter, index) => (
          <span
            key={`${filter[FILTER_TYPE_INDEX]}${filter[FILTER_VALUE_INDEX]}`}
            className='filter'>
            <span>{filter[FILTER_TYPE_INDEX]}</span>
            <span className='divider'>|</span>
            <span>{filter[FILTER_VALUE_INDEX]}</span>
            <span
              className='close'
              onClick={() =>
                setFilters(pre => pre.filter((_, i) => i !== index))
              }>
              &#10006;
            </span>
          </span>
        ))}
      </div>
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
