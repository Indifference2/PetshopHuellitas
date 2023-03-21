document.getElementById('topBtn').addEventListener('click', function () {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
});
window.onscroll = function () {
	scrollFunction();
};
function scrollFunction() {
	if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
		document.getElementById('topBtn').style.display = 'block';
	} else {
		document.getElementById('topBtn').style.display = 'none';
	}
}
