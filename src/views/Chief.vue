<template>
  <v-container>
    <v-row class="chief">
      <v-col cols="12">
        <div class="heading">Bahor kafe</div>
      </v-col>
      <v-col class="cooking" cols="6">
        <div class="warning chef-title"> Tayyorlanmoqda </div>
        <div class="cooking-order">
          <v-btn large fab dark color="warning" v-for="item in getOrderList" :key="item.id"
          v-show="item.status == 'cooking'"
          @click="showDialog('cooked', item.id)"
            >{{item.tableNumber }} - {{ item.todayId }}</v-btn
          >
        </div>
      </v-col>
      <v-col class="cooked" cols="6">
        <div class="success chef-title"> Tayyor </div>
        <div class="cooking-order">
          <v-btn large fab dark color="success" v-for="item in getOrderList" :key="item.id"
          v-show="item.status == 'cooked'"
          @click="showDialog('given', item.id)"
            >{{item.tableNumber }} - {{ item.todayId }}</v-btn
          >
        </div>
      </v-col>
    </v-row>
    
    <!-- DIALOG  -->
    <v-dialog
      v-model="dialog"
      scrollable 
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="text-h6 grey lighten-2">
          {{ dialogMessage }}
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            text
            color="warning"
            @click="cancelDialog"
          >
            {{ cancel }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="success"
            @click="changeStatus"
          >
            {{ ok }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";
import EventService from "@/services/EventServices.js";
export default {
  data() {
    return {
      dialogMessage: "",
      dialog: false,
      status: "",
      id: null,
      polling: null,
      cancel: "",
      ok: ""
    }
  },
  computed: {
    ...mapState('chef', {
      orderList: 'orderList'
    }),
    getOrderList() {
      return this.orderList
    }
  },
  methods: {
    pollData() {
      this.polling = setInterval(() => {
			store.dispatch('chef/getOrder')
		}, 3000)
    },
    showDialog(value, id) {
      this.status = value;
      this.id = id;
      if(value == "cooked") {
        this.dialogMessage = "Taom tayyor bo'ldimi?"
        this.cancel = "Adashib ketdim"
        this.ok = "Ha albatta"
      } else {
        this.dialogMessage = "Taom berildimi yoki hali tayyor emasmi?"
        this.cancel = "Tayyor emas"
        this.ok = "Berildi"
      }
      this.dialog = true;
    },
    changeStatus() {
      let id = this.id;
      let foo =this.status
      let data = {
        status: foo
      }
      EventService.updateStatus(id, data)
        .then (() => {
          this.dialog = false
        })
    },
    cancelDialog() {
      if (this.cancel == "Adashib ketdim") {
        this.dialog = false
      } else {
        let id = this.id;
        let foo = "cooking"
        let data = {
          status: foo
        }
        EventService.updateStatus(id, data)
        .then (() => {
          this.dialog = false
        })
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  created() {
    this.pollData()
  },

};
</script>

<style lang="scss" scoped>
.heading {
  text-align: center;
  text-transform: uppercase;
  box-shadow: 0 0 0 0 rgb(0 0 0 / 20%), 0 0 0 0 rgb(0 0 0 / 14%),
    0 0 0 0 rgb(0 0 0 / 12%);
  color: #fff;
  background-color: #4caf50;
  border-color: #4caf50;
  border-radius: 4px;
  font-size: 25px;
  padding: 12px;
  letter-spacing: 1.5px;
}
.cooking,
.cooked {
  height: calc(100vh - 86px);
  overflow-y: scroll;
}
.cooking-order {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 15px; 
  justify-content: center;
}
.chef-title {
  padding: 16px;
  border-radius: 4px;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

@media screen and (max-width: 1200px) {
  .cooking-order {
    grid-template-columns: repeat(4, auto);
    gap: 15px;
  }
}
@media screen and (max-width: 900px) {
  .cooking-order {
    grid-template-columns: repeat(3, auto);
    gap: 15px;
  }
}
@media screen and (max-width: 500px) {
  .heading {
    font-size: 23px;
  }
  .chef-title {
    padding: 12px;
    font-size: 16px !important;
    text-transform: capitalize;
    letter-spacing: 1px;
  }
  .cooking-order {
    grid-template-columns: repeat(2, auto);
    gap: 12px;
  }
}
@media screen and (max-width: 400px) {
  .heading {
    font-size: 20px;
  }
  .chef-title {
    padding: 12px 5px;
    font-size: 15px !important;
    text-transform: capitalize;
    letter-spacing: 1px;
  }
}
</style>