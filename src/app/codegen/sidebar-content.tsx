'use client';

import { Collapsible } from '@/components/ui/Collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { List, ListItem, ListItemText } from '@/components/ui/List';
import { useCodeGen } from '@/store/useCodeGen';
import { codeFormats, colorFormats } from '@/constants';

export const CodeGenSidebarContent = () => {
  const { format, colorFormat, setFormat, setColorFormat } = useCodeGen();

  return (
    <List>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ListItem>
            <ListItemText
              primary='Format'
              secondary={codeFormats[format].displayName}
            />
          </ListItem>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' align='start'>
          <DropdownMenuRadioGroup
            value={format}
            onValueChange={value => setFormat(value as typeof format)}
          >
            {Object.keys(codeFormats).map(key => (
              <DropdownMenuRadioItem key={key} value={key}>
                {codeFormats[key as keyof typeof codeFormats].displayName}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Collapsible open={!['none', 'custom'].includes(format)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ListItem>
              <ListItemText
                primary='Color format'
                secondary={colorFormats[colorFormat]?.displayName || 'None'}
              />
            </ListItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='right' align='start'>
            <DropdownMenuRadioGroup
              value={colorFormat}
              onValueChange={value =>
                setColorFormat(value as typeof colorFormat)
              }
            >
              {Object.keys(colorFormats).map(key => (
                <DropdownMenuRadioItem key={key} value={key}>
                  {colorFormats[key as keyof typeof colorFormats].displayName}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Collapsible>
    </List>
  );
};
