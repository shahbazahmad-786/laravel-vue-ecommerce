<template>
    <div class="m-8">
        <!-- Heading -->
        <h2 class="text-2xl mb-3 font-bold tracking-tight text-gray-900">
            My Orders
        </h2>
        <!--/ Heading -->

        <!-- Table -->
        <table class="table-auto w-full">
            <!-- Table-Head -->
            <thead>
                <tr>
                    <th class="border-b-2 p-2 text-left bg-gray-100">
                        Order No
                    </th>
                    <th class="border-b-2 p-2 text-left bg-gray-100">
                        Date
                    </th>
                    <th class="border-b-2 p-2 text-left bg-gray-100">
                        Status
                    </th>
                    <th class="border-b-2 p-2 text-left bg-gray-100">
                        SubTotal
                    </th>
                    <th class="border-b-2 p-2 text-left bg-gray-100">
                        Items
                    </th>
                    <th class="border-b-2 p-2 text-left bg-gray-100">
                        Actions
                    </th>
                </tr>
            </thead>
            <!--/ Table-Head -->

            <!-- Table-Body -->
            <TableBody />
            <!--/ Table-Body -->
        </table>
        <!--/ Table -->
    </div>
</template>

<script setup>
import TableBody from './TableBody.vue';
</script>