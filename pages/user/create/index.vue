<template>
  <v-row class="user-create">
    <v-overlay v-if="loading">
      <v-progress-circular indeterminate />
    </v-overlay>
    <v-col md="12">
      <v-row :style="{ padding: '20px 10px' }">
        <v-col md="2" class="vertialcally-center-items">
          تعداد کاربران ذخیره شده:
          {{ savedNumber }} از {{ completeUserNumber }}
        </v-col>
        <v-col md="2" class="vertialcally-center-items">
          <v-btn color="green" dark @click="save">
            ذخیره
            <v-icon :style="{ marginRight: '10px' }">
              mdi-content-save
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-form ref="form" lazy-validation>
        <v-row v-for="user in userForm" :key="user.key">
          <v-col md="11" class="user-row">
            <div class="input-box">
              <v-text-field
                dense
                v-model="user.firstName"
                :disabled="!user.editable"
                @input="user.hasBeenSaved = false"
                outlined
                label="نام"
                :rules="[user.firstName_error]"
              />
            </div>
            <div class="input-box">
              <v-text-field
                dense
                v-model="user.lastName"
                :disabled="!user.editable"
                @input="user.hasBeenSaved = false"
                outlined
                label="نام خانوادگی"
                :rules="[user.lastName_error]"
              />
            </div>
            <div class="input-box">
              <v-select
                dense
                v-model="user.gender_id"
                label="جنسیت"
                :disabled="!user.editable"
                @input="user.hasBeenSaved = false"
                outlined
                :items="genders"
                item-text="title"
                item-value="id"
                :rules="[user.gender_id_error]"
              />
            </div>
            <div class="input-box">
              <v-select
                dense
                v-model="user.major_id"
                label="رشته"
                :disabled="!user.editable"
                @input="user.hasBeenSaved = false"
                outlined
                :items="majors"
                item-text="title"
                item-value="id"
                :rules="[user.major_id_error]"
              />
            </div>
            <div class="input-box">
              <v-text-field
                dense
                v-model="user.mobile"
                label="موبایل"
                :disabled="!user.editable"
                @input="user.hasBeenSaved = false"
                outlined
                :rules="[user.mobile_error]"
              />
            </div>
            <div class="input-box">
              <v-text-field
                dense
                v-model="user.nationalCode"
                label="کد ملی"
                :disabled="!user.editable"
                @input="user.hasBeenSaved = false"
                outlined
                :rules="[user.nationalCode_error]"
              />
            </div>
            <div class="input-box">
              <v-select
                dense
                v-model="user.province"
                label="استان"
                :disabled="!user.editable"
                @input="user.hasBeenSaved = false"
                outlined
                :items="provinces"
                item-text="title"
                item-value="id"
                :rules="[user.province_error]"
              />
            </div>
            <div class="input-box">
              <v-select
                dense
                v-model="user.shahr_id"
                label="شهر"
                :disabled="!user.editable"
                @input="user.hasBeenSaved = false"
                outlined
                :items="selectedProvinceCity(user.province)"
                item-text="title"
                item-value="id"
                :rules="[user.shahr_id_error]"
              >
                <template v-slot:no-data>
                  <span :style="{ marginRight: '10px' }">ابتدا استان را انتخاب کنید</span>
                </template>
              </v-select>
            </div>
          </v-col>
          <v-col md="1" class="options">
            <v-progress-circular
              indeterminate
              color="grey"
              v-if="user.loading"
            />
            <v-tooltip top v-if="user.hasBeenSaved">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="green" v-bind="attrs" v-on="on">
                  mdi-content-save
                </v-icon>
              </template>
              <span>ذخیره شده</span>
            </v-tooltip>
            <v-tooltip top v-else-if="isUserInfoComplete(user) && !user.loading">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="warning" v-bind="attrs" v-on="on">
                  mdi-content-save
                </v-icon>
              </template>
              <span>نیازمند ذخیره</span>
            </v-tooltip>
            <v-btn v-if="!user.editable" icon color="primary" @click="user.editable = true">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import API_ADDRESS from "assets/Addresses";

