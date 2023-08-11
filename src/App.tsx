import { Main, Options } from 'components/layout';

const App = () => {
  return (
    <div
      className='md:grid
md:grid-cols-[min(50vw,25rem),max(50vw,calc(100vw-25rem))]'
    >
      <Options />
      <Main />
    </div>
  );
};

export default App;
