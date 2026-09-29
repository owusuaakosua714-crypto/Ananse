document.addEventListener('DOMContentLoaded', () => {
    const session = window.ananseAuth?.getSession();
    if (!session || session.role !== 'admin') {
        window.location.replace('login.html');
        return;
    }

    const dashboard = document.getElementById('adminDashboard');
    const displayName = session.name || session.email;
    document.getElementById('adminName').textContent = displayName;
    document.getElementById('adminWelcomeName').textContent = displayName.split(' ')[0];
    dashboard.hidden = false;

    document.getElementById('adminLogout').addEventListener('click', () => {
        window.ananseAuth.clearSession();
        window.location.href = 'login.html';
    });
});