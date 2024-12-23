import request from '@/utils/request'

// aaaa
export function getInfo() {
	return request({
		url: '/HKSeeTransfermnoeySufraceList/getList',
		method: 'get'
	})
}