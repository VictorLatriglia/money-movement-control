/**
 * Whatsapp-bot
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { OutgoingsCategory } from './outgoingsCategory';
import { User } from './user';

export interface MoneyMovement { 
    id?: string;
    createdOn?: Date;
    updatedOn?: Date;
    ammount?: number;
    categoryId?: string;
    category?: OutgoingsCategory;
    tag?: string;
    userId?: string;
    user?: User;
}