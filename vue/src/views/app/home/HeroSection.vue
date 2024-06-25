<template>
    <div class="mx-auto max-w-2xl pt-20">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div
                class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of funding.
                <router-link :to="{ name: 'app.products' }" class="font-semibold text-indigo-600">
                    <span class="absolute inset-0" aria-hidden="true" />
                    Read more
                    <span aria-hidden="true">&rarr;</span>
                </router-link>
            </div>
        </div>
        <div class="text-center">
            <h1 class="text-5xl font-bold tracking-tight text-gray-900">
                <AppName />, A famous shopping web application
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">
                Discover a world of convenience at your fingertips with our ecommerce website. Shop effortlessly, enjoy
                secure transactions, and redefine your online retail experience.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <router-link :to="{ name: 'app.products' }"
                    class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Get started
                </router-link>
            </div>
        </div>
    </div>
</template>