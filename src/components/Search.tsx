import type { ChangeEventHandler, KeyboardEventHandler } from 'react';
import { useRef, useState } from 'react';

export const EmployeeFilters = [
  { name: 'name', value: 'Name' },
  { name: 'designation', value: 'Designation' },
  { name: 'team', value: 'Team' },
] as const;
type Filter = [(typeof EmployeeFilters)[number]['name'], string];
export default function Search({
  onComplete,
}: {
  readonly onComplete: (filter: Filter) => void;
}) {
  const [lastFilter, setLastFilter] = useState<Filter | null>(null);
  const selectionRef = useRef<HTMLSelectElement>(null);
  const changeFilter: ChangeEventHandler<
    HTMLSelectElement
  > = event => {
    if (!event.target.value) {
      setLastFilter(null);
      return;
    }
    setLastFilter([event.target.value as Filter[0], '']);
  };
  const changeFilterSearch: ChangeEventHandler<
    HTMLInputElement
  > = event => {
    if (!lastFilter?.[0]) throw new Error('Filter not selected');
    setLastFilter([lastFilter[0], event.target.value]);
  };
  const handleFilterSearch: KeyboardEventHandler = event => {
    if (!lastFilter?.[0]) throw new Error('Filter not selected');
    if (event.key === 'Enter') {
      onComplete(lastFilter);
      setLastFilter(null);
      if (selectionRef.current) selectionRef.current.value = '';
    }
    return true;
  };
  return (
    <>
      <select
        ref={selectionRef}
        value={selectionRef.current?.value ?? ''}
        onChange={changeFilter}>
        <option value='' />
        {EmployeeFilters.map(employeeFilter => (
          <option
            key={employeeFilter.name}
            value={employeeFilter.name}>
            {employeeFilter.value}
          </option>
        ))}
      </select>
      <input
        disabled={!lastFilter}
        type='text'
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        value={lastFilter?.[1] ?? ''}
        onChange={changeFilterSearch}
        onKeyUp={handleFilterSearch}
      />
    </>
  );
}
