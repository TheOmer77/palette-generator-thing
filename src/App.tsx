import { Main, Sidebar } from 'components/layout';

const App = () => {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
