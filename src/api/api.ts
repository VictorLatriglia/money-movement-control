export * from './authorization.service';
import { AuthorizationService } from './authorization.service';
export * from './moneyMovement.service';
import { MoneyMovementService } from './moneyMovement.service';
export const APIS = [AuthorizationService, MoneyMovementService];
