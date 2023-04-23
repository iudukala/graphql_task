export const CREATE_LEMON_MUTATION = `mutation{
            createFruitForFruitStorage(
					name: "lemon", description: "this is a lemon", limit: 10){
						name
						limit
						description
				}
			}`;
