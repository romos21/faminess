<template>
  <div>
    <Loader v-if="loader"/>
    <div v-else-if="users.length" v-for="user in this.users" :key="user">
      <div class="userCartBody">
        <div class="userCartInline">
          <div class="userImage"/>
          <div class="userInfo">
            <div>
              <span>{{ user.name }}</span>
              <br/>
              <span>{{ user.secondName }}</span>
            </div>
          </div>
        </div>
        <div>
          <button @click="getUserId(user)">Add to Friends</button>
        </div>
      </div>
    </div>
    <div v-else>No Users Found...</div>
  </div>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";

//components
import Loader from "./Loader";

export default {
  name: "Users",
  components: {Loader},
  data() {
    return {
      users: [],
      loader: true,
    }
  },
  methods: {
    async getUserId(user) {
      console.log(user.email);
      const response=await AuthenticationService.addFriend({
        activeUserEmail:this.$store.state.activeUser.email,
        newFriendId:user.id
      });
      console.log(response.data);
      //this.$store.state.activeUserInfo.friends.commit(response.data);
    },
  },
  mounted() {
    setTimeout(async () => {
      console.log(this.loader);
      const response = await AuthenticationService.getAllUsers(this.$store.state.activeUser.email);
      this.users = response.data;
      this.loader = false;
    }, 3000);
  }
}
</script>

<style scoped>
* {
  color: black;
  font-size: 50px;
}

:hover{
  transition: 2s ease;
}

.userCartBody {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 30px auto;
}

.userCartInline{
  display: inline-flex;
}

.userImage {
  background-image: url("http://cdn.onlinewebfonts.com/svg/img_391533.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 250px;
  width: 250px;
  border-radius: 100%;
  background-color: white;
}

.userInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
}

button {
  font-size: 30px;
  outline: none;
  background: #ffb40b;
  color: black;
  border: 5px solid #ffb40b;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

button:hover {
  background: black;
  padding: 15px;
  font-size: 25px;
  color: white;
}

@media (max-width: 700px) {
  button {
    width: 120px;
  }
}

@media (min-width: 700px) and (max-width: 1000px) {
  button {
    width: 320px;
  }
}

@media (min-width: 1000px) {
  button {
    width: 320px;
  }
}

</style>