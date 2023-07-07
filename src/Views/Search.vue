<template>
    <h1>Search View</h1>
    <SearchBar @InputChange="HandleSearchEmit"></SearchBar>
    <input type="button" value="filter">
    <button></button>
    <div v-if="books_list.length > 0">
        <SearchList :books_list_prop="books_list"></SearchList>
    </div>
    <nav v-if="current_page">
        <ul class="pagination">
            <li v-for="page in max_amount_of_pages" :class="page == current_page ? 'page-item active' : 'page-item'">
                <a href="#" class="page-link" @click="HandleSearchEmit(search, page)">{{ page }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import axios from "axios"
import SearchBar from "@/Sub/SearchBar.vue"
import SearchList from "@/Components/SearchList.vue"

export default {
    name: "Search",
    data() {
        return {
            search: "",
            books_list: [],
            max_amount_of_pages: 1,
            current_page: null
        }
    },
    methods: {
        async HandleSearchEmit(change, page = 1) {
            this.books_list = []
            if (change.length >= 1) {
                const response = await axios.get(`https://localhost:7226/api/Books/SearchByFilter?title=${change}&skip=${page}&totake=${5}`)
                this.search = change
                this.books_list = response.data.data
                this.page = response.data.page
                this.max_amount_of_pages = response.data.maxAmountOfPages
                this.current_page = page
                console.log(this.books_list)
            }
        },
        FilterList() {
            const filtered_books_list = this.books_list.map((b) => {
                const is_in_array = b.genres.indexOf()
            })
        }
    },
    components: { SearchBar, SearchList }
}
</script>