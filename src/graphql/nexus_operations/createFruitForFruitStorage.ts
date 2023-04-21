import mongoose from 'mongoose';
import { extendType, intArg, nonNull, stringArg } from 'nexus';
import { AllNexusArgsDefs } from 'nexus/dist/core.js';
import { Fruit } from '../../Fruit/Fruit.js';
import { FruitService } from '../../Fruit/FruitDomainService.js';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import { FruitRepo } from '../../Fruit/FruitRepository.js';
import { FruitKey } from '../../Fruit/enum_fruitKey.js';
import type { FruitConstructArgs, FruitDTO } from '../../Fruit/types.js';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';
import { GQLContextType } from '../common/type_GQLContextType.js';
import { DomainEventModel } from '../../infrastructure/persistence/DomainEventModel.js';
import { FRUIT_MUTATION_EVENT, FruitMutatedEvent } from '../../Fruit/events/FruitMutatedEvent.js';
import { connectDB } from '../../infrastructure/persistence/connectDB.js';
// import { FruitEventModel } from '../../infrastructure/persistence/FruitEventModel.js';

/**
 * mutation for adding a new fruit.
 * structure: createFruitForFruitStorage(name: string, description: string, limit: int)
 */
export const createFruitForFruitStorage = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createFruitForFruitStorage', {
			type: FRUIT_NAME,

			args: <Record<keyof FruitConstructArgs, AllNexusArgsDefs>>{
				[FruitKey.Name]: nonNull(stringArg()),
				[FruitKey.Description]: nonNull(stringArg()),
				[FruitKey.Limit]: nonNull(intArg()),
			},

			resolve: async (_, args: FruitConstructArgs, context: GQLContextType): Promise<FruitDTO> => {
				const repo = new FruitRepo(context.DB_URI);

				if (await new FruitService(repo).doesExist(args.name)) {
					throw new Error('fruit names must be unique');
				}

				const newFruit: Fruit = Fruit.createNewFruit(args);

				const session = await mongoose.startSession();
				session.startTransaction();

				// try {
				await new FruitRepo(context.DB_URI).save(newFruit);

				await connectDB(context.DB_URI);
				await new DomainEventModel(
					new FruitMutatedEvent(newFruit, FRUIT_MUTATION_EVENT.CREATED),
				).save();

				// 	await session.commitTransaction();
				// } catch (exception) {
				// 	console.error('transaction failed: ' + exception);
				// } finally {
				// 	await session.endSession();
				// }

				// 	newFruit.addDomainEvent()

				// // 	// newFruit.add

				// }
				// session.withTransaction(() => {
				// 	return new FruitRepo(context.DB_URI).save(newFruit);
				// });
				// await new FruitRepo(context.DB_URI).save(newFruit);

				return FruitMapper.toDTO(newFruit);
			},
		});
	},
});
