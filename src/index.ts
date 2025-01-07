import server from "./server";
import colors from 'colors'
 // Start the server
 const port=process.env.PORT || 5000
server.listen(port, () => {

    console.log( colors.cyan.bold('puerto:'+ port ) )

})
