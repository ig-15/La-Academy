import express from "express"
import { createClass, deleteClass, getAttendedClasses, getClasses, getClassesYouCreated, getOneClass, getRecommendedClass, joinClass, updateClass } from "../controllers/classController.js"
import { authenticate } from "../middleware/authMiddleware.js"
const classRouter  = express.Router()
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
 *   - name: Class
 *     description: API endpoints for managing operations on class
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the course
 *           example: Mathematics
 *         creatorId:
 *           type: string
 *           description: ID of the course creator
 *           example: 64a12dbcc82bfabbc86c3ab8
 *         studentsId:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs of the students enrolled in the course
 *         topic:
 *           type: string
 *           description: Topic of the course
 *           example: Algebra
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the course
 *         description:
 *           type: string
 *           description: Description of the course
 *           example: Learn the basics of algebra
 *       required:
 *         - name
 *         - topic
 *         - description
 *         - creatorId
 * paths:
 *   /api/class:
 *     post:
 *       summary: Creating a class
 *       tags:
 *         - Class
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       responses:
 *         '201':
 *           description: Class created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Class'
 *         '400':
 *           description: Bad request
 *         '409':
 *           description: Email is already in use
 *         '500':
 *           description: Internal server error
 *     get:
 *       summary: Get all Classess
 *       tags:
 *         - Class
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Class'
 *         '500':
 *           description: Internal server error
 *   /api/class/{id}:
 *     get:
 *       summary: Get one class by ID
 *       tags:
 *         - Class
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the Class
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Class'
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Class with the specified ID not found
 *         '500':
 *           description: Internal server error
 *     put:
 *       summary: Update a Class
 *       tags:
 *         - Class
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the Class
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       responses:
 *         '200':
 *           description: Class updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Class'
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 *     delete:
 *       summary: Delete an account
 *       tags:
 *         - Class
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
classRouter.use(authenticate)
classRouter.get("/",getClasses)
classRouter.get("/get/:id",getOneClass)
classRouter.get("/recommended",getRecommendedClass)
classRouter.get("/attended",getAttendedClasses)
classRouter.get("/created",getClassesYouCreated)
classRouter.post("/",createClass)
classRouter.post("/join",joinClass)
classRouter.patch("/:id",updateClass)
classRouter.delete("/:id",deleteClass)

export default classRouter