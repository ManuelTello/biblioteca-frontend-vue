<template>
    <h1>Search View</h1>
    <SearchBar @InputChange="HandleSearchEmit"></SearchBar>
    <div v-if="books_list.length > 0">
        <SearchList :books_list_prop="books_list"></SearchList>
    </div>
</template>

<script>
import SearchBar from "@/Sub/SearchBar.vue"
import SearchList from "@/Components/SearchList.vue"

export default {
    name: "Search",
    data() {
        return {
            cache:[
            {
                id:1,
                title:"The spare room",
                authors:["Andrea Bartz","Caludia Gravens"],
                genres:["comedy","art"],
                publisher:"Estrada",
                avalible:32,
                datepublished:"2012-04-11"
            },
            {
                id:2,
                title:"The spare individual",
                authors:["Andrea Bartz","Katherine J.Chen"],
                genres:["historical","drama"],
                publisher:"Solo",
                avalible:2,
                datepublished:"1995-04-11"
            },
            {
                id:3,
                title:"Flaying Solo",
                authors:["Lind Holmes"],
                genres:["self reflection"],
                publisher:"In.Co",
                avalible:120,
                datepublished:"2022-01-21"
            },
            {
                id:4,
                title:"Daphne",
                authors:["Josh Malerman"],
                genres:["terror","suspense","sci-fi"],
                publisher:"Link",
                avalible:40,
                datepublished:"2005-2-12"
            },
            {
                id:5,
                title:"Ancestor Trouble",
                authors:["Andrea Bartz","Maud Newton"],
                genres:["historical","novel"],
                publisher:"Right&Type",
                avalible:200,
                datepublished:"2012-04-11"
            },
            {
                id:6,
                title:"God of want",
                authors:["K-Ming Chang"],
                genres:["drama","religious"],
                publisher:"Chin'n",
                avalible:68,
                datepublished:"2010-04-11"
            }
        ],
            books_list:[],
        }
    },
    methods: {
        HandleSearchEmit(change) {
            //llamada a la API
            if (change.length >= 3) {
                const reg = new RegExp(`.*${change}`, "gi")
                this.books_list = this.cache.filter(b => reg.test(b.title) === true)
                console.log(this.books_list)
            }
        }
    },
    mounted() {
    },
    components:{SearchBar,SearchList}
}
</script>