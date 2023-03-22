const {createApp}= Vue


const app= createApp({

    data(){

        return{
            datos :[],
            farmacia : [],
            resultado:[{}],
            filtrotexto:"",
            carrito : [],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(response => response.json())
            .then((data) =>{
                this.datos = data
                this.farmacia = this.datos.filter(key => key.categoria== "jugueteria")
                this.resultado =this.farmacia
                
            })
            this.carrito=JSON.parse(localStorage.getItem("carrito")) || []
    },
    methods:{
        
        filtrobusqueda(){
            this.resultado = this.farmacia.filter(key => {
                return key.producto.toLowerCase().includes(this.filtrotexto.toLowerCase())
            })
        },
        agregarAlCarrito(item){
            if(!this.productoEstaRepetidoPorId(item._id)){
                this.carrito.push({
                    nombre : item.producto,
                    cantidadDisponible : item.disponibles,
                    contadorBoton : 1,
                    id : item._id,
                    imagen : item.imagen,
                    precio : item.precio,
                })
            }else{
                item.contadorBoton + 1
            }
            console.log(this.carrito)
        },
        productoEstaRepetidoPorId(productoId){
            return this.carrito.some(item => item.id === productoId)
        },

        agregarCantidadProducto(producto){
            if(producto.cantidadDisponible > producto.contadorBoton){
                producto.contadorBoton += 1
            }
        },
        eliminarDelCarrito(producto){
            if(producto.contadorBoton > 1 ){
                producto.contadorBoton -= 1
            }else{
                this.carrito =  this.carrito.filter(item => !(item.id === producto.id))
            }
        },
    },
    computed:{
        handleCarrito(){
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
        },
        totalDelCarrito(){
            return this.carrito.reduce((acc, currentValue) => {
                acc += currentValue.precio * currentValue.contadorBoton
                return acc
            }, 0)
        }
    }
})
app.mount("#andres")