setTimeout(_ => {
	console.log(1);
}, 0);

new Promise((resolve, reject) => {
	console.log(2);
	new Promise((resolve) => {
		console.log(3);
		resolve();
	}).then(_ => {
		console.log(4);
		setTimeout(_ => {
			console.log(5);
		})
	});
	// resolve();
})
.then(_ => {
	console.log(6);
});
console.log(7);