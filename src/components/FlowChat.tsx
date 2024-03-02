import '../style/ReactFlow.scss';
import ReactFlow, { Background, ConnectionLineType } from 'reactflow';
import type { EmployeeData } from '../data/EmployeeData.model';
import arrangeFlowChatElements from '../helper/arrange-flow-chat-elements';
import parseFlowChatElements from '../helper/parse-flow-chat-elements';
import { useQuery } from '@tanstack/react-query';

export default function FlowChat() {
  const { data, status } = useQuery<
    unknown,
    Error | null,
    Array<EmployeeData>
  >({ queryKey: ['users'] });
  const [nodes, edges] =
    status === 'success'
      ? arrangeFlowChatElements(...parseFlowChatElements(data))
      : [[], []];

  return (
    <section>
      <ReactFlow
        connectionLineType={ConnectionLineType.SmoothStep}
        edges={edges}
        nodes={nodes}
        nodesConnectable={false}
        fitView>
        <Background />
      </ReactFlow>
    </section>
  );
}
