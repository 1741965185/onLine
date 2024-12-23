<template>
	<div class="fund-transfer" @click="handleGlobalClick">
		<div class="fund-transfer__header">
			<img
				class="fund-transfer__back-icon"
				src="./assets/img/SketchPngcf0409b4e46f3940a18dee8cef0a718f8e87f756e6ad8a6a090d89e68dd18479.png"
				@click="goBack"
			/>
		</div>

		<div class="fund-transfer__content">
			<h1 class="fund-transfer__title">{{$t("card.transfer")}}</h1>
			<p class="fund-transfer__subtitle" v-if="!isSwapped">{{$t("card.wallet_balance")}}{{$t("card.transfer_to")}}OnlinePay Card</p>
			<p class="fund-transfer__subtitle" v-else>OnlinePay Card{{$t("card.transfer_to")}}{{$t("card.wallet_balance")}}</p>

			<div class="fund-transfer__form">
				<!-- Transfer Account Section -->
				<div class="fund-transfer__accounts">
					<div class="fund-transfer__row">
						<span class="fund-transfer__label">{{$t("card.from")}}</span>
						<div class="fund-transfer__select">

							<div class="fund-transfer__select-content">
								<img
									:src="isSwapped ? require('./assets/img/card_select_fundtransfer.png') : require('./assets/img/wallet_select_foundtransfer.png')"
									:alt="isSwapped ? 'card' : 'Wallet'"
									class="fund-transfer__account-icon"
								/>
								<span class="fund-transfer__account-text">
                  {{ isSwapped ? selectedCard : selectedWallet }}
                </span>
							</div>
						</div>
					</div>

					<div class="fund-transfer__swap-wrapper">
						<img
							src="./assets/img/swap_found.png"
							class="fund-transfer__swap-icon"
							@click="handleSwap"
						>
					</div>

					<div class="fund-transfer__row fund-transfer__row--destination">
						<span class="fund-transfer__label">{{$t("card.to")}}</span>
						<div class="fund-transfer__select">
							<div class="fund-transfer__select-content">
								<img
									:src="!isSwapped ? require('./assets/img/card_select_fundtransfer.png') : require('./assets/img/wallet_select_foundtransfer.png')"
									:alt="!isSwapped ? 'card' : 'Wallet'"
									class="fund-transfer__account-icon"
								/>
								<span class="fund-transfer__account-text">
                  {{ isSwapped ? selectedWallet : selectedCard }}
                </span>
							</div>
						</div>
					</div>
				</div>

				<!-- Amount Input Section -->
				<div class="fund-transfer__amount">
					<span class="fund-transfer__amount-label">{{$t("card.amount")}}</span>
					<div class="fund-transfer__amount-input-container">
						<input
							v-model.trim="amount"
							type="text"
							class="fund-transfer__amount-input"
							placeholder="0"
							@input="validateAmount"
						>
						<div class="fund-transfer__currency-selector">
							<section
								class="fund-transfer__currency-select"
								@click.stop="toggleCurrencyDropdown"
							>
								<img
									:src="`/currency/${selectedCurrencyMap.flag}.png`"
									alt="currency"
									class="fund-transfer__currency-icon"
								>
								<span class="fund-transfer__currency-text">
                  {{ selectedCurrencyMap.currency }}
                </span>
								<img
									class="dawn_uo_icon"
									src="./assets/img/SketchPng32e58d36e33be15afc5c418asdsadada2a8758484ada7f5588858e3490.png"
								/>
							</section>

						</div>
						<div
							v-show="isCurrencyDropdownOpen"
							class="fund-transfer__currency-dropdown"
						>
							<div
								v-for="currency in sortedAccounts"
								:key="currency.currency"
								class="fund-transfer__currency-option"
								@click.stop="selectCurrency(currency)"
							>
								<img
									:src="`/currency/${currency.flag}.png`"
									alt="currency"
									class="fund-transfer__currency-icon"
								>
								<span class="fund-transfer__currency-name">
                    {{ currency.currency }}
                  </span>
							</div>
						</div>

					</div>

					<div class="fund-transfer__balance">
						<span class="fund-transfer__balance-label">{{$t("card.available_balance")}}:
						<span class="fund-transfer__balance-amount">
              {{selectedCurrencyMap.overAmount}} {{selectedCurrencyMap.currency}}
            </span></span>
					</div>
				</div>

				<!-- Submit Button -->
				<el-button
					type="primary"
					:loading="loading"
					class="fund-transfer__submit"
					@click="handleTransfer"
					:disabled="!isValidAmount"
				>
					{{$t("card.confirm")}}
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import router from "@/router";
import { transferIn, transferOut } from "@/api/certification";
import { getAccountBalance } from "@/api/home";
import i18n from "@/i18n";

