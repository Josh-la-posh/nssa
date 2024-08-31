import { Dispatch, SetStateAction } from 'react';

import { SelectOptionType, BaseSelectFieldProps, IconProps } from '@/types/components/form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../FieldWrapper';

import { SingleCombobox, MultiCombobox } from './Combobox';
import { MultiListbox, SingleListbox } from './Listbox';

type SelectFieldProps = FieldWrapperPassThroughProps &
  BaseSelectFieldProps & {
    multiple?: boolean;
    canSearch?: boolean;
    setApiQuery?: Dispatch<SetStateAction<string>>;
    isRequired?: boolean;
    renderSelected?: (option: SelectOptionType | SelectOptionType[]) => React.ReactNode;
    defaultValue?: string[] | string;
    value?: string[] | string;
  } & IconProps;

export const Select = (props: SelectFieldProps) => {
  const {
    registration,
    canSearch = false,
    multiple = false,
    helperText,
    isRequired,
    label,
    value,
    defaultValue,
    ...restProps
  } = props;

  const valx = () => {
    if (multiple) {
      if (canSearch) {
        return 'multiSearch';
      }
      return 'multi';
    } else {
      if (canSearch) {
        return 'singleSearch';
      }
      return 'single';
    }
  };

  const selectError = props.error;

  return (
    <FieldWrapper
      width="full"
      error={selectError}
      label={label}
      isRequired={isRequired}
      name={props.registration?.name || props.name}
      helperText={helperText}
    >
      {
        {
          singleSearch: (
            <SingleCombobox
              {...restProps}
              registration={registration}
              value={value as string}
              defaultValue={defaultValue as string}
            />
          ),
          multiSearch: (
            <MultiCombobox
              {...restProps}
              registration={registration}
              value={value as string[]}
              defaultValue={defaultValue as string[]}
            />
          ),
          single: (
            <SingleListbox
              {...restProps}
              registration={registration}
              value={value as string}
              defaultValue={defaultValue as string}
            />
          ),
          multi: (
            <MultiListbox
              {...restProps}
              registration={registration}
              value={value as string[]}
              defaultValue={defaultValue as string[]}
            />
          ),
        }[valx()]
      }
    </FieldWrapper>
  );
};

Select.displayName = 'Select';
