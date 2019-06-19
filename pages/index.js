/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
						<Link href="/admin/challenge">
							<a className="nav-link">Login</a>
						</Link>
					</li>
					<li>
						<Link href="/api/users/login">
							<a className="nav-link btn">Register</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
		<section className="section-hero">
			<div className="section-hero__text-content">
				<h1 className="heading-1">PASS YOUR Next EXAM</h1>
				<p>
					Non dolore reprehenderit adipisicing dolore minim magna. Est
					anim eiusmod cillum Lorem ea quis dolor ea tempor
					adipisicing. Quis occaecat ea ipsum sunt ea minim incididunt
					consequat dolor est amet.
				</p>
				<button type="button" className="btn btn-white">
					GET STARTED
				</button>
			</div>
			<div className="section-hero__img-container">
				<img src="../static/images/hero-img.jpg" alt="hero" />
			</div>
		</section>
		<section className="section-feature section-feature--1">
			<div className="section-feature__img-box">
				<img src="../static/images/practice.jpg" alt="feature 1" />
			</div>
			<div className="section-feature__text-content">
				<h2 className="heading-2">Practice Past Questions</h2>
				<p>
					Laboris consectetur id ut Lorem aute qui exercitation
					exercitation officia dolore ullamco occaecat. Magna
					consequat cupidatat nisi exercitation anim exercitation sunt
					est anim mollit. Sint eu mollit do id consequat velit enim
					in veniam irure nostrud tempor consectetur esse.
					Reprehenderit officia ut duis adipisicing id enim tempor
					aliqua eiusmod.
				</p>
				<button type="button" className="btn btn-primary">
					Get started
				</button>
			</div>
		</section>
		<section className="section-feature section-feature--2">
			<div className="section-feature__img-box">
				{' '}
				<img
					src="../static/images/challenge.gif"
					alt="feature 1"
				/>{' '}
			</div>
			<div className="section-feature__text-content">
				<h2 className="heading-2">Challenge Friends</h2>
				<p>
					Laboris consectetur id ut Lorem aute qui exercitation
					exercitation officia dolore ullamco occaecat. Magna
					consequat cupidatat nisi exercitation anim exercitation sunt
					est anim mollit. Sint eu mollit do id consequat velit enim
					in veniam irure nostrud tempor consectetur esse.
					Reprehenderit officia ut duis adipisicing id enim tempor
					aliqua eiusmod.
				</p>
				<button type="button" className="btn btn-primary">
					Get started
				</button>
			</div>
		</section>
		<section className="section-feature section-feature--3">
			<div className="section-feature__img-box">
				<img src="../static/images/resources.jpg" alt="feature 1" />{' '}
			</div>
			<div className="section-feature__text-content">
				<h2 className="heading-2">Learning Resources</h2>
				<p>
					Laboris consectetur id ut Lorem aute qui exercitation
					exercitation officia dolore ullamco occaecat. Magna
					consequat cupidatat nisi exercitation anim exercitation sunt
					est anim mollit. Sint eu mollit do id consequat velit enim
					in veniam irure nostrud tempor consectetur esse.
					Reprehenderit officia ut duis adipisicing id enim tempor
					aliqua eiusmod.
				</p>
				<button type="button" className="btn btn-primary">
					Get Started
				</button>
			</div>
		</section>
		<section className="section-cta">
			<h2 className="heading-2"> What are you waiting for ? </h2>
			<button className="btn btn-white" type="button">
				Get Started
			</button>
		</section>
		<footer className="footer">
			<h1>Leer</h1>
			<p className="copyright">Copyright 2019</p>
		</footer>
	</React.Fragment>
);

export default Home;
