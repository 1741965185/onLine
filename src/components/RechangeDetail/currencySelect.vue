<template>
	<div class="recharge-page"	>
		<img class="element" src="../../assets/images/bank-main.png" @click="goToBack" alt="返回按钮" />
		<h2>{{$t('sysText.home_add_money')}}</h2>
		<div class="crypto-selector">
			<h3 class="title">{{$t('rechangeDetail.selectCurrency')}}</h3>
			<div class="crypto-list">
				<div v-for="crypto in cryptoList" :key="crypto.symbol" class="crypto-item" @click="selectCurrency(crypto)">
					<img :src="crypto.icon" :alt="crypto.name" class="crypto-icon">
					<span class="crypto-symbol">{{ crypto.symbol }}</span>
					<span class="arrow">›</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			cryptoList: [
				{ symbol: 'BTC', name: 'Bitcoin', icon: require('/src/assets/images/BTC.png') },
				{ symbol: 'ETH', name: 'Ethereum', icon: require('/src/assets/images/ETH.png') },
				{ symbol: 'USDT', name: 'Tether', icon:  require('/src/assets/images/USDT.png') },
				{ symbol: 'USDC', name: 'USD Coin', icon: require('/src/assets/images/USDC.png') },
			]
		};
	},
	created() {
	},
	methods: {
		goToBack(){
			history.go(-1);
		},
		selectCurrency(currency) {
			console.log('Selected currency:', currency.symbol);
			this.$router.push({ path: '/networkSelect' ,query :{ currency:currency.symbol}})
		}
	},

};
</script>

<style scoped>
.recharge-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.element {
	position: absolute;
	cursor: pointer;
	left: 121px;
	top: 17px;
}
h2 {
	margin-top: 99px;
	margin-bottom: 25px;
	text-align: center;
	font-family: PingFangSC, PingFang SC;
	font-weight: 600;
	font-size: 28px;
	color: #364A63;
	line-height: 36px;
	font-style: normal;
}
.crypto-selector {
	font-family: Arial, sans-serif;
	width: 516px;
	margin: 0 auto;
}

.crypto-selector .title {
	font-weight: 400;
	font-size: 14px;
	color: #364A63;
	line-height: 20px;
	text-align: left;
	font-style: normal;
	margin-bottom:16px;
}

.crypto-list {
	background-color: #fff;
}

.crypto-item {
	display: flex;
	align-items: center;
	padding: 14px 16px;
	background: #FFFFFF;
	border-radius: 12px;
	border: 1px solid #DBDFEA;
	margin-bottom:16px;
	cursor: pointer;
}

.crypto-icon {
	width: 44px;
	height: 44px;
	margin-right: 12px;
}

.crypto-symbol {
	flex-grow: 1;
	font-weight: 500;
	font-size: 24px;
	color: #364A63;
	line-height: 26px;
	text-align: left;
	font-style: normal;
}

.arrow {
	color: #999;
	font-size: 20px;
}
.crypto-item:hover{
	background: #F6F8FE;
}
</style>