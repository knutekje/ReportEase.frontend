
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import Navbar from "./layout/Navbar.tsx";
import Footer from "./layout/Footer.tsx";
import {Outlet} from "react-router-dom";


export const StartPage = () => {


    return(<Box
               sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   minHeight: '100vh',
                   bgcolor: 'background.default',
                   color: 'text.primary',
               }}
           >
               <Navbar />
               <Container sx={{ flexGrow: 1, py: 4 }}>
               <Outlet/>
               </Container>
               <Footer />
           </Box>)
}
