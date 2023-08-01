<template>
    <div class="row g-3">
        <div class="col-12">
            <div class="input-group mb-3">
                <input type="text" aria-label="Book title" placeholder="Type a book title" v-model="search"
                    class="form-control" aria-describedby="button-addon2" />
                <button @click="EmitChange" class="btn btn-outline-primary" id="button-addon2"><i
                        class="bi bi-search"></i></button>
                <button class="btn btn-outline-primary" id="button-addon2" data-bs-toggle="collapse"
                    data-bs-target="#filterCollapse" aria-expanded="false" aria-controls="filterCollapse"><i
                        class="bi bi-filter"></i></button>
            </div>
        </div>
    </div>
    <div class="collapse" id="filterCollapse">
        <div class="card p-3">
            <h5 class="text-dark mb-3">Advance search</h5>

            <!-- #1 -->
            <div class="row g-3 mb-3">

                <!-- Authors -->
                <div class="col-4">
                    <div class="row-12">
                        <input type="text" placeholder="Authors" class="form-control" v-model="authors">
                    </div>
                    <div class="row-12" v-if="HasAuthorsErrors">
                        <div class="col mt-2">
                            <div v-for="error in AuthorsValidation"><span class="text-danger text-opacity-50 small">* {{
                                error
                            }}</span></div>
                        </div>
                    </div>
                </div>

                <!-- Genres -->
                <div class="col-4">
                    <div class="row-12">
                        <input type="text" placeholder="Genres" class="form-control" v-model="genres">
                    </div>
                    <div class="row-12" v-if="HasGenresErrors">
                        <div class="col mt-2">
                            <div v-for="error in GenresValidation"><span class="text-danger text-opacity-50 small">* {{
                                error
                            }}</span></div>
                        </div>
                    </div>
                </div>

                <!-- Publisher -->
                <div class="col-4">
                    <div class="row-12">
                        <input type="text" placeholder="Publisher" class="form-control" v-model="publisher">
                    </div>
                    <div class="row-12" v-if="HasPublisherErrors">
                        <div class="col mt-2">
                            <div v-for="error in PublisherValidation"><span class="text-danger text-opacity-50 small">* {{
                                error
                            }}</span></div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- #2 -->
            <div class="row g-3 mb-3">

                <!-- Rented -->
                <div class="col-4">
                    <div class="row-12">
                        <div class="col-12 input-group">
                            <input type="text" class="form-control" placeholder="Rented" v-model="rented">
                            <button class="btn btn-outline-secondary dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">{{ rented_order ? "Ascendent" : "Decendent"
                                }}</button>
                            <ul class="dropdown-menu">
                                <li class="dropdown-item" @click="() => rented_order = true">Ascendent</li>
                                <li class="dropdown-item" @click="() => rented_order = false">Decendent</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row-12">
                        <div class="col mt-2">
                            <div v-for="error in RentedValidation"><span class="text-danger text-opacity-50 small">* {{
                                error }}</span></div>
                        </div>
                    </div>
                </div>

                <!-- Date -->
                <div class="col-4">
                    <div class="input-group">
                        <input type="date" class="form-control" v-model="date_string" />
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">{{ date_order ? "Ascendent" : "Decendent" }}</button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item" @click="() => date_order = true">Ascendent</li>
                            <li class="dropdown-item" @click="() => date_order = false">Decendent</li>
                        </ul>
                    </div>
                </div>

                <!-- To show -->
                <div class="col-2">
                    <div class="input-group mb-3">
                        <label for="selectshow" class="input-group-text">To show</label>
                        <select name="selectshow" class="form-select">
                            <option @click="() => toshow = '5'" selected>5</option>
                            <option @click="() => toshow = '10'">10</option>
                            <option @click="() => toshow = '15'">15</option>
                            <option @click="() => toshow = '20'">20</option>
                        </select>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    emits: ["FilterQueryEvent"],
    data() {
        return {
            query: "",
            search: "",
            authors: "",
            genres: "",
            publisher: "",
            toshow: 5,
            rented: 0,
            date_string: "",
            rented_order: true,
            date_order: true
        }
    },
    methods: {
        EmitChange() {
            if (this.search.length > 0) {
                this.UpdateQuerySection(this.ReplaceCommasAndSpaces(this.search, "title"))

                if (!this.HasAuthorsErrors && (this.authors != "" && this.authors != null)) {
                    this.UpdateQuerySection(this.ReplaceCommasAndSpaces(this.authors, "authors"), null)
                }

                if (!this.HasGenresErrors && (this.genres != "" && this.genres != null)) {
                    this.UpdateQuerySection(this.ReplaceCommasAndSpaces(this.genres, "genres"), null)
                }

                if (!this.HasPublisherErrors && (this.publisher != "" && this.publisher != null)) {
                    this.UpdateQuerySection(this.ReplaceCommasAndSpaces(this.publisher, "publisher"), null)
                }

                if (!this.HasRentedErrors && (this.rented != "" && this.rented != null && this.rented != 0)) {
                    this.UpdateQuerySection(this.ReplaceCommasAndSpaces(this.rented, "rented"), this.rented_order)
                }

                if (this.date_string != "" && this.date_string != null) {
                    this.UpdateQuerySection(this.ReplaceCommasAndSpaces(this.date_string, "date"), this.date_order)
                }

                this.UpdateQuerySection(this.ReplaceCommasAndSpaces(this.toshow, "take"), null)

                this.query = this.query + "$page=1"

                this.$emit("FilterQueryEvent", this.query)

                this.url = ""
            }
        },
        ReplaceCommasAndSpaces(toreplace, prefix) {
            const sanitazed_query = `$${prefix}=${toreplace.toString().replace(/\,/g, "%").replace(/\s/g, "_")}`
            return sanitazed_query
        },
        UpdateQuerySection(toadd, metadata) {
            this.query = this.query + toadd
            if (metadata != null)
                this.query = this.query + ":" + (metadata ? "ASC" : "DESC")
        },
        CheckIfIsOnlyAlphabetic(input) {
            const regex = /[^a-z|A-Z^\,^\s]/
            return regex.test(input)
        },
        CheckIfIsOnlyNumeric(input) {
            const regex = /[\D]/
            return regex.test(input)
        },
        CheckIfRedundant(input) {
            const regex = /^[^a-z|^A-Z]/
            const regex_check = regex.test(input)
            return regex_check
        }
    },
    computed: {
        HasAuthorsErrors() {
            return this.AuthorsValidation.length > 0 ? true : false
        },
        HasGenresErrors() {
            return this.GenresValidation.length > 0 ? true : false
        },
        HasPublisherErrors() {
            return this.PublisherValidation.length > 0 ? true : false
        },
        HasRentedErrors() {
            return this.RentedValidation.length > 0 ? true : false
        },
        AuthorsValidation() {
            let errors = []
            const is_alphabetic = this.CheckIfIsOnlyAlphabetic(this.authors)
            const is_redundant = this.CheckIfRedundant(this.authors)

            if (is_alphabetic) {
                errors.push("Only alphabetic characters.")
            }
            if (is_redundant) {
                errors.push("Can't start with a non alphabetic character.")
            }
            return errors
        },
        GenresValidation() {
            let errors = []
            const is_alphabetic = this.CheckIfIsOnlyAlphabetic(this.genres)
            const is_redundant = this.CheckIfRedundant(this.genres)

            if (is_alphabetic) {
                errors.push("Only alphabetic characters.")
            }
            if (is_redundant) {
                errors.push("Can't start with a non alphabetic character.")
            }
            return errors
        },
        PublisherValidation() {
            let errors = []
            const is_alphabetic = this.CheckIfIsOnlyAlphabetic(this.publisher)
            const is_redundant = this.CheckIfRedundant(this.publisher)

            if (is_alphabetic) {
                errors.push("Only alphabetic characters.")
            }
            if (is_redundant) {
                errors.push("Can't start with a non alphabetic character.")
            }
            return errors

        },
        RentedValidation() {
            const errors = []
            const has_only_numbers = this.CheckIfIsOnlyNumeric(this.rented)

            if (has_only_numbers) {
                errors.push("Only numeric values.")
            }

            return errors
        },
    }
}
</script>