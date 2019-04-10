import React, { FunctionComponent } from "react";
import { Link } from "@reach/router";

type NavLinkProps = {
  to: string;
};

export const NavLink: FunctionComponent<NavLinkProps> = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => ({
      className: isCurrent ? "active" : "",
    })}
  />
);
