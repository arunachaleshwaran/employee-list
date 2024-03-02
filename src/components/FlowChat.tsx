import '../style/ReactFlow.scss';
import type { Node, NodeDragHandler } from 'reactflow';
import ReactFlow, {
  Background,
  ConnectionLineType,
  useEdgesState,
  useNodesState,
  useStoreApi,
} from 'reactflow';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { EmployeeData } from '../data/EmployeeData.model';
import arrangeFlowChatElements from '../helper/arrange-flow-chat-elements';
import parseFlowChatElements from '../helper/parse-flow-chat-elements';
import { useEffect } from 'react';

function useCalculatedElements(data: Array<EmployeeData>) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]),
    [edges, setEdges, onEdgesChange] = useEdgesState([]);
  useEffect(() => {
    const [initialNodes, initialEdges] = arrangeFlowChatElements(
      ...parseFlowChatElements(data)
    );
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [data, setNodes, setEdges]);
  return [nodes, edges, onNodesChange, onEdgesChange] as const;
}
export default function FlowChat() {
  const { data } = useQuery<
      unknown,
      Error | null,
      Array<EmployeeData>
    >({ queryKey: ['users'] }),
    queryClient = useQueryClient();
  const [nodes, edges, onNodesChange, onEdgesChange] =
      useCalculatedElements(data ?? []),
    store = useStoreApi();
  const getClosestLead = (node: Node): Node => {
    const { nodeInternals } = store.getState();
    const storeNodes = Array.from(nodeInternals.values()).filter(
      i => i.draggable === false
    );
    type ClosestNode = { node: Node; distance: number };
    const closestNode: ClosestNode = storeNodes.reduce<ClosestNode>(
      (minNode: ClosestNode, currNode: Node) => {
        const SQUARE_CONSTANT = 2;
        const distance = Math.sqrt(
          (node.position.x - currNode.position.x) ** SQUARE_CONSTANT +
            (node.position.y - currNode.position.y) ** SQUARE_CONSTANT
        );
        return distance < minNode.distance
          ? { node: currNode, distance }
          : minNode;
      },
      {
        node: storeNodes[0],
        distance: Number.MAX_VALUE,
      }
    );
    return closestNode.node;
  };
  const onNodeDrag: NodeDragHandler = (_, node) => {
    const closestLead = getClosestLead(node);
    const newEdge = {
      id: `${closestLead.id}-${node.id}`,
      source: closestLead.id,
      target: node.id,
      animated: true,
    };
    const { edges: currentEdges } = store.getState();
    const removeEdge = currentEdges
      .filter(i => i.animated)
      .map(i => ({ type: 'remove', id: i.id }) as const);
    if (
      currentEdges
        .filter(i => !(i.animated ?? false))
        .some(i => i.id === newEdge.id)
    )
      onEdgesChange([...removeEdge]);
    else
      onEdgesChange([{ type: 'add', item: newEdge }, ...removeEdge]);
  };
  const sendChangeManagerRequest = async (
    employeeId: string,
    managerId: string
  ) => {
    const response = await fetch('/api/change-manager', {
      method: 'POST',
      body: JSON.stringify({
        employeeId,
        managerId,
      }),
    });
    await response.json();
    await queryClient.invalidateQueries(['users']);
  };
  const onNodeDragStop: NodeDragHandler = (_, node) => {
    const closestLead = getClosestLead(node);
    const newEdge = {
      id: `${closestLead.id}-${node.id}`,
      source: closestLead.id,
      target: node.id,
    };
    const { edges: currentEdges } = store.getState();
    const removeEdge = currentEdges
      .filter(i => i.target === node.id)
      .map(i => ({ type: 'remove', id: i.id }) as const);
    onEdgesChange([{ type: 'add', item: newEdge }, ...removeEdge]);
    void sendChangeManagerRequest(node.id, closestLead.id);
  };
  return (
    <section>
      <ReactFlow
        connectionLineType={ConnectionLineType.Step}
        edges={edges}
        nodes={nodes}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
        fitView
        onEdgesChange={onEdgesChange}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onNodesChange={onNodesChange}>
        <Background />
      </ReactFlow>
    </section>
  );
}
