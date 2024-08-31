import clsx from 'clsx';
import React, { useMemo } from 'react';

type onChangeType = {
  target: {
    name: string;
    value: string;
  };
};

const REGEX_TYPES = {
  numeric: /^\d+$/,
  alphabet: /^[A-Z]+$/i,
  alpa_numeric: /^\w+$/,
};

export type OTPInputProps = {
  value: string;
  length?: number;
  className?: string;
  containerClassName?: string;
  name?: string;
  type?: keyof typeof REGEX_TYPES;
  disabled?: boolean;
  onChange: ({ target }: onChangeType) => void;
};

export const OTPInput = (props: Partial<OTPInputProps>) => {
  const {
    value = '',
    length = 4,
    onChange,
    type = 'numeric',
    name = 'otp',
    disabled = false,
    className = '',
    containerClassName = '',
  } = props;

  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < length; i++) {
      const char = valueArray[i];

      if (REGEX_TYPES[type].test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, length, type]);

  const customOnchange = (value: string) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value,
        },
      });
    }
  };

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    let targetValue = target.value.trim();
    // const isTargetValueMatch =
    const isTargetValueMatch = REGEX_TYPES[type].test(targetValue);

    if (!isTargetValueMatch && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    // only delete value if next input element has no value
    if (!isTargetValueMatch && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueMatch ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

      customOnchange(newValue);

      if (!isTargetValueMatch) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === length) {
      customOnchange(targetValue);
    }

    target.blur();
  };

  const handleInputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || targetValue !== '') {
      return;
    }
    focusToPrevInput(target);
  };

  const handleInputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    // keep focusing back until previous input
    // element has value
    const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className={clsx('flex items-center gap-1', containerClassName)}>
      {valueItems.map((el, idx) => (
        <input
          name={name + idx}
          key={idx}
          aria-label={name + '-' + idx}
          type="text"
          inputMode={type === 'numeric' ? 'numeric' : 'text'}
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={length}
          className={clsx(
            'h-10 w-10 rounded-md border border-gray-400 bg-transparent text-center text-lg font-semibold uppercase outline-none outline-1 hover:border-blue-400 focus:border-gray-800',
            className
          )}
          value={el}
          onChange={(e) => handleInputOnChange(e, idx)}
          onKeyDown={handleInputOnKeyDown}
          onFocus={handleInputOnFocus}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
