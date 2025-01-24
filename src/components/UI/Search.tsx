import { useSearchParams } from "react-router";
import Button from "./Button";
import Input from "./Form/Input";
import Label from "./Form/Label";
interface Props {
  items: {
    name: string;
    placeHolder?: string;
    type?: string;
    divStyle?: string;
    id?: string;
    label?: string;
  }[];
}

export default function SearchForm({ items }: Props) {
  const [, setSearchParams] = useSearchParams();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of formData) {
      params.append(key, value.toString());
    }
    setSearchParams(params);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center gap-2"
    >
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <Input
            key={item.name}
            name={item.name}
            placeholder={item.placeHolder}
            type={item.type}
            divStyle={item.divStyle}
            id={item.id}
          >
            {item.label && <Label htmlFor={item.id}>{item.label}</Label>}
          </Input>
        ))}
      </div>
      <Button
        type="submit"
        styleMode="none"
        styleSize="none"
        className="border border-white p-2 rounded-sm"
      >
        Search
      </Button>
    </form>
  );
}
