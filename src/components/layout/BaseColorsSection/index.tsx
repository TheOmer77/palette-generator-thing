'use client';

import { forwardRef, type ComponentPropsWithoutRef, Suspense } from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';

import ColorListItem from './ColorListItem';
import RadioListItem from '../RadioListItem';
import { Collapsible } from '@/components/ui/Collapsible';
import { Input } from '@/components/ui/Input';
import { ListItem, ListItemIcon, ListSubheader } from '@/components/ui/List';
import { RadioGroup } from '@/components/ui/Radio';
import { Separator } from '@/components/ui/Separator';
import {
  ColorInput,
  ColorSuggestion,
  ColorSuggestionsBox,
} from '@/components/colors';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useTheme } from '@/hooks/useTheme';
import { getAutoDangerColor, getAutoNeutralColor } from '@/lib/colorUtils';
import { toCamelCase } from '@/lib/utils';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
  generalColorSuggestionNames,
  generalColorSuggestions,
  neutralColorSuggestionNames,
  neutralColorSuggestions,
} from '@/constants';
import type {
  DangerColorSuggestion,
  GeneralColorSuggestion,
  NeutralColorSuggestion,
} from '@/types/defaultSuggestions';

const RESERVED_COLOR_NAMES = ['primary', 'neutral', 'danger'];
const ERROR_RESERVED_NAME = 'This name is reserved.',
  ERROR_DUPLICATE_NAME = "This name can't be used by multiple colors.";

