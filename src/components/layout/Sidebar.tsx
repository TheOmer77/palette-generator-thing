import Header from './Header';
import { IconButton, Input } from 'components/general';
import useGlobalState from 'hooks/useGlobalState';
import { randomHexColor } from 'utils/colorUtils';
import { ReactComponent as RandomIcon } from 'assets/icons/random.svg';

const Sidebar = () => {
  const [globalState, setGlobalState] = useGlobalState();

  return (
    <aside
      className='fixed bottom-0 z-10 flex w-screen flex-col gap-4 bg-slate-200
      p-2 dark:bg-slate-900 md:static md:h-screen md:w-[25rem]'
    >
      <Header className='hidden md:block' />
      <section>
        <Input
          id='input-base-color'
          label='Base color'
          value={globalState.baseColor}
          onChange={e => setGlobalState({ baseColor: e.target.value })}
          startAdornment={
            <div
              className='h-7 w-7 rounded-lg'
              style={{ backgroundColor: globalState.baseColor }}
            />
          }
          endAdornment={
            <IconButton
              title='Generate random color'
              onClick={() => setGlobalState({ baseColor: randomHexColor() })}
            >
              <RandomIcon />
            </IconButton>
          }
        />
      </section>
    </aside>
  );
};

export default Sidebar;
