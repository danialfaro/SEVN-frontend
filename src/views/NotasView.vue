<template>    
    <h1>Notas</h1>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Texto</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in notas" :key="index">
                <th>{{item.id}}</th>
                <td>{{item.titulo}}</td>
                <td>{{item.texto}}</td>
                <td>{{ $dayjs(item.fecha).format('MMM D, YYYY h:mm A')}}</td>              
                <td>
                    <button @click="eliminarNota(item.id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            notas: [],
        };
    },
    created() {
        this.listarNotas();
    },  
    methods: {
        listarNotas() {
            this.axios.get('notas')
                .then((response) => {
                    // console.log(response.data)
                    this.notas = response.data;
                })
                .catch((e) => {
                    console.log('error' + e);
                })
        },
        eliminarNota(id) {
            this.axios.delete('notas/'+id)
                .then((response) => {
                    console.log(response.data)
                    this.listarNotas()
                })
                .catch((e) => {
                    console.log('error' + e);
                })
        }
    }
};
</script>
<style scoped>

h1 {
    text-align: start;
}

</style>
<!--<template>
    <div class="overflow-x-auto relative">
        <h2 class="text-start text-4xl font-extrabold dark:text-white mb-8 mt-8">Notas</h2>
        <table class="text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6">
                        #id
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Titulo
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Texto
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Fecha
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(item, index) in notas"
                    :key="index">

                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{item.id}}
                    </th>
                    <td class="py-4 px-6">
                        {{item.titulo}}
                    </td>
                    <td class="py-4 px-6">
                        {{item.texto}}
                    </td>
                    <td class="py-4 px-6">
                        {{ $dayjs(item.fecha).format('MMM D, YYYY h:mm A')}}
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
                notas: [],
            };
        },
        created() {
            this.listarNotas();
        },
        methods: {
            listarNotas() {
                this.axios.get('notas')
                    .then((response) => {
                        // console.log(response.data)
                        this.notas = response.data;
                    })
                    .catch((e) => {
                        console.log('error' + e);
                    })
            }
        }
    };
    </script>-->