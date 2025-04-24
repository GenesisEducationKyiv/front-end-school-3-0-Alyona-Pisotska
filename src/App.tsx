import './index.css';
import { Layout, Toaster } from '@/Components/components.ts';

function App() {
  return (
    <>
      <Layout />
      <Toaster position='bottom-left' richColors />
    </>
  );
}

export default App;
