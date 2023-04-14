/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { GQLContextType } from './../common/type_GQLContextType';

declare global {
	interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {}

export interface NexusGenScalars {
	String: string;
	Int: number;
	Float: number;
	Boolean: boolean;
	ID: string;
}

export interface NexusGenObjects {
	Fruit: {
		// root type
		amount: number; // Int!
		description?: string | null; // String
		id: string; // ID!
		limit: number; // Int!
		name: string; // String!
	};
	Mutation: {};
	Query: {};
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars;

export interface NexusGenFieldTypes {
	Fruit: {
		// field return type
		amount: number; // Int!
		description: string | null; // String
		id: string; // ID!
		limit: number; // Int!
		name: string; // String!
	};
	Mutation: {
		// field return type
		createFruitForFruitStorage: NexusGenRootTypes['Fruit']; // Fruit!
		removeFruitFromFruitStorage: NexusGenRootTypes['Fruit']; // Fruit!
		storeFruitToFruitStorage: NexusGenRootTypes['Fruit']; // Fruit!
	};
	Query: {
		// field return type
		findFruit: Array<NexusGenRootTypes['Fruit'] | null>; // [Fruit]!
		fruits: Array<NexusGenRootTypes['Fruit'] | null>; // [Fruit]!
	};
}

export interface NexusGenFieldTypeNames {
	Fruit: {
		// field return type name
		amount: 'Int';
		description: 'String';
		id: 'ID';
		limit: 'Int';
		name: 'String';
	};
	Mutation: {
		// field return type name
		createFruitForFruitStorage: 'Fruit';
		removeFruitFromFruitStorage: 'Fruit';
		storeFruitToFruitStorage: 'Fruit';
	};
	Query: {
		// field return type name
		findFruit: 'Fruit';
		fruits: 'Fruit';
	};
}

export interface NexusGenArgTypes {
	Mutation: {
		createFruitForFruitStorage: {
			// args
			description: string; // String!
			limit: number; // Int!
			name: string; // String!
		};
		removeFruitFromFruitStorage: {
			// args
			amount: number; // Int!
			name: string; // String!
		};
		storeFruitToFruitStorage: {
			// args
			amount: number; // Int!
			name: string; // String!
		};
	};
	Query: {
		findFruit: {
			// args
			name?: string | null; // String
		};
	};
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
	abstractTypeStrategies: {
		isTypeOf: false;
		resolveType: true;
		__typename: false;
	};
};

export interface NexusGenTypes {
	context: GQLContextType;
	inputTypes: NexusGenInputs;
	rootTypes: NexusGenRootTypes;
	inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
	argTypes: NexusGenArgTypes;
	fieldTypes: NexusGenFieldTypes;
	fieldTypeNames: NexusGenFieldTypeNames;
	allTypes: NexusGenAllTypes;
	typeInterfaces: NexusGenTypeInterfaces;
	objectNames: NexusGenObjectNames;
	inputNames: NexusGenInputNames;
	enumNames: NexusGenEnumNames;
	interfaceNames: NexusGenInterfaceNames;
	scalarNames: NexusGenScalarNames;
	unionNames: NexusGenUnionNames;
	allInputTypes:
		| NexusGenTypes['inputNames']
		| NexusGenTypes['enumNames']
		| NexusGenTypes['scalarNames'];
	allOutputTypes:
		| NexusGenTypes['objectNames']
		| NexusGenTypes['enumNames']
		| NexusGenTypes['unionNames']
		| NexusGenTypes['interfaceNames']
		| NexusGenTypes['scalarNames'];
	allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes'];
	abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
	abstractTypeMembers: NexusGenAbstractTypeMembers;
	objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
	abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
	features: NexusGenFeaturesConfig;
}

declare global {
	interface NexusGenPluginTypeConfig<TypeName extends string> {}
	interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
	interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {}
	interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {}
	interface NexusGenPluginSchemaConfig {}
	interface NexusGenPluginArgConfig {}
}
