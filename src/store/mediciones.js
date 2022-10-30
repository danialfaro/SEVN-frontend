import { defineStore } from 'pinia'

// Import axios to make HTTP requests
import axios from "axios"

export const useMedicionesStore = defineStore('mediciones', {

  state: () => ({    
    mediciones: [],  //medicion: { id, sensor, valor, lat, lon, createdAt, updatedAt }
  }),

  getters: {

    /*getUltimaMedicion(state) {
      return state.mediciones.lastItem()
    }*/

  },
  
  actions: {

    //carga y rellena las mediciones en el array de la store
    async fetchMediciones() {
      try {
        const data = await axios.get('http://localhost:3000/api/mediciones')
        this.mediciones = data.data
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },

    //elimina una medicion y vuleve a cargar las mediciones en el array
    async deleteMedicion(id) {
      try {

        await axios.delete('mediciones/' + id)
          .then((response) => {
            console.log(response.data)
            this.fetchMediciones()
          })
          .catch((e) => {
            console.log('error' + e);
          })
      }

      catch (error) {
        console.log(error)
      }
    }
  },
})