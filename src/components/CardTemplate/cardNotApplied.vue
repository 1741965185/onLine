<!-- OnlinePayCard.vue -->
<template>
    <div class="online-pay-card">
        <div class="card-content">
            <img src="@/assets/images/card/card-noapplication.png" alt="Visa Card" class="card-image">
            <h2 class="card-title">{{ title }}</h2>
            <div class="crypto-tenants">
                <div class="group_3"></div>
                <span class="group_3_text" style="margin-right: 40px">{{$t("card.nocard_title")}}</span>
            </div>


            <el-button type="primary" class="apply-button" @click="onApply">{{$t("card.apply_card")}}</el-button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'OnlinePayCard',
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
    padding: 118px 276px;
}
.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}


.card-image {
    width: 464px;
    height: 338px;
}


.card-title {
    font-weight: 500;
    font-size: 32px;
    color: #364A63;
    line-height: 38px;
    text-align: left;
    font-style: normal;

}



.apply-button {
    width: 468px;
    height: 44px;

    background: #7F8DFF;
    border-radius: 4px;}
.group_3 {
    background-color: rgba(128, 148, 174, 1);
    border-radius: 50%;
    width: 4px;
    height: 4px;
    margin-right: 10px;
}
.group_3_text {
    font-weight: 400;
    font-size: 16px;
    color: #8094AE;
    line-height: 20px;
    text-align: left;
    font-style: normal;

}
.crypto-tenants {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 40px;
}
</style>