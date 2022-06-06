const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../index");
let database = [];

chai.should();
chai.use(chaiHttp);

describe("Manage users",()=>{
    describe("UC-201 Add user /api/user", ()=>{
        beforeEach((done) => {
            database = [];
            done();
        });

        it("it returns a valid error When a required input is missing",(done)=>{
            chai
            .request(server)
            .post("/api/user")
            .send({
                // firstname ontbreekt/ not valid
                lastName: "Mohamad",
                street: "Lovensdijkstraat 61",
                city: "Breda",
                password: "secret",
                emailAdress: "nader@mail.com",
                phoneNumber: 6123456789
            })
            .end((err,res)=>{
                res.should.be.an("object");
                let {status, result} = res.body;
                status.should.equals(400);
                result.should.be.a("string").that.equals("firstname must be string")
            });
            done();
        });
    });
});