const Cart = () => {
    return (
        <div>
            <p>This is the Cart page</p>
        </div>
    );
}

export default Cart;

// if logged in (if token), populate the cart from database
// if not logged in, populate the cart from the redux store
