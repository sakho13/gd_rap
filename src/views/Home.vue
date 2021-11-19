<template>
  <v-container>
    <v-row>
      <v-col cols="0" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-spacer />
          <v-col class="text-right">
            <v-dialog max-width="600px" v-model="showOptionOverlay">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon large
                  v-bind="attrs" v-on="on"
                  @click="showOptionOverlay = true"
                >
                  <v-icon> mdi-cog </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-container>
                  <v-card-title> オプション </v-card-title>
                  <v-card-text>
                    <v-switch v-model="dateTable.column[1].isShow" inset label="YYYY/MM/DD" color="deep-orange" />
                    <v-expansion-panels>
                      <v-expansion-panel>
                        <v-expansion-panel-header expand-icon="mdi-menu-down"> YYYY/MM/DD 個別 </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-switch v-model="dateTable.column[2].isShow" inset label="年" color="orange" />
                          <v-switch v-model="dateTable.column[3].isShow" inset label="月" color="orange" />
                          <v-switch v-model="dateTable.column[4].isShow" inset label="日" color="orange" />
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-switch v-model="dateTable.column[5].isShow" inset label="hh:mm:ss.ms" color="deep-orange" />
                    <v-expansion-panels>
                      <v-expansion-panel>
                        <v-expansion-panel-header expand-icon="mdi-menu-down"> hh:mm:ss.ms 個別 </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-switch v-model="dateTable.column[6].isShow" inset label="時" color="orange" />
                          <v-switch v-model="dateTable.column[7].isShow" inset label="分" color="orange" />
                          <v-switch v-model="dateTable.column[8].isShow" inset label="秒" color="orange" />
                          <v-switch v-model="dateTable.column[9].isShow" inset label="ミリ秒" color="orange" />
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-switch v-model="dateTable.column[10].isShow" inset label="秒換算" color="deep-orange" />
                    <v-switch v-model="dateTable.column[11].isShow" inset label="秒換算 (時除く)" color="deep-orange" />
                    <v-divider />
                    <v-switch
                      v-model="storeBefore"
                      inset color="indigo"
                      :label="`リロード時に記録を保持${storeBefore? 'する':'しない'}。`"
                    />
                  </v-card-text>
                </v-container>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <h1> ラップ記録 </h1>
        <v-container>
          <v-card elevation="1">
            <v-container>
              <div>{{ ("00"+date.getHours()).slice(-2) }}:{{ ("00"+date.getMinutes()).slice(-2) }}:{{ ("00"+date.getSeconds()).slice(-2) }}.{{ ("000"+date.getMilliseconds()).slice(-3) }}</div>
              <v-container>
                <v-btn @click="addNowDate()"> PUSH </v-btn>
              </v-container>
            </v-container>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="0" md="2"></v-col>
    </v-row>

    <v-container>
      <h1> 記録 </h1>
      <v-container>
        <v-row>
          <v-col cols="12" md="8"> <p> 下の表をコピーしてExcelやスプレッドシートに貼り付けてください。 </p> </v-col>
          <v-col cols="12" md="4" class="text-right"> <v-btn @click="reset"> RESET </v-btn> </v-col>
        </v-row>
      </v-container>
      <v-container>
        <VueGoodTable
          :columns="dateTable.column.filter(c=>c.isShow)"
          :rows="dateTable.getDateRow()"
          :sort-options="{ enabled: false }"
        />
      </v-container>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
// import "vue-good-table/dist/vue-good-table"
import { VueGoodTable } from "vue-good-table"

import { RapTable } from '@/utils/rapTable'

export default Vue.extend({
  name: 'Home',

  data() {
    return {
      date: new Date(),
      dateTable: new RapTable(),
      storeBefore: true,
      showOptionOverlay: false
    }
  },

  methods: {
    addNowDate() {
      this.dateTable.addNewRowDate()
      if (this.storeBefore) {
        this.store()
      }
    },

    store() {
      sessionStorage.setItem("dgrap-store-before", this.storeBefore? "true":"false")
      sessionStorage.setItem("dgrap-raptable-dates", this.dateTable.getDatesString())
    },

    reset() {
      sessionStorage.removeItem("dgrap-raptable-dates")
      sessionStorage.removeItem("dgrap-store-before")
      this.dateTable.resetDates()
    },

    setNewDate() {
      this.date = new Date()
    }
  },

  mounted() {
    const storedData = sessionStorage.getItem("dgrap-raptable-dates")
    if (storedData != null) {
      // console.log(storedData)
      this.dateTable.setDatesString(storedData)
    }
    const beforeStoreData = sessionStorage.getItem("dgrap-store-before")
    if (beforeStoreData != null) {
      this.storeBefore = beforeStoreData === "false" ? false: true
    }
    this.setNewDate()
    setInterval(() => this.setNewDate(), 1000)
  },

  watch: {
    storeBefore: function(n: boolean, o: boolean) {
      if (n && !o) {
        this.store()
      }
      if (!n && o) {
        sessionStorage.removeItem("dgrap-raptable-dates")
        sessionStorage.removeItem("dgrap-store-before")
      }
    }
  },

  components: {
    VueGoodTable
  }
})
</script>

<style scoped>
@import url("../../node_modules/vue-good-table/dist/vue-good-table.css");
</style>
