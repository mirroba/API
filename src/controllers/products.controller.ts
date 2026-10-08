import { pool } from '../conf/dbConnection';

// GET /getAll
export const getProducts = async (req: any, res: any) => {
    try {
        const [rows]: any = await pool.query(
            'SELECT * FROM products WHERE active = TRUE'
        );

        return res.status(200).json(rows);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Error al obtener los productos'
        });
    }
};


// GET /getById/:id
export const getProductById = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const numId = Number(id);

        // Validar ID
        if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
            return res.status(400).json({
                error: 'El ID debe ser un número entero positivo'
            });
        }

        const [rows]: any = await pool.query(
            'SELECT * FROM products WHERE id = ? AND active = TRUE',
            [numId]
        );

        // Producto inexistente o inactivo
        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado o inactivo'
            });
        }

        return res.status(200).json(rows[0]);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Error al buscar el producto'
        });
    }
};


// POST /create
export const createProduct = async (req: any, res: any) => {
    try {
        const {
            name,
            price,
            stock,
            description,
            brand,
            img
        } = req.body;

        // Validar campos obligatorios
        if (
            !name ||
            price === undefined ||
            stock === undefined ||
            !description
        ) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios'
            });
        }

        // Validar precio
        const numPrice = Number(price);

        if (isNaN(numPrice) || numPrice <= 0) {
            return res.status(400).json({
                error: 'El precio debe ser un número mayor a cero'
            });
        }

        const [result]: any = await pool.query(
            `INSERT INTO products
            (name, price, stock, description, brand, img)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                numPrice,
                stock,
                description,
                brand || null,
                img || null
            ]
        );

        // Crear correctamente = 201
        return res.status(201).json({
            id: result.insertId,
            name,
            price: numPrice,
            stock,
            description,
            brand: brand || null,
            img: img || null,
            active: true
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Error al crear el producto'
        });
    }
};


// PUT /update/:id
export const updateProduct = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const numId = Number(id);

        // Validar ID
        if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
            return res.status(400).json({
                error: 'El ID debe ser un número entero positivo'
            });
        }

        const {
            name,
            price,
            stock,
            description,
            brand,
            img
        } = req.body;

        // Validar campos obligatorios
        if (
            !name ||
            price === undefined ||
            stock === undefined ||
            !description
        ) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios'
            });
        }

        // Validar precio
        const numPrice = Number(price);

        if (isNaN(numPrice) || numPrice <= 0) {
            return res.status(400).json({
                error: 'El precio debe ser un número mayor a cero'
            });
        }

        const [result]: any = await pool.query(
            `UPDATE products
             SET name = ?,
                 price = ?,
                 stock = ?,
                 description = ?,
                 brand = ?,
                 img = ?
             WHERE id = ?
             AND active = TRUE`,
            [
                name,
                numPrice,
                stock,
                description,
                brand || null,
                img || null,
                numId
            ]
        );

        // No existe o está inactivo
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado o inactivo'
            });
        }

        return res.status(200).json({
            message: 'Producto actualizado correctamente'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Error al actualizar el producto'
        });
    }
};


// DELETE /delete/:id
// Baja lógica
export const deleteProduct = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const numId = Number(id);

        // Validar ID
        if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
            return res.status(400).json({
                error: 'El ID debe ser un número entero positivo'
            });
        }

        const [result]: any = await pool.query(
            `UPDATE products
             SET active = FALSE
             WHERE id = ?
             AND active = TRUE`,
            [numId]
        );

        // No existe o ya está inactivo
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado o inactivo'
            });
        }

        return res.status(200).json({
            message: 'Producto desactivado correctamente'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Error al eliminar el producto'
        });
    }
};


// PATCH /change-price/:id
export const changePrice = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const numId = Number(id);

        // Validar ID
        if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
            return res.status(400).json({
                error: 'El ID debe ser un número entero positivo'
            });
        }

        const { price } = req.body;

        // Validar precio
        const numPrice = Number(price);

        if (
            price === undefined ||
            isNaN(numPrice) ||
            numPrice <= 0
        ) {
            return res.status(400).json({
                error: 'Debe ingresar un precio válido mayor a cero'
            });
        }

        const [result]: any = await pool.query(
            `UPDATE products
             SET price = ?
             WHERE id = ?
             AND active = TRUE`,
            [numPrice, numId]
        );

        // No existe o está inactivo
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado o inactivo'
            });
        }

        return res.status(200).json({
            message: 'Precio actualizado correctamente'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Error al cambiar el precio del producto'
        });
    }
};