<template>
    <div class="container">
        <h1>Mediciones</h1>
        <table class="zigzag">
            <thead>
                <tr>
                    <th class="header">#</th>
                    <th class="header">Sensor</th>
                    <th class="header">Valor</th>
                    <th class="header">Fecha</th>
                    <th class="header"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in mediciones" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.sensor}}</td>
                    <td>{{item.valor}}</td>
                    <td>{{ $dayjs(item.createdAt).format('MMM D, YYYY h:mm A')}}</td>
                    <td>
                        <button @click="eliminarMedicion(item.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

    data() {
        return {

            /* 
                medicion: {
                    id
                    sensor
                    valor
                    createdAt
                    updatedAt
                }
            */

            mediciones: [],
        };
    },
    created() {
        this.listarMediciones();
    },
    methods: {

        listarMediciones() { // cargar las mediciones en el array 
            this.axios.get('mediciones')
                .then((response) => {
                    // console.log(response.data)
                    this.mediciones = response.data;
                })
                .catch((e) => {
                    console.log('error' + e);
                })
        },

        
        eliminarMedicion(id) { //id medicion a eliminar 
            this.axios.delete('mediciones/' + id)
                .then((response) => {
                    console.log(response.data)
                    this.listarMediciones()
                })
                .catch((e) => {
                    console.log('error' + e);
                })
        }
    }
};
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    text-align: start;
}

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