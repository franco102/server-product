import request from 'supertest'
import server  from "../../server"; 

describe('POST /api/products',()=>{
    it('should create a new product',async()=>{
        const res=await request(server).post('/api/products').send({
            "name":"Franco - testing",
            "price":434
          })
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('data')
        // expect(res.headers['content-type']).toMatch(/json/)
        // expect(res.body.msg).toBe('Desde aPI')
        expect(res.body.msg).not.toBe(404)
        expect(res.body.msg).not.toBe(200)
        expect(res.body).not.toHaveProperty('errors')
        // expect(res.body.msg).not.toBe('Desde aPI2')
    })
    it('should display validation erros',async()=>{
        const res=await request(server).post('/api/products').send()
        // expect(res.body.msg).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(4)
        
        expect(res.body.msg).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })
    it('should validate that the price is greater than 0',async()=>{
        const res=await request(server).post('/api/products').send({
            "name":"Franco - testing",
            "price":0
          })
        // expect(res.body.msg).toEqual(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        
        expect(res.body.msg).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })
    
})

describe('GET /api/products',()=>{
    it('should get a JSON with products',async()=>{
        const res=await request(server).get('/api/products')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveLength(1)
        
        
        expect(res.body).not.toHaveProperty('errors')
        expect(res.status).not.toBe(404)
    }) 
})