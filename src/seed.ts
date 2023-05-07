import mongoose from 'mongoose';
import { database } from './config';
import CategoryModel from './models/category.model';
import ProductModel from './models/product.model';
import { logger } from './utils';

database();

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {
	try {
		await CategoryModel.deleteMany({});
		await ProductModel.deleteMany({});

		logger.info(
			'Deleted all categories and products from the database',
		);

		const vodka = await CategoryModel.create({ name: 'Vodka' });
		const tequila = await CategoryModel.create({ name: 'Tequila' });
		const rum = await CategoryModel.create({ name: 'Rum' });
		const gin = await CategoryModel.create({ name: 'Gin' });
		const whiskey = await CategoryModel.create({ name: 'Whiskey' });
		const brandy = await CategoryModel.create({ name: 'Brandy' });
		const beer = await CategoryModel.create({ name: 'Beer' });
		const wine = await CategoryModel.create({ name: 'Wine' });
		const champagne = await CategoryModel.create({
			name: 'Champagne',
		});

		logger.info('Created categories in the database');

		const vodkaProducts = await ProductModel.insertMany([
			{
				name: 'Grey Goose Vodka',
				image: 'https://example.com/grey-goose-vodka.jpg',
				code: 'GGVODKA750',
				list_price: 39.99,
				quantity: 10,
				categories: [vodka._id],
			},
			{
				name: 'Belvedere Vodka',
				image: 'https://example.com/belvedere-vodka.jpg',
				code: 'BELVODKA750',
				list_price: 49.99,
				quantity: 8,
				categories: [vodka._id],
			},
			{
				name: 'Ciroc Vodka',
				image: 'https://example.com/ciroc-vodka.jpg',
				code: 'CIRVODKA750',
				list_price: 32.99,
				quantity: 15,
				categories: [vodka._id],
			},
			{
				name: 'Ketel One Vodka',
				image: 'https://example.com/ketel-one-vodka.jpg',
				code: 'KTVODKA750',
				list_price: 36.99,
				quantity: 12,
				categories: [vodka._id],
			},
			{
				name: 'Smirnoff Vodka',
				image: 'https://example.com/smirnoff-vodka.jpg',
				code: 'SMIVODKA750',
				list_price: 19.99,
				quantity: 20,
				categories: [vodka._id],
			},
			{
				name: 'Skyy Vodka',
				image: 'https://example.com/skyy-vodka.jpg',
				code: 'SKYVODKA750',
				list_price: 24.99,
				quantity: 18,
				categories: [vodka._id],
			},
			{
				name: 'Absolut Vodka',
				image: 'https://example.com/absolut-vodka.jpg',
				code: 'ABSVODKA750',
				list_price: 29.99,
				quantity: 14,
				categories: [vodka._id],
			},
			{
				name: 'Stolichnaya Vodka',
				image: 'https://example.com/stolichnaya-vodka.jpg',
				code: 'STOVODKA750',
				list_price: 27.99,
				quantity: 16,
				categories: [vodka._id],
			},
			{
				name: "Tito's Handmade Vodka",
				image: 'https://example.com/titos-vodka.jpg',
				code: 'TITVODKA750',
				list_price: 22.99,
				quantity: 22,
				categories: [vodka._id],
			},
			{
				name: 'Chopin Vodka',
				image: 'https://example.com/chopin-vodka.jpg',
				code: 'CHPVODKA750',
				list_price: 39.99,
				quantity: 9,
				categories: [vodka._id],
			},
		]);

		const tequilaProducts = await ProductModel.insertMany([
			{
				name: 'Don Julio 1942',
				image: 'https://example.com/don-julio-1942.jpg',
				code: 'DJ1942',
				list_price: 149.99,
				quantity: 5,
				categories: [tequila._id],
			},
			{
				name: 'Clase Azul Reposado',
				image: 'https://example.com/clase-azul-reposado.jpg',
				code: 'CLAREPO',
				list_price: 99.99,
				quantity: 10,
				categories: [tequila._id],
			},
			{
				name: 'Patron Silver',
				image: 'https://example.com/patron-silver.jpg',
				code: 'PATSILVER',
				list_price: 39.99,
				quantity: 20,
				categories: [tequila._id],
			},
			{
				name: 'Casamigos Reposado',
				image: 'https://example.com/casamigos-reposado.jpg',
				code: 'CASAREPO',
				list_price: 49.99,
				quantity: 15,
				categories: [tequila._id],
			},
			{
				name: 'Don Julio Blanco',
				image: 'https://example.com/don-julio-blanco.jpg',
				code: 'DJBLANCO',
				list_price: 39.99,
				quantity: 20,
				categories: [tequila._id],
			},
			{
				name: 'Casa Noble Reposado',
				image: 'https://example.com/casa-noble-reposado.jpg',
				code: 'CNREPO',
				list_price: 49.99,
				quantity: 15,
				categories: [tequila._id],
			},
			{
				name: 'Casa Noble Anejo',
				image: 'https://example.com/casa-noble-anejo.jpg',
				code: 'CNANEJO',
				list_price: 59.99,
				quantity: 10,
				categories: [tequila._id],
			},
			{
				name: 'Don Julio Anejo',
				image: 'https://example.com/don-julio-anejo.jpg',
				code: 'DJANEJO',
				list_price: 49.99,
				quantity: 15,
				categories: [tequila._id],
			},
			{
				name: 'Patron Anejo',
				image: 'https://example.com/patron-anejo.jpg',
				code: 'PATANEJO',
				list_price: 59.99,
				quantity: 10,
				categories: [tequila._id],
			},
			{
				name: 'Patron Reposado',
				image: 'https://example.com/patron-reposado.jpg',
				code: 'PATREPO',
				list_price: 49.99,
				quantity: 15,
				categories: [tequila._id],
			},
		]);

		const rumProducts = await ProductModel.insertMany([
			{
				name: 'Ron Bacardi Añejo Cuatro',
				code: '1001',
				list_price: 19.99,
				quantity: 50,
				image: 'https://example.com/images/bacardi-anejo-cuatro.jpg',
				categories: [rum._id],
			},
			{
				name: 'Ron Matusalem Gran Reserva 15 años',
				code: '1002',
				list_price: 59.99,
				quantity: 20,
				image:
					'https://example.com/images/matusalem-gran-reserva.jpg',
				categories: [rum._id],
			},
			{
				name: 'Ron Diplomático Reserva Exclusiva',
				code: '1003',
				list_price: 39.99,
				quantity: 30,
				image:
					'https://example.com/images/diplomatico-reserva-exclusiva.jpg',
				categories: [rum._id],
			},
			{
				name: 'Ron Zacapa Centenario 23',
				code: '1004',
				list_price: 79.99,
				quantity: 15,
				image: 'https://example.com/images/zacapa-centenario-23.jpg',
				categories: [rum._id],
			},
			{
				name: 'Ron Flor de Caña Gran Reserva 7',
				code: '1005',
				list_price: 24.99,
				quantity: 45,
				image:
					'https://example.com/images/flor-de-cana-gran-reserva-7.jpg',
				categories: [rum._id],
			},
			{
				name: 'Ron Havana Club Añejo 7',
				code: '1006',
				list_price: 29.99,
				quantity: 40,
				image: 'https://example.com/images/havana-club-anejo-7.jpg',
				categories: [rum._id],
			},
			{
				name: 'Ron Appleton Estate Signature Blend',
				code: '1007',
				list_price: 34.99,
				quantity: 25,
				image:
					'https://example.com/images/appleton-estate-signature-blend.jpg',
				categories: [rum._id],
			},
			{
				name: 'Ron Brugal XV',
				code: '1008',
				list_price: 49.99,
				quantity: 10,
				image: 'https://example.com/images/brugal-xv.jpg',
				categories: [rum._id],
			},
			{
				name: 'Ron Santa Teresa 1796',
				code: '1009',
				list_price: 69.99,
				quantity: 5,
				image: 'https://example.com/images/santa-teresa-1796.jpg',
				categories: [rum._id],
			},
			{
				name: 'Ron Mount Gay XO',
				code: '1010',
				list_price: 44.99,
				quantity: 35,
				image: 'https://example.com/images/mount-gay-xo.jpg',
				categories: [rum._id],
			},
		]);

		const ginProducts = await ProductModel.insertMany([
			{
				name: "Ginebra Hendrick's",
				image: 'https://via.placeholder.com/300',
				code: '001',
				list_price: 70000,
				quantity: 50,
				categories: [gin._id],
			},
			{
				name: 'Ginebra Tanqueray',
				image: 'https://via.placeholder.com/300',
				code: '002',
				list_price: 65000,
				quantity: 60,
				categories: [gin._id],
			},
			{
				name: 'Ginebra Bombay Sapphire',
				image: 'https://via.placeholder.com/300',
				code: '003',
				list_price: 75000,
				quantity: 40,
				categories: [gin._id],
			},
			{
				name: 'Ginebra Beefeater',
				image: 'https://via.placeholder.com/300',
				code: '004',
				list_price: 60000,
				quantity: 70,
				categories: [gin._id],
			},
			{
				name: "Ginebra Gordon's",
				image: 'https://via.placeholder.com/300',
				code: '005',
				list_price: 55000,
				quantity: 80,
				categories: [gin._id],
			},
			{
				name: "Ginebra Martin Miller's",
				image: 'https://via.placeholder.com/300',
				code: '006',
				list_price: 80000,
				quantity: 30,
				categories: [gin._id],
			},
			{
				name: 'Ginebra Bulldog',
				image: 'https://via.placeholder.com/300',
				code: '007',
				list_price: 90000,
				quantity: 20,
				categories: [gin._id],
			},
			{
				name: 'Ginebra Citadelle',
				image: 'https://via.placeholder.com/300',
				code: '008',
				list_price: 85000,
				quantity: 25,
				categories: [gin._id],
			},
			{
				name: 'Ginebra Monkey 47',
				image: 'https://via.placeholder.com/300',
				code: '009',
				list_price: 100000,
				quantity: 15,
				categories: [gin._id],
			},
			{
				name: 'Ginebra Roku',
				image: 'https://via.placeholder.com/300',
				code: '010',
				list_price: 95000,
				quantity: 18,
				categories: [gin._id],
			},
		]);

		const whiskeyProducts = await ProductModel.insertMany([
			{
				name: 'Johnnie Walker Blue Label',
				image:
					'https://example.com/images/johnnie-walker-blue-label.jpg',
				code: 'JWBL750',
				list_price: 250.0,
				quantity: 100,
				categories: [whiskey._id],
			},
			{
				name: 'The Macallan 18 Year Old',
				image:
					'https://example.com/images/the-macallan-18-year-old.jpg',
				code: 'MAC18',
				list_price: 300.0,
				quantity: 50,
				categories: [whiskey._id],
			},
			{
				name: 'Chivas Regal 18 Year Old',
				image:
					'https://example.com/images/chivas-regal-18-year-old.jpg',
				code: 'CHIV18',
				list_price: 120.0,
				quantity: 200,
				categories: [whiskey._id],
			},
			{
				name: 'Glenfiddich 12 Year Old',
				image:
					'https://example.com/images/glenfiddich-12-year-old.jpg',
				code: 'GF12',
				list_price: 50.0,
				quantity: 300,
				categories: [whiskey._id],
			},
			{
				name: 'Laphroaig 10 Year Old',
				image: 'https://example.com/images/laphroaig-10-year-old.jpg',
				code: 'LAP10',
				list_price: 60.0,
				quantity: 150,
				categories: [whiskey._id],
			},
			{
				name: 'Talisker 10 Year Old',
				image: 'https://example.com/images/talisker-10-year-old.jpg',
				code: 'TAL10',
				list_price: 70.0,
				quantity: 120,
				categories: [whiskey._id],
			},
			{
				name: 'Glenlivet 12 Year Old',
				image: 'https://example.com/images/glenlivet-12-year-old.jpg',
				code: 'GL12',
				list_price: 55.0,
				quantity: 250,
				categories: [whiskey._id],
			},
			{
				name: 'Lagavulin 16 Year Old',
				image: 'https://example.com/images/lagavulin-16-year-old.jpg',
				code: 'LAG16',
				list_price: 90.0,
				quantity: 100,
				categories: [whiskey._id],
			},
			{
				name: 'Bowmore 12 Year Old',
				image: 'https://example.com/images/bowmore-12-year-old.jpg',
				code: 'BOW12',
				list_price: 65.0,
				quantity: 200,
				categories: [whiskey._id],
			},
			{
				name: 'Highland Park 12 Year Old',
				image:
					'https://example.com/images/highland-park-12-year-old.jpg',
				code: 'HP12',
				list_price: 75.0,
				quantity: 180,
				categories: [whiskey._id],
			},
		]);

		const brandyProducts = await ProductModel.insertMany([
			{
				name: 'Brandy de Jerez Solera Reserva',
				image: 'https://example.com/product1.jpg',
				code: 'B001',
				list_price: 29.99,
				quantity: 10,
				categories: [brandy._id],
			},
			{
				name: 'Brandy Gran Duque de Alba Oro',
				image: 'https://example.com/product2.jpg',
				code: 'B002',
				list_price: 99.99,
				quantity: 5,
				categories: [brandy._id],
			},
			{
				name: 'Carlos I Imperial XO',
				image: 'https://example.com/product3.jpg',
				code: 'B003',
				list_price: 149.99,
				quantity: 2,
				categories: [brandy._id],
			},
			{
				name: 'Cardenal Mendoza Carta Real',
				image: 'https://example.com/product4.jpg',
				code: 'B004',
				list_price: 59.99,
				quantity: 7,
				categories: [brandy._id],
			},
			{
				name: 'Lepanto Brandy de Jerez Solera Gran Reserva',
				image: 'https://example.com/product5.jpg',
				code: 'B005',
				list_price: 89.99,
				quantity: 3,
				categories: [brandy._id],
			},
			{
				name: 'Fundador Solera Reserva',
				image: 'https://example.com/product6.jpg',
				code: 'B006',
				list_price: 24.99,
				quantity: 15,
				categories: [brandy._id],
			},
			{
				name: 'Terry Centenario Brandy Solera Reserva',
				image: 'https://example.com/product7.jpg',
				code: 'B007',
				list_price: 34.99,
				quantity: 12,
				categories: [brandy._id],
			},
			{
				name: 'Lustau Solera Gran Reserva Brandy',
				image: 'https://example.com/product8.jpg',
				code: 'B008',
				list_price: 39.99,
				quantity: 10,
				categories: [brandy._id],
			},
			{
				name: 'Osborne 103 Brandy de Jerez',
				image: 'https://example.com/product9.jpg',
				code: 'B009',
				list_price: 19.99,
				quantity: 20,
				categories: [brandy._id],
			},
			{
				name: 'Soberano 5 Brandy Solera Reserva',
				image: 'https://example.com/product10.jpg',
				code: 'B010',
				list_price: 14.99,
				quantity: 25,
				categories: [brandy._id],
			},
		]);

		const beerProducts = await ProductModel.insertMany([
			{
				name: 'Corona Extra',
				code: 'CER-001',
				list_price: 2.99,
				quantity: 100,
				image: 'https://images.example.com/corona-extra.jpg',
				categories: [beer._id],
			},
			{
				name: 'Heineken',
				code: 'CER-002',
				list_price: 3.49,
				quantity: 80,
				image: 'https://images.example.com/heineken.jpg',
				categories: [beer._id],
			},
			{
				name: 'Guinness Draught',
				code: 'CER-003',
				list_price: 4.99,
				quantity: 60,
				image: 'https://images.example.com/guinness-draught.jpg',
				categories: [beer._id],
			},
			{
				name: 'Stella Artois',
				code: 'CER-004',
				list_price: 3.99,
				quantity: 70,
				image: 'https://images.example.com/stella-artois.jpg',
				categories: [beer._id],
			},
			{
				name: 'Modelo Especial',
				code: 'CER-005',
				list_price: 2.49,
				quantity: 90,
				image: 'https://images.example.com/modelo-especial.jpg',
				categories: [beer._id],
			},
			{
				name: 'Budweiser',
				code: 'CER-006',
				list_price: 2.99,
				quantity: 85,
				image: 'https://images.example.com/budweiser.jpg',
				categories: [beer._id],
			},
			{
				name: 'Miller Lite',
				code: 'CER-007',
				list_price: 2.49,
				quantity: 100,
				image: 'https://images.example.com/miller-lite.jpg',
				categories: [beer._id],
			},
			{
				name: 'Dos Equis Amber',
				code: 'CER-008',
				list_price: 3.29,
				quantity: 75,
				image: 'https://images.example.com/dos-equis-amber.jpg',
				categories: [beer._id],
			},
			{
				name: 'Newcastle Brown Ale',
				code: 'CER-009',
				list_price: 4.49,
				quantity: 50,
				image: 'https://images.example.com/newcastle-brown-ale.jpg',
				categories: [beer._id],
			},
			{
				name: 'Samuel Adams Boston Lager',
				code: 'CER-010',
				list_price: 4.99,
				quantity: 60,
				image:
					'https://images.example.com/samuel-adams-boston-lager.jpg',
				categories: [beer._id],
			},
		]);

		const wineProducts = await ProductModel.insertMany([
			{
				name: 'Cabernet Sauvignon',
				image: 'https://example.com/cabernet-sauvignon.jpg',
				code: 'CS-001',
				list_price: 12.99,
				quantity: 50,
				categories: [wine._id],
			},
			{
				name: 'Merlot',
				image: 'https://example.com/merlot.jpg',
				code: 'M-002',
				list_price: 9.99,
				quantity: 100,
				categories: [wine._id],
			},
			{
				name: 'Chardonnay',
				image: 'https://example.com/chardonnay.jpg',
				code: 'C-003',
				list_price: 14.99,
				quantity: 25,
				categories: [wine._id],
			},
			{
				name: 'Pinot Noir',
				image: 'https://example.com/pinot-noir.jpg',
				code: 'PN-004',
				list_price: 17.99,
				quantity: 75,
				categories: [wine._id],
			},
			{
				name: 'Sauvignon Blanc',
				image: 'https://example.com/sauvignon-blanc.jpg',
				code: 'SB-005',
				list_price: 11.99,
				quantity: 50,
				categories: [wine._id],
			},
			{
				name: 'Malbec',
				image: 'https://example.com/malbec.jpg',
				code: 'M-006',
				list_price: 13.99,
				quantity: 40,
				categories: [wine._id],
			},
			{
				name: 'Syrah',
				image: 'https://example.com/syrah.jpg',
				code: 'S-007',
				list_price: 16.99,
				quantity: 30,
				categories: [wine._id],
			},
			{
				name: 'Zinfandel',
				image: 'https://example.com/zinfandel.jpg',
				code: 'Z-008',
				list_price: 19.99,
				quantity: 20,
				categories: [wine._id],
			},
			{
				name: 'Rosé',
				image: 'https://example.com/rose.jpg',
				code: 'R-009',
				list_price: 10.99,
				quantity: 60,
				categories: [wine._id],
			},
			{
				name: 'Barbera',
				image: 'https://example.com/barbera.jpg',
				code: 'B-010',
				list_price: 15.99,
				quantity: 35,
				categories: [wine._id],
			},
		]);

		const champagneProducts = await ProductModel.insertMany([
			{
				name: 'Moët & Chandon Brut Imperial',
				image: 'https://via.placeholder.com/150',
				code: 'MC-BI-001',
				list_price: 999.99,
				quantity: 50,
				categories: [champagne._id],
			},
			{
				name: 'Veuve Clicquot Ponsardin',
				image: 'https://via.placeholder.com/150',
				code: 'VCP-001',
				list_price: 899.99,
				quantity: 100,
				categories: [champagne._id],
			},
			{
				name: 'Dom Pérignon Vintage 2010',
				image: 'https://via.placeholder.com/150',
				code: 'DP-2010-001',
				list_price: 1999.99,
				quantity: 20,
				categories: [champagne._id],
			},
			{
				name: 'Krug Grande Cuvée',
				image: 'https://via.placeholder.com/150',
				code: 'KGC-001',
				list_price: 1599.99,
				quantity: 30,
				categories: [champagne._id],
			},
			{
				name: 'Bollinger La Grande Année',
				image: 'https://via.placeholder.com/150',
				code: 'BLGA-001',
				list_price: 1299.99,
				quantity: 40,
				categories: [champagne._id],
			},
			{
				name: 'Ruinart Blanc de Blancs',
				image: 'https://via.placeholder.com/150',
				code: 'R-BDB-001',
				list_price: 899.99,
				quantity: 50,
				categories: [champagne._id],
			},
			{
				name: 'Perrier-Jouët Belle Epoque',
				image: 'https://via.placeholder.com/150',
				code: 'PJ-BE-001',
				list_price: 1499.99,
				quantity: 20,
				categories: [champagne._id],
			},
			{
				name: 'Taittinger Comtes de Champagne Blanc de Blancs',
				image: 'https://via.placeholder.com/150',
				code: 'T-CCBDB-001',
				list_price: 1699.99,
				quantity: 25,
				categories: [champagne._id],
			},
			{
				name: 'Louis Roederer Cristal',
				image: 'https://via.placeholder.com/150',
				code: 'LR-C-001',
				list_price: 2199.99,
				quantity: 15,
				categories: [champagne._id],
			},
			{
				name: 'Armand de Brignac Blanc de Blancs',
				image: 'https://via.placeholder.com/150',
				code: 'ADB-BDB-001',
				list_price: 2499.99,
				quantity: 10,
				categories: [champagne._id],
			},
		]);

		logger.info('Created products in the database');

		vodka.products = vodkaProducts.map((product) => product._id);
		gin.products = ginProducts.map((product) => product._id);
		rum.products = rumProducts.map((product) => product._id);
		tequila.products = tequilaProducts.map((product) => product._id);
		brandy.products = brandyProducts.map((product) => product._id);
		beer.products = beerProducts.map((product) => product._id);
		whiskey.products = whiskeyProducts.map((product) => product._id);
		wine.products = wineProducts.map((product) => product._id);
		champagne.products = champagneProducts.map(
			(product) => product._id,
		);

		await Promise.all([
			vodka.save(),
			gin.save(),
			rum.save(),
			tequila.save(),
			whiskey.save(),
			brandy.save(),
			beer.save(),
			wine.save(),
			champagne.save(),
		]);
	} catch (error: any) {
		logger.error(error.message);
	} finally {
		await mongoose.connection.close();
		await mongoose.disconnect();
		logger.info('Disconnected from the database');
	}
});
