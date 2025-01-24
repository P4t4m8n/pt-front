interface Props extends React.HTMLProps<HTMLSelectElement> {
  options: { value: string; name: string }[];
  children?: React.ReactNode;
}
export default function Select({ options, children, ...props }: Props) {
  return (
    <div>
      {children}
      <select {...props}>
        {options.map(({ value, name }) => (
          <option key={value} value={value}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
