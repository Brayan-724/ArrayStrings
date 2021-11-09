const number = require("./number");
const math = require("./math");
const rr = require("../util/minifier");

function smartNumber(n, isStrict = false, minify = true) {
	if(typeof n === "string") n = parseInt(n, 10);
	else
	if(typeof n !== "number") 
		throw new TypeError("Number param should be number :/ instead of " + typeof n);

	if(!isStrict) return n.toString?.() || `${n}`;
	
	const absN = Math.abs(n);
	const negative = n < 0;

	if(absN <= 5) return number(n, true, minify);

	if(n % 2 === 0) 
		return rr(math.mult(smartNumber(absN / 2, true, minify), 2));
	else
	if(Math.sqrt(absN) % 1 === 0) 
		return rr(math.pow(smartNumber(Math.sqrt(absN), true, minify), 2));
	else return rr(math.add(math.mult(smartNumber((absN / 2)|0, true, minify), 2), 1));
}

module.exports = smartNumber;
