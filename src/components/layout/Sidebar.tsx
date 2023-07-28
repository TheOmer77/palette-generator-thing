import Input from 'components/general/Input';

const Sidebar = () => {
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
          startAdornment={<div className='h-7 w-7 rounded-lg bg-blue-600' />}
        />
      </section>
    </aside>
  );
};

export default Sidebar;
