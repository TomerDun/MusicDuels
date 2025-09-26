import { Burger, Container, Group, Image, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCoins, IconHome, IconLogin2, IconLogout2, IconUsers } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import finTalkLogo from '../../../assets/fin-talk-logo.png';
import { CustomNavLink } from './CustomNavLink';
import classes from './Navbar.module.css';
import { userStore } from '../../../stores/UserStore';
import { onLogout } from '../../../utils/authUtils';

export type Item = {
    link: string,
    label: string,
    icon: any
}

const leaderboardItem: Item = { link: '/', label: 'Leaderboard', icon: <IconUsers size={20} /> };
const dashboardItem: Item = { link: '/dashboard', label: 'Dashboard', icon: <IconHome size={20} /> };
const loginItem: Item = { link: '/login', label: 'Login', icon: <IconLogin2 size={20} /> };
const logoutItem: Item = { link: '/', label: 'Logout', icon: <IconLogout2 size={20} /> };
const defaultProfileImageURL = 'https://media.istockphoto.com/id/1827161900/vector/black-man-with-headphones-guy-profile-avatar-african-man-listen-to-music-on-headphones.jpg?s=612x612&w=0&k=20&c=_t2-yhOSi4yt6IrFo1SYriRjiBqjYkk_YyYpZogmW50='

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
                    <CustomNavLink
                        key={leaderboardItem.label}
                        item={leaderboardItem}
                        opened={opened} toggle={toggle} />
                    {userStore.activeUser
                        ? <>
                            <CustomNavLink
                                key={dashboardItem.label}
                                item={dashboardItem}
                                opened={opened} toggle={toggle} />
                            <div onClick={() => onLogout()}>
                                <CustomNavLink item={logoutItem} opened={opened} toggle={toggle} />
                            </div>
                        </>
                        :
                        <CustomNavLink item={loginItem} opened={opened} toggle={toggle} />
                    }
                </Group>

                <Group gap={15}>
                    {activeUser &&
                        <Group gap={5}>{activeUser.totalScore} <IconCoins color={'yellow'} /></Group>
                    }
                    <Image
                        src={activeUser?.profileImageUrl
                            ? activeUser.profileImageUrl
                            : defaultProfileImageURL}
                        alt="Avatar Logo"
                        className={classes.image}
                    />
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
                        <Menu.Item
                            key={leaderboardItem.label}
                            leftSection={leaderboardItem.icon}
                            onClick={() => handleClick(leaderboardItem.link)}
                        >
                            {leaderboardItem.label}
                        </Menu.Item>
                        {userStore.activeUser
                            ? <>
                                <Menu.Item
                                    key={dashboardItem.label}
                                    leftSection={dashboardItem.icon}
                                    onClick={() => handleClick(dashboardItem.link)}
                                >
                                    {dashboardItem.label}
                                </Menu.Item>
                                <Menu.Item
                                    key={logoutItem.label}
                                    leftSection={logoutItem.icon}
                                    onClick={() => {
                                        handleClick(logoutItem.link);
                                        onLogout();
                                    }}
                                >
                                    {logoutItem.label}
                                </Menu.Item>
                            </>
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