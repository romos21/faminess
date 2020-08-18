<template>
    <div class="loaderOn">
      <div class="loadAnimationEl">
        <div class="loaderCircle"></div>
        <div class="loaderContent">Loading...</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style scoped>
    .loaderOn{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:rgba(0,0,0,0.7);
    }

    .loadAnimationEl{
        padding: 40px;
    }

    .loaderCircle{
      width: 300px;
      height: 300px;
      border: 15px solid;
      border-radius: 100%;
      animation-name: loaderCircle;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count:infinite;
      content: url("https://cdn.dribbble.com/users/464600/screenshots/4874178/break-1.gif");
    }

    .loaderContent{
      text-align: center;
      font-size: 50px;
      animation-name: rotation;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count:infinite;
      margin: auto;
    }

    @keyframes rotation {
        0% {
          color: #ff0b13;
        }
      100% {
        color: #0b2cff;
      }
        /*0% {transform: rotate(0deg)}
        100% {transform: rotate(360deg)}*/
    }

    @keyframes loaderCircle {
      0% {
        border-color: #ff0b13;
      }
      100%{
        border-color: #0b2cff;
      }
    }
</style>