export default {
	name: 'FundTransfer',

	data() {
		return {
			selectedWallet: i18n.t('card.wallet'),
			selectedCard: '5561...3404',
			currentWalletCard: {},
			merAccount: [],
			HKDAccount: [{
				currency: "HKD",
				overAmount: "0.00",
				flag: "HKD"
			}],
			amount: '',
			loading: false,
			isSwapped: false,
			selectedCurrencyMap: {
				currency: "USDC",
				overAmount: "0.00",
				flag: "USDC"
			},
			isCurrencyDropdownOpen: false,
			isValidAmount: false
		}
	},
	computed: {
		sortedAccounts() {
			// 根据 isSwapped 的值返回排序后的数组
			return this.isSwapped
				? this.HKDAccount //
				: this.merAccount; // 原始顺序
		},

	},
	created() {
	this.currentWalletCard=this.$route.params.currentCard;
	this.HKDAccount[0].overAmount=this.$route.params.currentCard.amount;
	this.HKDAccount[0].currency=this.$route.params.currentCard.currency;
	this.HKDAccount[0].flag=this.$route.params.currentCard.currency;
	this.selectedCard=this.$route.params.currentCard.cardNo;
		this.fetchAccountBalance();
		// 添加全局点击事件监听
		document.addEventListener('click', this.handleGlobalClick);
	},

	destroyed() {
		// 移除全局点击事件监听
		document.removeEventListener('click', this.handleGlobalClick);
	},

	methods: {
		// 获取账户余额信息
		async fetchAccountBalance() {
			try {
				const merNo = sessionStorage.getItem('merNo');
				const res = await getAccountBalance({
					merNo,
					isAll: 1,
					currency: 'all'
				});

				if (res.status === 200) {
					this.merAccount = res.data.merAccount;
					const usdcAccount = res.data.merAccount.find(
						item => item.currency === 'USDC'
					);
					if (usdcAccount) {
						this.selectedCurrencyMap = usdcAccount;
					}
				}
			} catch (error) {
				this.$message.error('获取账户余额失败');
			}
		},

		// 切换转账方向
		handleSwap() {
			this.isSwapped = !this.isSwapped;
			if (this.isSwapped) {
				this.selectedCurrencyMap = this.HKDAccount[0];
			} else {
				this.selectedCurrencyMap = this.merAccount.find(
					item => item.currency === 'USDC'
				);
			}
		},

		// 切换币种选择下拉框
		toggleCurrencyDropdown() {
			this.isCurrencyDropdownOpen = !this.isCurrencyDropdownOpen;
		},

		// 选择币种
		selectCurrency(currency) {
			this.selectedCurrencyMap = currency;
			this.isCurrencyDropdownOpen = false;
			this.validateAmount();
		},

		// 验证转账金额
		validateAmount() {
			const numAmount = parseFloat(this.amount);
			const availableBalance = parseFloat(this.selectedCurrencyMap.overAmount);

			this.isValidAmount = !isNaN(numAmount) &&
				numAmount > 0 &&
				numAmount <= availableBalance;
		},

		// 处理转账
		async handleTransfer() {
			if (!this.isValidAmount || this.loading) return;

			this.loading = true;

			try {
				const transferData = {
					cardId: this.$route.params.currentCard.id,
					amount: this.amount,
					currency: this.selectedCurrencyMap.currency,
				};

				const transferMethod = this.isSwapped ? transferOut : transferIn;
				const response = await transferMethod(transferData);

				if (response.status === 200) {
					this.$message.success(response.msg);
					await this.fetchAccountBalance();
					this.goBack();
				}
			} catch (error) {
		//		this.$message.error(error.msg);
			} finally {
				this.loading = false;
			}
		},

		// 处理全局点击事件
		handleGlobalClick(event) {
			const currencySelector = event.target.closest('.fund-transfer__currency-selector');
			if (!currencySelector) {
				this.isCurrencyDropdownOpen = false;
			}
		},

		// 返回上一页
		goBack() {
			router.back();
		}
	}
}
</script>

