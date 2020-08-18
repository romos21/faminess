<template>
    <div>
        <h1>Log In!!!</h1>
        <div class="mainBody">
            <input title="email" type="email" placeholder="your email" v-model="email" autocomplete="true"/>
            <br/>
            <input title="password" type="password" placeholder="your password" v-model="password" autocomplete="true"/>
            <br/>
            <button
                @click="login"
            >
                Tap To Log In!
            </button>
        </div>
    </div>
</template>

<script>
    import AuthenticationService from "../services/AuthenticationService";

    export default {
        name: "Login",
        data(){
            return{
                email:'',
                password:'',
            }
        },
        methods:{
            async login(){
                try {
                    const response=await AuthenticationService.login({
                        email:this.email,
                        password:this.password,
                    });
                    if(response.data.name){
                       console.log( response.data.secondName);
                        //document.cookie=`name=${response.data.name}; secondName=${response.data.secondName}`;
                        document.cookie = "user=John; domain=site.com";
                        //console.log(response.data.images);
                        this.$store.commit('getActiveUser',{
                            name:response.data.name,
                            secondName:response.data.secondName,
                            email:response.data.email,
                            telephone:response.data.telephone,
                            //images:response.data.images,
                        });
                        if(this.$store.state.activeUser.name){
                            this.$router.push('/user')
                        }
                    }
                    this.$store.state.activeUser;
                }catch (e) {
                    console.log(e);
                }
            }
        }
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
        max-width: 400px;
        box-sizing: border-box;
        padding: 30px;
    }

    input {
        width: 80%;
        margin: 10px;
        outline: none;
        border: 5px solid #ffb40b;
        border-radius: 5px;
        padding: 10px;
    }
    input::placeholder {
        color: #b4b4b4;
    }
    button{
        margin: 10px;
        outline: none;
        background: #ffb40b;
        color: black;
        border: 5px solid #ffb40b;
        border-radius: 5px;
        padding: 10px;
    }
    button:hover{
        background: black;
        color: white;
    }
</style>