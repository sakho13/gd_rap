<template>
  <v-card>
    <v-container>
      <v-card-title> 当アプリについて </v-card-title>
      <v-divider />
      <v-card-text>
        <h3> 主な機能 </h3>
        <v-container>
          <ul>
            <li> 現在時刻の記録 </li>
            <li> 表示カラムの表示非表示 </li>
          </ul>
        </v-container>
        <v-divider />
        <h3> データの取り扱い </h3>
        <v-container>
          <p> 当アプリはWebSession上に必要データを保持しています。WebSession上にデータを保持させたくない場合は[オプション]から変更を行ってください。（更新時に記録<b>データがリセット</b>されます） </p>
          <p> 記録データを管理者が確認することはできません。 </p>
        </v-container>
        <v-divider />
        <h3> 各リンク </h3>
        <v-container>
          <a href="https://github.com/sakho13/gd_rap" target="_blank"> GitHubリポジトリ </a>
        </v-container>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "AboutCard"
})
</script>
