<template>
    <div>
        <h2 class="text-xl font-semibold mt-6 pb-2 border-b border-gray-300">Customer Details</h2>
        <table>
            <tbody>
                <tr>
                    <td class="font-bold py-1 px-2">Name</td>
                    <td>{{ order.customer.name }}</td>
                </tr>
                <tr>
                    <td class="font-bold py-1 px-2">Email</td>
                    <td>{{ order.customer.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps(['order']);
</script>