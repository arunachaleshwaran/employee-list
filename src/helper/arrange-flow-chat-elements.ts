import { type Edge, type Node, Position } from 'reactflow';

import dagre, { graphlib } from '@dagrejs/dagre';

const dagreGraph = new graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
export default function arrangeFlowChatElements(
  nodes: Array<Node>,
  edges: Array<Edge>
): [Array<Node>, Array<Edge>] {
  if (nodes.length === 0) {
    return [nodes, edges] as const;
  }
  const DIVIDE_INTO_HALF = 2,
    nodeHeight = 36,
    nodeWidth = 172;
  dagreGraph.setGraph({ rankdir: 'TB' });
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });
  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);
  nodes.forEach(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top;
    node.sourcePosition = Position.Bottom;
    node.position = {
      x: nodeWithPosition.x - nodeWidth / DIVIDE_INTO_HALF,
      y: nodeWithPosition.y - nodeHeight / DIVIDE_INTO_HALF,
    };
  });
  return [nodes, edges] as const;
}
