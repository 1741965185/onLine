<template>
	<!-- 图片盒子 -->
	<div class="img-wrap">
		<img :src="imgUrl" />
		<div>{{ text }}</div>
	</div>
</template>
<script>
export default {
	props: ["imgUrl", "text"],
};
</script>
<style lang="less" scoped>
.img-wrap {
	display: flex;
	flex-direction: column;
	text-align: center;
	color: #6e82a5;
	font-size: 14px;
}
img {
	width: 95%;
}
</style>