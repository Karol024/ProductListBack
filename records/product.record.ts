import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {ProductEntity} from "../types";
type ProductRecordResults = [ProductRecord[],FieldPacket[]]

export class ProductRecord implements ProductEntity{
    public id?:string;
    public name:string;
    public count: number;

    constructor(obj: ProductEntity) {
      if (!obj.name || obj.name.length < 3 || obj.name.length > 55) {
          throw new ValidationError('Nazwa prezentu musie miec od 3 do 55 znaków');
      }

        if (!obj.count || obj.count< 1 || obj.count > 999999) {
            throw new ValidationError('Liczba sz. prezentów powinna sie mieścić w przedziale 1-999999.');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.count = obj.count;

    }

    async insert(): Promise <string> {
        if (!this.id) {
            this.id = uuid() ;
        }

        await pool.execute("INSERT INTO `product` VALUES(:id, :name, :count)", {
           id: this.id,
           name: this.name,
           count: this.count,
        });
       return this.id
    }

    static async listAll(): Promise <ProductRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `product`")as ProductRecordResults;
        return results.map(obj => new ProductRecord(obj));
    }
    static async getOne(id:string):Promise <ProductRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `product` WHERE `id`= :id",{
            id,
        }) as ProductRecordResults;
        return results.length===0 ? null : new ProductRecord(results[0]);
    }

     async delete():Promise <void>{
         await pool.execute("DELETE FROM `product` WHERE `id`= :id",{
            id: this.id,
        });
    }

}
