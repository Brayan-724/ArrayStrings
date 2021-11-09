
const number = require("./number");

const zero = "![]";
const one  = "!![]";

function _parse(isStrict, ...ns) {
	return ns.map(e => {
		if(typeof e === "number") return number(e, isStrict);
		if(typeof e === "string") return e;

		throw new TypeError("'Param' should be number or string instead of " + typeof e);
	});
}

function add(_a, _b, isStrict = true) {
	const [a, b] = _parse(isStrict, _a, _b);
	return  `(${a}+${b})`;
}

function mult(_a, _b, isStrict = true) {
	const [a, b] = _parse(isStrict, _a, _b);
	return `(${a}*${b})`;
}

function pow(_a, _b, isStrict = true) {
	const [a, b] = _parse(isStrict, _a, _b);
	return `((${a})**(${b}))`;
}

module.exports = {
	add,
	mult,
	pow
}
