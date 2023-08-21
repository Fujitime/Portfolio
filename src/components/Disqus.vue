<template>
    <section class="comments mt-20" aria-labelledby="comment">
      <div id="disqus_thread"></div>
    </section>
  </template>
  
  <script>
  export default {
    mounted() {
      const script = document.createElement("script");
      script.src = "https://fujitime.disqus.com/embed.js";
      script.setAttribute("data-timestamp", + new Date());
      document.head.appendChild(script);
    },
  };
  </script>
  