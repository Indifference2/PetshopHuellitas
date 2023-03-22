const {createApp} = Vue 

const app = createApp({
    data(){
        return{
            nombre : null,
            apellido : null,
            telefono : null,
            valorSelect : null,
            mensaje : null,
        }
    },
    methods:{
        formularioEstaVacio(){
            return (this.nombre && this.apellido && this.telefono && this.valorSelect && this.mensaje) 
        },
    },
})

app.mount("#app")