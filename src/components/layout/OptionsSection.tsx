import { type ComponentProps, forwardRef, useState } from 'react';

import {
  AccordionList,
  AccordionListItem,
  Collapsible,
  IconButton,
  ListItem,
  ListSubheader,
  Radio,
} from 'components/general';
import { ColorInput, type ColorInputProps } from 'components/colors';
import { useGlobalState } from 'hooks';
import { getNeutralColor, randomHexColor } from 'utils';
import { RandomIcon } from 'assets/icons';
import type { GlobalState } from 'contexts/globalState';

const ListItemRadio = ({
  checked = false,
  disabled = false,
}: {
  checked?: boolean;
  disabled?: boolean;
}) => (
  <Radio checked={checked} disabled={disabled} className='me-4' asChild>
    <span />
  </Radio>
);

const ColorInputWithRandomBtn = ({
  value,
  onChange,
  ...props
}: ColorInputProps) => (
  <ColorInput
    {...props}
    value={value}
    onChange={onChange}
    endAdornment={
      <IconButton
        title='Generate random color'
        onClick={() => onChange?.(randomHexColor())}
      >
        <RandomIcon />
      </IconButton>
    }
  />
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
              <ColorInputWithRandomBtn
                id='input-primary-color'
                value={baseColors.primary}
                onChange={newColor => {
                  setGlobalState({
                    baseColors: { ...baseColors, primary: newColor },
                  });
                }}
              />
            </div>
          </AccordionListItem>
          <AccordionListItem value='neutral' title='Neutral'>
            <ListItem
              onClick={() =>
                setGlobalState({
                  baseColors: {
                    ...baseColors,
                    neutral: undefined,
                  },
                })
              }
            >
              <ListItemRadio
                checked={typeof baseColors.neutral === 'undefined'}
              />
              Auto
            </ListItem>
            {/* TODO: Remove disabled once implemented */}
            <ListItem disabled>
              <ListItemRadio disabled />
              Suggestions
            </ListItem>
            <ListItem
              onClick={() =>
                setGlobalState({
                  baseColors: {
                    ...baseColors,
                    neutral: getNeutralColor(baseColors.primary),
                  },
                })
              }
            >
              {/* TODO: && baseColors.neutral is not a suggestion name */}
              <ListItemRadio checked={typeof baseColors.neutral === 'string'} />
              Custom
            </ListItem>
            <Collapsible
              open={typeof baseColors.neutral === 'string'}
              className='p-2'
            >
              <ColorInputWithRandomBtn
                id='input-neutral-color'
                value={baseColors.neutral || ''}
                onChange={newColor => {
                  setGlobalState({
                    baseColors: { ...baseColors, neutral: newColor },
                  });
                }}
              />
            </Collapsible>
          </AccordionListItem>
          <AccordionListItem value='danger' title='Danger'>
            <ListItem>
              <ListItemRadio
                checked={typeof baseColors.danger === 'undefined'}
              />
              Auto
            </ListItem>
            {/* TODO: Remove disabled once implemented */}
            <ListItem disabled>
              <ListItemRadio disabled />
              Suggestions
            </ListItem>
            {/* TODO: Remove disabled once implemented */}
            <ListItem disabled>
              <ListItemRadio disabled />
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
