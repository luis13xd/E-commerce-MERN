import React, { useContext } from 'react';
import './CartItems.css';
import { HomeContext } from '../../Context/HomeContext';
import remove_icon from '../Assets/cart_cross_icon.png';

export const CartItems = () => {

    const { all_product,
        cartItems,
        removeFromCart,
        getTotalCartAmount,
        cupon,
        setCupon,
        descuento,
        setDescuento,
        validarCupon,
        getSubtotal,
        selectedSize,
    } = useContext(HomeContext);

    const handleWhatsapp = () => {
        const productos = all_product.filter(producto => cartItems[producto.id] > 0);

        let descuentoMensaje = '';
        if (descuento > 0) {
            descuentoMensaje = `\n\n ◆ Descuento con cupón: ${formatCurrency(getTotalCartAmount() - getSubtotal())}`;
        }

        const mensaje = "☆ ¡Hola! Quiero comprar estos productos ☆\n\n" +
            productos.map(producto => {
                const talla = selectedSize[producto.id] ? selectedSize[producto.id].join(', ') : 'Sin Talla';
                return `◇ ${producto.name}: ${formatCurrency(producto.new_price)} x ${cartItems[producto.id]} unidad, Talla: ${talla}`;
            }).join('\n') +
            `${descuentoMensaje}` +
            `\n\n ► Total: ${formatCurrency(getTotalCartAmount())}`;

        const encodedMensaje = encodeURIComponent(mensaje);

        window.open(`https://wa.me/573102487593?text=${encodedMensaje}`, "_blank");
    };

    const formatCurrency = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleCuponChange = (e) => {
        if (e.target.value.length <= 14) {
            setCupon(e.target.value.toUpperCase());
        }
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Productos</p>
                <p>Titulo</p>
                <p>Talla</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Total</p>
                <p>Quitar</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div key={e.id}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className="carticon-product-icon" />
                            <p>{e.name}</p>
                            {selectedSize[e.id] && (
                                <p className='cartitems-size'>{selectedSize[e.id].join(', ')}</p>
                            )}
                            {/* <p className='cartitems-size'>{selectedSize[e.id] || 'Sin Talla'}</p> */}
                            <p>{formatCurrency(e.new_price)}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>{formatCurrency(e.new_price * cartItems[e.id])}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h2>Detalles de la compra</h2>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>{formatCurrency(getSubtotal())}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Envío</p>
                            <p>Gratis</p>
                        </div>
                        <hr />

                        <div className="cartitems-total-item">
                            <p>Cupón de descuento</p>
                            <p className='cartitems-total-item-desc'>{formatCurrency(getTotalCartAmount() - getSubtotal())}</p>
                        </div>

                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>{formatCurrency(getTotalCartAmount())}</h3>
                        </div>
                    </div>
                    <button onClick={handleWhatsapp}>Ir a pagar</button>
                </div>
                <div className="cartitems-promocode">
                    <p>Si tienes un codigo promocional, ponlo aquí</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Codigo promocional' value={cupon} onChange={handleCuponChange} maxLength={14} />
                        <button onClick={validarCupon}>Validar código</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
