import '../style/ReactFlow.scss';
import type { Edge, Node } from 'reactflow';
import ReactFlow, { Background } from 'reactflow';
import type { EmployeeData } from '../data/EmployeeData.model';
import { useQuery } from '@tanstack/react-query';

const getElements = (
  employees: Array<EmployeeData>
): [Array<Node>, Array<Edge>] => {
  const edges: Array<Edge> = [],
    nodes: Array<Node> = [];
  employees.forEach(employee => {
    nodes.push({
      id: employee.id,
      data: { label: employee.name },
      position: { x: 0, y: 0 },
    });
    edges.push({
      id: `${employee.id}-${employee.manager}`,
      source: employee.manager,
      target: employee.id,
    });
  });
  return [nodes, edges];
};
export default function FlowChat() {
  const { data, status } = useQuery<
    unknown,
    Error | null,
    Array<EmployeeData>
  >({ queryKey: ['users'] });
  const [nodes, edges] =
    status === 'success' ? getElements(data) : [[], []];

  return (
    <section>
      <ReactFlow edges={edges} nodes={nodes} nodesConnectable={false}>
        <Background />
      </ReactFlow>
    </section>
  );
}