export default {
  name: "userCreate",
  data () {
    return {
      userForm: [],
      genders: [],
      majors: [],
      provinces: [],
      cities: [],
      loading: false
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
          firstNameMessage: '',
          firstName_error: () => true,
          lastName: '',
          lastName_error: () => true,
          gender_id: '',
          gender_id_error: () => true,
          major_id: '',
          major_id_error: () => true,
          mobile: '',
          mobile_error: () => true,
          nationalCode: '',
          nationalCode_error: () => true,
          province: '',
          province_error: () => true,
          shahr_id: '',
          shahr_id_error: () => true,
          key: Date.now() + Math.random() * 10000,
          hasBeenSaved: false,
          editable: true,
          loading: false
        })
      }
    },
    isUserInfoComplete(user) {
      return !!(user.firstName && user.lastName && user.gender_id
        && user.major_id && user.mobile && user.nationalCode &&
        user.province && user.shahr_id);
    },
    getUserFormData () {
      this.loading = true
      this.$axios.get(API_ADDRESS.user.formData)
        .then((resp) => {
          this.loading = false
          this.genders = resp.data.data.genders
          this.majors = resp.data.data.majors
          this.provinces = resp.data.data.provinces
          this.cities = resp.data.data.cities
        })
    },
    save () {
      this.userForm.forEach(user => {
        let that = this
        if (!user.hasBeenSaved && that.isUserInfoComplete(user)) {
          user.loading = true

          this.$axios.post(API_ADDRESS.user.create, {
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile,
            nationalCode: user.nationalCode,
            gender_id: user.gender_id,
            major_id: user.major_id,
            shahr_id: user.shahr_id
          }, {
            headers: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiOGI2NDBkZWFkY2RiODQxZmJmOTEwOTQ2MGRlNDI4Y2QwNTI3Mzc0NjkyNTAzMDkzMzQzN2QyM2M3OWY5MTg5MWIzZDU0MmIwNWVmZDlkYTYiLCJpYXQiOjE2NDI2ODUyMDEuNjgwMTM2LCJuYmYiOjE2NDI2ODUyMDEuNjgwMTM4LCJleHAiOjE2NzQyMjEyMDEuNjc2MzI5LCJzdWIiOiIxNjYzMDIiLCJzY29wZXMiOltdfQ.PYHS3asF_ZTgoPkLeYRF8gHoVS1CuTzKchDhiN2jzcifNAMkV7tE-DCSbRD-8QB9aF086ffi3dLSBKoYGLIMEFG7aTEbedgxyqQCC7PSEYRbU1WJhgMgGVWFdMhAc-BL3036BpFkvFLRjo8UInALdFLFTlbpMILngJZS27Im8zNQW4WJunjqw88pT_m6XEXC6gXrZNVQM1usCBNqVg3apzsb3HtXhLwmCOA4oMHQMTj2_wuBBnLkTD-xVERnuDaWTpEvFgsXrzhpWln9a4p5Y_2qerNlvJRJkeQnAuAb4NkT1uyMJzW5u9YzvOhaTvOxaN_gg5-k7kmTVc--wwtCcsFuVcDYam6GZMwCWX1bAunF15N21ez3gvWWZRBGsDHFvtxLdGxKK-Sh5g3BlG-PXNWIgrwVymDDeDz-RT4GKK7-9LJSu2CxAdK1SGell3ZIZqFjd-NGlqdkUls8zgTGq-B6-9Vm1WmXMi12JPS-h1I9z2i8lmxMAahtbyYu_h2pVWfaLMLojIF7cgCuJuj7UQmuMXOCTnZVqZGLLiUBmkCTY2awzbicxg7HploCi_MTO6N2xd90TGpkIR0hco3kELQVzKJ1dMLmWpI1Q7GhRogYn2QVeTdiFeLN6d4sc037mRWTz9lxEy4MpnRgj0RoFUDM0lR_kpepgLD1ExYm94s'
            }
          }).then(resp => {
            user.hasBeenSaved = true
            user.editable = false
            user.loading = false
            Object.keys(user).forEach(key => {
              if (key.includes('_error')) {
                user[key] = () => true
              }
            })
            setTimeout(() => {
              this.$refs.form.validate()
            }, 500)
          }).catch(err => {
            user.loading = false
            Object.keys(err.response.data.errors).forEach(key => {
              user[key + '_error'] = () => { return err.response.data.errors[key][0] }
            })
            setTimeout(() => {
              this.$refs.form.validate()
            }, 500)
          })





          // setTimeout(() => {
          //   user.firstNameError = () => 'باید پر کنید'
          //   user.key = Date.now()
          //   setTimeout(() => {
          //     this.$refs.form.validate()
          //   }, 500)
          // }, 2000)
        }
      })
    }
  },
  computed: {
    selectedProvinceCity () {
      return (provinceId) => {
        if (!provinceId) {
          return []
        }
        return this.cities.filter(city => city.province.id === provinceId)
      }
    },
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
    this.initUserFormArray(true, 40)
    this.getUserFormData()
  }
}
</script>

<style scoped>
.input-box {
  padding: 0 10px;
  width: 100%;
}

.user-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.options {

}

.vertialcally-center-items {
  display: flex;
  align-items: center;
}
</style>

