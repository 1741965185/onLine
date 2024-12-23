const https = require('https');
const crypto = require('crypto');
const querystring = require('querystring');
const axios = require('axios');

// 定义 API 凭证和项目 ID
const api_config = {
	"api_key": '1b0ce078-fabc-4411-b2b3-da3aaa5f6cb3',
	"secret_key": '2DE42C808E91CD751B07B1FD26BD5D5E',
	"passphrase": 'Qazwsx666.',
	"project": 'be5f5b3f351fda95a6a943abb23adb4d' // 此处仅适用于 WaaS APIs
};

const url = "https://www.okx.com";

function preHash(timestamp, method, request_path, params) {
	// 根据字符串和参数创建预签名
	let query_string = '';
	if (method === 'GET' && params) {
		query_string = '?' + querystring.stringify(params);
	}
	if (method === 'POST' && params) {
		query_string = JSON.stringify(params);
	}
	return timestamp + method + request_path + query_string;
}

function sign(message, secret_key) {
	// 使用 HMAC-SHA256 对预签名字符串进行签名
	const hmac = crypto.createHmac('sha256', secret_key);
	hmac.update(message);
	return hmac.digest('base64');
}

function createSignature(method, request_path, params) {
	// 获取 ISO 8601 格式时间戳
	const timestamp = new Date().toISOString().slice(0, -5) + 'Z';
	// 生成签名
	const message = preHash(timestamp, method, request_path, params);
	console.log(message);
	const signature = sign(message, api_config['secret_key']);
	console.log(signature);
	return { signature, timestamp };
}

async function sendGetRequest(request_path, params) {
	// 生成签名
	const { signature, timestamp } = createSignature("GET", request_path, params);

	// 生成请求头
	const headers = {
		'OK-ACCESS-KEY': api_config['api_key'],
		'OK-ACCESS-SIGN': signature,
		'OK-ACCESS-TIMESTAMP': timestamp,
		'OK-ACCESS-PASSPHRASE': api_config['passphrase'],
		'OK-ACCESS-PROJECT': api_config['project'] // 这仅适用于 WaaS APIs
	};

	try {
		const response = await axios.get(`${url}${request_path}${params ? `?${querystring.stringify(params)}` : ''}`, {
			headers: headers
		});

		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Error:', error.response ? error.response.data : error.message);
		throw error;
	}
}

async function sendPostRequest(request_path, params) {
	// 生成签名
	const { signature, timestamp } = createSignature("POST", request_path, params);

	// 生成请求头
	const headers = {
		'OK-ACCESS-KEY': api_config['api_key'],
		'OK-ACCESS-SIGN': signature,
		'OK-ACCESS-TIMESTAMP': timestamp,
		'OK-ACCESS-PASSPHRASE': api_config['passphrase'],
		'OK-ACCESS-PROJECT': api_config['project'], // 这仅适用于 WaaS APIs
		'Content-Type': 'application/json' // 根据实际情况调整 Content-Type
	};

	try {
		const response = await axios.post(`${url}${request_path}`, params, {
			headers: headers
		});

		return response.data;
	} catch (error) {
		console.error('Error:', error.response ? error.response.data : error.message);
		throw error;
	}
}
export default {sendGetRequest,sendPostRequest}
