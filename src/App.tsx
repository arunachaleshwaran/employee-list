import './App.scss';
import './mock-server';
import FlowChat from './components/FlowChat';
import SideBar from './components/SideBar';

function App() {
  return (
    <main>
      <SideBar />
      <FlowChat />
    </main>
  );
}

export default App;
