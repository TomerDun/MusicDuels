import { Burger, Container, Group, Image, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCoins, IconHome, IconLogin2, IconLogout2, IconPiano, IconUsers } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router';
import finTalkLogo from '../../../assets/fin-talk-logo.png';
import avatar from '../../../assets/avatar.png';
import { CustomNavLink } from './CustomNavLink';
import classes from './Navbar.module.css';
import { userStore } from '../../../stores/UserStore';
import { onLogout } from '../../../utils/authUtils';

export type Item = {
    link: string,
    label: string,
    icon: any
}

const links: Item[] = [
    { link: '/leaderboard', label: 'Leaderboard', icon: <IconUsers size={20} /> },
    { link: '/', label: 'Dashboard', icon: <IconHome size={20} /> },
    { link: '/games/sight-reader', label: 'Sight Read', icon: <IconPiano size={20} /> },
];

const loginItem = { link: '/login', label: 'Login', icon: <IconLogin2 size={20} /> }
const logoutItem = { link: '/leaderboard', label: 'Logout', icon: <IconLogout2 size={20} /> }

function Navbar() {

    const [opened, { toggle }] = useDisclosure(false);
    const navigate = useNavigate();

    const activeUser = userStore.activeUser;

    function handleClick(link: string) {
        toggle();
        navigate(link);
    }

    return (
        <header className={`${classes.header} bg-black/20 backdrop-blur-lg`}>
            <Container fluid className={classes.inner}>
                <Image
                    src={finTalkLogo}
                    alt="FinTalk Logo"
                    className={classes.image}
                />
                {/* full size menu */}
                <Group gap={5} visibleFrom="xs">
                    {links.map((link) => (
                        <CustomNavLink
                            key={link.label}
                            item={link}
                            opened={opened} toggle={toggle} />
                    ))}
                    {userStore.activeUser
                        ? <div onClick={() => onLogout()}>
                            <CustomNavLink item={logoutItem} opened={opened} toggle={toggle} />
                        </div>
                        :
                        <CustomNavLink item={loginItem} opened={opened} toggle={toggle} />
                    }
                </Group>

                <Group gap={15}>
                    {activeUser &&
                        <Group gap={5}>{activeUser.totalScore} <IconCoins /></Group>
                    }
                    <NavLink to={'/profile'} title='profile'>
                        <Image
                            src={activeUser?.profileImageUrl
                                ? activeUser.profileImageUrl
                                : avatar}
                            alt="Avatar Logo"
                            className={classes.image}
                        />
                    </NavLink>
                </Group>

                {/* burger menu */}
                <Menu
                    shadow="md"
                    opened={opened}
                    onChange={toggle}
                    onClose={() => opened && toggle()}
                >
                    <Menu.Target>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" title='navigate' />
                    </Menu.Target>
                    <Menu.Dropdown>
                        {links.map(link => (
                            <Menu.Item
                                key={link.label}
                                leftSection={link.icon}
                                onClick={() => handleClick(link.link)}
                            >
                                {link.label}
                            </Menu.Item>))}
                        {userStore.activeUser
                            ? <Menu.Item
                                key={logoutItem.label}
                                leftSection={logoutItem.icon}
                                onClick={() => {
                                    handleClick(logoutItem.link);
                                    onLogout();
                                }}
                            >
                                {logoutItem.label}
                            </Menu.Item>
                            :
                            <Menu.Item
                                key={loginItem.label}
                                leftSection={loginItem.icon}
                                onClick={() => handleClick(loginItem.link)}
                            >
                                {loginItem.label}
                            </Menu.Item>}
                    </Menu.Dropdown>
                </Menu>
            </Container >
        </header >
    );
}

export default observer(Navbar)