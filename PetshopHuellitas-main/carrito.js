
const {createApp} = Vue

const app = createApp ({

    data() {
        return {
            datos: [],
            buscando: "",
            auxBuscador: [],
            auxRadios: [],
            home: "",
            reset: "",
            valorDelRadio: "all",
            valorPrecio: "",
            productosDelCarrito: [],
            idDelProducto: [],
            productosObtenidos: [],
            auxiliar: [],
            suma: 0
        }
    },

    created() {
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(response => response.json())
            .then((data) => {
                this.datos = data
                console.log(this.datos); // los datos los trae bien, son 15 productos, 7 de categoria farmacia y 8 de categoria jugueteria
                this.home = document.querySelector("home")
                this.reset = document.querySelector('input[type="reset"]')
                // console.log(this.datos)
                
                //esto es para filtrar los productos, ver con Ivan y Alex como filtraron
                if (this.home.id == "farmacia") { // esto es para poner un id en el div del body de la pag farmacia que se llame id= "farmacia"
                    this.datos = this.datos.filter(producto => producto.tipo == "Medicamento")
                } else if (this.home.id == "Juguetes") { // esto es para poner un id en el div del body de la pag juguetes que se llame id= "juguetes"
                    this.datos = this.datos.filter(producto => producto.tipo == "Juguete")
                }

                this.productosObtenidos = JSON.parse(localStorage.getItem("carrito"))
                if (this.productosObtenidos) {
                    this.productosDelCarrito = this.productosObtenidos
                } 
                else {
                    this.productosObtenidos = this.productosDelCarrito
                }

                this.obtenerFavoritos = JSON.parse(localStorage.getItem("favoritos"))
                if (this.obtenerFavoritos) {
                    this.productosFavoritos = this.obtenerFavoritos
                } else{
                    this.obtenerFavoritos = this.productosFavoritos
                }

            })
    },
        //estos ver de pasar a computer  mejor
    methods: {
        limpiarFiltros() {
            document.querySelector("form").reset()
            this.valorDelRadio = "all"
            this.valorPrecio = ""
            this.buscando = ""
        },

        llenandoCarrito(producto) {
            this.idDelProducto = this.productosDelCarrito.map(producto => producto._id)

            if (!this.idDelProducto.includes(producto._id)) {
                this.productosDelCarrito.push(producto)
                localStorage.setItem("carrito", JSON.stringify(this.productosDelCarrito))
                const mensaje = Swal.mixin({ // se usa Swal.mixin y fire para los mensajes emergentes, y dp se tb  usa para comprar carrito
                    toast: true,
                    position: 'bottom-start',
                    showConfirmButton: false,
                    timer: 2000,
                })

                mensaje.fire({
                    icon: 'success',
                    title: 'Agregado al carrito'
                })
            } else {
                const mensaje = Swal.mixin({
                    toast: true,
                    position: 'bottom-start',
                    showConfirmButton: false,
                    timer: 2000,
                })
                
                mensaje.fire({
                    icon: 'warning',
                    title: 'El producto ya está en el carrito'
                })
            }

            producto.__v = 1
        },

        vaciadoDelCarrito(producto) {
            this.productosObtenidos = this.productosObtenidos.filter(articulo => articulo._id != producto._id)
            this.productosDelCarrito = this.productosObtenidos
            localStorage.setItem("carrito", JSON.stringify(this.productosDelCarrito))
        },
        

        comprarCarrito() { 
            const swalButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success', // son botones los que usa bootstrap
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalButtons.fire({
                title: '¿Realizar esta compra?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Comprar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalButtons.fire(
                        'Compra realizada con exito!',
                        'Pet-shop Huellitas',
                        'success'
                    )
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalButtons.fire(
                        'Cancelado',
                        'Su compra no ha sido realizada!',
                        'error'
                    )
                }
                if (result.isConfirmed) {
                    this.productosObtenidos = []
                    this.productosDelCarrito = this.productosObtenidos
                    localStorage.setItem("carrito", JSON.stringify(this.productosDelCarrito))
                } else if (result.dismiss) {
                    this.productosDelCarrito
                }
            })
        },

        totalFinal() {
            this.suma = 0

            for (var i in this.productosDelCarrito) {
                this.suma += this.productosDelCarrito[i].__v * this.productosDelCarrito[i].precio
            }

            return this.suma
        },

        añadir(producto) {
            var num = producto.__v++
        },

        quitar(producto) {
            var num = producto.__v--
            if (num === 1) {
                producto.__v = 1
            }
        },

    },

    computed: {

        // esto es para filtrar la busqueda de productos en search y por precios, (pero ver como hacen Ivan y Alex), nos piden que dentro de
        // cada seccion de farmacia y jugueteria haya filtros
        buscarProductos() {
            this.auxBuscador = []
            this.datos.filter(producto => {

                if (producto.nombre.toUpperCase().includes(this.buscando.toUpperCase())) {
                    this.auxBuscador.push(producto)
                }
                if (producto.descripcion.toUpperCase().includes(this.buscando.toUpperCase()) && !producto.nombre.toUpperCase().includes(this.buscando.toUpperCase())) {
                    this.auxBuscador.push(producto)
                }
            })

            if (this.valorDelRadio <= 1000) {
                this.auxBuscador = this.auxBuscador.filter(producto => producto.precio <= parseInt(this.valorDelRadio) || this.valorDelRadio == "all")
            } else {
                this.auxBuscador = this.auxBuscador.filter(producto => producto.precio > parseInt(this.valorDelRadio) || this.valorDelRadio == "all")
            }

            if (this.valorPrecio == "mayor") {
                this.auxBuscador = this.auxBuscador.sort((a, b) => b.precio - a.precio)
            }

            if (this.valorPrecio == "menor") {
                this.auxBuscador = this.auxBuscador.sort((a, b) => a.precio - b.precio)
            }
        },


    }

})

app.mount('#app')

