import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type NavLinkProps = {
  to: string;
};

export const NavLink: FunctionComponent<NavLinkProps> = ({
  to,
  children,
  ...props
}) => {
  const { pathname } = useRouter();

  return (
    <Link href={to} {...props}>
      <a className={to === pathname ? "active" : ""}>{children}</a>
    </Link>
  );
};
