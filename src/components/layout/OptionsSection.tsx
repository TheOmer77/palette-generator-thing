import { type ComponentProps, forwardRef, useState } from 'react';

import {
  AccordionList,
  AccordionListItem,
  IconButton,
  ListItem,
  ListSubheader,
  Radio,
} from 'components/general';
import { ColorInput } from 'components/colors';
import { useGlobalState } from 'hooks';
import { randomHexColor } from 'utils';
import { RandomIcon } from 'assets/icons';
import type { GlobalState } from 'contexts/globalState';

const ListItemRadio = ({ checked = false }: { checked?: boolean }) => (
  <Radio checked={checked} className='me-4' asChild>
    <span />
  </Radio>
);

const OptionsSection = forwardRef<HTMLElement, ComponentProps<'section'>>(
  (props, ref) => {
    const [{ baseColors }, setGlobalState] = useGlobalState();

    const [openItem, setOpenItem] = useState<
      keyof GlobalState['baseColors'] | null
    >(null);

    return (
      <section {...props} ref={ref}>
        <AccordionList
          value={openItem}
          onValueChange={newValue => setOpenItem(newValue as typeof openItem)}
        >
          <ListSubheader>Base colors</ListSubheader>
          <AccordionListItem value='primary' title='Primary'>
            <div className='p-2'>
              <ColorInput
                id='input-base-color'
                value={baseColors.primary}
                onChange={newColor => {
                  setGlobalState({
                    baseColors: { ...baseColors, primary: newColor },
                  });
                }}
                endAdornment={
                  <IconButton
                    title='Generate random color'
                    onClick={() =>
                      setGlobalState({
                        baseColors: {
                          ...baseColors,
                          primary: randomHexColor(),
                        },
                      })
                    }
                  >
                    <RandomIcon />
                  </IconButton>
                }
              />
            </div>
          </AccordionListItem>
          <AccordionListItem value='neutral' title='Neutral'>
            <ListItem>
              <ListItemRadio checked />
              Auto
            </ListItem>
            <ListItem>
              <ListItemRadio />
              Suggestions
            </ListItem>
            <ListItem>
              <ListItemRadio />
              Custom
            </ListItem>
          </AccordionListItem>
          <AccordionListItem value='danger' title='Danger'>
            <ListItem>
              <ListItemRadio checked />
              Auto
            </ListItem>
            <ListItem>
              <ListItemRadio />
              Suggestions
            </ListItem>
            <ListItem>
              <ListItemRadio />
              Custom
            </ListItem>
          </AccordionListItem>
        </AccordionList>
      </section>
    );
  }
);
OptionsSection.displayName = 'OptionsSection';

export default OptionsSection;
