检测用户是否打开了开发者工具
function checkDevTools() {
    if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
        alert('请不要打开开发者工具！');
        location.href = "0.0.0.0"
    }
}
每隔一段时间检测一次
setInterval(checkDevTools, 1000);


// // 禁止另存网页
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 's' ||e.key === 'S') {
        e.preventDefault(); // 阻止Ctrl+S的默认保存行为
    }
    if (e.ctrlKey && e.key === 'u'||e.key === 'U') {
        e.preventDefault(); // 阻止Ctrl+U的默认保存行为
    }
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // 阻止右键菜单默认行为
});