<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '../components/NavBar.vue'
</script>

<template>
    <div >
        <aside>
            <NavBar />
        </aside>
        <main>
            <!-- <header class="lg:justify-end flex justify-between w-full p-3 pb-2">
                <MobileSidebar />

                <ProfileBox />
            </header> -->

            <RouterView />
        </main>
    </div>
</template>
