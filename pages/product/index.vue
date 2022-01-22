<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          v-if="!loading"
          :headers="headers"
          :items="response.data"
          :items-per-page="response.meta.per_page"
          class="elevation-1"
          :page.sync="page"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>لیست</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    جدید
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">test</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="Dessert name"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.calories"
                            label="Calories"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.fat"
                            label="Fat (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.carbs"
                            label="Carbs (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.protein"
                            label="Protein (g)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.orderProducts="{ item }">
            <p v-for="(orderProduct, index) in item.orderProducts" :key="index">{{orderProduct.product.title}}</p>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template>
        </v-data-table>
        <div class="text-center pt-2" v-if="!loading">
          <v-pagination
            v-model="page"
            :length="response.meta.count"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API_ADDRESS from "assets/Addresses";

export default {
  name: "productShowEdit.vue",
  created () {
    this.loading = true
    this.$axios.get(API_ADDRESS.product.base, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiMmM1ZWQzOWUwNDUzMzZhOGY3ZjRiNWU2OTU0MDJkMmQzNmRlNmYyYjE3OTNlNzFmZjkyYjkzZjEyYWNhOWQwNTAzOTUyOWM5NDY5ZDYxY2QiLCJpYXQiOjE2NDI4Mzc0MjMuMTQ3OTcsIm5iZiI6MTY0MjgzNzQyMy4xNDc5NzIsImV4cCI6MTY3NDM3MzQyMy4xNDIxMzgsInN1YiI6IjM4OTI3MCIsInNjb3BlcyI6W119.RyajIaYQPEaNpmUHM_Zx7wSAexMp9PTmKa08n7dDe0fAlNyEVKyE9bkJP4WW7NlNEnV5bRLS192Kwj19TXrklcmVYW32BQBnxfFI3pIK3UxWUoA5XzGRlNlFp_gSAkrEkJgDHE45c_9Vp2DNUPwxH9kr4D_GgI_2YI5sdDGoCS81hJa9cU0TUOJFrImtkypmtsH_EAzwLedNngPsn41HuMWc_sOj-5I74_LLT29fNXQstEBuvlXXEKF2TvVQ1kdzD_JIeK6LjQlcYYLcEI3IIM79nXj91FQ3zcusV1I2fTLlP4J-988WTfUJwJSIZijsN1rcW1ZEQ14ezImPXcphPxhNCz1rz_g-f4VuKzqMLHUQrbMv3RM4dvTE9LIhh-X-KvvinYJQnisXQQOdfzB_Z4e3f1d1YWxpiZZfmMjrLkr5-5PBSFRngbMVT11e1h6hbC2iIgoxIoLMucXef4x4vkxI3YuIKWjnuEOXtvpE6MY91f3Vsi2TpRUmD4OBG4wj4N2f_e3jWvzg-dAb1b3Yww586iS1zlSOk_OIgA0F8Fa7NI4nKOEYoaMZS2V_5RhaTf8mDwW0OdeVNRN4OkO3Bp2Mg6oPXq9wbssmR64HBf4R-uU5ZYic7sbepBjXLaDAD2gNrU0WKB5nEv9TzsM7rAdPZDcK_a8NJxeYcDqvb9s'
      }
    }).then(resp => {
      this.response = resp.data
      this.response.data.forEach((item, index) => {
        this.response.data[index] = { orderProducts: item.orderproducts, user: item.user.first_name + ' ' + item.user.last_name, user_mobile: item.user.mobile, insertor: item.insertor.first_name + ' ' + item.insertor.last_name, insertor_mobile: item.insertor.mobile, completed_at: item.completed_at }
      })
      this.page = resp.data.meta.current_page
      this.loading = false
    })
  },
  data () {
    return {
      loading: true,
      page: 1,
      response: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'محصول',
          value: 'orderProducts'
        },
        {
          text: 'کاربر',
          value: 'user'
        },
        {
          text: 'موبایل کاربر',
          value: 'user_mobile'
        },
        {
          text: 'تخصیص دهنده',
          value: 'insertor'
        },
        {
          text: 'موبایل تخصیص دهنده',
          value: 'insertor_mobile'
        },
        {
          text: 'تاریخ',
          value: 'completed_at'
        },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.response.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.response.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.response.data.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.response.data[this.editedIndex], this.editedItem)
      } else {
        this.response.data.push(this.editedItem)
      }
      this.close()
    },
  }
}
</script>

<style scoped>

</style>
