import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Products } from '../types';
import axios from 'axios';
import Search from './Search';

export default function Navbar({ setData, change }: { setData: React.Dispatch<React.SetStateAction<Products[]>>, change: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [anchorMe, setAnchorMe] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorMe);
    const [categories] = React.useState<Array<string>>(
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
            "Party Supplies",
            "Tecnology"
        ]
    )

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorMe(event.currentTarget);
        console.log(anchorMe);

    };
    const handleCloseMenu = () => {
        setAnchorMe(null);
    };

    const handleClose = async (evt: string) => {
        change(true);
        const data = await (await axios.get(`${import.meta.env.VITE_API_URL}products/?categorie=${evt}&username=${import.meta.env.VITE_ACCESS}`)).data
        setData(() => {
            return data.map((e: Products) => ({
                ...e,
                created_at: new Date(e.created_at)
            }))
        })
        setAnchorMe(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='p-2' style={{ background: "#111" }}>
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
                        <Link to="/" onClick={() => change(false)}>
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
                                    categories.map((e) => (
                                        <MenuItem className='options' onClick={() => handleClose(e)}>{e}</MenuItem>
                                    ))
                                }
                            </Menu>
                        </div>
                    </div>

                    <div className='flex justify-between w-[25%]'>
                        <Search setData={setData} change={change} />
                        <SignedIn>
                            <UserButton afterSignOutUrl={window.location.href} />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode='modal' />
                        </SignedOut>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}