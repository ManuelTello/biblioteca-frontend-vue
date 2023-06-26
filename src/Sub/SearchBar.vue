<template>
    <div>
        <input type="text" placeholder="Type something...." v-model="search_input" class="form-control" @input="EmitChange"/>
    </div>
</template>
<script>
export default{
    name: "SearchBar",
    emits:["InputChange"],
    data() {
        return {
            search_input: ""
        }
    },
    methods: {
        EmitChange() {
            this.$emit("InputChange",this.search_input)
        }
    }
}
</script>