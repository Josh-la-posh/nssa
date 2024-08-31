import clsx from 'clsx';
import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../FieldWrapper';

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
  };

export const Radio: FC<RadioFieldProps> = (props) => {
  const {
    label = ' ',
    className,
    labelClassName = 'inline-flex items-center gap-2',
    helperText,
    registration,
    error,
    inLabel,
    ...restProps
  } = props;

  return (
    <FieldWrapper
      id={props.id}
      error={error}
      name={props.name}
      className={labelClassName}
      helperText={helperText}
    >
      {inLabel ? (
        <label
          htmlFor={props.id}
          className={clsx(
            'inline-block text-sm font-medium',
            error?.message ? 'text-status-error' : ' text-gray-600',
            labelClassName
          )}
        >
          <input {...restProps} className={clsx(className)} type="radio" {...registration} />
          {label}
        </label>
      ) : (
        <>
          <input {...restProps} className={clsx(className)} type="radio" {...registration} />

          <label
            htmlFor={props.id}
            className={clsx(
              'inline-block pb-1 text-sm font-medium',
              error?.message ? 'text-status-error' : ' text-gray-600',
              labelClassName
            )}
          >
            {label}
          </label>
        </>
      )}
    </FieldWrapper>
  );
};
