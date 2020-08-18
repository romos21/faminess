<template>
    <div id="app">
        <div class="head">
            <div class="headContent">
                <span class="siteTitle">
                  <span class="siteIcon">F</span>
                  <span @click="logOutStateChange">Faminess</span>
                </span>
                <ul>
                    <li class="ulTitle">Contact Us</li>
                    <li class="contactUs">Vk</li>
                    <li class="contactUs">Instagram</li>
                    <li class="contactUs">Telegram</li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        methods: {
            logOutStateChange() {
                console.log(window.location.pathname);
                this.$store.state.activeUser ?
                    this.$router.push("/user") :
                    this.$router.push("/");
            }
        },
    }
</script>

<style scoped>
    * {
        color: #ffb40b;
        font-weight: bold;
    }

    li {
        list-style-type: none;
        padding: 10px;
    }

    ul {
        margin-block-start: 0;
        margin-block-end: 0;
        padding-inline-start: 0;
    }

    ul:hover {
        padding-inline-start: 0;
        background: black;
        border: 3px solid white;
        border-radius: 5px;
        position: absolute;
        margin: 20px;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }

    .contactUs {
        display: none;
    }

    .contactUs:hover {
        background: #ffb40b;
    }

    ul:hover .contactUs {
        display: block;
        color: white;
        transition: 1s;
    }

    ul:hover .ulTitle {
        background: #ffb40b;
        color: black;
    }

    .router {
        text-decoration: none;
    }

    .head {
        padding: 20px;
        background: #000000;
        border-bottom: 5px solid #ffb40b;
    }
    .headContent{
      margin: auto;
      display: flex;
      position: relative;
      justify-content: space-between;
      align-items: center;
      font-size: 45px;
      font-family: cursive, sans-serif;
    }

    .siteTitle {
        display: inline-flex;
        align-items: center;
    }

    .siteIcon {
        background: white;
        border: 1px solid #ffffff;
        border-radius: 100%;
        color: #000000;
        font-family: "matura mt script capitals", sans-serif;
        padding: 15px;
        margin-right: 10px;
    }

    /*.logOutComponent{
      position: absolute;
      background-color: black;
      opacity: .7;
    }*/
    .active {
        display: flex;
    }

    .passive {
        display: none;
    }

    @media (min-width: 1000px) {
        * {
            font-size: 30px;
        }
      .headContent{
        max-width: 900px;
      }
    }
    @media (min-width: 700px) and (max-width: 1000px){
      * {
        font-size: 30px;
      }
      .headContent{
        max-width: 680px;
      }
    }
    @media (max-width: 700px) {
        * {
            font-size: 15px;
        }
    }
</style>