<style scoped>
.fund-transfer {
	position: relative;
}

.fund-transfer__header {
	padding: 17px 0 0 121px;
	height: 64px;
}

.fund-transfer__back-icon {
	width: 31px;
	height: 31px;
	cursor: pointer;
}

.dawn_uo_icon{
	width: 14px;
	height: 8px;
}

.fund-transfer__content {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.fund-transfer__title {
	font-weight: 600;
	font-size: 28px;
	color: #364A63;
	line-height: 36px;
	margin: 60px 0 16px;
}

.fund-transfer__subtitle {
	font-size: 14px;
	color: #526484;
	line-height: 20px;
	margin-bottom: 24px;
}

.fund-transfer__form {
	width: 516px;
}

.fund-transfer__accounts {
	background-color: #fff;
	border: 1px solid #dbdfea;
	border-radius: 16px;
	margin-bottom: 24px;
	overflow: hidden;
}

.fund-transfer__row {
	display: flex;
	align-items: center;
	padding: 20px;
}

.fund-transfer__row--destination {
	background-color: #f7f9fe;
	border-top: 1px solid #dbdfea;
}

.fund-transfer__label {
	width: 14px;
	font-size: 14px;
	color: #8094ae;
	margin-right: 20px;
}

.fund-transfer__swap-wrapper {
	position: relative;
}

.fund-transfer__swap-icon {
	position: absolute;
	right: 29px;
	top: 50%;
	transform: translateY(-50%);
	width: 40px;
	height: 40px;
	cursor: pointer;
}

.fund-transfer__select {
	flex-grow: 1;
}

.fund-transfer__select-content {
	display: flex;
	align-items: center;
}

.fund-transfer__account-icon {
	width: 36px;
	height: 24px;
	margin-right: 12px;
}

.fund-transfer__account-text {
	font-size: 14px;
	color: #364a63;
	font-weight: 500;
}

.fund-transfer__amount {
	margin-bottom: 40px;
}

.fund-transfer__amount-label {
	display: block;
	font-size: 14px;
	color: #364a63;
	margin-bottom: 4px;
}

.fund-transfer__amount-input-container {
	display: flex;
	align-items: center;
	background-color: #fff;
	border: 1px solid #dbdfea;
	border-radius: 16px;
	padding: 12px 16px;
	margin-bottom: 6px;
	position: relative;
}

.fund-transfer__amount-input {
	flex-grow: 1;
	border: none;
	font-size: 24px;
	color: #364a63;
	font-weight: 500;
	outline: none;
}

.fund-transfer__currency-selector {
	position: relative;
	margin-left: auto;
}

.fund-transfer__currency-select {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.fund-transfer__currency-icon {
	width: 30px;
	height: 30px;
	margin-right: 6px;
}

.fund-transfer__currency-text {
	font-size: 24px;
	color: #364a63;
	font-weight: 500;
	margin-right: 12px;
}

.fund-transfer__currency-dropdown {
	position: absolute;
	top: calc(100% + 8px);
	right: 0;
	background-color: #fff;
	border: 1px solid #dbdfea;
	border-radius: 4px;
	z-index: 10;
	min-width: 120px;
	max-height: 400px;
	overflow-y: auto;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fund-transfer__currency-option {
	display: flex;
	align-items: center;
	justify-content: start;
	padding: 10px;

	cursor: pointer;
}

.fund-transfer__currency-option:hover {
	background-color: #f7f9fe;
}

.fund-transfer__currency-name {
	font-size: 20px;
	color: #364a63;
	margin-right: 12px;
}

.fund-transfer__balance {
	display: flex;
	align-items: center;
	font-size: 14px;
}

.fund-transfer__balance-label {
	color: #8094ae;
	margin-right: 12px;
}

.fund-transfer__balance-amount {
	color: #526484;
	font-weight: 500;
}

.fund-transfer__submit {
	width: 100%;
	height: 44px;
	background: #7F8DFF;
	border-radius: 4px;
	color: #fff;
	border: none;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
}

.fund-transfer__submit:hover {
	background: #6b7aff;
}

.fund-transfer__submit:disabled {
	background-color: #dbdfea;
	cursor: not-allowed;
}
</style>