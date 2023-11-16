import { Link } from 'react-router-dom';
const AccountPage = () => {
    return (
        <div>
            <p>This is the Account Page for a logged-in user</p>
            <Link to="/products/1"> Got to Products </Link>
        </div>
    );
}

export default AccountPage;
