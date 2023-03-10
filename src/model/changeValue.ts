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
import { ChangeValueMetadata } from './changeValueMetadata';
import { ContactInformation } from './contactInformation';
import { MessagesData } from './messagesData';

export interface ChangeValue { 
    messagingProduct?: string;
    metadata?: ChangeValueMetadata;
    contacts?: Array<ContactInformation>;
    messages?: Array<MessagesData>;
}