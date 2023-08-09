const express = require('express');
const UsersController = require('../controllers/users_controller');
const PublicationsController = require('../controllers/publications_controller');
const CategoriesController = require('../controllers/categories_controller');
const AuthorsController = require('../controllers/authors_controller');
const CardsController = require('../controllers/cards_controller');
const InstancesController = require('../controllers/instances_controller');
const RentalsController = require('../controllers/rentals_controller');
const ReservationsController = require('../controllers/reservations_controller');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to the DBS Assignment-5!'));

/* USERS */
router.get('/users/:userId', UsersController.getUser); // Get user by id
router.post('/users', UsersController.createUser); // Create new user
router.patch('/users/:userId', UsersController.updateUser); // Update user by id

/* PUBLICATIONS */
router.get('/publications/:publicationId', PublicationsController.getPublication); // Get publication by id

/* CATEGORIES */
router.get('/categories/:categoryId', CategoriesController.getCategory); // Get category by id
router.post('/categories', CategoriesController.createCategory); // Create new category
router.patch('/categories/:categoryId', CategoriesController.updateCategory); // Update category
router.delete('/categories/:categoryId', CategoriesController.deleteCategory); // Delete category

/* AUTHORS */
router.get('/authors/:authorId', AuthorsController.getAuthor); // Get author by id
router.post('/authors', AuthorsController.createAuthor); // Create new author
router.patch('/authors/:authorId', AuthorsController.updateAuthor); // Update author
router.delete('/authors/:authorId', AuthorsController.deleteAuthor); // Update author

/* CARDS */
router.get('/cards/:cardId', CardsController.getCard); // Get card by id
router.post('/cards', CardsController.createCard); // Create new card
router.patch('/cards/:cardId', CardsController.updateCard); // Update card
router.delete('/cards/:cardId', CardsController.deleteCard); // Delete card

/* PUBLICATIONS */
router.get('/publications/:publicationId', PublicationsController.getPublication); // Get publication by id
router.post('/publications', PublicationsController.createPublication); // Create new publication
router.patch('/publications/:publicationId', PublicationsController.updatePublication); // Update publication
router.delete('/publications/:publicationId', PublicationsController.deletePublication); // Delete publication

/* INSTATANCES */
router.get('/instances/:instanceId', InstancesController.getInstance); // Get instance by id
router.post('/instances', InstancesController.createInstance); // Create new instance
router.patch('/instances/:instanceId', InstancesController.updateInstance); // Update instance
router.delete('/instances/:instanceId', InstancesController.deleteInstance); // Delete instance

/* RENTALS */
router.get('/rentals/:rentalId', RentalsController.getRental); // Get rental by id
router.post('/rentals', RentalsController.createRental); // Create new rental
router.patch('/rentals/:rentalId', RentalsController.updateRental); // Update rental
router.delete('/rentals/:rentalId', RentalsController.deleteRental); // Delete rental

/* RESERVATIONS */
router.get('/reservations/:reservationId', ReservationsController.getReservation); // Get reservation by id
router.post('/reservations', ReservationsController.createReservation); // Create new reservation
router.patch('/reservations/:reservationId', ReservationsController.updateReservation); // Update reservation
router.delete('/reservations/:reservationId', ReservationsController.deleteReservation); // Delete reservation

module.exports = router;
