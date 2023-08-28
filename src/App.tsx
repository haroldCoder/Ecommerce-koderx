import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import CarShop from "./pages/CarShop";
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import { ClerkProvider } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { dark } from '@clerk/themes';
import ProductMaximize from "./components/ProductMaximize";

const publicKey = import.meta.env.VITE_CLERK_KEY

function App() {

  return (
    <>
      <BrowserRouter>
        <ClerkProvider appearance={{
          baseTheme: dark
        }} publishableKey={publicKey} navigate={(to) => { const navaigate = useNavigate(); navaigate(to) }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publish" element={
              <>
                <SignedIn>
                  <Publish />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/carshop" element={
              <>
                <SignedIn>
                  <CarShop/>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="/cards/:id" element={<ProductMaximize/>} />
          </Routes>
        </ClerkProvider>
      </BrowserRouter>
    </>
  )
}

export default App
