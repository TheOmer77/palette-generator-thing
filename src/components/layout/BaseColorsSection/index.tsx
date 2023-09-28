import {
  forwardRef,
  type ComponentPropsWithoutRef,
  useCallback,
  useState,
} from 'react';

import ColorListItem from './ColorListItem';
import ColorSuggestionsBox from './ColorSuggestionsBox';
import RadioListItem from './RadioListItem';
import {
  AccordionList,
  Collapsible,
  Input,
  ListItem,
  ListItemIcon,
  ListSubheader,
  Separator,
} from 'components/general';
import { ColorInput } from 'components/colors';
import { AddIcon, DeleteIcon } from 'assets/icons';
import { useGlobalState, useTheme } from 'hooks';
import { getAutoDangerColor, getAutoNeutralColor, toCamelCase } from 'utils';
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
import type { AnyStringWithAutocomplete } from 'types';

const RESERVED_COLOR_NAMES = ['primary', 'neutral', 'danger'];

const BaseColorsSection = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'>
>((props, ref) => {
  const [{ baseColors }, setGlobalState] = useGlobalState();
  const themeColors = useTheme();

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
        <ListSubheader className='bg-neutral-50 dark:bg-neutral-900'>
          Base colors
        </ListSubheader>
        <ColorListItem
          value='primary'
          color={themeColors.primary}
          title='Primary'
        >
          <div className='p-2'>
            <ListItem asChild>
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
            </ListItem>
          </div>
        </ColorListItem>

        <ColorListItem
          value='neutral'
          color={themeColors.neutral}
          title='Neutral'
          role='radiogroup'
        >
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
                  neutral: getAutoNeutralColor(baseColors.primary),
                },
              })
            }
          >
            Custom
          </RadioListItem>
          <Collapsible open={neutralIsCustom}>
            <div className='p-2'>
              <ListItem asChild>
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
              </ListItem>
            </div>
          </Collapsible>
        </ColorListItem>

        <ColorListItem
          value='danger'
          color={themeColors.danger}
          title='Danger'
          role='radiogroup'
        >
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
                  danger: getAutoDangerColor(baseColors.primary),
                },
              })
            }
          >
            Custom
          </RadioListItem>
          <Collapsible open={dangerIsCustom}>
            <div className='p-2'>
              <ListItem asChild>
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
              </ListItem>
            </div>
          </Collapsible>
        </ColorListItem>

        <Separator />
        {baseColors.extras?.map(({ name, value }, index) => {
          const id = `extra${index + 1}`,
            title = name || `Extra ${index + 1}`;
          const colorIsSuggestion = generalColorSuggestionNames.includes(value),
            colorIsCustom = !generalColorSuggestionNames.includes(value);
          const nameIsReserved =
              typeof name === 'string' && RESERVED_COLOR_NAMES.includes(name),
            nameIsDuplicate =
              typeof name === 'string' &&
              name.length > 0 &&
              Array.isArray(baseColors.extras) &&
              baseColors.extras.filter(
                ({ name: n }) =>
                  typeof n === 'string' &&
                  toCamelCase(n).toLowerCase() ===
                    toCamelCase(name).toLowerCase()
              ).length > 1;

          return (
            <ColorListItem
              key={id}
              value={id}
              color={themeColors.extras[index].value}
              title={title}
            >
              <div className='m-2'>
                <ListItem asChild>
                  <Input
                    label='Name'
                    value={name || ''}
                    onChange={e => renameExtraColor(index, e.target.value)}
                    invalid={nameIsReserved || nameIsDuplicate}
                    helperText={
                      nameIsReserved
                        ? 'This name is reserved.'
                        : nameIsDuplicate
                        ? "This name can't be used by multiple colors."
                        : undefined
                    }
                  />
                </ListItem>
              </div>
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
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                Remove
              </ListItem>
            </ColorListItem>
          );
        })}
        <ListItem onClick={addExtraColor} className='mb-2'>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          Add extra color
        </ListItem>
      </AccordionList>
    </section>
  );
});
BaseColorsSection.displayName = 'BaseColorsSection';

export default BaseColorsSection;
