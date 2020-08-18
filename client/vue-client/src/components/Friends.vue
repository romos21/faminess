<template>
<div>Friends</div>
</template>

<script>
/*import AuthenticationService from "@/services/AuthenticationService";
import Loader from "@/components/Loader";*/
export default {
name: "Friends",
/*  components:{Loader},
  data() {
    return {
      users: [],
      loader:true,
    }
  },
  mounted() {
    setTimeout(async ()=>{
      console.log(this.loader);
      const response = await AuthenticationService.getAllFriends(this.$store.state.activeUser.email);
      this.users = response.data;
      this.loader=false;
    },3000);
  }*/
}
</script>

<style scoped>

</style>