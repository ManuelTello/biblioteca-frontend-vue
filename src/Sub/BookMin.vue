<template>
    <div class="row">
        <div class="column">
            <h1><router-link :to="'/book/' + id">{{ title }}</router-link></h1>
        </div>
    </div>
    <div class="row">
        <div v-for="author in authors" class="column">
            <span class="author_preview">{{ author }}</span>
        </div>
    </div>
    <div class="row">
        <div v-for="genre in genres" class="column">
            <p class="author_preview"><span class="author_preview">{{ genre }}</span></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "BookMin",
    props: ["title", "authors", "genres", "id", "publisher"],
}
</script>
<style>
.author_preview {
    text-decoration-line: underline;
}
</style>