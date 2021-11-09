const minifier = require("./minifier");

module.exports = function(...args) {
	const parsed = args.map(e => {
		if(typeof e === "string") return () => e;
		if(typeof e === "function") return e;
		return () => "()";
	});

	return (s = false, l = false, m = true) => {
		const str = parsed.map(e => e(s, l, m)).join("+");
		return minifier(str, m);
	}
}
