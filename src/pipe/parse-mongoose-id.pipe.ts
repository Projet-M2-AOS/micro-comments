import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

/**
 *  Ce "pipe" permet de valider qu'un Id reçu est bien valide pour mongo
 *  Si un id invalid est reçu, une erreur bad request est renvoyé en réponse
 */
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
    transform(value: any): Types.ObjectId | undefined {
        if (value) {
            const validObjectId = Types.ObjectId.isValid(value);

            if (!validObjectId) {
                throw new BadRequestException('Invalid ObjectId');
            }

            return <Types.ObjectId>Types.ObjectId.createFromHexString(value);
        } else {
            return undefined
        }
    }
}
