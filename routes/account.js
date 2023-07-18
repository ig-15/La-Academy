import express from "express"
import { createAccount, getAccounts, getOneAccount, updateAccount } from "../controllers/accountController.js"
import { authenticate } from "../middleware/authMiddleware.js"
const accountRouter = express.Router()
/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Backend for LA Academy
 *   version: 1.0.0
 *   description: This is the backend for LA Academy made by Mugisha Yves and Ineza Gloria
 * servers:
 *   - url: http://localhost:5000
 *     description: Development Server
 *   - url: http://la-academy:5000
 *     description: Production Server
 * tags:
 *   - name: Accounts
 *     description: API endpoints for managing accounts
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *         emailVerified:
 *           type: boolean
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         accountType:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             country:
 *               type: string
 *             city:
 *               type: string
 *         gender:
 *           type: string
 *         password:
 *           type: string
 *         creationDate:
 *           type: string
 *           format: date-time
 *         bio:
 *           type: string
 *         profile:
 *           type: string
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         username:
 *           type: string
 * paths:
 *   /api/accounts:
 *     post:
 *       summary: Create an account
 *       tags:
 *         - Accounts
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       responses:
 *         '201':
 *           description: Account created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Account'
 *         '400':
 *           description: Bad request
 *         '409':
 *           description: Email is already in use
 *         '500':
 *           description: Internal server error
 *     get:
 *       summary: Get all accounts
 *       tags:
 *         - Accounts
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Account'
 *         '500':
 *           description: Internal server error
 *   /api/accounts/{id}:
 *     get:
 *       summary: Get an account by ID
 *       tags:
 *         - Accounts
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the account
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Account'
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Account with the specified ID not found
 *         '500':
 *           description: Internal server error
 *     put:
 *       summary: Update an account
 *       tags:
 *         - Accounts
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the account
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       responses:
 *         '200':
 *           description: Account updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Account'
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 *     delete:
 *       summary: Delete an account
 *       tags:
 *         - Accounts
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the account
 *       responses:
 *         '204':
 *           description: Account deleted successfully
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 */
accountRouter.post("/", createAccount)
accountRouter.use(authenticate)
accountRouter.get("/", getAccounts)
accountRouter.get("/:id", getOneAccount)
accountRouter.patch("/:id", updateAccount)
accountRouter.delete("/", createAccount)


export default accountRouter