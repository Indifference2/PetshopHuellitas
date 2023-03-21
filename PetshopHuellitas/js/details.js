let {createApp}= Vue
const appdos= createApp({

    data(){

        return{
            
            parms : null,
            id : null,
            persona : [],
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
            
    }
})
appdos.mount("#detalies")