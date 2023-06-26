<template> 
    <div v-if="book != null">
        <h1>{{ book.title }} - {{ book.id }}</h1>
        <h2>{{ book.author }}</h2>
        <h3>{{ book.genre }}</h3>
    </div>
</template>

<script>
export default {
    name: "Book",
    data() {
        return {
            book: null
        }
    },
    methods: {
        FetchBook(){
            // Calls api
            this.book = {
                id: this.$route.params.id,
                title: "Testing",
                authro: "Test Author",
                genre:"Test Genre"
            }
        }
    },
    mounted() {
        this.FetchBook()
    }
}
</script>