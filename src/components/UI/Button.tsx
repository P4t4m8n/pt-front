interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleMode?: "primary" | "secondary" | "tertiary" | "none";
  styleSize?: "small" | "medium" | "large" | "none";
  children?: React.ReactNode;
  className?: string;
}

const STYLES = {
  primary: `
   
  `,
  secondary: `
   
  `,
  tertiary: `
  
  `,
  none: "",
} as const;

const SIZES = {
  small: "py-1 px-2 text-sm",
  medium: "py-2 px-4 text-base",
  large: "py-3 px-6 text-lg",
  none: "",
} as const;

export default function Button({
  styleMode = "none",
  styleSize = "none",
  children,
  className,
  ...props
}: Props) {
  let style = className
    ? className
    : ` ${STYLES[styleMode]} ${SIZES[styleSize]} font-title
                rounded-md
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed `;

  style +=
    " hover:cursor-pointer  disabled:opacity-50  disabled:cursor-not-allowed ";
  return (
    <button {...props} className={style}>
      {children}
    </button>
  );
}
