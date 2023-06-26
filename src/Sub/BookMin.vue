<template>
    <div>
        <h1><router-link :to="'/book/'+id" >{{ title }}</router-link></h1>
        <h6 v-for="author in authors">
            {{ author }}
        </h6>
        <h6 v-for="genre in genres">
            {{ genre }}
        </h6>
    </div>
</template>

<script>
export default {
    name:"BookMin",
    props: ["title", "authors", "genres", "id","publisher"],
}
</script>