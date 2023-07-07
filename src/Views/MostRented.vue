<template>
    <SearchList v-if="books_list.length != 0" :books_list_prop="books_list"></SearchList>
</template>

<script>
import axios from "axios"
import SearchList from '@/Components/SearchList.vue';

export default {
    name: "MostRented",
    data() {
        return {
            books_list: []
        }
    },
    methods: {
        async FetchTopRentedBooks() {
            const response = await axios.get("https://localhost:7226/api/Books/MostRentedBooks")
            const response_parse = await response.data
            this.books_list = response_parse.data
        }
    },
    mounted() {
        this.FetchTopRentedBooks()
    },
    components: { SearchList }
}
</script>