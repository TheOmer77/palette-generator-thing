'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import RadioListItem from '../RadioListItem';
import {
  AccordionListItem,
  Collapsible,
  ListItemText,
  ListSubheader,
  RadioGroup,
} from '@/components/general';
import { useGlobalState } from '@/hooks';
import { codeFormats, colorFormats } from '@/constants';

export const CodeGenSection = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'>
>((props, ref) => {
  const [{ codeGen }, setGlobalState] = useGlobalState();

  return (
    <section {...props} ref={ref}>
      <ListSubheader
        className='bg-white md:bg-neutral-50 dark:bg-neutral-900
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
              secondary={codeFormats[codeGen.format].displayName}
            />
          }
          value='codeGen-format'
          role='radiogroup'
        >
          {Object.keys(codeFormats).map(key => (
            <RadioListItem key={key} value={key} disabled={key === 'custom'}>
              {codeFormats[key as keyof typeof codeFormats].displayName}
            </RadioListItem>
          ))}
        </AccordionListItem>
      </RadioGroup>
      <Collapsible open={!['none', 'custom'].includes(codeGen.format)}>
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
      </Collapsible>
    </section>
  );
});
CodeGenSection.displayName = 'CodeGenSection';
