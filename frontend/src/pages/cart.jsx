import CartProduct from '../components/auth/CartProduct';
import NavBar from '../components/auth/nav';
import { useState } from 'react';
const Cart = () => {
    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fetchProducts = () => {
        if (!email) {
            setError('Please enter an email.');
            return;
        }
        setLoading(true);
        setError('');
        fetch(`http://localhost:8000/api/v2/product/cartproducts?email=${email}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data.cart.map(product => ({
                    quantity:
                        product['quantity'], ...product['productId']
                })));
                console.log('Products fetched:', data.cart);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products.');
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (<div className='w-full h-screen'>
        <NavBar />
        <div className='w-full h-full justify-center items-center flex'>
            <div className='w-full md:w-4/5 lg:w-4/6 2xl:w-2/3 h-full borderl border-r border-neutral-300 flex flex-col'>
                <div className='w-full h-20 flex flex-col items-center
    justify-center gap-2 p-4 bg-white shadow-md'>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                        className='border border-gray-300 rounded-lg px-4 py2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        onClick={fetchProducts}
                        className='px-4 py-2 bg-blue-500 text-white roundedlg hover:bg-blue-600 transition duration-300'
                    >
                        Fetch Products
                    </button>
                    {error && <p className='text-red-500 text-sm mt2'>{error}</p>}
                </div>
                <div className='w-full flex-grow overflow-auto px-3 py-2 gapy-2'>
                    {loading ? (
                        <div className='text-center text-gray500'>Loading...</div>
                    ) : (
                        products.length > 0 ? (
                            products.map(product => (
                                <CartProduct key={product._id} {...product}
                                />
                            ))
                        ) : (
                            <div className='text-center text-gray-500'>No
                                products found.</div>
                        )
                    )}
                </div>
            </div>
        </div>
    </div>
    );
};
export default Cart;
