import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button} from '@mui/material';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

export default function Navbar() {
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorMe, setAnchorMe] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorMe);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorMe(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorMe(null);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='p-2' style={{background: "#111"}}>
                <Toolbar className='w-full flex items-center justify-between'>
                    <div className='flex w-[40%] justify-between items-center'>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className='text-md hover:text-blue-300 cursor-pointer w-auto'>
                            Home
                        </Typography>
                        <Typography className='text-md hover:text-blue-300 cursor-pointer w-auto'>
                            Featured
                        </Typography>
                        <Typography className='text-md hover:text-blue-300 cursor-pointer w-auto'>
                            Shopping cart
                        </Typography>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Categories
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorMe}
                                open={open}
                                onClose={handleCloseMenu}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    
                    <SignedIn>
                        <UserButton afterSignOutUrl={window.location.href} />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode='modal' />
                    </SignedOut>
                </Toolbar>
            </AppBar>
        </Box>
    );
}