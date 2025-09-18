import { NavLink } from "react-router";
import classes from './Navbar.module.css';
import type { Item } from "./Navbar";

type CustomNavLinkProps = {
    item: Item
    opened: boolean;
    toggle: () => void;
}

export function CustomNavLink({ item, opened, toggle }: CustomNavLinkProps) {

    return (
        <NavLink
            to={item.link}
            className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.linkActive : ''}`
            }
            onClick={() => {
                // Close mobile menu if open
                if (opened) toggle();
            }}
        >
            <span className={classes.itemContext}>
                {item.icon}
                {item.label}
            </span>
        </NavLink>
    )
}
