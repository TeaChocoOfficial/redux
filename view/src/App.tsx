//-Path: "redux/view/src/App.tsx"
import { useEffect } from 'react';
import { AddProduct, useProduct } from './global/product';

export default function App() {
    const product = useProduct();
    const addProduct = AddProduct();

    useEffect(() => {
        addProduct({ id: 3, name: 'test', price: 200 });
    }, []);

    return (
        <div>
            <h1>test</h1>
            {product.map((item) => (
                <div key={item.id}>
                    <p>id:{item.id}</p>
                    <p>name:{item.name}</p>
                    <p>price:{item.price}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}
