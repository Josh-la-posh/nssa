import { Dispatch, ReactNode, SetStateAction } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type SelectOptionType = {
  label: ReactNode;
  key?: string;
  value: string | number | string[] | boolean;
  disabled?: boolean;
};

export type SelectOnchangeEventType = {
  target: {
    value: string | string[];
    name: string;
  };
};

export type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type BaseSelectFieldProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'placeholder' | 'size'
> & {
  options: SelectOptionType[];
  isLoading?: boolean;
  renderOption?: (
    option: SelectOptionType,
    { selected, active }: { selected?: boolean; active?: boolean }
  ) => React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  onChange?: (e: SelectOnchangeEventType) => void;
  registration?: Partial<UseFormRegisterReturn>;
  labelClassName?: string;
  setApiQuery?: Dispatch<SetStateAction<string>>;
};

export interface SingleSelectFieldProps extends BaseSelectFieldProps {
  renderSelected?: (option: SelectOptionType) => React.ReactNode;
  value?: string;
  defaultValue?: string;
}

export interface MultiSelectFieldProps extends BaseSelectFieldProps {
  renderSelected?: (option: SelectOptionType[]) => React.ReactNode;
  defaultValue?: string[];
  value?: string[];
}
// export interface MultiSelectFieldProps
//   extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
//   options: SelectOptionType[];
//   renderSelected?: (option: SelectOptionType[]) => React.ReactNode;
//   renderOption?: (
//     option: SelectOptionType,
//     { selected, active }: { selected?: boolean; active?: boolean }
//   ) => React.ReactNode;
//   className?: string;
//   size?: 'sm' | 'md' | 'lg';
//   defaultValue?: string[];
//   placeholder?: string;
//   value?: string[];
//   onChange?: (e: SelectOnchangeEventType) => void | ChangeHandler;
//   registration?: Partial<UseFormRegisterReturn>;
// }
