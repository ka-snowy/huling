<template>
  <div id="docAfter">
    <HLUtterances
      :key="issueTerm"
      :class="commentHide"
      class="light"
      repo="hulinguistics/huling"
      label="🕊️comment"
      :issue-term="issueTerm"
      theme="github-light"
    />
    <HLUtterances
      :key="issueTerm"
      :class="commentHide"
      class="dark"
      repo="hulinguistics/huling"
      label="🕊️comment"
      :issue-term="issueTerm"
      theme="github-dark"
    />
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useData } from 'vitepress';
import HLUtterances from './HLUtterances.vue';

export default {
  components: {
    HLUtterances,
  },
  setup() {
    const { frontmatter } = useData();

    // frontmatterの更新でissueTermも更新
    const issueTerm = ref('Comment: ' + frontmatter.value.title);
    const commentHide = ref(frontmatter.value.commentHide ? 'hide' : '');
    watch(frontmatter, (c) => {
      issueTerm.value = 'Comment: ' + c.title;
      commentHide.value = c.commentHide ? 'hide' : '';
    });

    return {
      issueTerm,
      commentHide,
    };
  },
};
</script>

<style scoped>
#docAfter {
  margin-top: 30px;
}
html.dark #docAfter .light,
html:not(.dark) #docAfter .dark {
  display: none;
}
#docAfter .hide {
  display: none;
}
</style>
