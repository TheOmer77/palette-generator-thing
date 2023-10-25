import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import {
  AccordionListItem,
  ListItemText,
  ListSubheader,
  RadioGroup,
} from 'components/general';
import RadioListItem from '../RadioListItem';
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
      <RadioGroup
        asChild
        value={codeGen.format}
        onValueChange={newValue =>
          setGlobalState({
            codeGen: {
              ...codeGen,
              format: newValue as typeof codeGen.format,
            },
          })
        }
      >
        <AccordionListItem
          title={
            <ListItemText
              primary='Format'
              secondary={
                codeGen.format === 'css'
                  ? 'CSS variables'
                  : codeGen.format === 'json'
                  ? 'JSON'
                  : codeGen.format === 'custom'
                  ? 'Custom'
                  : 'None'
              }
            />
          }
          value='codeGen-format'
          role='radiogroup'
        >
          <RadioListItem value='none'>None</RadioListItem>
          <RadioListItem value='css'>CSS variables</RadioListItem>
          <RadioListItem value='json'>JSON</RadioListItem>
          <RadioListItem value='custom' disabled>
            Custom
          </RadioListItem>
        </AccordionListItem>
      </RadioGroup>
      {['css', 'json'].includes(codeGen.format) && (
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
            title={
              <ListItemText
                primary='Color format'
                secondary={
                  colorFormats[codeGen.colorFormat]?.displayName || 'None'
                }
              />
            }
            value='codeGen-colorFormat'
          >
            {Object.keys(colorFormats).map(key => (
              <RadioListItem key={key} value={key}>
                {colorFormats[key as keyof typeof colorFormats].displayName}
              </RadioListItem>
            ))}
          </AccordionListItem>
        </RadioGroup>
      )}
    </section>
  );
});
CodeGenSection.displayName = 'CodeGenSection';

export default CodeGenSection;
