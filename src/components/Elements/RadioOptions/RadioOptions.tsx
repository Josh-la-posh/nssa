import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '@/components/Form/FieldWrapper';

const sizes = {
  sm: 'py-2 px-3 text-sm',
  md: 'py-3 px-3 text-base',
  lg: 'py-4 px-3 text-lg',
};

type RadioFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    registration?: Partial<UseFormRegisterReturn>;
    labelClassName?: string;
    size?: keyof typeof sizes;
    options: {
      label: ReactNode;
      value: string | number;
      labelClassName?: string;
      className?: string;
    }[]; // Array of options for the questionnaire
  };

export const RadioOptions: FC<RadioFieldProps> = (props) => {
  const {
    label = ' ',
    className,
    labelClassName = 'items-center gap-2',
    helperText,
    registration,
    error,
    options,
    ...restProps
  } = props;

  return (
    <FieldWrapper
      label={label}
      id={props.id}
      error={error}
      name={registration?.name || props.name}
      className={labelClassName}
      helperText={helperText}
    >
      <div className={clsx(className, 'flex w-full flex-col gap-4')}>
        {options.map((option, index) => (
          <label
            key={option.value}
            htmlFor={`${props.id}-option-${index}-${option.label}`}
            className={clsx(option.labelClassName)}
          >
            <input
              {...restProps}
              {...registration}
              className={clsx(option.className)}
              type="radio"
              value={option.value}
              id={`${props.id}-option-${index}-${option.label}`}
            />
            <div className="flex-1">{option.label}</div>
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
};
