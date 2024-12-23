<template>
	<div class="authentication-processing">
		<div class="image-wrapper">
			<img src="./assets/img/authenticationprocessing_mian.png" alt="认证处理中图片">
		</div>
		<p>{{this.$t('translations.authenticationProcessing')}}</p>
		<el-button class="return-button" type="primary" @click="goToTop">{{this.$t('translations.return')}}</el-button>
		<div class="account-switch" @click="goToRegister">
			<span>申请测试商户</span>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		goToTop() {
			// 处理返回按钮的逻辑
			// 使用Vue Router的replace方法替代当前路由，关闭其他页面
			this.$router.replace('/');
		},
		goToRegister(){
			var merNo = sessionStorage.getItem("merNo");
			window.open("https://testmerchant.onlinepay.ai/login?realMerNo="+merNo+"&jumpType=1")
		}
	}
};
</script>

<style scoped>
.account-switch{
	padding-top:10px;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 14px;
	color: #7F8DFF;
	line-height: 20px;
	text-align: left;
	font-style: normal;
}
.authentication-processing {
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	height: 100vh;
}
.authentication-processing p{
	font-family: PingFangSC, PingFang SC;
	font-weight: 500;
	font-size: 24px;
	color: #364A63;
	line-height: 26px;
	text-align: right;
	font-style: normal;
}

.image-wrapper {
	margin-bottom: 20px;
	margin-top: 216px;

}

.image-wrapper img {
	width: 162px;
	height: 147px;
}

.return-button {
	margin-top: 20px;
	width: 180px;
	height: 40px;
	background: #7F8DFF;
	border-radius: 4px;
}
</style>