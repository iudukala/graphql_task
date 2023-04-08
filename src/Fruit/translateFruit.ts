import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX';
import { Fruit } from './Fruit';

/**
 *
 *
 * @param {Fruit} fruit fruit object to be translated
 * @returns {FruitTypeGQL} transted fruit
 */
export function translateFruit(fruit: Fruit): FruitTypeGQL {
	return {
		[FruitKey.ID]: fruit.id,
		[FruitKey.Name]: fruit.props.name,
		[FruitKey.Description]: fruit.props.description.value,
		[FruitKey.Limit]: fruit.props.limit,
		[FruitKey.Amount]: fruit.props.amount,
	};
}