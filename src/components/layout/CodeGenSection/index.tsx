import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import {
  AccordionListItem,
  ListItemText,
  ListSubheader,
  RadioGroup,
} from 'components/general';
import RadioListItem from '../BaseColorsSection/RadioListItem';
import { colorFormats } from 'constants';
import { useGlobalState } from 'hooks';

const CodeGenSection = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'>
>((props, ref) => {
  const [{ codeGen }, setGlobalState] = useGlobalState();

  return (
    <section {...props} ref={ref}>
      <ListSubheader
        className='bg-white dark:bg-neutral-900 md:bg-neutral-50
        dark:md:bg-neutral-900'
      >
        Generated code
      </ListSubheader>
      {/* TODO: RadioGroup + actual functionality lol */}
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
      <RadioGroup
        asChild
        value={codeGen.colorFormat}
        onValueChange={newValue =>
          setGlobalState({
            codeGen: {
              ...codeGen,
              colorFormat: newValue as typeof codeGen.colorFormat,
            },
          })
        }
      >
        <AccordionListItem
          title={<ListItemText primary='Color format' secondary='RGB (raw)' />}
          value='codeGen-colorFormat'
        >
          {colorFormats.map(({ id, displayName }) => (
            <RadioListItem key={id} value={id}>
              {displayName}
            </RadioListItem>
          ))}
        </AccordionListItem>
      </RadioGroup>
    </section>
  );
});
CodeGenSection.displayName = 'CodeGenSection';

export default CodeGenSection;
