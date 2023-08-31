import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button} from '@mui/material';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [anchorMe, setAnchorMe] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorMe);
    const [categories, setCategories] = React.useState<Array<string>>(
        [
            "Games & Entertainment",
            "Electronics",
            "Clothing & Fashion",
            "Home & Garden",
            "Beauty & Personal Care",
            "Sports & Outdoors",
            "Books & Literature",
            "Toys & Hobbies",
            "Health & Wellness",
            "Food & Grocery",
            "Jewelry & Accessories",
            "Automotive",
            "Music & Instruments",
            "Office & School Supplies",
            "Pet Supplies",
            "Art & Craft",
            "Travel & Luggage",
            "Fitness & Exercise",
            "Electrical Appliances",
            "Baby & Maternity",
            "Party Supplies"
        ]        
    )

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorMe(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorMe(null);
    };

    const handleClose = () => {
        setAnchorMe(null);
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
                        <Link to="/">
                            <Typography className='text-md hover:text-blue-300 cursor-pointer w-auto'>
                                Home
                            </Typography>
                        </Link>
                        <Link to="publish">
                            <Typography className='text-md hover:text-blue-300 cursor-pointer w-auto'>
                                Publish
                            </Typography>
                        </Link>
                        <Link to="carshop">
                            <Typography className='text-md hover:text-blue-300 cursor-pointer w-auto'>
                                Shopping cart
                            </Typography>
                        </Link>
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
                                {
                                    categories.map((e)=>(
                                        <MenuItem className='options' onClick={handleClose}>{e}</MenuItem>
                                    ))
                                }
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