document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('adminLoginForm');
    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');
    const submitButton = document.getElementById('adminLoginSubmit');
    const toggleButton = document.getElementById('adminTogglePassword');
    const alertBox = document.getElementById('adminLoginAlert');

    const existingSession = window.ananseAuth?.getSession();
    if (existingSession?.role === 'admin') {
        window.location.replace('admin.html');
        return;
    }

    toggleButton.addEventListener('click', () => {
        const showPassword = passwordInput.type === 'password';
        passwordInput.type = showPassword ? 'text' : 'password';
        toggleButton.setAttribute('aria-label', showPassword ? 'Hide password' : 'Show password');
        toggleButton.innerHTML = `<i class="fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}" aria-hidden="true"></i>`;
    });

    const showAlert = (message, success = false) => {
        alertBox.textContent = message;
        alertBox.classList.toggle('is-success', success);
        alertBox.hidden = false;
    };

    form.addEventListener('submit', async event => {
        event.preventDefault();
        alertBox.hidden = true;

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        if (!email || !password) {
            showAlert('Enter both your administrator email and password.');
            return;
        }

        const originalContent = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Signing in...</span>';

        try {
            const data = await window.ananseAuth.api('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            const session = window.ananseAuth.saveTokenResponse(data);

            if (session.role !== 'admin') {
                window.ananseAuth.clearSession();
                showAlert('This account does not have administrator access.');
                submitButton.disabled = false;
                submitButton.innerHTML = originalContent;
                return;
            }

            showAlert('Administrator access confirmed. Opening dashboard...', true);
            window.location.replace('admin.html');
        } catch (error) {
            showAlert(error.status === 401
                ? 'That email and password do not match an administrator account.'
                : 'Could not reach ANANSE right now. Please try again.');
            submitButton.disabled = false;
            submitButton.innerHTML = originalContent;
        }
    });
});
