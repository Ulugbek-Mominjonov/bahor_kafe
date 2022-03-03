<template>
  <div class="stoll-link">
    <div 
      class="stoll"
      :class="{active: !nomer.isFree}"
      @click="table()"
      >{{nomer.number}}</div>
      <v-dialog
        v-model="dialog"
        scrollable 
        max-width="200px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-actions class="justify-center">
            <v-btn
              class="mx-2"
              fab
              dark
              color="cyan"
              @click="changeOrder"
              v-show="!nomer.isFree"
            >
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              fab
              dark
              color="indigo"
              @click="addOrder"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      nomer: {
        type: Object,
      },
      afitsant: {
        type: String
      },
    },
    data() {
      return {
        dialog: false
      }
    },
    methods: {
      addOrder() {
        let id = this.nomer.id
        this.$router.push({name: 'Menu', params: {id: id}})
        this.dialog = false
      },
      table() {
        this.dialog = true
      },
      changeOrder() {
        let id = this.nomer.id
        this.$router.push({name: 'Menu', params: {id: id}})
        this.dialog = false
      }
    }
  }
</script>

<style scoped>
.stoll {
  width: 184px;
  padding: 46px 36px;
  font-weight: 800;
  font-size: 96px;
  line-height: 112px;
  color: #000000;
  background: rgba(20, 255, 0, 0.5);
  border-radius: 20px;
  text-align: center;
}
.stoll-link {
  display: block;
  cursor: pointer;
}
.active{
  background-color: red;
}

</style>