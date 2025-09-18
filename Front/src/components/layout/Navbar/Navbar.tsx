import { Burger, Container, Group, Image, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCoins, IconHome, IconLogin2, IconLogout2, IconUser } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router';
import finTalkLogo from '../../../assets/fin-talk-logo.png';
import avatar from '../../../assets/avatar.png';
// import { profileStore } from '../../stores/ProfileStore';
// import { logoutUser } from '../../utils/apiUtils/authApiUtils';
import { CustomNavLink } from './CustomNavLink';
import classes from './Navbar.module.css';

export type Item = {
    link: string,
    label: string,
    icon: any
}

const links: Item[] = [
    { link: '/leaderboard', label: 'Leader Board', icon: <IconUser size={20} /> },
    { link: '/', label: 'Dashboard', icon: <IconHome size={20} /> },
];

const loginItem = { link: '/login', label: 'Login', icon: <IconLogin2 size={20} /> }
const logoutItem = { link: '/login', label: 'Logout', icon: <IconLogout2 size={20} /> }

function Navbar() {

    const [opened, { toggle }] = useDisclosure(false);
    const navigate = useNavigate();

    function handleClick(link: string) {
        toggle();
        navigate(link);
    }

    // // TODO: change redirect from login page to feed page
    // async function handleLogout() {
    //     await logoutUser();
    //     profileStore.logoutProfile();
    // }

    return (
        <header className={`${classes.header} bg-black/20 backdrop-blur-lg`}>
            <Container fluid className={classes.inner}>
                <Image
                    src={finTalkLogo}
                    alt="FinTalk Logo"
                    h={50}
                    w="auto"
                    fit="contain"
                    radius="50%"
                />
                {/* full size menu */}
                <Group gap={5} visibleFrom="xs">
                    {links.map((link) => (
                        <CustomNavLink
                            key={link.label}
                            item={link}
                            opened={opened} toggle={toggle} />
                    ))}
                    {/* {profileStore.activeProfile
                            ? <div onClick={async () => await handleLogout()}>
                                <CustomNavLink item={logoutItem} opened={opened} toggle={toggle} />
                            </div>
                            : <CustomNavLink item={loginItem} opened={opened} toggle={toggle} />
                    } */}
                </Group>

                <Group gap={15} >
                {/* <Group className={classes.itemContext} gap={10} > */}
                    <Group gap={5}>2,450 <IconCoins /></Group>
                    <NavLink to={'/profile'} title='profile'>
                        <Image
                            src={avatar}
                            alt="Avatar Logo"
                            h={50}
                            w="auto"
                            fit="contain"
                            bd="2px solid yellow"
                            radius="50%"
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
                        {/* {profileStore.activeProfile
                            ? <Menu.Item
                                key={logoutItem.label}
                                leftSection={logoutItem.icon}
                                onClick={async () => {
                                    handleClick(logoutItem.link);
                                    await handleLogout();
                                }}
                            >
                                {logoutItem.label}
                            </Menu.Item>
                            : */}
                        <Menu.Item
                            key={loginItem.label}
                            leftSection={loginItem.icon}
                            onClick={() => handleClick(loginItem.link)}
                        >
                            {loginItem.label}
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Container >
        </header >
    );
}

export default Navbar
// export default observer(Navbar)