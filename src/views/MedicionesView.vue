<template>
    <div class="container">
        <h1>Mediciones</h1>
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
                    <td>{{item.id}}</td>
                    <td>{{item.sensor}}</td>
                    <td>{{item.valor}}</td>
                    <td>{{item.lat}}</td>
                    <td>{{item.lon}}</td>
                    <td>{{ $dayjs(item.createdAt).format('MMM D, YYYY h:mm A')}}</td>
                    <td>
                        <button @click="eliminarMedicion(item.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script >

export default {

    data() {
        return {

            //medicion: { id, sensor, valor, lat, lon, createdAt, updatedAt }
            mediciones: [],
        };
    },
    // callbacks que se ejecutan cuando se emite un evento desde el servidor
    sockets: {

        //cuando se conecta al servidor
        connect() {
            console.log('socket connected')
        },

        //cuando se crea una nueva medicion en el servidor
        nuevaMedicion(medicion) {
            console.log('this method was fired by the socket server: io.emit("nuevaMedicion", data)', medicion)
            this.mediciones.push(medicion)
        }

    },
    //se ejecuta cuando se crea el componente
    created() {
        console.log("MedicionesView : created")
        this.listarMediciones();
    },
    //se ejecuta despues de que se ha creado el componente
    mounted() {
        console.log("MedicionesView : mounted")
        this.$socket.connect()
    },
    methods: {

        // manda una peticion GET para cargar todas las mediciones en el array 
        listarMediciones() {
            this.axios.get('mediciones')
                .then((response) => {
                    // console.log(response.data)
                    this.mediciones = response.data;
                })
                .catch((e) => {
                    console.log('error' + e);
                })

        },

        //manda una peticion POST para eliminar una medicion 
        // id: id de la medicion)
        eliminarMedicion(id) {
            this.axios.delete('mediciones/' + id)
                .then((response) => {
                    console.log(response.data)
                    this.listarMediciones()
                })
                .catch((e) => {
                    console.log('error' + e);
                })
        }
    },
    //se ejecuta despues de que se ha destruido el componente
    unmounted() {
        console.log("MedicionesView : unmounted")
        this.$socket.disconnect()
    },
};
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
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