import { TNavLink } from "../../types/app.type";
import NavLinkCmp from "./Link";

interface Props {
  navStyle: string;
  itemStyle: string;
  navLinks: TNavLink[];
}
export default function NavLinks({ navStyle, navLinks, itemStyle }: Props) {
  return (
    <nav className={navStyle}>
      {navLinks.map((link) => (
        <NavLinkCmp
          styleMode="none"
          styleSize="none"
          key={link.to}
          to={link.to}
          className={itemStyle}
        >
          {link.icon}
          <span>{link.text}</span>
        </NavLinkCmp>
      ))}
    </nav>
  );
}