const BaseColorsSectionContent = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'>
>((props, ref) => {
  const {
      primary,
      neutral,
      danger,
      extras,
      setPrimary,
      setNeutral,
      setDanger,
      addExtraColor,
      removeExtraColor,
      renameExtraColor,
      setExtraColor,
    } = useBaseColors(),
    themeColors = useTheme();

  const neutralIsAuto = neutral === null,
    neutralIsSuggestion =
      typeof neutral === 'string' &&
      neutralColorSuggestionNames.includes(neutral),
    neutralIsCustom =
      typeof neutral === 'string' &&
      !neutralColorSuggestionNames.includes(neutral);
  const dangerIsAuto = danger === null,
    dangerIsSuggestion =
      typeof danger === 'string' && dangerColorSuggestionNames.includes(danger),
    dangerIsCustom =
      typeof danger === 'string' &&
      !dangerColorSuggestionNames.includes(danger);

  return (
    <section {...props} ref={ref}>
      <ListSubheader className='bg-background md:bg-card dark:bg-card'>
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
              value={primary}
              onChange={setPrimary}
              withRandomBtn
            />
          </ListItem>
        </div>
      </ColorListItem>

      <RadioGroup
        asChild
        value={
          neutralIsAuto
            ? 'auto'
            : neutralIsSuggestion
              ? 'suggestions'
              : neutralIsCustom
                ? 'custom'
                : undefined
        }
        onValueChange={newValue =>
          ((newValue === 'auto' && !neutralIsAuto) ||
            (newValue === 'suggestions' && !neutralIsSuggestion) ||
            (newValue === 'custom' && !neutralIsCustom)) &&
          setNeutral(
            newValue === 'suggestions'
              ? neutralColorSuggestionNames[0]
              : newValue === 'custom'
                ? getAutoNeutralColor(primary)
                : null
          )
        }
      >
        <ColorListItem
          value='neutral'
          color={themeColors.neutral}
          title='Neutral'
        >
          <RadioListItem value='auto'>Auto</RadioListItem>
          <RadioListItem value='suggestions'>Suggestions</RadioListItem>
          <Collapsible open={neutralIsSuggestion}>
            <ColorSuggestionsBox
              value={neutral as NeutralColorSuggestion}
              onValueChange={setNeutral}
              className='pe-4 ps-[3.25rem]'
            >
              {Object.entries(neutralColorSuggestions).map(
                ([value, variantFn]) => (
                  <ListItem key={value} asChild>
                    <ColorSuggestion value={value} color={variantFn(primary)} />
                  </ListItem>
                )
              )}
            </ColorSuggestionsBox>
          </Collapsible>
          <RadioListItem value='custom'>Custom</RadioListItem>
          <Collapsible open={neutralIsCustom}>
            <div className='p-2'>
              <ListItem asChild>
                <ColorInput
                  id='input-neutral-color'
                  value={neutral || ''}
                  onChange={setNeutral}
                  withRandomBtn
                />
              </ListItem>
            </div>
          </Collapsible>
        </ColorListItem>
      </RadioGroup>

      <RadioGroup
        asChild
        value={
          dangerIsAuto
            ? 'auto'
            : dangerIsSuggestion
              ? 'suggestions'
              : dangerIsCustom
                ? 'custom'
                : undefined
        }
        onValueChange={newValue =>
          ((newValue === 'auto' && !dangerIsAuto) ||
            (newValue === 'suggestions' && !dangerIsSuggestion) ||
            (newValue === 'custom' && !dangerIsCustom)) &&
          setDanger(
            newValue === 'suggestions'
              ? dangerColorSuggestionNames[0]
              : newValue === 'custom'
                ? getAutoDangerColor(primary)
                : null
          )
        }
      >
        <ColorListItem
          value='danger'
          color={themeColors.danger}
          title='Danger'
          role='radiogroup'
        >
          <RadioListItem value='auto'>Auto</RadioListItem>
          <RadioListItem value='suggestions'>Suggestions</RadioListItem>
          <Collapsible open={dangerIsSuggestion}>
            <ColorSuggestionsBox
              value={danger as DangerColorSuggestion}
              onValueChange={setDanger}
              className='pe-4 ps-[3.25rem]'
            >
              {Object.entries(dangerColorSuggestions).map(
                ([value, variantFn]) => (
                  <ListItem key={value} asChild>
                    <ColorSuggestion value={value} color={variantFn(primary)} />
                  </ListItem>
                )
              )}
            </ColorSuggestionsBox>
          </Collapsible>
          <RadioListItem value='custom'>Custom</RadioListItem>
          <Collapsible open={dangerIsCustom}>
            <div className='p-2'>
              <ListItem asChild>
                <ColorInput
                  id='input-danger-color'
                  value={danger || ''}
                  onChange={setDanger}
                  withRandomBtn
                />
              </ListItem>
            </div>
          </Collapsible>
        </ColorListItem>
      </RadioGroup>

      <Separator />
      {extras.map(({ name, value }, index) => {
        const id = `extra${index + 1}`,
          title = name || `Extra ${index + 1}`;
        const colorIsSuggestion = generalColorSuggestionNames.includes(value),
          colorIsCustom = !generalColorSuggestionNames.includes(value);
        const nameIsReserved =
            typeof name === 'string' &&
            RESERVED_COLOR_NAMES.includes(toCamelCase(name)),
          nameIsDuplicate =
            typeof name === 'string' &&
            name.length > 0 &&
            extras.filter(
              ({ name: n }) =>
                typeof n === 'string' &&
                toCamelCase(n).toLowerCase() === toCamelCase(name).toLowerCase()
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
                />
              </ListItem>
              {(nameIsReserved || nameIsDuplicate) && (
                <div
                  className='mt-1 w-full select-none px-1 text-xs
text-danger-600 dark:text-danger-300'
                >
                  {nameIsReserved ? ERROR_RESERVED_NAME : ERROR_DUPLICATE_NAME}
                </div>
              )}
            </div>
            <RadioGroup
              value={colorIsSuggestion ? 'suggestions' : 'custom'}
              onValueChange={newValue =>
                ((newValue === 'suggestions' && !colorIsSuggestion) ||
                  (newValue === 'custom' && !colorIsCustom)) &&
                setExtraColor(
                  index,
                  newValue === 'suggestions'
                    ? generalColorSuggestionNames[
                        index % generalColorSuggestionNames.length
                      ]
                    : generalColorSuggestions[value as GeneralColorSuggestion](
                        primary
                      )
                )
              }
            >
              <RadioListItem value='suggestions'>Suggestions</RadioListItem>
              <Collapsible open={colorIsSuggestion}>
                <ColorSuggestionsBox
                  value={value as GeneralColorSuggestion}
                  onValueChange={suggestionName =>
                    setExtraColor(index, suggestionName)
                  }
                  className='pe-4 ps-[3.25rem]'
                >
                  {Object.entries(generalColorSuggestions).map(
                    ([value, variantFn]) => (
                      <ListItem key={value} asChild>
                        <ColorSuggestion
                          value={value}
                          color={variantFn(primary)}
                        />
                      </ListItem>
                    )
                  )}
                </ColorSuggestionsBox>
              </Collapsible>
              <RadioListItem value='custom'>Custom</RadioListItem>
              <Collapsible open={colorIsCustom}>
                <div className='p-2'>
                  <ColorInput
                    id={`input-extra-color-${index}`}
                    value={value || ''}
                    onChange={newColor => setExtraColor(index, newColor)}
                    withRandomBtn
                  />
                </div>
              </Collapsible>
            </RadioGroup>
            <ListItem onClick={() => removeExtraColor(index)}>
              <ListItemIcon>
                <TrashIcon />
              </ListItemIcon>
              Remove
            </ListItem>
          </ColorListItem>
        );
      })}
      <ListItem onClick={addExtraColor} className='mb-2'>
        <ListItemIcon>
          <PlusIcon />
        </ListItemIcon>
        Add extra color
      </ListItem>
    </section>
  );
});
BaseColorsSectionContent.displayName = 'BaseColorsSectionContent';

export const BaseColorsSection = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'>
>((props, ref) => (
  <Suspense>
    <BaseColorsSectionContent {...props} ref={ref} />
  </Suspense>
));
BaseColorsSection.displayName = 'BaseColorsSection';
