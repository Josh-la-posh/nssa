import * as React from 'react';

type InputProps = {
  children: React.ReactNode;
  type: string;
  value: string;
  onChange: any;
  placeholder: string;
};

export const InputLayout = ({ children, type, value, placeholder, onChange }: InputProps) => {
  return (
    <div className="input flex-column">
      <label className="input__label">{children}</label>
      <input
        className="input__field"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};


type SelectProps = {
  children: React.ReactNode;
  label: string;
  id: string;
};
export const SelectInputLayout = ({ children, label, id }: SelectProps) => {
  return (
    <div className="input flex-column">
      <label id={id} className="input__label">
        {label}
      </label>
      <select className="input__field">{children}</select>
    </div>
  );
};
