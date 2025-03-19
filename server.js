import Hapi from "@hapi/hapi"
import routes  from "./routes.js"
import books from "./books.js"

const init = () => {
    const server = Hapi.server({
        port: 9000,
        host: "localhost",
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })

    server.route(routes)
    console.log(`server sedang berjalan di ${server.info.uri}`)
    server.start()
}

init()