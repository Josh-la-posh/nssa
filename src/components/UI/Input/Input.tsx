import * as React from 'react';

type InputProps = {
  children: React.ReactNode;
  type: string;
  name: string;
  value: string;
  onChange: any;
  placeholder: string;
  label: string;
  id: string;
};

export const InputLayout = ({ children, type, name, value, placeholder, onChange }: InputProps) => {
  return (
    <div className="input flex-column">
      <label className="input__label">{children}</label>
      <input
        className="input__field"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export const SelectInputLayout = ({ children, label, id }: InputProps) => {
  return (
    <div className="input flex-column">
      <label id={id} className="input__label">
        {label}
      </label>
      <select className="input__field">{children}</select>
    </div>
  );
};
