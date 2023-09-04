import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import { ClerkProvider } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { dark } from '@clerk/themes';
import ProductMaximize from "./components/ProductMaximize";
import CarShop from "./pages/CarShop";
import { useRef, useState } from "react";
import { Products } from "./types";

const publicKey = import.meta.env.VITE_CLERK_KEY

function App() {
  const [data, setData] = useState<Products[]>([]);
  const change = useRef<boolean>(false);

  return (
    <>
      <BrowserRouter>
        <ClerkProvider appearance={{
          baseTheme: dark
        }} publishableKey={publicKey} navigate={(to) => { const navaigate = useNavigate(); navaigate(to) }}>
          <Navbar setData={setData} change={change} />
          <Routes>
            <Route path="/" element={<Home data={data} change={change} setData={setData} />} />
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
                  <CarShop />
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
