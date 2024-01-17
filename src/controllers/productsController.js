const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const { log } = require("console");
/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const controller = {
	// (get) Root - Mostrar todos los productos
	index: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render("todosLosProductos", { products });
	},

	// (get) Detail - Detalle de un producto
	detail: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let idProducto = req.params.id

		let productoDefinido = products.find(producto => {
			return producto.id == idProducto
		})
				if(productoDefinido){
					res.render("productDetail", { singleProduct : productoDefinido })
				} else{
					res.send("ERROR")
				}
	

	},

	

	// (get) Create - Formulario para crear
	create: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render("crearProducto", { products });

    },

	// (post) Create - Método para guardar la info
	processCreate: (req, res) => {

		//Gusrdar el producto con la informacion del usuario

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const newProduct = {
			id: products[products.length - 1].id + 1,
			imagen: req.files[0]["filename"],
			imagenFrontal: req.files[1]["filename"],
			imagenLateralDerecha: req.files[2]["filename"],
			imagenLateralIzquierda: req.files[3]["filename"],
			nombre: req.body.nombre,
			marca: req.body.marca,
			precio: req.body.precio,
			descuento: req.body.descuento,
			descripcion: req.body.descripcion,
			cantidad: req.body.cantidad,
			coloresDisponibes: req.body.coloresDisponibes,
			categorias: req.body.categorias
		}
/
		products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		// mostrar lo que se guardo en una vista

		res.redirect('/admin')
	},

	// (get) Update - Formulario para editar
	edit: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const productToEdit = products.find((product) => {

			return product.id == req.params.id;

		}) 

		res.render("editarProducto", {productToEdit})
	},
	// (post) Update - Método para actualizar la info
	processEdit: (req, res) => {

		// Leemos el json
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// buscamos el producto que tenemos que editar
		const id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

		// Creamos el producto "nuevo" que va a reemplazar al anterior
		productToEdit = {
			id: productToEdit.id,
			imagen: req.files == [] ? req.files[0]["filename"] : productToEdit.imagen,
			imagenFrontal: req.files ==  []  ? req.files[1]["filename"] : productToEdit.imagenFrontal,
			imagenLateralDerecha: req.files == [] ? req.files[2]["filename"] : productToEdit.imagenLateralDerecha,
			imagenLateralIzquierda: req.files == [] ? req.files[3]["filename"] : productToEdit.imagenLateralIzquierda,
			marca: req.body.marca,
			nombre: req.body.nombre,
			precio: req.body.precio,
			descuento: req.body.descuento,
			descripcion: req.body.descripcion,
			cantidad: req.body.cantidad, /* NO FUNCIONA */
			coloresDisponibles: req.body.cantidad, /* NO FUNCIONA */
			categorias: req.body.categorias,
			estado: req.body.estado
		}
		console.log(req.files)

		// Buscamos la posicion del producto a editar
		let indice = products.findIndex(product => {
			return product.id == id
		})
		// Reemplazamos
		products[indice] = productToEdit;

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		res.redirect("/products/productDetail/" + productToEdit.id)
	},

	// (delete) Delete - Eliminar un producto de la DB
	destroy: (req, res) => {

		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// eliminar
		products = products.filter(product =>{
			
			return product.id != req.params.id;

		})

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))

		res.redirect("/")
	}

};

module.exports = controller;