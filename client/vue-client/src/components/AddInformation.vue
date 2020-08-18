<template>
    <div class="content">
        <h1>Tell your friends about you!!!</h1>
        <div class="mainBody">
            <input title="birthday" type="date" placeholder="your birthday" v-model="birthday"/>
            <br/>
            <input title="country" type="text" placeholder="your country" v-model="country"/>
            <br/>
            <input title="city" type="text" placeholder="your city/town" v-model="city"/>
            <br/>
            <input title="education" type="text" placeholder="your education" v-model="education"/>
            <br/>
           <!-- <div>
                Your Family Status:
                <form>
                    <label v-for="status in familyStatus" v-bind:key="status">
                    <input  class="radio" title="familyStatus" type="radio" name="familyStatus" v-bind:id="status">
                    {{status}}
                        <br/>
                    </label>
                </form>
            </div>-->
            <br/>
            <button
                    @click="addInfo"
            >
                Tap To Submit!
            </button>
        </div>
    </div>
</template>

<script>
    import AuthenticationService from "../services/AuthenticationService";

    export default {
        name: "AddInformation",
        data(){
            return{
                //familyStatus:['married','in active search','strong independence'],
                birthday:this.$store.state.activeUserInfo.birthday,
                country:this.$store.state.activeUserInfo.country,
                city:this.$store.state.activeUserInfo.city,
                education:this.$store.state.activeUserInfo.education,
            }
        },
        methods:{
            async addInfo(){
                const response=await AuthenticationService.addInfo({
                    birthday: this.birthday,
                    country: this.country,
                    city: this.city,
                    education: this.education,
                    user:this.$store.state.activeUser.email,
                });
                console.log(response.data);
                this.$store.commit('getActiveUserInfo', {
                    birthday: response.data.birthday,
                    country: response.data.country,
                    city: response.data.city,
                    education: response.data.education,
                })
            }
        },
    }
</script>

<style scoped>
    *{
        font-weight: bold;
        font-family: cursive,sans-serif;
    }
    h1{
        text-align: center;
        color: #000000;
    }
    .mainBody {
        text-align: center;
        margin: 20px auto;
        background: black;
        border: 5px solid #ffb40b;
        border-radius: 10px;
        max-width: 60%;
        box-sizing: border-box;
        padding: 30px;
    }

    input,form {
        width: 80%;
        margin: 10px;
        outline: none;
        border: 5px solid #ffb40b;
        border-radius: 5px;
        padding: 10px;
    }
    form{
        background-color: white;
        margin: auto;
        text-align: left;
    }
    input::placeholder {
        color: #b4b4b4;
    }

    label{
        width: 80%;
        margin-left: 10px;
    }
    input[type=radio]{
        max-width: 5%;
        color: #ffb40b;
        outline: none;
    }
    button{
        outline: none;
        background: #ffb40b;
        color: black;
        border: 5px solid #ffb40b;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
    }
    button:hover{
        background: black;
        color: white;
    }
</style>