<template>
	<div class="device-view">
		<div class="mobile-view">
			<MobileTransaction />
		</div>
		<div class="pc-view">
			<PcTransaction />
		</div>
	</div>
</template>

<script>
import PcTransaction from './PcTransaction.vue';
import MobileTransaction from './MobileTransaction.vue';

export default {
	name: "TransactionModule",
	components: {
		PcTransaction,
		MobileTransaction,
	},
};
</script>

<style scoped>
/* 媒体查询 */
@media (max-width: 900px) {
	.mobile-view {
		display: block;
	}
	.pc-view {
		display: none;
	}
}

@media (min-width: 901px) {
	.mobile-view {
		display: none;
	}
	.pc-view {
		display: block;
	}
}
</style>