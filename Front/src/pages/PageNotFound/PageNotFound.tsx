import { Button, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router';
import { Illustration } from './Illustration';
import classes from './PageNotFound.module.css';

export function PageNotFound() {
    return (
        <div className='page-outside-container background-gradient'>
            <div className={`${classes.inner} inner-container`}>
                <Illustration className={classes.image} />
                <div className={classes.content}>
                    <Title className={classes.title}>Nothing to see here</Title>
                    <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Group justify="center">
                        <Button color='dark' size="md"><Link to={'/leaderboard'}>Take me back to Leaderboard page</Link></Button>
                    </Group>
                </div>
            </div>
        </div>
    );
}