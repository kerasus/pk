<template>

</template>

<script>
import API_ADDRESS from "assets/Addresses";

export default {
  name: "productShowEdit.vue",
  created () {
    this.$axios.get(API_ADDRESS.product.base, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiMmM1ZWQzOWUwNDUzMzZhOGY3ZjRiNWU2OTU0MDJkMmQzNmRlNmYyYjE3OTNlNzFmZjkyYjkzZjEyYWNhOWQwNTAzOTUyOWM5NDY5ZDYxY2QiLCJpYXQiOjE2NDI4Mzc0MjMuMTQ3OTcsIm5iZiI6MTY0MjgzNzQyMy4xNDc5NzIsImV4cCI6MTY3NDM3MzQyMy4xNDIxMzgsInN1YiI6IjM4OTI3MCIsInNjb3BlcyI6W119.RyajIaYQPEaNpmUHM_Zx7wSAexMp9PTmKa08n7dDe0fAlNyEVKyE9bkJP4WW7NlNEnV5bRLS192Kwj19TXrklcmVYW32BQBnxfFI3pIK3UxWUoA5XzGRlNlFp_gSAkrEkJgDHE45c_9Vp2DNUPwxH9kr4D_GgI_2YI5sdDGoCS81hJa9cU0TUOJFrImtkypmtsH_EAzwLedNngPsn41HuMWc_sOj-5I74_LLT29fNXQstEBuvlXXEKF2TvVQ1kdzD_JIeK6LjQlcYYLcEI3IIM79nXj91FQ3zcusV1I2fTLlP4J-988WTfUJwJSIZijsN1rcW1ZEQ14ezImPXcphPxhNCz1rz_g-f4VuKzqMLHUQrbMv3RM4dvTE9LIhh-X-KvvinYJQnisXQQOdfzB_Z4e3f1d1YWxpiZZfmMjrLkr5-5PBSFRngbMVT11e1h6hbC2iIgoxIoLMucXef4x4vkxI3YuIKWjnuEOXtvpE6MY91f3Vsi2TpRUmD4OBG4wj4N2f_e3jWvzg-dAb1b3Yww586iS1zlSOk_OIgA0F8Fa7NI4nKOEYoaMZS2V_5RhaTf8mDwW0OdeVNRN4OkO3Bp2Mg6oPXq9wbssmR64HBf4R-uU5ZYic7sbepBjXLaDAD2gNrU0WKB5nEv9TzsM7rAdPZDcK_a8NJxeYcDqvb9s'
      }
    }).then(resp => {
      this.response = resp.data
      console.log(resp.data)
    })
  },
  data () {
    return {
      response: {}
    }
  }
}
</script>

<style scoped>

</style>
