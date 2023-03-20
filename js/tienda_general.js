const {createApp}= Vue


const app= createApp({

    data(){

        return{
            datos :[],
            categorias:[],
            checkValue:[],
            resultado:[{}],
            filtrotexto:"",
            disponible : [],
            carrito : [],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(response => response.json())
            .then((data) =>{
                this.datos = data
                this.categorias = [...new Set(this.datos.map(key => key.categoria))]
                this.disponible = this.datos.filter(key => key.disponibles < 5)
                console.log(this.datos)
                this.resultado = data
                
            })
    },
    methods:{
        
        filtrobusqueda(){
            this.resultado = this.datos.filter(key => {
                return key.producto.toLowerCase().includes(this.filtrotexto.toLowerCase())
                && (this.checkValue.includes(key.categoria) || this.checkValue.length == 0)
            })
        },
        agregarAlCarrito(producto){
            this.carrito.push(producto)
            console.log(this.carrito)
        }
    },
})
app.mount("#andres")