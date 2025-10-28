import { getCurrentUser } from './utils/auth';

(function checkRootRedirect() {
    const user = getCurrentUser();
    const currentPath = window.location.pathname;

    const loginPath = '/src/pages/auth/login/login.html';
    const adminPath = '/src/pages/admin/adminHome/adminHome.html';
    const storePath = '/src/pages/store/home.html';

    if (!user) {
        if (currentPath !== loginPath) {
            window.location.href = loginPath;
        }
    } else if (user.role === 'admin') {
        if (currentPath !== adminPath) {
            window.location.href = adminPath;
        }
    } else {
        if (currentPath !== storePath) {
            window.location.href = storePath;
        }
    }
})();