interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: React.ReactNode;
  divStyle?: string;
}
export default function TextArea({ children, divStyle, ...props }: Props) {
  const containerStyle = "" + divStyle;
  const textAreaStyle = "resize-none w-full h-32 shadow-border rounded p-2";
  return (
    <div className={containerStyle}>
      {children && children}
      <textarea {...props} className={textAreaStyle} />
    </div>
  );
}
