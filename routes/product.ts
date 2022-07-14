import {Router} from "express";
import {ProductRecord} from "../records/product.record";
import {ValidationError} from "../utils/errors";
import {CreateProductReq, TakeSingleProductRes} from "../types";

export const ProductRouter = Router();

ProductRouter
    .get('/', async (req, res) => {
        const productsList = await ProductRecord.listAll();

        res.json( {
            productsList,
        });
    })

    .get('/:productid', async (req, res) => {
        const product = await ProductRecord.getOne(req.params.productid);

        res.json( {
            product,
        }as TakeSingleProductRes);
    })

    .delete('/:id',async (req,res) => {
        const product = await ProductRecord.getOne(req.params.id);

        if(!product) {
            throw new ValidationError('Brak takiego produktu.');
        };


        await product.delete();

        res.end();
    })

    .post('/', async (req, res) => {
        const newProduct = new ProductRecord(req.body as CreateProductReq);
        await newProduct.insert();
        res.json(newProduct);

    });
