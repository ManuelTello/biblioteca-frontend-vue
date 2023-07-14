<template>
    <div v-for="b in books_list">
        <BookMin :id="b.id" :title="b.title" :authors="b.authors" :genres="b.genres"></BookMin>
    </div>
</template>

<script>
import BookMin from "@/Sub/BookMin.vue"
export default {
    name: "SearchList",
    props: ["books_list_prop"],
    data() {
        return {
            books_list: []
        }
    },
    methods: {
        SetUpBooksList() {
            this.books_list = this.$props.books_list_prop
        }
    },
    mounted() {
        this.SetUpBooksList()
    },
    components: { BookMin }
}
</script>