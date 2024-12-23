<template>
	<div>
		<ul class="card-email-ip clearfix">
			<li>
				<p>{{$t('dataDetail.name')}}</p>
				<p>{{ orderInfoForm.name || "-" }}</p>
			</li>
			<li>
				<p>{{$t('dataDetail.phone')}}</p>
				<p>{{ orderInfoForm.tel || "-" }}</p>
			</li>
			<li>
				<p>{{$t('dataDetail.goodsInfo')}}</p>
				<p @click="emailAndCard( orderInfoForm.tradeNo)">
					<a>{{$t('dataDetail.viewGoodsDetails')}}</a>
				</p>
			</li>
		</ul>
	</div>
</template>
<script>
import { getCargodeDetails } from "@/api/business";

export default {
	name: "orderInfo",
	props: {
		orderInfoForm: {
			type: Object,
			rrquired: true
		}
	},
	methods:{
		// 查询货物详情
		emailAndCard() {
			this.dialogVisible = true;
			getCargodeDetails({
				tradeNo: this.tradeNo,
			}).then(res => {
				this.tablelList = res.data;
			}).catch(err => {
			});
		},
	}
};

</script>

<style scoped lang="less">

</style>