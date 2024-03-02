import './App.scss';
import './mock-server';
import FlowChat from './components/FlowChat';
import { ReactFlowProvider } from 'reactflow';
import SideBar from './components/SideBar';

function App() {
  return (
    <main>
      <SideBar />
      <ReactFlowProvider>
        <FlowChat />
      </ReactFlowProvider>
    </main>
  );
}

export default App;
