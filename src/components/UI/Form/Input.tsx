import React, { memo } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  divStyle?: string;
  children?: React.ReactNode;
}

const Input = memo(function Input({ divStyle, children, ...props }: Props) {
  const style = props.className
    ? props.className
    : ` w-full px-3 py-2 h-10
          shadow-border  
          rounded-md placeholder-gray-400
          focus:outline-hidden focus:ring-2 
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed flex `;

  //If Hidden, then input comes first, else children comes first for custom inputs using tailwind peer
  const isHidden = props.hidden;
  console.log("isHidden:", isHidden)
  return (
    <div className={divStyle}>
      {isHidden ? (
        <>
          <input {...props} className={style} />
          {children}
        </>
      ) : (
        <>
          {children}
          <input {...props} className={style} />
        </>
      )}
    </div>
  );
});

export default Input;
