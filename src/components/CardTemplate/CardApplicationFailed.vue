<!-- OnlinePayCard.vue -->
<template>
  <div class="online-pay-card">
   <div class="card-content">
     <img src="@/assets/images/card/card_aapFilaled.png" alt="Visa Card" class="card-image">
     <h2 class="card-title">{{$t("card.application_failed")}}</h2>
     <div class="crypto-tenants">
       <span class="group_3_text">{{ remarkText }}</span>

     </div>


     <el-button type="primary" class="apply-button" @click="onApply">{{ buttonText }}</el-button>
     <span class="group_3">Support：service@onlinepay.com</span>

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
    },
    remarkText: {
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
    padding: 150px 276px;
}
.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}


.card-image {
    width: 248px;
    height: 185px;
}


.card-title {
    font-weight: 500;
    font-size: 32px;
    color: #364A63;
    line-height: 38px;
    text-align: right;
    font-style: normal;

}



.apply-button {
    width: 468px;
    height: 44px;

    background: #7F8DFF;
    border-radius: 4px;}
.group_3 {
    font-weight: 400;
    font-size: 16px;
    color: #8094AE;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    margin-top: 20px;

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
  padding: 16px 20px;
    width: 468px;
    height: 74px;
    display: flex;
    box-sizing: border-box;
    background: #F7F9FE;
    border-radius: 16px;


    margin-top: 20px;
    margin-bottom: 40px;
}
</style>