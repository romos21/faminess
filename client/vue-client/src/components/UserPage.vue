<template>
  <div>
    <Loader v-if="loader"/>
    <div v-else class="userPageBody">
      <div class="welcome">
            <span>
                <span>Welcome, </span>
                <span>{{ this.$store.state.activeUser.name }}</span>
            </span>
        <span>
            <router-link to="/aboutYou">
                    <button class="aboutYou"
                    >something about you...
                    </button>
                </router-link>
                <br/>
                <router-link to="/users">
                    <button>
                        Users
                    </button>
                </router-link>
                <br/>
                <router-link to="/friends">
                    <button>
                        Friends
                    </button>
                </router-link>
            </span>
      </div>

      <div class="userPageContent">
        <!--<img :src="image" height="200" width="200"/>-->
        <div class="userPageContentHead">
          <div class="userAvatar">
            <!--<form @submit="notRender" enctype="multipart/form-data">
                <input type="file" ref="avatarRef" name="avatar" @change="sendAvatarChange"/>
                &lt;!&ndash;class="userAvatarAdd"&ndash;&gt;
                <button @click="addAvatar">send</button>
            </form>-->
            <div class="userAvatarAdd">+</div>
          </div>
          <div>
            <span>{{ this.$store.state.activeUser.name }} </span>
            <span>{{ this.$store.state.activeUser.secondName }}</span>
            <div>
              <span class="initializedEl">Age:</span>
              <span>{{ this.$store.state.activeUserInfo.birthday }}</span>
              <br/>
              <span class="initializedEl">From:</span>
              <span>{{ this.$store.state.activeUserInfo.country }},</span>
              <span>{{ this.$store.state.activeUserInfo.city }}</span>
              <br/>
              <span class="initializedEl">Education:</span>
              <span>{{ this.$store.state.activeUserInfo.education }}</span>
            </div>
          </div>
        </div>
        <div class="hrClone"/>
        <!--<div  v-for="image in this.$store.state.activeUser.images" :key="image">
            {{image}}
        </div>-->
        <div class="addImgBackground">
          <div class="addImgContent">+</div>
          <!--<form @submit="notRender" enctype="multipart/form-data">
              <input type="file" ref="postRef" name="post" @change="sendPostChange"/>
              <button @click="addPost">send</button>
          </form>-->
        </div>
      </div>
      <router-link to="/options">
        <button>
          Options
        </button>
      </router-link>
      <br/>
      <button
          @click="logOut"
      >
        Tap To Log Out
      </button>
      <div v-bind:class="logOutClass">
        <div class="mainBody">
          <h1>Quit?</h1>
          <div class="logOutTable">
            <button
                @click="yes"
            >Yes
            </button>
            <button
                @click="no"
            >No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AuthenticationService from "../services/AuthenticationService";

//components
import Loader from "@/components/Loader";

export default {
  name: "UserPage",
  components: {Loader},
  data() {
    return {
      logOutClass: 'passive',
      selectedFile: '',
      image: 'http://localhost:8080/',
      loader: true,
    }
  },
  methods: {
    logOut() {
      console.log('hello');
      return this.logOutClass = 'active';
    },
    yes() {
      this.$store.commit('getActiveUser', null);
      this.$router.push('/');
    },
    no() {
      this.logOutClass = 'passive';
    },
    sendAvatarChange() {
      console.log(this.$refs.avatarRef.files[0]);
      this.selectedFile = this.$refs.avatarRef.files[0];
    },
    sendPostChange() {
      console.log(this.$refs.postRef.files[0]);
      this.selectedFile = this.$refs.postRef.files[0];
    },
    async addAvatar() {
      const formData = new FormData();
      formData.append('avatar', this.selectedFile);
      formData.append('user', this.$store.state.activeUser.email);
      const response = await AuthenticationService.uploadAvatar(formData);
      this.image += response.data;
    },
    async addPost() {
      const formData = new FormData();
      formData.append('post', this.selectedFile, 'post.jpg');
      const response = await AuthenticationService.uploadPost(this.$store.state.activeUser.email, formData);
      this.image += response.data;
    },
    notRender(event) {
      event.preventDefault();
      return false;
    }
  },
  mounted() {
    console.log('mounted');
      if (!this.$store.state.activeUser.email) {
        console.log('NO USER');
        this.$router.history.push('/');
      } else {
        setTimeout(async () => {
        if (!this.$store.state.activeUserInfo.education) {
          const response = await AuthenticationService.getInfo(this.$store.state.activeUser.email);
          this.$store.commit('getActiveUserInfo', {
            birthday: response.data.birthday,
            country: response.data.country,
            city: response.data.city,
            education: response.data.education,
          })
        }
        }, 3000);
        this.loader = false;
      }
  },
}
</script>

