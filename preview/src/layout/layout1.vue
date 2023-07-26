<template>
  <div>
    <header>
      <nav>java</nav>
      <nav>js</nav>
      <nav>c++</nav>
      <nav @click="$router.push('/fruit/test')">水果</nav>
    </header>
    <section>
      <router-view />
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
