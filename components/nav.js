import React from 'react';
import Link from 'next/link';

const links = [{ href: 'https://github.com/segmentio/create-next-app', label: 'Github' }].map(
    link => {
        link.key = `nav-link-${link.href}-${link.label}`;
        return link;
    }
);

const Nav = () => (
    <nav>
        <ul>
            <li>
                <Link prefetch href="/">
                    <div>Home</div>
                </Link>
            </li>

            <ul>
                {links.map(({ key, href, label }) => (
                    <li key={key}>
                        <Link href={href}>
                            <div>{label}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </ul>
    </nav>
);

export default Nav;
