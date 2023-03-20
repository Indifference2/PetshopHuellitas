const {createApp} = Vue

const app= createApp({

    data(){

        return{
            datos :[],
            categorias:[],
            checkValue:[],
            resultado:[undefined],
            filtrotexto:"",
            disponible : [],
            ch_value : "",
            home : "",
            reset : "",
            idDelProducto : [],
            productosDelCarrito: [],
            productosObtenidos : [],
            suma : 0,
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(response => response.json())
            .then((data) =>{
                this.datos = data
                this.categorias = [...new Set(this.datos.map(key => key.categoria))]
                this.disponible = this.datos.filter(key => key.disponibles < 5)
                this.resultado = data
                
                this.home = document.querySelector("home")
                
            })
    },
    methods:{
        filtrobusqueda(){
            this.resultado = this.datos.filter(key => {
                return key.producto.toLowerCase().includes(this.filtrotexto.toLowerCase())
                && (this.checkValue.includes(key.categoria) || this.checkValue.length == 0)
            })
        },
        llenandoCarrito(producto){
            this.idDelProducto = this.productosDelCarrito.map(producto => producto._id)

            if (!this.idDelProducto.includes(producto._id)){
                this.productosDelCarrito.push(producto)
                localStorage.setItem("carrito", JSON.stringify(this.productosDelCarrito))
                const mensaje = Swal.mixin({
                    toast: true,
                    position: 'bottom-start',
                    showConfirmButton : false,
                    timer: 2000,
                })
                mensaje.fire({
                    icon: 'success',
                    title: "Agregado al carrito"
                })
            }else{
                const mensaje = Swal.mixin({
                    toast: true,
                    position: 'bottom-start',
                    showConfirmButton: false,
                    timer: 2000,
                })
                mensaje.fire({
                    icon : 'warning',
                    title: 'El producto ya está en el carrito',
                })

            }
            producto.__v = 1
        },
        vaciadoDelCarrito(producto){
            this.productosObtenidos = this.productosObtenidos.filter(articulo => articulo._id != producto._id)
            this.productosDelCarrito = this.productosObtenidos
            localStorage.setItem("carrito", JSON.stringify(this.productosDelCarrito))
        },
        comprarCarrito(){
            const swalButtons = Swal.mixin({
                customClass : {
                    confirmButton: 'btn btn-success',
                    cancelButton : 'btn btn-danger',
                },
                buttonsStyling : false
            })
            swalButtons.fire({
                title: '¿Realizar esta compra?',
                text : "",
                icon : 'warning',
                showCancelButton : true,
                confirmButtonText : 'Comprar',
                cancelButtonText : 'Cancelar',
                reverseButtons : true,
            }).then((result) =>{
                if (result.isConfirmed){
                    swalButtons.fire(
                        'Compra realizada con exito!',
                        'Pet-shop Huellitas',
                        'success',
                    )
                }else if(
                    result.dismiss === Swal.DismissReason.cancel
                ){
                    swalButtons.fire(
                        'Cancelado',
                        'Su compra no ha sido realizado!',
                        'Error',
                    )
                }
                if(result.isConfirmed){
                    this.productosObtenidos = []
                    this.productosDelCarrito = this.productosObtenidos
                    localStorage.setItem("carrito", JSON.stringify(this.productosDelCarrito))
                }else if (result.dismiss){
                    this.productosDelCarrito
                }
            })
        },
        totalFinal(){
            this.suma = 0
            for(let i in this.productosDelCarrito){
                this.suma += this.productosDelCarrito[i].__v * this.productosDelCarrito[i].precio
            }
            return this.suma
        },
        añadir(producto){
            let num = producto.__v++
        },
        quitar(producto){
            let num = producto.__v--
            if (num === 1){
                producto.__v = 1
            }
        },
        
    }
})

app.mount("#andres")