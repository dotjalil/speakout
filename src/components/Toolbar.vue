<template>
    <v-toolbar>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-if="$store.state.isLoggedIn">{{ $store.state.username }}</v-btn>
        <v-btn flat v-if="$store.state.isLoggedIn">Logout</v-btn>
        <v-btn flat v-if="!$store.state.isLoggedIn" @click="$router.push({name: 'login' })">Login</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>
