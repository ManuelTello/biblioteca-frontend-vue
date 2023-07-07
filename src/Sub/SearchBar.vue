<template>
    <div>
        <input type="text" placeholder="Type something...." v-model="search_input" class="form-control" />
        <input type="submit" value="Send" @click="EmitChange" class="btn btn-primary" />
    </div>
</template>
<script>
export default {
    name: "SearchBar",
    emits: ["InputChange"],
    data() {
        return {
            search_input: ""
        }
    },
    methods: {
        EmitChange() {
            console.log("Emitted")
            this.$emit("InputChange", this.search_input)
        }
    }
}
</script>