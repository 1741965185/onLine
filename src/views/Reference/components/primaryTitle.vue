<template>
	<!-- 标题 -->
	<div>
		<!-- 一级标题 -->
		<template v-if="type === 1">
			<div class="text-title">
				<div class="text-title-content">{{ title }}</div>
				<div class="text-border"></div>
			</div>
		</template>
		<!-- 二级标题 -->
		<template v-else-if="type === 2">
			<div class="text-title-two">
				<div class="text-title-content">{{ title }}</div>
			</div>
		</template>
		<!-- 三级标题 -->
		<template v-else-if="type === 3">
			<div class="text-title-three">
				<div class="text-title-content">{{ title }}</div>
			</div>
		</template>
	</div>
</template>
<script>
export default {
	props: ["title", "type"],
};
</script>
<style lang="less" scoped>
.text-title {
	width: 95%;
	height: 50px;
	display: flex;
	align-items: center;
	box-sizing: border-box;

	.text-title-content {
		margin: 0 35px 0 0;
		color: #7f8dff;
	}

	.text-border {
		flex: 1;
		height: 1px;
		background-image: linear-gradient(to right, #979797 0%, #979797 50%, transparent 50%);
		background-size: 25px 1px;
		background-repeat: repeat-x;
	}
}
.text-title-two {
	padding: 0 0 0 15px;
	font-size: 14px;
	width: 95%;
	line-height: 30px;
	box-sizing: border-box;

	.text-title-content {
		color: #7f8dff;
	}
}
.text-title-three {
    padding: 0 0 0 25px;
    font-size: 14px;
    width: 95%;
    line-height: 30px;
    box-sizing: border-box;

    .text-title-content {
        color: #7f8dff;
    }
}
</style>