import {
  AccordionListItem,
  ListItemText,
  ListSubheader,
} from 'components/general';
import RadioListItem from '../BaseColorsSection/RadioListItem';

const GeneratedCodeSection = () => {
  // TODO: Actual functionality lol
  return (
    <section>
      <ListSubheader
        className='bg-white dark:bg-neutral-900 md:bg-neutral-50
dark:md:bg-neutral-900'
      >
        Generated code
      </ListSubheader>
      <AccordionListItem
        title={<ListItemText primary='Format' secondary='CSS variables' />}
        value='code-format'
        role='radiogroup'
      >
        <RadioListItem disabled>None</RadioListItem>
        <RadioListItem checked>CSS variables</RadioListItem>
        <RadioListItem disabled>JSON</RadioListItem>
        <RadioListItem disabled>Custom</RadioListItem>
      </AccordionListItem>
      {/* TODO: Show code-colors only if code-format isn't None of Custom */}
      <AccordionListItem
        title={<ListItemText primary='Color format' secondary='RGB (raw)' />}
        value='code-colors'
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
};

export default GeneratedCodeSection;
