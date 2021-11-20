<template>
  <v-container>
    <v-row>
      <v-col cols="0" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-spacer />
          <v-col class="text-right">
            <!-- オプション ダイアログ -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon large @click="showOptionOverlay = !showOptionOverlay"
                  v-bind="attrs" v-on="on"
                >
                  <v-icon> mdi-cog </v-icon>
                </v-btn>
              </template>
              <span class="mp"> オプション </span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon large @click="showAboutOverlay = !showAboutOverlay"
                  v-bind="attrs" v-on="on"
                >
                  <v-icon> mdi-information </v-icon>
                </v-btn>
              </template>
              <span class="mp"> 当アプリについて </span>
            </v-tooltip>
          </v-col>
        </v-row>
        <h1 class="mp"> ラップ記録 </h1>
        <v-container>
          <v-card elevation="1" class="clock-card">
            <v-container>
              <v-container class="mp">
                <p class="date">
                  {{ ("0000"+date.getFullYear()).slice(-4) }}/{{ ("00"+(date.getMonth()+1)).slice(-2) }}/{{ ("00"+date.getDate()).slice(-2) }}
                </p>
                <div class="text-center time">
                  {{ ("00"+date.getHours()).slice(-2) }}:{{ ("00"+date.getMinutes()).slice(-2) }}:{{ ("00"+date.getSeconds()).slice(-2) }}.{{ ("000"+date.getMilliseconds()).slice(-3) }}
                </div>
              </v-container>
              <v-divider />
              <v-container class="text-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="addNowDate()" class="mp"
                      rounded x-large color="deep-orange darken-3" dark
                      style="font-weight: 600;"
                      v-bind="attrs" v-on="on"
                    > 記録する </v-btn>
                  </template>
                  <span class="mp"> ショートカット: Enterキー </span>
                </v-tooltip>
              </v-container>
            </v-container>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="0" md="2"></v-col>
    </v-row>

    <v-container>
      <h1 class="mp"> 記録データ </h1>
      <v-container>
        <v-row>
          <v-col cols="12" md="8"> <p class="mp"> 下の表をコピーしてExcelやスプレッドシートに貼り付けてください。 </p> </v-col>
          <v-col cols="12" md="4" class="text-right">
            <v-btn @click="reset" class="mp">
              リセット
              <v-icon> mdi-refresh-circle </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <VueGoodTable
          :columns="dateTable.column.filter(c=>c.isShow)"
          :rows="dateTable.getDateRow()"
          :sort-options="{ enabled: false }"
          class="mp"
        />
      </v-container>
    </v-container>

    <!-- ダイアログ -->
    <v-dialog v-model="showAboutOverlay" max-width="600px">
      <about-card />
    </v-dialog>

    <v-dialog v-model="showOptionOverlay" max-width="600px">
      <v-card>
        <v-container>
          <v-card-title class="mp"> オプション </v-card-title>
          <v-card-text class="mp">
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { VueGoodTable } from "vue-good-table"

import { RapTable } from '@/utils/rapTable'
import AboutCard from '@/components/AboutCard.vue'
import { Analytics, LogEvent } from '@/main'

export default Vue.extend({
  name: 'Home',

  data() {
    return {
      date: new Date(),
      dateTable: new RapTable(),
      storeBefore: true,
      showOptionOverlay: false,
      showAboutOverlay: false,
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
    },

    onKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        this.addNowDate()
      }
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
    LogEvent(Analytics, "join", {
      "join_date": this.date.toLocaleString()
    })
    setInterval(() => this.setNewDate(), 10)
    document.addEventListener("keydown", this.onKeyDown)
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown)
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
    VueGoodTable,
    AboutCard
  }
})
</script>

<style scoped>
@import url("../../node_modules/vue-good-table/dist/vue-good-table.css");

.date {
  text-align: right;
  font-size: x-large;
  font-weight: 600;
}

.time {
  font-size: xx-large;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: inset 20px 20px 60px #d9d9d9,
              inset -20px -20px 60px #ffffff;
}

</style>
