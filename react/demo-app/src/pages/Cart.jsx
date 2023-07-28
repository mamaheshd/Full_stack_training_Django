import React, { useState, useEffect, Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const [products, setProducts] = useState([])
    // load product from the localStorage
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart'))
        setProducts(cartData)
    }, [])
    // decrease Quentity
    const decreaseQty = id => {
        const updateProduct = products.map(item => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 }
            }
            return item
        })
        setProducts(updateProduct)
        localStorage.setItem('cart', JSON.stringify(updateProduct))
    }

    // increase quentity
    const increaseQty = id => {
        const updateProduct = products.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        setProducts(updateProduct)
        localStorage.setItem('cart', JSON.stringify(updateProduct))
    }
    // remove from cart 
    const removeCartHandler = (id, name) => {
        const filterCart=products.filter(item=>item.id !==id)
        localStorage.setItem('cart',JSON.stringify(filterCart))
        setProducts(filterCart)
        toast.success(`${name} is removed from the cart`)
    }

    return (
        <>
            <ToastContainer theme='colored' position='top-center' />
            <div className="container">
                <div className="row d-flex justify-content-between my-4">
                    {
                        products.length === 0 ?
                            <h1 className='my-5 text-danger text-center'>
                                Your cart is Empty
                            </h1>
                            : (
                                <Fragment>
                                    <h2 className='text-center'>
                                        Your cart Items
                                    </h2>
                                    <div className="col-md-8 shadow">
                                        {products.map((item, i) => (
                                            <Fragment key={i}>
                                                <hr />
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-2">
                                                        <img src={item.image} alt={item.title} width={'50'} />
                                                    </div>
                                                    <div className="col-3">
                                                        <strong> {item.title} </strong>
                                                    </div>
                                                    <div className="col-2">
                                                        <span className="text-warning">${item.price}</span>
                                                    </div>
                                                    <div className="col-3">
                                                        <button className="btn btn-primary" onClick={() => decreaseQty(item.id)}>-</button>
                                                        &nbsp;
                                                        <span>{item.quantity}</span>
                                                        &nbsp;
                                                        <button className="btn btn-primary" onClick={() => increaseQty(item.id)}>+</button>
                                                    </div>
                                                    <div className="col-1">
                                                        <button className="btn btn-danger" onClick={() => removeCartHandler(item.id, item.title)}><FaTrash /></button>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))}
                                    </div>
                                    <div className="col-md-3">
                                        <div className="shadow p-2">
                                            <h5>Cart summary</h5>
                                            <hr />
                                            <p><strong>Units:</strong>{products.reduce((ac, item) => (ac + Number(item.quantity)), 0)}</p>
                                            <p><strong>Total:</strong>${products.reduce((ac, item) => (ac + item.quantity * item.price), 0)}</p>
                                            <hr />
                                            <button className="btn btn-warning">Check Out</button>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                    }
                </div>
            </div>

        </>
    )
}

export default Cart