<style scoped>

* {
  font-weight: bold;
  font-family: cursive, sans-serif;
  font-size: 50px;
  color: black;
}

:hover {
  transition: 1s ease;
}

.welcome {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aboutYou {
  font-size: 15px;
}

input {
  color: red;
}

/*.imgTest{
    background-image: url("../../imagesCloud/a@b/s1200.jpg");
    height: 1067px;
    width: 1200px;
    background-size: cover;
}*/
.options {
}

.initializedEl {
  background-color: black;
  border-radius: 3px;
  color: #ffffff;
  margin: 15px;
}

.userAvatar {
  background-size: cover;
  /*background-color: #ffffff;*/
  background-image: url("http://cdn.onlinewebfonts.com/svg/img_391533.png");
  border-radius: 100%;
  margin-right: 30px;
  position: relative;
  top: 0;
  left: 0;
}

.userAvatarAdd {
  text-decoration: none;
  outline: none;
  display: none;
}

.userAvatar:hover .userAvatarAdd {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 100px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
  content: "+";
}

h1 {
  text-align: center;
}

.hrClone {
  background: #ffb40b;
  height: 5px;
  margin: 20px 0;
}

/*.addImgContent{
   display: none;
}*/

.addImgBackground {
  background: black;
  opacity: .5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.addImgBackground:hover {
  border-radius: 40px;
  opacity: 0.8;
}

.addImgContent {
  text-decoration: none;
  outline: none;
  border-radius: 50%;
  color: black;
  font-size: 75px;
  background: #ffb40b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.addImgContent:hover {
  font-size: 100px;
}


.userPageContent {
  text-align: center;
}

.userPageContentHead {
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.active {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.passive {
  display: none;
}

.mainBody {
  background-color: black;
  border: 15px solid #ffb40b;
  border-radius: 20px;
  margin: 40px auto;
  padding: 20px;
}

.logOutTable {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

button {
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


@media (min-width: 1000px) {
  * {
    font-size: 30px;
  }

  .userPageContent {
    margin: 30px 0;
  }

  .userAvatar {
    height: 200px;
    width: 200px;
  }

  .userPageBody {
    max-width: 900px;
    margin: 20px auto;
  }

  .mainBody {
    max-width: 900px;
  }

  .addImgBackground {
    height: 350px;
    width: 320px;
  }

  .addImgContent {
    width: 75px;
    height: 75px;
  }

  .addImgContent:hover {
    width: 100px;
    height: 100px;
  }

  button {
    width: 320px;
  }
}

@media (min-width: 700px) and (max-width: 1000px) {
  * {
    font-size: 30px;
  }

  .userPageContent {
    margin: 30px 0;
  }

  .userAvatar {
    height: 200px;
    width: 200px;
  }

  .userPageBody {
    max-width: 680px;
    margin: 20px auto;
  }

  .mainBody {
    max-width: 680px;
  }

  .addImgBackground {
    height: 350px;
    width: 320px;
    margin-bottom: 20px;
  }

  .addImgContent {
    width: 75px;
    height: 75px;
  }

  .addImgContent {
    width: 100px;
    height: 100px;
  }

  button {
    width: 320px;
  }
}

@media (max-width: 700px) {
  * {
    font-size: 15px;
  }

  .userAvatar {
    height: 100px;
    width: 100px;
  }

  .userPageBody {
    margin: 20px;
  }

  .mainBody {
    max-width: 400px;
  }

  .addImgBackground {
    height: 150px;
    width: 120px;
  }

  .addImgContent {
    width: 40px;
    height: 40px;
  }

  .addImgContent {
    width: 60px;
    height: 60px;
  }

  button {
    width: 120px;
  }
}
</style>