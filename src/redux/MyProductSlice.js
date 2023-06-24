const { createSlice } = require("@reduxjs/toolkit");

const MyProductSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers:{
        addMyProducts: (state, action) => {
            const { id, qty } = action.payload;
            const existingProduct = state.find(product => product.id === id);
            if (existingProduct) {
                existingProduct.qty = existingProduct.qty+1;
            } else {
                state.push(action.payload);
            }
        },
        removeMyProduct: (state, action) => {
            const { id, qty } = action.payload;
            const existingProduct = state.find(product => product.id === id);
        
            if (existingProduct) {
                if (existingProduct.qty > qty) {
                    existingProduct.qty = existingProduct.qty-1;
                } else {
                    const index = state.findIndex(product => product.id === id);
                    if (index !== -1) {
                        state.splice(index, 1);
                    }
                }
            }
        }
    }
});

export const {addMyProducts,removeMyProduct} = MyProductSlice.actions;
export default MyProductSlice.reducer;