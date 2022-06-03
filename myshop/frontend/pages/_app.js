import '../styles/globals.css'
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"


function MyApp({ Component, pageProps }) {
  const [ReloadKey, setReloadKey] = useState(1)
  useEffect(() => {

  }, [])

  const [cart, setCart] = useState([])

  const addToCart = (item, qty,price) => {
    console.log(item)
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
  return (<> <Navbar key={ReloadKey} cart={cart} /> <Component cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} cl {...pageProps} /></>)
}

export default MyApp
