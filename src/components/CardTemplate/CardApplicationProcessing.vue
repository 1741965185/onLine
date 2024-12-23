<!-- OnlinePayCard.vue -->
<template>
    <div class="online-pay-card">
        <div class="card-content">
            <img src="@/assets/images/card/card_appProcessing.png" alt="Visa Card" class="card-image">
            <h2 class="card-title">{{$t("card.application_Processing")}}</h2>
            <span class="group_3_text">{{$t("card.apply_descr")}}</span>



            <!--     <el-button type="primary" class="apply-button" @click="onApply">{{ buttonText }}</el-button>-->
            <span class="crypto-tenants">Support：service@onlinepay.com</span>

        </div>

    </div>
</template>

<script>
export default {
    name: 'CardApplicationProcessing',
    props: {
        title: {
            type: String,
            default: ''
        },
        buttonText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            cryptoIcons: [
                { name: 'Bitcoin', src: 'path/to/bitcoin-icon.png' },
                { name: 'USD Coin', src: 'path/to/usdc-icon.png' },
                { name: 'Tether', src: 'path/to/tether-icon.png' },
                { name: 'Ethereum', src: 'path/to/ethereum-icon.png' }
            ]
        }
    },
    methods: {
        onApply() {
            this.$emit('apply')
        }
    }
}
</script>

<style scoped>
.online-pay-card {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 136px 276px;
}
.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}


.card-image {
    width: 162px;
    height: 147px;
}


.card-title {
    font-weight: 500;
    font-size: 24px;
    color: #364A63;
    line-height: 26px;
    text-align: right;
    font-style: normal;
    margin: 20px 0;

}



.apply-button {
    width: 247px;
    height: 44px;
    margin-top: 50px;
    margin-bottom: 20px;
    background: #7F8DFF;
    border-radius: 4px;
}
.group_3 {
    background-color: rgba(128, 148, 174, 1);
    border-radius: 50%;
    width: 4px;
    height: 4px;
    margin-right: 10px;
}
.group_3_text {
    font-weight: 400;
    font-size: 13px;
    color: #8094AE;
    line-height: 20px;
    text-align: right;
    font-style: normal;

}
.crypto-tenants {
    margin-top: 20px;
    font-weight: 400;
    font-size: 16px;
    color: #8094AE;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}
</style>