import { type ComponentProps, forwardRef, useState } from 'react';

import ColorSuggestionsBox from './ColorSuggestionsBox';
import {
  AccordionList,
  AccordionListItem,
  Collapsible,
  ListItem,
  ListSubheader,
  Radio,
} from 'components/general';
import { ColorInput } from 'components/colors';
import { useGlobalState } from 'hooks';
import { getDangerColor, getNeutralColor } from 'utils';
import type { GlobalState } from 'contexts/globalState';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
  neutralColorSuggestionNames,
  neutralColorSuggestions,
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

const BaseColorsSection = forwardRef<HTMLElement, ComponentProps<'section'>>(
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
            <div className='p-2'>
              <ColorInput
                id='input-primary-color'
                value={baseColors.primary}
                onChange={newColor => {
                  setGlobalState({
                    baseColors: { ...baseColors, primary: newColor },
                  });
                }}
                withRandomBtn
              />
            </div>
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
              <div className='p-2'>
                <ColorInput
                  id='input-neutral-color'
                  value={baseColors.neutral || ''}
                  onChange={newColor => {
                    setGlobalState({
                      baseColors: { ...baseColors, neutral: newColor },
                    });
                  }}
                  withRandomBtn
                />
              </div>
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
              <div className='p-2'>
                <ColorInput
                  id='input-danger-color'
                  value={baseColors.danger || ''}
                  onChange={newColor => {
                    setGlobalState({
                      baseColors: { ...baseColors, danger: newColor },
                    });
                  }}
                  withRandomBtn
                />
              </div>
            </Collapsible>
          </AccordionListItem>
        </AccordionList>
      </section>
    );
  }
);
BaseColorsSection.displayName = 'BaseColorsSection';

export default BaseColorsSection;
