import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ColorRing } from 'react-router-dom'
import Card from './Card'

const CartContainer = () => {
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products`)
                console.log(response.data)
                setProduct(response.data)
                setLoading(false)
            }
            catch {
                console.log(err)
            }
        }
        // simulate 2 second delay before fetching data
        const delay = setTimeout(() => {
            fetchProduct()
            clearTimeout(delay)
        }, 2000)
    }, [])
    return (
        <>
            {loading ? (
                <div className='d-flex justify-content align-item-center' style={{ height: '50vh' }}>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            ) : (
                    products.map((item,i)=>(
                        <Card key={i} data={item}/>
                    ))
        )}
        </>
    )
}

export default CartContainer