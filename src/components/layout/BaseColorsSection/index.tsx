import { type ComponentProps, forwardRef, useState, useCallback } from 'react';

import ColorSuggestionsBox from './ColorSuggestionsBox';
import {
  AccordionList,
  AccordionListItem,
  Collapsible,
  Input,
  ListItem,
  ListSubheader,
  Radio,
  Separator,
} from 'components/general';
import { ColorInput } from 'components/colors';
import { useGlobalState } from 'hooks';
import { getDangerColor, getNeutralColor } from 'utils';
import type { GlobalState } from 'contexts/globalState';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
  generalColorSuggestionNames,
  generalColorSuggestions,
  neutralColorSuggestionNames,
  neutralColorSuggestions,
  type DangerColorSuggestion,
  type GeneralColorSuggestion,
  type NeutralColorSuggestion,
} from 'constants/colorSuggestions';
import { AnyStringWithAutocomplete } from 'types';

const RadioListItem = ({
  checked = false,
  disabled = false,
  children,
  ...props
}: {
  checked?: boolean;
  disabled?: boolean;
  children?: string;
} & ComponentProps<typeof ListItem>) => (
  <ListItem
    {...props}
    disabled={disabled}
    role='radio'
    aria-checked={checked}
    aria-disabled={disabled}
    aria-label={children}
  >
    <Radio checked={checked} disabled={disabled} className='z-10 me-4' asChild>
      <span />
    </Radio>
    {children}
  </ListItem>
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

    const addExtraColor = useCallback(
      () =>
        setGlobalState({
          baseColors: {
            ...baseColors,
            extras: [
              ...(baseColors.extras || []),
              {
                name: '',
                value:
                  generalColorSuggestionNames[
                    (baseColors.extras?.length || 0) %
                      generalColorSuggestionNames.length
                  ],
              },
            ],
          },
        }),
      [baseColors, setGlobalState]
    );

    const removeExtraColor = useCallback<(index: number) => void>(
      index =>
        setGlobalState({
          baseColors: {
            ...baseColors,
            extras: baseColors.extras?.filter?.((_, i) => i !== index),
          },
        }),
      [baseColors, setGlobalState]
    );

    // TODO: Don't allow the same name as another extra color
    const renameExtraColor = useCallback<
      (index: number, newName: string) => void
    >(
      (index, newName) =>
        setGlobalState({
          baseColors: {
            ...baseColors,
            extras: baseColors.extras?.map?.((color, i) =>
              i === index ? { ...color, name: newName } : color
            ),
          },
        }),
      [baseColors, setGlobalState]
    );

    const updateExtraColor = useCallback<
      (
        index: number,
        newValue: AnyStringWithAutocomplete<GeneralColorSuggestion>
      ) => void
    >(
      (index, newValue) =>
        setGlobalState({
          baseColors: {
            ...baseColors,
            extras: baseColors.extras?.map?.((color, i) =>
              i === index ? { ...color, value: newValue } : color
            ),
          },
        }),
      [baseColors, setGlobalState]
    );

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

          <AccordionListItem value='neutral' title='Neutral' role='radiogroup'>
            <RadioListItem
              checked={neutralIsAuto}
              onClick={() =>
                !neutralIsAuto &&
                setGlobalState({
                  baseColors: { ...baseColors, neutral: undefined },
                })
              }
            >
              Auto
            </RadioListItem>
            <RadioListItem
              checked={neutralIsSuggestion}
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
              Suggestions
            </RadioListItem>
            <Collapsible open={neutralIsSuggestion}>
              <ColorSuggestionsBox
                baseColor={baseColors.primary}
                colorSuggestions={neutralColorSuggestions}
                value={baseColors.neutral as NeutralColorSuggestion}
                onValueChange={suggestionName =>
                  setGlobalState({
                    baseColors: { ...baseColors, neutral: suggestionName },
                  })
                }
              />
            </Collapsible>
            <RadioListItem
              checked={neutralIsCustom}
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
              Custom
            </RadioListItem>
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

          <AccordionListItem value='danger' title='Danger' role='radiogroup'>
            <RadioListItem
              checked={dangerIsAuto}
              onClick={() =>
                !dangerIsAuto &&
                setGlobalState({
                  baseColors: { ...baseColors, danger: undefined },
                })
              }
            >
              Auto
            </RadioListItem>
            <RadioListItem
              checked={dangerIsSuggestion}
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
              Suggestions
            </RadioListItem>
            <Collapsible open={dangerIsSuggestion}>
              <ColorSuggestionsBox
                baseColor={baseColors.primary}
                colorSuggestions={dangerColorSuggestions}
                value={baseColors.danger as DangerColorSuggestion}
                onValueChange={suggestionName =>
                  setGlobalState({
                    baseColors: { ...baseColors, danger: suggestionName },
                  })
                }
              />
            </Collapsible>
            <RadioListItem
              checked={dangerIsCustom}
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
              Custom
            </RadioListItem>
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

          <Separator />
          {baseColors.extras?.map(({ name, value }, index) => {
            const id = `extra${index + 1}`,
              title = name || `Extra ${index + 1}`;
            const colorIsSuggestion =
                generalColorSuggestionNames.includes(value),
              colorIsCustom = !generalColorSuggestionNames.includes(value);
            return (
              <AccordionListItem key={id} value={id} title={title}>
                <ListItem asChild className='m-2'>
                  <Input
                    label='Name'
                    value={name || ''}
                    onChange={e => renameExtraColor(index, e.target.value)}
                  />
                </ListItem>
                <div role='radiogroup'>
                  <RadioListItem
                    checked={colorIsSuggestion}
                    onClick={() =>
                      !colorIsSuggestion &&
                      updateExtraColor(
                        index,
                        generalColorSuggestionNames[
                          index % generalColorSuggestionNames.length
                        ]
                      )
                    }
                  >
                    Suggestions
                  </RadioListItem>
                  <Collapsible open={colorIsSuggestion}>
                    <ColorSuggestionsBox
                      baseColor={baseColors.primary}
                      colorSuggestions={generalColorSuggestions}
                      value={value as GeneralColorSuggestion}
                      onValueChange={suggestionName =>
                        updateExtraColor(index, suggestionName)
                      }
                    />
                  </Collapsible>
                  <RadioListItem
                    checked={colorIsCustom}
                    onClick={() =>
                      !colorIsCustom &&
                      updateExtraColor(
                        index,
                        generalColorSuggestions[
                          value as GeneralColorSuggestion
                        ]?.(baseColors.primary)
                      )
                    }
                  >
                    Custom
                  </RadioListItem>
                  <Collapsible open={colorIsCustom}>
                    <div className='p-2'>
                      <ColorInput
                        id={`input-extra-color-${index}`}
                        value={value || ''}
                        onChange={newColor => {
                          updateExtraColor(index, newColor);
                        }}
                        withRandomBtn
                      />
                    </div>
                  </Collapsible>
                </div>
                <ListItem onClick={() => removeExtraColor(index)}>
                  Remove
                </ListItem>
              </AccordionListItem>
            );
          })}
          <ListItem onClick={addExtraColor}>Add extra color</ListItem>
        </AccordionList>
      </section>
    );
  }
);
BaseColorsSection.displayName = 'BaseColorsSection';

export default BaseColorsSection;
