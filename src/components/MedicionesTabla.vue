<template>
  <table class="zigzag">
            <thead>
                <tr>
                    <th class="header">#</th>
                    <th class="header">Sensor</th>
                    <th class="header">Valor</th>
                    <th class="header">Latitud</th>
                    <th class="header">Longitud</th>
                    <th class="header">Fecha</th>
                    <th class="header"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in mediciones" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.sensor }}</td>
                    <td>{{ item.valor }}</td>
                    <td>{{ item.lat }}</td>
                    <td>{{ item.lon }}</td>
                    <td>{{ $dayjs(item.createdAt).format('MMM D, YYYY h:mm A') }}</td>
                    <td>
                        <button @click="eliminarMedicion(item.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
</template>

<script>

import { io } from 'socket.io-client'

import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useMedicionesStore } from '../store/mediciones'

export default defineComponent({

    name: 'MedicionesTabla',
    
    setup() {

        const medicionesStore = useMedicionesStore()
        const { mediciones } = storeToRefs(medicionesStore) //medicion: { id, sensor, valor, lat, lon, createdAt, updatedAt }

        //se ejecuta despues de que se ha creado el componente
        onMounted(() => {
            console.log("MedicionesView : mounted")
            medicionesStore.fetchMediciones()
        })

        

        const eliminarMedicion = (id) => {
            medicionesStore.deleteMedicion(id)
        }

        /********* start sockets  *********/
        
        const socket = io("http://localhost:3000")
        // callbacks que se ejecutan cuando se emite un evento desde el servidor
       
        //cuando se conecta al servidor
        socket.on("connect", () => {
            console.log("socket connected")
        })

        //cuando se desconecta al servidor
        socket.on("disconnect", () => {
            console.log("socket disconnected")
        })

        //cuando se crea una nueva medicion en el servidor
        socket.on("nuevaMedicion", (medicion) => {
            console.log('this method was fired by the socket server: io.emit("nuevaMedicion", data)', medicion)
            medicionesStore.fetchMediciones()
        })
        /********* end sockets  *********/
        
        //se ejecuta despues de que se ha creado el componente
        onUnmounted(() => {
            console.log("MedicionesView : unmounted")
            socket.disconnect()
        })

        return {
            mediciones,
            eliminarMedicion
        }

    }
})
</script>


<style scoped>

table {
    font-family: sans-serif;
    width: fit-content;
}

th,
td {
    padding: 0.25em 0.5em;
    text-align: left;
}

th:nth-child(2),
td:nth-child(2) {
    text-align: right;
}

td {
    background-color: #eee;
}

th {
    background-color: #42B983;
    color: #fff;
}

.zigzag {
    border-collapse: separate;
    border-spacing: 0.25em 1em;
}

.zigzag tbody tr:nth-child(odd) {
    transform: rotate(.5deg);
}

.zigzag thead tr,
.zigzag tbody tr:nth-child(even) {
    transform: rotate(-1deg);
}
</style>