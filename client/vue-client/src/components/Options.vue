<template>
    <div>
        <h1>Options</h1>
        <div class="mainBody">
            <input title="name" type="text" placeholder="your name" v-model="name"/>
            <br/>
            <input title="secondName" type="text" placeholder="your second name" v-model="secondName"/>
            <br/>
            <input title="email" type="email" placeholder="your email" v-model="email"/>
            <br/>
            <input title="phone" type="tel" placeholder="your telephone" v-model="telephone"/>
            <br/>
            <input title="password" type="password" placeholder="your password" v-model="password"/>
            <br/>
            <input title="password" type="password" placeholder="new password" v-model="newPassword"/>
            <br/>
            <button
                    @click="save"
            >
                Save
            </button>
        </div>
    </div>
</template>

<script>
    import AuthenticationService from "../services/AuthenticationService";

    export default {
        name: "Options",
        data(){
            return{
                name:this.$store.state.activeUser.name,
                secondName:this.$store.state.activeUser.secondName,
                email:this.$store.state.activeUser.email,
                password:'',
                newPassword:'',
                telephone:this.$store.state.activeUser.telephone,
            }
        },
        methods:{
            async save(){
                try {
                    const response=await AuthenticationService.updateUserInfo({
                        name:this.name,
                        secondName:this.secondName,
                        email:this.email,
                        password:this.password,
                        newPassword: this.newPassword,
                        telephone:this.telephone,
                    });
                    if(response.data.name){
                        document.cookie=`name=${response.data.name};secondName=${response.data.secondName}`;
                        console.log(response.data.images);
                        this.$store.commit('getActiveUser',{
                            name:response.data.name,
                            secondName:response.data.secondName,
                            email:response.data.email,
                            images:response.data.images,
                        });
                        if(this.$store.state.activeUser.name){
                            this.$router.push('/user')
                        }
                    }
                }catch (e) {
                    console.log(e);
                }
            }
        },
        mounted() {
            if (!this.$store.state.activeUser.email) {
                console.log('NO USER');
                this.$router.history.push('/');
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