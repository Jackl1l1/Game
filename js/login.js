function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberCheckbox = document.getElementById('remember');

    if (userData[username] === password) {
        alert("登陆成功")
    } else {
        alert("用户名或密码错误")
    }

    if (rememberCheckbox.checked) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }

    // 此处可以添加登录验证的逻辑
    // console.log(`用户名: ${username}, 密码: ${password}, 记住密码: ${rememberCheckbox.checked}`);
}

// 页面加载时检查是否有记住的密码
window.addEventListener('load', () => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
        document.getElementById('username').value = storedUsername;
        document.getElementById('password').value = storedPassword;
        document.getElementById('remember').checked = true;
    }
});

