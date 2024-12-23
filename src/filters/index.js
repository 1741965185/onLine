export default (Vue) => {
	//	过滤各种状态
	Vue.filter("reasonFilter", (val, jfReason) => {
		let str = "";
		jfReason.map(item => {
			if ((item.value === null ? null : (+item.value).toString() === "NaN" ? item.value : +item.value) === (val === null ? null : (+val).toString() === "NaN" ? val : +val)) str = item.label;
		});
		return str;
	});
}
