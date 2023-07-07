<template>
    <div v-if="book != null">
        <h1>{{ book.title }} - {{ book.id }}</h1>
        <ul>
            <li v-for="author in book.authors">
                {{ author }}
            </li>
        </ul>
        <ul>
            <li v-for="genre in book.genres">
                {{ genre }}
            </li>
        </ul>
        <h3>{{ book.publisher }}</h3>
        <h3>{{ book.rented }}</h3>
        <img src="https://picsum.photos/200/300">
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "Book",
    data() {
        return {
            book: null
        }
    },
    methods: {
        async FetchBook() {
            const response = await axios.get(`https://localhost:7226/api/Books/SearchById/${this.$route.params.id}`)
            const book_cover = await axios.get("https://picsum.photos/200/300")
            const response_parse = await response.data
            this.book = response_parse.data[0]
        }
    },
    mounted() {
        this.FetchBook()
    }
}
</script>