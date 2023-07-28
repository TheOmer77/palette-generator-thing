import { IconButton, Input } from 'components/general';
import useGlobalState from 'hooks/useGlobalState';
import { randomHexColor } from 'utils/colorUtils';
import { ReactComponent as RandomIcon } from 'assets/icons/random.svg';

const Sidebar = () => {
  const [globalState, setGlobalState] = useGlobalState();

  return (
    <aside
      className='flex h-screen w-[25rem] flex-col gap-4
      border-e border-slate-300 bg-slate-100 p-2'
    >
      <section>
        <h1
          className='select-none text-6xl font-bold uppercase
          leading-[3.25rem] tracking-tighter text-blue-600'
        >
          Palette generator thing
        </h1>
      </section>
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
