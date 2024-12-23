<template>
	<div class="app-container">
		<div class="header">
			<h3 class="page-title">TAPXYZ支付接口</h3>
			<div class="select">
				<el-select v-model="i8Value">
					<el-option v-for="item in i8Translate" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				</el-select>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			i8Translate: [
				{
					label: "中文",
					value: "china",
				},
				{
					label: "English",
					value: "English",
				},
			],
			i8Value: "china",
		};
	},
};
</script>
<style lang="less" scoped>
.app-container {
    padding: 64px 0 15px 0;
    min-height: auto;
	.header {
		display: flex;
		justify-content: space-between;
		padding: 0 0 20px 0;
		border-bottom: 1px solid #dbdfea;
		.select {
			max-width: 100px;
		}
	}
}
</style>