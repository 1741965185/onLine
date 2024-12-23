<template>
	<a class="add-template" :href="href">{{$t('editMerchant.mbxz')}}</a>
</template>
<script>
export default {
    props:['href'],
	data() {
		return {};
	},
};
</script>
<style lang="less" scoped>
.add-template {
	color: #409eff;
	font-size: 14px;
	margin: 0 12px 0 0;
	cursor: pointer;
}
</style>