import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    itemsInCart: 0 // Number of items currently in cart
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({name, image, cost, quantity: 1});
        }
        
        state.itemsInCart++;
    },
    removeItem: (state, action) => {
        const {name, quantity} = action.payload;
        state.items = state.items.filter(item => item.name !== name);
        state.itemsInCart -= quantity;
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            if (quantity == existingItem.quantity + 1) {
                state.itemsInCart++;
            } else {
                state.itemsInCart--;
            }
            existingItem.quantity = quantity;
        }
    }
    },
  },
);

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
