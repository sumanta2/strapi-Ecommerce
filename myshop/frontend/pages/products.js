import React from 'react'
import Link from 'next/link'

const products = (props) => {
  return (
    <div className="container mx-auto px-4">
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-24 mx-auto">
          <div className="flex flex-wrap w-full md:mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Product List - MyShop</h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Buy from the list of our product</p>
          </div>
          <div className="flex flex-wrap -m-4">
            {props.products.data.map((item, pos) => (
              <div key={pos} className="xl:w-1/4 p-4">
                <div className="bg-gray-100 p-6 w-56 rounded-lg">
                  <img className="h-40 rounded w-full object-center mb-6" src={item.attributes.image.data && item.attributes.image.data.attributes.name} alt="content" />
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{item.attributes.category}</h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item.attributes.title}</h2>
                  <div className="hidden bg-red-800 bg-green-800 bg-black bg-purple-800"></div>
                  <button className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none bg-${item.attributes.color}-800`}> </button>
                  <p className="leading-relaxed text-sm">{item.attributes.description}</p> 
                  <Link href={`/products/${item.attributes.slug}`}><button className="my-2 text-white bg-indigo-500 border-0 py-1 md:py-2 px-2 md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">Buy Now</button></Link>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  )
}



export async function getServerSideProps(context) {

  const url=process.env.NEXT_PUBLIC_url
  const authToken=process.env.authToken

  let a = await fetch(url,
    {
      headers: {
        Authorization: authToken
      }
    })
  let products = await a.json()
  // console.log(products)

  return {
    props: { products: products },
  }
}

export default products