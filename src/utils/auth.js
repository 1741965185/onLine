import Cookies from "js-cookie";

const TokenKey = "JWT";
let seconds = 60 * 60 * 24; // 60秒 * 60分钟 * 24小时
let expires = new Date(new Date() * 1 + seconds * 1000);

export function getToken() {
	return Cookies.get(TokenKey);
}

export function setToken(token) {
	return Cookies.set(TokenKey, token, { expires: expires });
}

export function removeToken() {
	return Cookies.remove(TokenKey);
}
