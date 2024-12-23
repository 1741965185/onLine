<template>
	<div class="activation-modal__overlay" v-if="isVisible" @click.self="closeModal">
		<div class="activation-modal__content">
			<div class="activation-modal__header">
				<div class="spacer"></div>
				<h2 class="activation-modal__title">{{$t("card.activate_card")}}</h2>
				<button class="activation-modal__close-btn" @click="closeModal">&times;</button>
			</div>
			<div class="activation-modal__body">
				<div class="activation-modal__info-box">
					<p class="activation-modal__info-text">{{$t("card.active_desc")}}</p>
					<div class="activation-modal__address-info">
						<div class="activation-modal__address-row">
							<p class="activation-modal__address-item">{{$t("card.post_country")}}: {{ cardData.shippingCountry }}</p>
							<p class="activation-modal__address-item">{{$t("card.address")}}: {{ cardData.shippingAddress }}</p>
						</div>
						<div class="activation-modal__address-row-two">
							<p class="activation-modal__address-item" hidden>邮寄城市: {{ cardData.shippingCity }}</p>
							<p class="activation-modal__address-item" hidden>邮寄省/市: {{ cardData.shippingState }}</p>
						</div>
					</div>
				</div>
				<div class="activation-modal__form">
					<div class="activation-modal__form-row">
						<div class="activation-modal__form-group">
							<label class="activation-modal__form-label">{{$t("card.card_number")}}</label>
							<el-input v-model="formData.cardNo"></el-input>
						</div>
						<div class="activation-modal__form-group">
							<label class="activation-modal__form-label">{{$t("card.exp_date")}}</label>
							<el-input v-model="formData.expireDate" placeholder="MM/YY" @input="formatExpiryDate"></el-input>
						</div>
					</div>
					<div class="activation-modal__form-row">
						<div class="activation-modal__form-group">
							<label class="activation-modal__form-label">CVV</label>
							<el-input v-model="formData.cvv"></el-input>
						</div>
						<div class="activation-modal__form-group">
							<label class="activation-modal__form-label">{{$t("card.id_number_ac")}}</label>
							<el-input v-model="formData.idNumber"></el-input>
						</div>
					</div>
					<div class="activation-modal__form-row">
						<div class="activation-modal__form-group">
							<label class="activation-modal__form-label">{{$t("card.date_birthday")}}</label>

							<el-date-picker
								v-model="formData.birthday"
								type="date"
								placeholder=""
								format="yyyy-MM-dd"
								:picker-options="birthdayPickerOptions">
							</el-date-picker>
						</div>
					</div>
				</div>
			</div>
			<div class="activation-modal__footer">
				<el-button @click="closeModal">{{$t("card.cancel")}}</el-button>
				<el-button type="primary" @click="confirmActivation">{{$t("card.confirmd")}}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { activeCard, } from "@/api/certification";

export default {
	name: 'ActivationModal',
	props: {
		cardData: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			isVisible: false,
			formData: {
				cardNo: '',
				cvv: '',
				expireDate: '',
				idNumber: '',
				birthday: ''
			},
			birthdayPickerOptions: {
				// disabledDate(time) {
				// 	return time.getTime() <= Date.now(); // 禁用当前日期及之前的日期
				// }
			}
		}
	},
	methods: {
		showModal() {
			this.isVisible = true;
		},
		closeModal() {
			this.isVisible = false;
		},
		formatExpiryDate() {
			let value = this.formData.expireDate.replace(/\D/g, '');
			if (value.length > 2) {
				value = value.slice(0, 2) + '/' + value.slice(2, 4);
			}
			this.formData.expireDate = value;
		},
		formatBirthday(date) {
			if (date) {
				const formattedDate = this.$dayjs(date).format('YYYYMMDD'); // 使用 dayjs 格式化日期
				this.formData.birthday = formattedDate;
			}
		},
		confirmActivation() {
			console.log('Activation confirmed', this.formData);
			activeCard(this.formData)
				.then((response) => {
					if (response.status === 200) {
						this.$message.success(response.msg);
						this.formData = {};
						this.$emit('activateSuccess'); // 触发自定义事件
						this.closeModal();
					} else {
						this.$message.error(response.msg);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
}
</script>

<style scoped>
.activation-modal__overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2000;
}

.activation-modal__content {
	width: 660px;
	height: 560px;
	padding: 21px 30px 36px 30px;
	background: #FFFFFF;
	border-radius: 24px;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
}

.activation-modal__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
}

.activation-modal__title {
	font-weight: 500;
	font-size: 24px;
	color: #211F32;
	line-height: 30px;
	text-align: right;
	font-style: normal;
}

.spacer {
	width: 30px;
}

.activation-modal__close-btn {
	background: none;
	border: none;
	color: #999999;
	font-size: 30px;
	cursor: pointer;
}

.activation-modal__body {
	flex-grow: 1;
	padding: 0 20px;
}

.activation-modal__info-box {
	background: #F7F9FE;
	border-radius: 16px;
	padding: 21px 20px;
	margin-bottom: 20px;
}

.activation-modal__info-text {
	margin-bottom: 16px;
	font-weight: 400;
	font-size: 14px;
	color: #364A63;
	line-height: 20px;
	text-align: left;
	font-style: normal;
}

.activation-modal__address-row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}

.activation-modal__address-row-two {
	display: flex;
	justify-content: space-between;
}

.activation-modal__address-item {
	flex: 0 0 48%;
	font-weight: 400;
	font-size: 14px;
	color: #526484;
	line-height: 20px;
	text-align: left;
	font-style: normal;
}

.activation-modal__form-row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
}

.activation-modal__form-group {
	flex: 0 0 48%;
}

.activation-modal__form-label {
	margin-bottom: 7px; /* 设置标签与输入框的间距 */
	font-weight: 400;
	font-size: 14px;
	color: #526484;
	line-height: 18px;
	text-align: left;
	display: block;
	font-style: normal;}

.activation-modal__footer {
	display: flex;
	justify-content: flex-end;
	padding: 20px;
}

/* Element UI overrides */
.el-input {
	width: 100%;
}

.el-date-editor.el-input {
	width: 100%;
}
</style>