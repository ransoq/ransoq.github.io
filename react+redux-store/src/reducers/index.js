const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: false,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;

            const itemInd = state.items.findIndex(item => item.id === id);
            if (itemInd >= 0) {
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }

                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }

            }
            
            // товара не было в корзине
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1
            };

            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            };
        case 'ITEM_DELETE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];

            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - price
            };
        case 'ITEM_REMOVE_FROM_CART':
            const idItem = action.payload;
            const currentItemIndex = state.items.findIndex(item => item.id === idItem);
            const currentPrice = state.items[currentItemIndex]['price'];
            if (state.items[currentItemIndex]['qtty'] > 1) {
                const itemInState = state.items.find(item => item.id === idItem);
                const newItem = {
                    ...itemInState,
                    qtty: --itemInState.qtty
                }
                
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, currentItemIndex),
                        newItem,
                        ...state.items.slice(currentItemIndex + 1)
                    ],
                    totalPrice: state.totalPrice - currentPrice
                };
            };
            return {
                ...state,
                items: [
                    ...state.items.slice(0, currentItemIndex),
                    ...state.items.slice(currentItemIndex + 1)
                ],
                totalPrice: state.totalPrice - currentPrice
            };
        case 'ITEM_QTTY_TO_CART':
            const ItemId = action.payload;

            const newItemInd = state.items.findIndex(item => item.id === ItemId);
            const itemInState = state.items.find(item => item.id === ItemId);
            const uploadItem = {
                ...itemInState,
                qtty: ++itemInState.qtty
            }

            return {
                ...state,
                items: [
                    ...state.items.slice(0, newItemInd),
                    uploadItem,
                    ...state.items.slice(newItemInd + 1)
                ],
                totalPrice: state.totalPrice + uploadItem.price
            }
        default: 
            return state;
    }
}

export default reducer;