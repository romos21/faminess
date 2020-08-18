<template>
  <div class="mainField">
    <div class="mainFieldImg"/>
    <div class="mainFieldAction">
      <router-link to="sign" class="links">Sign In</router-link>
      <router-link to="login" class="links">Log In</router-link>
      <router-link to="about" class="links">About Us</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeContent',
}
</script>


<style scoped>
  *{
    color: #ffb40b;
    font-weight: bold;
    font-family: cursive,sans-serif;
  }
  .links{
    cursor: pointer;
    background: #ffb40b;
    padding: 5px;
    color: black;
    text-align: center;
    text-decoration: none;
    border-bottom-right-radius: 20px;
    transition: 1s;
  }
  .links:hover{
    border: 5px solid white;
    border-bottom-right-radius: 20px;
  }
  .mainField{
    display: flex;
    justify-content: center;
    margin: 20px auto;
    padding: 30px;
    background: black;
    border: 1px solid black;
    border-radius: 20px;
  }
  .mainFieldAction{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .mainFieldImg{
    background-image: url("https://avatars.mds.yandex.net/get-pdb/2058301/090edd75-a0f9-475a-8dce-7558f5b550a1/s1200");
    background-size: cover;
    background-repeat: no-repeat;
    border: 5px solid white;
    border-radius: 10px;
  }

  @media (min-width:700px) {
    *{
      font-size: 30px;
    }
    .mainField{
      max-width: 600px;
    }
    .mainFieldImg{
      width: 400px;
      height: 500px;
    }
    .links{
      width: 150px;
    }
  }
  @media (max-width: 700px) {
    *{
      font-size: 15px;
    }
    .mainField{
      max-width: 400px;
      margin: 20px;
    }
    .mainFieldImg{
      width: 200px;
      height: 250px;
    }
    .links{
      width: 75px;
    }
  }
</style>
