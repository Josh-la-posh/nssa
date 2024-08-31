import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../FieldWrapper';

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperPassThroughProps & {
    registration?: Partial<UseFormRegisterReturn>;
    labelClassName?: string;
    isRequired?: boolean;
  };

export const TextArea = (props: TextAreaFieldProps) => {
  const { label, className, isRequired, helperText, labelClassName, registration, error } = props;
  return (
    <FieldWrapper
      id={props.id}
      label={label}
      error={error}
      name={props.name}
      className={labelClassName}
      helperText={helperText}
      isRequired={isRequired}
    >
      <textarea
        {...props}
        className={clsx(
          'block w-full appearance-none rounded-md border border-gray-400 bg-transparent p-3 placeholder-gray-400 transition-colors duration-200 hover:border-blue-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 dark:text-white',
          error && 'border-status-error focus:border-status-error',
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
