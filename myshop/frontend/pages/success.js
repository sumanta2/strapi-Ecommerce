const success = ({ order }) => {
    const id = order.data.id;
    const orderDetails = order.data.attributes
    // console.log(id)
    // console.log(orderDetails)
    return (
        <div className="min-h-screen">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-4 text-gray-900">{orderDetails.status === "TXN_SUCCESS" ? "Your Order has been placed" : "Sorry Your order become failed"}</h1>
                        {orderDetails.status === "TXN_SUCCESS" && (
                            <div className='flex items-left flex-col'>
                                <div className="flex flex-col sm:flex-row sm:items-center ">
                                    <div className="flex w-[144px] font-semibold">Name:</div>
                                    <div className="flex">{orderDetails.name}</div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex w-[144px] font-semibold">OrderId:</div>
                                    <div className="flex">{orderDetails.orderid}</div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center ">
                                    <div className="flex w-[144px] font-semibold">Email:</div>
                                    <div className="flex">{orderDetails.email}</div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex w-[144px] font-semibold">Product Name:</div>
                                    <div className="flex">{orderDetails.product[0]}</div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex w-[144px] font-semibold">Address:</div>
                                    <div className="flex ">{orderDetails.address}</div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex w-[144px] font-semibold">TransactionId:</div>
                                    <div className="flex">{orderDetails.transactionid}</div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex w-[144px] font-semibold">Amount:</div>
                                    <div className="flex">{orderDetails.amount}</div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex w-[144px] font-semibold">Status:</div>
                                    <div className="flex">{orderDetails.status}</div>
                                </div>

                            </div>
                        )}
                    </div>
                    <div className="flex lg:w-2/3 w-full sm:flex-row sm:items-center flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                    </div>
                </div>
            </section>
        </div>
    )
}
export default success


export async function getServerSideProps(context) {
    const url = `${process.env.NEXT_PUBLIC_url2}api/orders/${context.query.id}`

    let a = await fetch(url)
    let order = await a.json()

    return {
        props: { order: order },
    }
}

