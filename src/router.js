import { createRouter, createWebHistory } from "vue-router"
import Search from "@/Views/Search.vue"

const routes = [
    {
        path: "/",
        component: Search
    },
    {
        path: "/mostrented",
        component: () => import("@/Views/MostRented.vue")
    },
    {
        path: "/about",
        component: () => import("@/Views/About.vue")
    },
    {
        path: "/book/:id",
        component: () => import("@/Views/Book.vue"),
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router