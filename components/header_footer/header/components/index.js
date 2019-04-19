import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import './style.scss';
import Head from './head';

// eslint-disable-next-line react/prefer-stateless-function
export default class Header extends Component {
    render() {
        return (
            <div className="flexGrow1">
                <Head title="Leer Learning Community" description="Exam Success with Leer" />
                <AppBar position="fixed" className="appBar">
                    <ToolBar>
                        <IconButton className="menuButton" color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className="flexGrow1">
							LEER
                        </Typography>
                        <Link href="/sign_in">
                            <Button color="inherit">Login</Button>
                        </Link>
                    </ToolBar>
                </AppBar>
            </div>
        );
    }
}
