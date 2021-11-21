<template>
  <v-card>
    <v-container>
      <v-card-title class="mp"> 当アプリについて </v-card-title>
      <v-divider />
      <v-card-text class="mp">
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
          <a href="https://github.com/sakho13/gd_rap" target="_blank" style="color: rgb(155, 45, 219);"> GitHubリポジトリ </a>
        </v-container>
        <v-divider />
        <h3> コメント </h3>
        <v-container>
          <p> 実験データでラップタイムを測定する時等を想定して作成しました。 </p>
          <p> 明らかなバグが見つかった場合は修正する可能性はありますが、基本放置します。 </p>
          <p> CSSがゴミなのは お許しを🙏 </p>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1&display=swap');

.mp {
  font-family: 'M PLUS 1', sans-serif;
}
</style>
