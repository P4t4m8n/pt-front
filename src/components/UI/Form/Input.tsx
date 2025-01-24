import React, { memo } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  divStyle?: string;
  children?: React.ReactNode;
}

const Input = memo(function Input({ divStyle, children, ...props }: Props) {
  const style = props.className
    ? props.className
    : `block w-full px-3 py-2 
          shadow-border text-black
          rounded-md placeholder-gray-400
          focus:outline-hidden focus:ring-2 
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed`;
  return (
    <div className={divStyle}>
      {children}
      <input {...props} className={style} />
    </div>
  );
});

export default Input;
