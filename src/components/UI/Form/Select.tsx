interface Props extends React.HTMLProps<HTMLSelectElement> {
  options: { value: string; option: React.ReactNode }[];
  children?: React.ReactNode;
}
export default function Select({ options, children, ...props }: Props) {
  return (
    <div>
      {children}
      <select {...props}>
        {options.map(({ value, option }) => (
          <option key={value} value={value}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
