export default () => {
    const el = document.createElement('h2');
    el.textContent = '测试webpack打包';
    document.addEventListener('click', () => {
        alert('Hello Webpack');
    });
    return el;
}