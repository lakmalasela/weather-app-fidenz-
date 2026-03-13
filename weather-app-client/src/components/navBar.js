import '../pages/css/NavBar.css';
import { swalAlert } from './swalAlert';
import { useTheme } from '../contexts/ThemeContext';

const NavBar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    const handleLogout = () => {
        swalAlert('Are you sure?', 'You want to log out?', 'Logged Out!', 'You have been successfully logged out.', 'Yes, log out').then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('access_token');
                window.location.href = '/';
            }
        });
    };
    
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <button className="navbar-brand" style={{background: 'none', border: 'none', color: 'white', fontSize: '1.25rem', padding: '0', cursor: 'pointer'}}><i class="ri-heavy-showers-fill"></i> Weather App</button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        </li>
                    </ul>
                    <span className="navbar-text d-flex align-items-center gap-2">
                        <button 
                            className="nav-link active" 
                            style={{background: 'none', border: 'none', color: 'white', padding: '0.5rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}} 
                            onClick={toggleTheme}
                            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            <i className={`ri-${isDarkMode ? 'sun' : 'moon'}-line`}></i>
                            {isDarkMode ? 'Light' : 'Dark'}
                        </button>
                        <button className="nav-link active" style={{background: 'none', border: 'none', color: 'white', padding: '0.5rem 1rem', cursor: 'pointer'}} onClick={handleLogout}><i class="ri-logout-box-fill"></i> Log Out</button>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;