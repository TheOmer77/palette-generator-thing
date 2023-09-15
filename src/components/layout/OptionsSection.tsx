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
import {
  getDangerColor,
  getNeutralColor,
  isHexColorLight,
  randomHexColor,
} from 'utils';
import { DoneIcon, RandomIcon } from 'assets/icons';
import type { GlobalState } from 'contexts/globalState';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
  neutralColorSuggestionNames,
  neutralColorSuggestions,
  type ColorSuggestions,
  type DangerColorSuggestion,
  type NeutralColorSuggestion,
} from 'constants/colorSuggestions';

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
  <div className='p-2'>
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
  </div>
);

const ColorSuggestionsBox = <T extends ColorSuggestions>({
  baseColor,
  colorSuggestions,
  selectedSuggestion,
  onSuggestionSelect,
}: {
  baseColor: string;
  colorSuggestions: T;
  selectedSuggestion?: keyof T;
  onSuggestionSelect?: (suggestionName: keyof T) => void;
}) => (
  <div className='flex flex-row flex-wrap gap-2 py-2 pe-4 ps-[3.25rem]'>
    {Object.keys(colorSuggestions).map(suggestionName => {
      const color = colorSuggestions[suggestionName as keyof T]?.(baseColor);
      return (
        <IconButton
          key={suggestionName}
          className={isHexColorLight(color) ? 'text-black' : 'text-white'}
          style={{ backgroundColor: color }}
          onClick={() => onSuggestionSelect?.(suggestionName)}
        >
          {selectedSuggestion === suggestionName && <DoneIcon />}
        </IconButton>
      );
    })}
  </div>
);

const OptionsSection = forwardRef<HTMLElement, ComponentProps<'section'>>(
  (props, ref) => {
    const [{ baseColors }, setGlobalState] = useGlobalState();

    const [openItem, setOpenItem] = useState<
      keyof GlobalState['baseColors'] | null
    >(null);

    const neutralIsAuto = typeof baseColors.neutral === 'undefined',
      neutralIsSuggestion =
        typeof baseColors.neutral === 'string' &&
        neutralColorSuggestionNames.includes(baseColors.neutral),
      neutralIsCustom =
        typeof baseColors.neutral === 'string' &&
        !neutralColorSuggestionNames.includes(baseColors.neutral);
    const dangerIsAuto = typeof baseColors.danger === 'undefined',
      dangerIsSuggestion =
        typeof baseColors.danger === 'string' &&
        dangerColorSuggestionNames.includes(baseColors.danger),
      dangerIsCustom =
        typeof baseColors.danger === 'string' &&
        !dangerColorSuggestionNames.includes(baseColors.danger);

    return (
      <section {...props} ref={ref}>
        <AccordionList
          value={openItem}
          onValueChange={newValue => setOpenItem(newValue as typeof openItem)}
        >
          <ListSubheader>Base colors</ListSubheader>
          <AccordionListItem value='primary' title='Primary'>
            <ColorInputWithRandomBtn
              id='input-primary-color'
              value={baseColors.primary}
              onChange={newColor => {
                setGlobalState({
                  baseColors: { ...baseColors, primary: newColor },
                });
              }}
            />
          </AccordionListItem>

          <AccordionListItem value='neutral' title='Neutral'>
            <ListItem
              onClick={() =>
                !neutralIsAuto &&
                setGlobalState({
                  baseColors: { ...baseColors, neutral: undefined },
                })
              }
            >
              <ListItemRadio checked={neutralIsAuto} />
              Auto
            </ListItem>
            <ListItem
              onClick={() =>
                !neutralIsSuggestion &&
                setGlobalState({
                  baseColors: {
                    ...baseColors,
                    neutral: neutralColorSuggestionNames[0],
                  },
                })
              }
            >
              <ListItemRadio checked={neutralIsSuggestion} />
              Suggestions
            </ListItem>
            <Collapsible open={neutralIsSuggestion}>
              <ColorSuggestionsBox
                baseColor={baseColors.primary}
                colorSuggestions={neutralColorSuggestions}
                selectedSuggestion={
                  baseColors.neutral as NeutralColorSuggestion
                }
                onSuggestionSelect={suggestionName =>
                  setGlobalState({
                    baseColors: {
                      ...baseColors,
                      neutral: suggestionName,
                    },
                  })
                }
              />
            </Collapsible>
            <ListItem
              onClick={() =>
                !neutralIsCustom &&
                setGlobalState({
                  baseColors: {
                    ...baseColors,
                    neutral: getNeutralColor(baseColors.primary),
                  },
                })
              }
            >
              <ListItemRadio checked={neutralIsCustom} />
              Custom
            </ListItem>
            <Collapsible open={neutralIsCustom}>
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
            <ListItem
              onClick={() =>
                !dangerIsAuto &&
                setGlobalState({
                  baseColors: { ...baseColors, danger: undefined },
                })
              }
            >
              <ListItemRadio checked={dangerIsAuto} />
              Auto
            </ListItem>
            <ListItem
              onClick={() =>
                !dangerIsSuggestion &&
                setGlobalState({
                  baseColors: {
                    ...baseColors,
                    danger: dangerColorSuggestionNames[0],
                  },
                })
              }
            >
              <ListItemRadio checked={dangerIsSuggestion} />
              Suggestions
            </ListItem>
            <Collapsible open={dangerIsSuggestion}>
              <ColorSuggestionsBox
                baseColor={baseColors.primary}
                colorSuggestions={dangerColorSuggestions}
                selectedSuggestion={baseColors.danger as DangerColorSuggestion}
                onSuggestionSelect={suggestionName =>
                  setGlobalState({
                    baseColors: { ...baseColors, danger: suggestionName },
                  })
                }
              />
            </Collapsible>
            <ListItem
              onClick={() =>
                !dangerIsCustom &&
                setGlobalState({
                  baseColors: {
                    ...baseColors,
                    danger: getDangerColor(baseColors.primary),
                  },
                })
              }
            >
              <ListItemRadio checked={dangerIsCustom} />
              Custom
            </ListItem>
            <Collapsible open={dangerIsCustom}>
              <ColorInputWithRandomBtn
                id='input-danger-color'
                value={baseColors.danger || ''}
                onChange={newColor => {
                  setGlobalState({
                    baseColors: { ...baseColors, danger: newColor },
                  });
                }}
              />
            </Collapsible>
          </AccordionListItem>
        </AccordionList>
      </section>
    );
  }
);
OptionsSection.displayName = 'OptionsSection';

export default OptionsSection;
