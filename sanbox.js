class Movie {
    static async print() {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                console.log("Movie")
                console.log("Movie2")    
                resolve()
            },1000)
        })
        
    }
}

async function app () {
    await Movie.print()
    console.log("Movie3")
}

app()