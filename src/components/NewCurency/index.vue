<template>
	<div v-if="visible" class="popup-overlay">
		<div class="popup">
			<div @click="closePopup" style="display: flex;justify-content: space-between;align-items: center;width: 100%">
				<div></div>
				<div>{{ $t('login.openAccount') }}</div>
				<img class="close-button" style="cursor: pointer;width: 16px;
height: 15px;" src="@/assets/images/close.png" @click="closePopup" alt="关闭按钮" />
			</div>
			<div class="image-wrapper">
				<img src="@/assets/images/authenticationprocessing_mian.png" alt="认证处理中图片">
			</div>
			<span style="font-family: PingFangSC, PingFang SC;
font-weight: 500;
font-size: 24px;
color: #211F32;
line-height: 30px;
text-align: center;
font-style: normal;
">{{$t('translations.completeAuthentication')}}</span>
			<div class="button-container">
				<el-button :loading="loading"  @click="openAccount" style="width: 460px;
height: 44px;" type="primary">{{$t('translations.getAccountToBank')}}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { getCertificationStatus } from "@/api/certification";
import router from "@/router";

export default {

	name: "CurrencyPopup",
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			loading:false
		};
	},
	methods: {
		closePopup() {
			// 关闭弹窗的逻辑
			// ...
			this.$store.commit("hidePopup"); // 调用 Vuex 模块的 hidePopup 方法来关闭弹窗
		},
		async	openAccount() {
			this.loading=false;
			// 0 未实名 1 已实名 2 审核中
			await getCertificationStatus({
				merId: sessionStorage.getItem("merId"),
			})
				.then((response) => {
					var certificationStatus = response.data;
					this.closePopup()
					if (certificationStatus === 2) {

						this.$store.dispatch("goToAuthentication"); // 调用 goToAuthentication action

					} else if (certificationStatus === 0) {
						this.$router.push({ path: "/verify" });

					} else {
						this.$router.push({ path: "/verify" });

					}
				})
				.catch((error) => {
					console.error(error);
				});
			this.loading=true;

		},

	},
};
</script>

<style>
.popup-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 3000;
}

.popup {
	width: 660px;
	height: 400px;
	background: #FFFFFF;
	border-radius: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	/*justify-content: center;*/
	padding: 29px 32px 69px 29px;
	box-sizing: border-box;
}

.button-container {
	margin-top: 20px;
}

.button-container button {
	margin-left: 10px;
}
.image-wrapper {
	margin-bottom: 24px;
	margin-top: 10px;

}

.image-wrapper img {
	width: 162px;
	height: 147px;
}
</style>