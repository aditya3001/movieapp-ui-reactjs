import { Button, Modal } from "@material-ui/core";
import React, { useState } from "react";
import "./Header.css"
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FormControl, Input, InputLabel } from "@mui/material";
import { TabPanel, TabContext,TabList } from "@mui/lab";


function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}
const Header = (props) => {

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [st, setSt] = useState()
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const LoginForm = () => {
        const loginHandler = () => {

        }
        return (<div>
            <FormControl required className="formControl">
                <InputLabel htmlFor="userName">Username</InputLabel>
                <Input id="userName" aria-describedby="my-helper-text" />

            </FormControl><br />
            <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" aria-describedby="my-helper-text" />

            </FormControl><br />
            <br />
            <Button
                variant="contained"
                onClick={loginHandler}
                color="primary"
            >LOGIN</Button>
        </div>)
    }

    const SignInForm = () => {
        const signInHandler = () => {

        }
        return (<div>
            <FormControl required className="formControl">
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input id="firstName" />

            </FormControl>
            <FormControl required className="formControl">
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input id="lastName" />

            </FormControl>
            <FormControl required className="formControl">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" />

            </FormControl>

            <FormControl required className="formControl">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" aria-describedby="my-helper-text" />

            </FormControl>
            <FormControl required className="formControl">
                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                <Input id="contact" />

            </FormControl><br></br>
            <Button
                variant="contained"
                onClick={signInHandler}
                color="primary"
            >REGISTER</Button>
        </div>)
    }

    return (
        <div>
            <div className="header-fixed">
                <Button variant="contained" className="login-btn" onClick={handleOpen} >LOGIN</Button>
                <Button variant="contained" className="login-btn">LOGOUT</Button>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div style={modalStyle} className="paper">
                        {/* <TabContext value={value}>

                        <Box sx={{ width: '100%' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value="one" label="Item One" />
                                <Tab value="two" label="Item Two" />
                            </Tabs>
                        </Box>

                        <TabPanel value={value} index={0}>
                            <LoginForm></LoginForm>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                        <SignInForm></SignInForm>
                        </TabPanel>
                        </TabContext> */}

                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example" 
                                    variant="fullWidth">
                                        <Tab label="LOGIN" value="1" />
                                        <Tab label="SIGNIN" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1"><LoginForm /></TabPanel>
                                <TabPanel value="2"><SignInForm /></TabPanel>
                                <TabPanel value="3">Item Three</TabPanel>
                            </TabContext>
                        </Box>

                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Header;