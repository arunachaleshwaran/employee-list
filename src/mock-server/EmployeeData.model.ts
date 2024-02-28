export type EmployeeData = {
  id: string;
  name: string;
  designation: string;
  team: string;
  manager: EmployeeData['id'];
};
