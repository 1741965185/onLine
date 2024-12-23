<template>
  <div class="">
    <div class="nk-content">
      <div class="nk-block-content text-center">
        <svg-icon class="nk-error-gfx" icon-class="404"></svg-icon>
        <div class="wide-xs mx-auto">
          <h3 class="nk-error-title">Oops! Why you’re here?</h3>
          <p class="nk-error-text">We are very sorry for inconvenience. It looks like you’re try to access a page that
            either has been deleted or never existed.</p>
          <el-button class="air-btn-save" @click=" $router.push({path:'/'}) ">Back To Home</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

	export default {
		name: "Page404",
		computed: {
			message() {
				return "找不到网页！"
			},
		},
	}
</script>

<style lang="less" scoped>
  .nk-content {
    padding: 0;
    height: 100vh;
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: center;
  }

  .nk-error-gfx {
    width: 520px;
    height: 312px;
  }

  .nk-block-middle {
    margin-top: auto;
    margin-bottom: auto;
  }

  .ml-auto, .mx-auto {
    margin: 0 auto;
  }

  .text-center {
    text-align: center !important;
    max-width: 520px;
  }

  .nk-error-title {
    padding-bottom: 16px;
    line-height: 1.1;
    color: #364a63;
    letter-spacing: -0.03em;
    font-size: 32px;
    font-family: Nunito, sans-serif;
    font-weight: 700;
  }

  .nk-error-text {
    font-weight: 400;
    line-height: 1.65;
    color: #526484;
    margin-bottom: 15px;
  }

  /deep/ .air-btn-save {
    width: 154px;
    height: 44px;
    color: #fff;
    background-color: #6576ff;
    border-color: #6576ff;
    border-radius: 4px;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: Nunito, sans-serif;
    font-weight: 700;
    margin-bottom: 40px;

    &:hover,
    &:focus {
      color: #fff;
      background-color: #3f54ff;
      border-color: #3249ff;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(124, 139, 255, 0.5);
    }

    &:before {
      font-weight: bold;
    }
  }
</style>
