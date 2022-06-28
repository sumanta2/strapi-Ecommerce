import '../styles/globals.css'
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"
import Footer from '../components/Footer';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  <Head>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
  </Head>
  const [ReloadKey, setReloadKey] = useState(1)
  useEffect(() => {

  }, [])

  const [cart, setCart] = useState([])

  const addToCart = (item, qty,price) => {
    let newCart = cart
    for (let index = 0; index < qty; index++) {
      newCart.push([item,price])
      setReloadKey(Math.random())
    }

    setCart(newCart)
  }
  const removeFromCart = (item, qty) => {
    let newCart = cart
    let index = newCart.indexOf(item)
    newCart.splice(index)
    setCart(newCart)
    setReloadKey(Math.random())
  }

  const clearCart = () => {
    setCart([])
    setReloadKey(Math.random())
  }
  return (<> <Navbar key={ReloadKey} cart={cart} /> <Component cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} cl {...pageProps} /><Footer/></>)
}

export default MyApp
