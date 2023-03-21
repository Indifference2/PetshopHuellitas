const {createApp}= Vue


const app= createApp({

    data(){

        return{
            datos :[],
            farmacia : [],
            resultado:[undefined],
            filtrotexto:""
           

        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(response => response.json())
            .then((data) =>{
                this.datos = data
                this.farmacia = this.datos.filter(key => key.categoria== "jugueteria")
                console.log(this.farmacia)
                this.resultado =this.farmacia
                
            })
    },
    methods:{
        
        filtrobusqueda(){
            this.resultado = this.farmacia.filter(key => {
                return key.producto.toLowerCase().includes(this.filtrotexto.toLowerCase())
             
            })
        }
    }
})
app.mount("#andres")