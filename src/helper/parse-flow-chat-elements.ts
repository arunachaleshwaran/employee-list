import type { Edge, Node } from 'reactflow';
import type { EmployeeData } from '../data/EmployeeData.model';

export default function parseFlowChatElements(
  employees: Array<EmployeeData>
): [Array<Node>, Array<Edge>] {
  const edges: Array<Edge> = [],
    nodes: Array<Node> = [];
  employees.forEach(employee => {
    nodes.push({
      id: employee.id,
      data: { label: employee.name },
      position: { x: 0, y: 0 },
    });
    if (employee.manager)
      edges.push({
        id: `${employee.id}-${employee.manager}`,
        source: employee.manager,
        target: employee.id,
      });
  });
  return [nodes, edges];
}
