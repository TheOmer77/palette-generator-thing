'use client';

import { AccordionListItem } from '@/components/ui/AccordionList';
import { Collapsible } from '@/components/ui/Collapsible';
import { ListItemText } from '@/components/ui/List';
import { RadioGroup } from '@/components/ui/Radio';
import RadioListItem from '@/components/layout/RadioListItem';
import { useCodeGen } from '@/store/useCodeGen';
import { codeFormats, colorFormats } from '@/constants';

export const CodeGenSidebarContent = () => {
  const { format, colorFormat, setFormat, setColorFormat } = useCodeGen();

  return (
    <>
      <RadioGroup
        asChild
        value={format}
        onValueChange={value => setFormat(value as typeof format)}
      >
        <AccordionListItem
          title={
            <ListItemText
              primary='Format'
              secondary={codeFormats[format].displayName}
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
      <Collapsible open={!['none', 'custom'].includes(format)}>
        <RadioGroup
          asChild
          value={colorFormat}
          onValueChange={value => setColorFormat(value as typeof colorFormat)}
        >
          <AccordionListItem
            title={
              <ListItemText
                primary='Color format'
                secondary={colorFormats[colorFormat]?.displayName || 'None'}
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
    </>
  );
};
