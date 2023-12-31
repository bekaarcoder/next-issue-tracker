'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaBug } from 'react-icons/fa';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import {
    Avatar,
    Box,
    Container,
    DropdownMenu,
    Flex,
    Text,
} from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        {
            label: 'Dashboard',
            href: '/',
        },
        {
            label: 'Issues',
            href: '/issues',
        },
    ];

    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify={'between'}>
                    <Flex align={'center'} gap={'3'}>
                        <Link href="/">
                            <FaBug />
                        </Link>
                        <ul className="flex space-x-4">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={classnames({
                                            'nav-link': true,
                                            '!text-zinc-900':
                                                link.href === currentPath,
                                        })}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    {status === 'loading' ? (
                        <Skeleton width="2rem" height="2rem" circle={true} />
                    ) : (
                        <Box>
                            {status === 'authenticated' && (
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <Avatar
                                            src={session.user!.image!}
                                            fallback="?"
                                            radius="full"
                                            size={'2'}
                                            className="cursor-pointer"
                                        />
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Label>
                                            <Text>{session.user!.name}</Text>
                                        </DropdownMenu.Label>
                                        <DropdownMenu.Item>
                                            <Link href="/api/auth/signout">
                                                Logout
                                            </Link>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            )}
                            {status === 'unauthenticated' && (
                                <Link
                                    href="/api/auth/signin"
                                    className="nav-link"
                                >
                                    Login
                                </Link>
                            )}
                        </Box>
                    )}
                </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;
