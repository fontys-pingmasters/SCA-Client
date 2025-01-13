import { FaChartBar, FaHome, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="w-full bottom-0 flex justify-around pt-5">
            <Link to="/leaderboard" className="text-gray-700 text-4xl hover:opacity-80">
                <FaChartBar />
            </Link>
            <Link to="/home" className="text-orange-500 text-4xl hover:opacity-80">
                <FaHome />
            </Link>
            <Link to="/account" className="text-gray-700 text-4xl hover:opacity-80">
                <FaUser />
            </Link>
        </div>
    );
};

export default Footer;