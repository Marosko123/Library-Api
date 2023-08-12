import express from 'express';
import { UsersController } from '../controllers/users_controller.js';
import { PublicationsController } from '../controllers/publications_controller.js';
import { CategoriesController } from '../controllers/categories_controller.js';
import { AuthorsController } from '../controllers/authors_controller.js';
import { CardsController } from '../controllers/cards_controller.js';
import { InstancesController } from '../controllers/instances_controller.js';
import { RentalsController } from '../controllers/rentals_controller.js';
import { ReservationsController } from '../controllers/reservations_controller.js';
import { Request, Response } from 'express';

export class Router {
	private router: express.Router;

	private usersController: UsersController;
	private publicationsController: PublicationsController;
	private categoriesController: CategoriesController;
	private authorsController: AuthorsController;
	private cardsController: CardsController;
	private instancesController: InstancesController;
	private rentalsController: RentalsController;
	private reservationsController: ReservationsController;

	constructor() {
		this.router = express.Router();

		this.usersController = new UsersController();
		this.publicationsController = new PublicationsController();
		this.categoriesController = new CategoriesController();
		this.authorsController = new AuthorsController();
		this.cardsController = new CardsController();
		this.instancesController = new InstancesController();
		this.rentalsController = new RentalsController();
		this.reservationsController = new ReservationsController();

		this.config();
	}

	getRouter() {
		return this.router;
	}

	private config() {
		this.router.get('/', (req: Request, res: Response) => res.send('Welcome to the DBS Assignment-5!'));

		/* USERS */
		this.router.get('/users/:userId', this.usersController.getUser); // Get user by id
		this.router.post('/users', this.usersController.createUser); // Create new user
		this.router.patch('/users/:userId', this.usersController.updateUser); // Update user by id

		/* PUBLICATIONS */
		this.router.get('/publications/:publicationId', this.publicationsController.getPublication); // Get publication by id

		/* CATEGORIES */
		this.router.get('/categories/:categoryId', this.categoriesController.getCategory); // Get category by id
		this.router.post('/categories', this.categoriesController.createCategory); // Create new category
		this.router.patch('/categories/:categoryId', this.categoriesController.updateCategory); // Update category
		this.router.delete('/categories/:categoryId', this.categoriesController.deleteCategory); // Delete category

		/* AUTHORS */
		this.router.get('/authors/:authorId', this.authorsController.getAuthor); // Get author by id
		this.router.post('/authors', this.authorsController.createAuthor); // Create new author
		this.router.patch('/authors/:authorId', this.authorsController.updateAuthor); // Update author
		this.router.delete('/authors/:authorId', this.authorsController.deleteAuthor); // Update author

		/* CARDS */
		this.router.get('/cards/:cardId', this.cardsController.getCard); // Get card by id
		this.router.post('/cards', this.cardsController.createCard); // Create new card
		this.router.patch('/cards/:cardId', this.cardsController.updateCard); // Update card
		this.router.delete('/cards/:cardId', this.cardsController.deleteCard); // Delete card

		/* PUBLICATIONS */
		this.router.get('/publications/:publicationId', this.publicationsController.getPublication); // Get publication by id
		this.router.post('/publications', this.publicationsController.createPublication); // Create new publication
		this.router.patch('/publications/:publicationId', this.publicationsController.updatePublication); // Update publication
		this.router.delete('/publications/:publicationId', this.publicationsController.deletePublication); // Delete publication

		/* INSTATANCES */
		this.router.get('/instances/:instanceId', this.instancesController.getInstance); // Get instance by id
		this.router.post('/instances', this.instancesController.createInstance); // Create new instance
		this.router.patch('/instances/:instanceId', this.instancesController.updateInstance); // Update instance
		this.router.delete('/instances/:instanceId', this.instancesController.deleteInstance); // Delete instance

		/* RENTALS */
		this.router.get('/rentals/:rentalId', this.rentalsController.getRental); // Get rental by id
		this.router.post('/rentals', this.rentalsController.createRental); // Create new rental
		this.router.patch('/rentals/:rentalId', this.rentalsController.updateRental); // Update rental
		this.router.delete('/rentals/:rentalId', this.rentalsController.deleteRental); // Delete rental

		/* RESERVATIONS */
		this.router.get('/reservations/:reservationId', this.reservationsController.getReservation); // Get reservation by id
		this.router.post('/reservations', this.reservationsController.createReservation); // Create new reservation
		this.router.patch('/reservations/:reservationId', this.reservationsController.updateReservation); // Update reservation
		this.router.delete('/reservations/:reservationId', this.reservationsController.deleteReservation); // Delete reservation
	}
}
