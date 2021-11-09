
const zero = "![]";
const one = "!![]";


function getN(n, minify = true) {
	return [one, ...(new Array(n - 1).fill(one))];
};

module.exports = function(n, isStrict = false, minify = true) {
	if(typeof n !== "number") 
		throw new TypeError("Number param should be number :/ instead of " + typeof n);

	if(!isStrict) return n.toString?.() || `${n}`;
	
	const absN = Math.abs(n);
	const negative = n < 0;
	let str;

	if(n === 0) str = [zero, zero];
	else
	if(absN === 1) str = [zero, one]; 
	else str = getN(absN, minify);

	str = str.join(minify ? "+" : " + ");

	return negative ? `-(${str})` : `(${str})`;
}
