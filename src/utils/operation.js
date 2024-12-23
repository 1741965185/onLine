function floatAdd(a, b) {
	var c, d, e
	try {
		c = a.toString().split(".")[1].length
	} catch (f) {
		c = 0
	}
	try {
		d = b.toString().split(".")[1].length
	} catch (f) {
		d = 0
	}
	return e = Math.pow(10, Math.max(c, d)), (floatMul(a, e) + floatMul(b, e)) / e
}

function floatSub(a, b) {
	var c, d, e
	try {
		c = a.toString().split(".")[1].length
	} catch (f) {
		c = 0
	}
	try {
		d = b.toString().split(".")[1].length
	} catch (f) {
		d = 0
	}
	return e = Math.pow(10, Math.max(c, d)), (floatMul(a, e) - floatMul(b, e)) / e
}

function floatMul(a, b) {
	var c = 0, d = a.toString(), e = b.toString()
	try {
		c += d.split(".")[1].length
	} catch (f) {
	}
	try {
		c += e.split(".")[1].length
	} catch (f) {
	}
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c)
}

function floatDiv(a, b) {
	var c, d, e = 0, f = 0
	try {
		e = a.toString().split(".")[1].length
	} catch (g) {
	}
	try {
		f = b.toString().split(".")[1].length
	} catch (g) {
	}
	return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), floatMul(c / d, Math.pow(10, f - e))
}

/**
 * 四舍五入保留num位小数
 * @param v
 * @param num 保留位数
 * @param isZeroFill 默认补0；false-不补
 * @returns {*}
 */
function toDecimal(v, num = 3, isZeroFill = false) {
	var f = parseFloat(v)
	if (isNaN(f)) {
		return false
	}
	f = Math.round(v * (Math.pow(10, num))) / Math.pow(10, num)
	var s = f.toString()
	if (isZeroFill !== false) {
		var rs = s.indexOf(".")
		if (num > 0 && rs < 0) {
			rs = s.length
			s += "."
		}
		while (s.length <= rs + num) {
			s += "0"
		}
	}
	return s
}

export default {
	floatAdd,
	floatSub,
	floatMul,
	floatDiv,
	toDecimal,
}