<template>
  <v-row class="user-create">
    <v-col md="12">
      <v-row :style="{ padding: '20px 10px' }">
        <v-col md="2">
          تعداد کاربران ذخیره شده:
          {{ savedNumber }} از {{ completeUserNumber }}
        </v-col>
        <v-col md="2">
          <v-btn color="green" dark>
            ذخیره
            <v-icon :style="{ marginRight: '10px' }">
              mdi-content-save
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-for="(user, index) in userForm" :key="index">
        <v-col md="11" class="user-row">
          <div class="input-box">
            <v-text-field dense v-model="user.firstName" :disabled="user.hasBeenSaved" outlined label="نام" />
          </div>
          <div class="input-box">
            <v-text-field dense v-model="user.lastName" :disabled="user.hasBeenSaved" outlined label="نام خانوادگی" />
          </div>
          <div class="input-box">
            <v-select dense v-model="user.gender" label="جنسیت" :disabled="user.hasBeenSaved" outlined />
          </div>
          <div class="input-box">
            <v-select dense v-model="user.major" label="رشته" :disabled="user.hasBeenSaved" outlined />
          </div>
          <div class="input-box">
            <v-text-field dense v-model="user.mobile" label="موبایل" :disabled="user.hasBeenSaved" outlined/>
          </div>
          <div class="input-box">
            <v-text-field dense v-model="user.nationalCode" label="کد ملی" :disabled="user.hasBeenSaved" outlined/>
          </div>
          <div class="input-box">
            <v-select dense v-model="user.province" label="استان" :disabled="user.hasBeenSaved" outlined />
          </div>
          <div class="input-box">
            <v-select dense v-model="user.city" label="شهر" :disabled="user.hasBeenSaved" outlined />
          </div>
        </v-col>
        <v-col md="1">
          <v-btn v-if="user.hasBeenSaved" icon color="green">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "userCreate",
  data () {
    return {
      userForm: []
    }
  },
  methods: {
    initUserFormArray(clean = true, amount = 20) {
      if (clean) {
        this.userForm = []
      }
      for (let i = 0; i < amount; i++) {
        this.userForm.push({
          firstName: '',
          lastName: '',
          gender: '',
          major: '',
          mobile: '',
          nationalCode: '',
          province: '',
          city: '',
          hasBeenSaved: false
        })
      }
    },
    isUserInfoComplete(user) {
      return !!(user.firstName && user.lastName && user.gender
        && user.major && user.mobile && user.nationalCode &&
        user.province && user.city);
    }
  },
  computed: {
    savedNumber () {
      let counter = 0
      this.userForm.forEach(user => {
        if (user.hasBeenSaved) {
          counter++
        }
      })
      return counter
    },
    completeUserNumber () {
      let counter = 0
      this.userForm.forEach(user => {
        if (this.isUserInfoComplete(user)) {
          counter++
        }
      })
      return counter
    }
  },
  created () {
    this.initUserFormArray()
  }
}
</script>

<style scoped>
.input-box {
  padding: 0 10px;
}

.user-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>

<style>
.user-create .v-text-field__details {
  display: none;
}
</style>
