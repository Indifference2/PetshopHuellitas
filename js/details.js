let {createApp} = Vue
const appdos = createApp({

    data(){
        return{ 
            parms : null,
            id : null,
            persona : [],
            carrito : [],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(response => response.json())
            .then((dato)=>{
                this.parms = new URLSearchParams(location.search)
                this.id = this.parms.get("id")
                this.persona = dato.find(elemento => elemento._id == this.id)
            })
            this.carrito = JSON.parse(localStorage.getItem("carrito")) || []
            console.log(this.carrito)
        },
    methods:{
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
        }
    },
})
appdos.mount("#detalies")