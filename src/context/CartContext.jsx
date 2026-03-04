import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'arctic-wave-cart';

function loadCart() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function cartReducer(state, action) {
    let next;
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.find(
                (i) => i.id === action.payload.id && i.size === action.payload.size && i.color === action.payload.color
            );
            if (existing) {
                next = state.map((i) =>
                    i.id === existing.id && i.size === existing.size && i.color === existing.color
                        ? { ...i, qty: i.qty + action.payload.qty }
                        : i
                );
            } else {
                next = [...state, { ...action.payload }];
            }
            break;
        }
        case 'REMOVE_ITEM':
            next = state.filter(
                (i) => !(i.id === action.payload.id && i.size === action.payload.size && i.color === action.payload.color)
            );
            break;
        case 'UPDATE_QTY':
            next = state.map((i) =>
                i.id === action.payload.id && i.size === action.payload.size && i.color === action.payload.color
                    ? { ...i, qty: Math.max(1, action.payload.qty) }
                    : i
            );
            break;
        case 'CLEAR':
            next = [];
            break;
        default:
            return state;
    }
    saveCart(next);
    return next;
}

export function CartProvider({ children }) {
    const [items, dispatch] = useReducer(cartReducer, [], loadCart);

    useEffect(() => {
        saveCart(items);
    }, [items]);

    const addItem = (product, size, color, qty = 1) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: { id: product.id, name: product.name, price: product.price, size, color, qty },
        });
    };

    const removeItem = (id, size, color) => dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } });
    const updateQty = (id, size, color, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, size, color, qty } });
    const clearCart = () => dispatch({ type: 'CLEAR' });

    const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
