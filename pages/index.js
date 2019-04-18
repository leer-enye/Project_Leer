import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import Index from '../components/header_footer/header';
import '../scss/style.scss';

const Home = () => (
    <div>
        <Head title="Leer Learning Community" description="Exam Success with Leer" />
        <Nav />
        <h3 className="text-center jumbotron">Jude</h3>
        <Index />
    </div>
);

export default Home;
