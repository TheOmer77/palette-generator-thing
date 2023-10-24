import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import {
  AccordionListItem,
  ListItemText,
  ListSubheader,
} from 'components/general';
import RadioListItem from '../BaseColorsSection/RadioListItem';

const CodeGenSection = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'>
>((props, ref) => {
  // TODO: Actual functionality lol
  return (
    <section {...props} ref={ref}>
      <ListSubheader
        className='bg-white dark:bg-neutral-900 md:bg-neutral-50
dark:md:bg-neutral-900'
      >
        Generated code
      </ListSubheader>
      <AccordionListItem
        title={<ListItemText primary='Format' secondary='CSS variables' />}
        value='codeGen-format'
        role='radiogroup'
      >
        <RadioListItem disabled>None</RadioListItem>
        <RadioListItem checked>CSS variables</RadioListItem>
        <RadioListItem disabled>JSON</RadioListItem>
        <RadioListItem disabled>Custom</RadioListItem>
      </AccordionListItem>
      {/* TODO: Show codeGen-colorFormat only if codeGen-format isn't None of Custom */}
      <AccordionListItem
        title={<ListItemText primary='Color format' secondary='RGB (raw)' />}
        value='codeGen-colorFormat'
        role='radiogroup'
      >
        <RadioListItem disabled>Hex</RadioListItem>
        <RadioListItem disabled>RGB</RadioListItem>
        <RadioListItem checked>RGB (raw)</RadioListItem>
        <RadioListItem disabled>HSL</RadioListItem>
        <RadioListItem disabled>HSL (raw)</RadioListItem>
        <RadioListItem disabled>LCH</RadioListItem>
        <RadioListItem disabled>LCH (raw)</RadioListItem>
        <RadioListItem disabled>OKLCH</RadioListItem>
        <RadioListItem disabled>OKLCH (raw)</RadioListItem>
      </AccordionListItem>
    </section>
  );
});
CodeGenSection.displayName = 'CodeGenSection';

export default CodeGenSection;
