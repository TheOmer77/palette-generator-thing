export type PalettePreviewProps = {
  palette: string[];
};

export const PalettePreview = ({ palette }: PalettePreviewProps) => (
  <div
    className='mx-4 mb-4 grid h-12 shrink-0 grid-cols-11 overflow-hidden
rounded-lg'
  >
    {palette.map((backgroundColor, index) => (
      <span
        key={index}
        style={{ backgroundColor }}
        className='transition-[background-color]'
      />
    ))}
  </div>
);
