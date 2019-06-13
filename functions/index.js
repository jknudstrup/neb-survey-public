const functions = require('firebase-functions')
const express = require('express')
const bearerToken = require('express-bearer-token')
const firestore = require('@google-cloud/firestore')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')
var serviceAccount = require("./ref/key.json")
var firebaseConfig = {
	  credential: admin.credential.cert(serviceAccount),
  	databaseURL: "https://neb-survey.firebaseio.com"
};

// Initialize admin app
admin.initializeApp(firebaseConfig)
const db = admin.firestore()


const app = express()
const router = express.Router()

app.use(bodyParser.json({ type: 'application/json' }))
app.use(bearerToken())

// Basic landing page
app.get('/api', (req, res) => {
	res.send ("Welcome to the Neb-Survey API! Here's how this works: \n"
		+ "-First, make sure you've logged in at Google's Auth REST api:  \n"
		+ "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=(API KEY GOES HERE) \n"
		+ "If you need more info on how to do that, go to: \n"
		+ "https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password \n"
		+ "Take the 'idToken' you receive from logging in, and include it in the authorization header of your http requests as a bearer token \n"
		+ "For write operations, make sure to include within the header the key-value pair 'Content-Type: application/json' \n"
		+ "-Then pass in any of the following options, prepending the url with 'https://neb-survey.firebaseapp.com/api': \n"
		+ "* To retrieve an entire collection (currently you can choose from 'questions' and 'responses': send a GET request to '/collections/{target-collection}' \n"
		+ "* To retrieve just one document from a given collection, send a GET request to: '/collections/{target-collection}/{target-document}' \n"
		+ "* To create a new document within a collection, send the document within the request body in raw text, in JSON format, as a POST request to: '/collections/{target-collection}' \n"
		+ "* To delete a collection (careful with this!), send a DELETE request to: '/delete/{target-collection}' \n"
		+ "* To delete a document from a collection, send a DELETE request to: '/delete/{target-collection}/{target-document}' \n"
		+ "* To update a document from a collection, send a PUT request to: '/edit/{target-collection}/{target-document}' \n"
		+ "When you're done, the smart thing to do would be to send a POST to '/logout' to log out.")
})

// Get any collection
router.get('/collections/:collection', (req, res) => {
	const collection = []
	const collectionName = req.params.collection
	db.collection(collectionName).get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			let docdata = doc.data()
			docdata.id = doc.id
			collection.push(docdata)
		})
		return snapshot
	}).catch(err => res.send(err))
	.then(() => res.send(collection))
	.catch(err => res.send("Oops!" + err))
})


//Get a particular document
router.get('/collections/:collection/:document', (req, res) => {
	console.log("Sending a particular document within a collection")
	db.collection(req.params.collection).doc(req.params.document).get()
		.then(obj => res.send(obj.data()))
		.catch(err => res.send("Oops! " + err))
})


// Post a new document
router.post('/collections/:collection/', (req, res) => {
	// In the http body, pass in the new document in raw JSON (application/json)
	console.log("Appending new document to collection")
	db.collection(req.params.collection).add(req.body)
		.then(() => res.status(201).send(req.body))
		.catch(err => res.send(err))
})


// Deletes an entire collection.
router.delete('/delete/:collection', (req, res) => {
	console.log("Deleting a collection!")
	db.collection(req.params.collection).delete()
	.then(() => res.status(204).send())
	.catch(err => res.send(err))
})


// Deletes a particular document
router.delete('/delete/:collection/:document', (req, res) => {
	console.log("Deleting a particular document within a collection")
	db.collection(req.params.collection).doc(req.params.document).delete()
		.then(() => res.status(204).send())
		.catch(err => res.send("Oops! " + err))
})


// Edit a document
router.put('/edit/:collection/:document', (req, res) => {
	console.log("Editing a particular document within a collection")
	db.collection(req.params.collection).doc(req.params.document).update(req.body)
		.then(obj => res.status(200).send(req.body))
		.catch(err => res.send("Oops! " + err))
})


function authenticate(req, res, next) {
	console.log("Authenticating request...")
	const key = req.token
	admin.auth().verifyIdToken(key)
	.then(decoded => next())
	.catch(err => res.send(err))
}


// Test function
router.get('/test', (req, res) => {
	console.log("Testing...")
	res.send("Test request received!")
})


app.use(authenticate)
app.use('/api/', router)

exports.app = functions.https.onRequest(app)