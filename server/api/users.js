const express = require("express");
const usersRouter = express.Router();
const prisma = require("../db/client");

//TODO: SET UP SALT COUNT
//SET UP DIFF PERMISSIONS FOR EACH ENDPOINT 


//GET /api/users - get all users
usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.send(users)
    } catch (error) {
        res.send("unable to get users")
    }
});

//GET /api/users/:userId - get individual shoppers with carts
usersRouter.get('/:userId', async (req, res, next) => {
    try {
        const shopperWithCart = await prisma.user.findUnique({
            where: {
                id: Number(req.params.userId),
            },
            include: {
                cart: {
                    include: {
                        items: true
                    }
                }
            }
        })
        res.send(shopperWithCart)
    } catch {
        res.send("unable to get individual user")
    }
});

//POST /api/users/register - register new user
usersRouter.post("/register", async(req, res, next) => {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            }
        })

        if (user) {
            res.send("A user by that username already exist")
        }

        const newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role
            }
        })

        delete newUser.password

        const token = jwt.sign(
            {id: newUser.id, role: newUser.role},
            process.env.JWT);
    //might need to change this part!!

        res.send({newUser, token});     
    } catch (error) {
        res.send("unable to register")
    }
})


//POST /api/users/login - login existing user 

module.exports = usersRouter;