import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";


const options:swaggerJSDoc.Options={
    swaggerDefinition:{
        openapi:'3.0.2',
        tags:[
            {
                name:'Products',
                description:'API operationd related with  products'
            }
        ],
        info:{
            title:'RES API Nde.js / Express / TypeScript',
            version:"1.0.0",
            description:'API docs for  products'
        }
    },
    apis:['./src/router.ts']
}

export const swaggerUiOptions:SwaggerUiOptions={
    customCss:`
        .topbar-wrapper .link {
            content: url('https://imgs.search.brave.com/jmQ4XVpndpYVSXDSuUq6cjW7r3fH7DmrBG06VWpPWjc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGlnaXRhbG9jZWFu/LmNvbS9hcGkvc3Rh/dGljLWNvbnRlbnQv/djEvaW1hZ2VzP3Ny/Yz1odHRwczovL2Nv/bW11bml0eS1jZG4t/ZGlnaXRhbG9jZWFu/LWNvbS5nbG9iYWwu/c3NsLmZhc3RseS5u/ZXQvRGVnRzlaa242/eWZUMjRzU3RDS3Iz/MWpOJndpZHRoPTE5/MjA.jpeg');
            height: 120px;
            width:auto;
        }
    `,
    customSiteTitle:'Documentacion Res API Express / TypeScript'
}

//Docs

const swaggerSpec=swaggerJSDoc(options)
export default swaggerSpec