/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';
import Head from 'next/head';
import '../scss/main.scss';

const Home = () => (
	<React.Fragment>
		<Head>
			<link
				href="https://fonts.googleapis.com/css?family=Lato:300,400,700|Poppins:400,700"
				rel="stylesheet"
			/>
		</Head>
		<header className="header">
			<nav className="header-nav">
				<div className="header-nav__logo">
					<h1>Leer</h1>
				</div>
				<ul className="header-nav__links">
					<li>
						<a className="nav-link" href="/">
							Login{' '}
						</a>{' '}
					</li>
					<li>
						{' '}
						<a className="nav-link btn" href="/">
							{' '}
							Register{' '}
						</a>{' '}
					</li>
				</ul>
			</nav>
		</header>
		<section className="section-hero">
			<div className="section-hero__text-content">
                <h1 className="heading-1">PASS YOUR Next EXAM</h1>
                <p>
                    Non dolore reprehenderit adipisicing dolore minim magna. Est anim eiusmod cillum Lorem ea quis dolor ea tempor adipisicing. Quis occaecat ea ipsum sunt ea minim incididunt consequat dolor est amet. 
                </p>
                <button type="button" className="btn btn-white"> GET STARTED </button>
            </div>
			<div className="section-hero__img-container">
				<img src="../static/images/hero-img.jpg" alt="hero" />
			</div>
		</section>
		<section className="section-feature-1" />
		<section className="section-feature-2" />
		<section className="section-feature-3" />
		<footer />
	</React.Fragment>
);

export default Home;
