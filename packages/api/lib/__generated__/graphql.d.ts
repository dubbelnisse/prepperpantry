import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** An ISO-8601 encoded UTC date string. */
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};



export type AddPantryItemInput = {
  name: Scalars['String'],
  quantity: Scalars['Int'],
  volume: Scalars['String'],
  expire: Scalars['DateTime'],
};

export type AddWaterContainerInput = {
  quantity: Scalars['Int'],
  volume: Scalars['Int'],
  expire: Scalars['DateTime'],
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type DeletePantryItemInput = {
  id: Scalars['String'],
};

export type DeleteWaterContainerInput = {
  id: Scalars['String'],
};

export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
  register: Token,
  login: Token,
  addPantryItem: Scalars['Boolean'],
  deletePantryItem: Scalars['Boolean'],
  addWater: Scalars['Boolean'],
  deleteWater: Scalars['Boolean'],
};


export type MutationRegisterArgs = {
  input: RegisterInput
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationAddPantryItemArgs = {
  input: AddPantryItemInput
};


export type MutationDeletePantryItemArgs = {
  input: DeletePantryItemInput
};


export type MutationAddWaterArgs = {
  input: AddWaterContainerInput
};


export type MutationDeleteWaterArgs = {
  input: DeleteWaterContainerInput
};

export type PantryItem = {
   __typename?: 'PantryItem',
  id: Scalars['String'],
  name: Scalars['String'],
  quantity: Scalars['Int'],
  volume: Scalars['String'],
  expire: Scalars['DateTime'],
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  user: User,
  pantry: Array<Maybe<PantryItem>>,
  water: Array<Maybe<WaterContainer>>,
};

export type RegisterInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Token = {
   __typename?: 'Token',
  token: Scalars['String'],
};


export type User = {
   __typename?: 'User',
  username: Scalars['String'],
  email: Scalars['String'],
};

export type WaterContainer = {
   __typename?: 'WaterContainer',
  id: Scalars['String'],
  quantity: Scalars['Int'],
  volume: Scalars['Int'],
  expire: Scalars['DateTime'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  PantryItem: ResolverTypeWrapper<PantryItem>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  WaterContainer: ResolverTypeWrapper<WaterContainer>,
  Mutation: ResolverTypeWrapper<{}>,
  RegisterInput: RegisterInput,
  Token: ResolverTypeWrapper<Token>,
  LoginInput: LoginInput,
  AddPantryItemInput: AddPantryItemInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  DeletePantryItemInput: DeletePantryItemInput,
  AddWaterContainerInput: AddWaterContainerInput,
  DeleteWaterContainerInput: DeleteWaterContainerInput,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  User: User,
  PantryItem: PantryItem,
  Int: Scalars['Int'],
  DateTime: Scalars['DateTime'],
  WaterContainer: WaterContainer,
  Mutation: {},
  RegisterInput: RegisterInput,
  Token: Token,
  LoginInput: LoginInput,
  AddPantryItemInput: AddPantryItemInput,
  Boolean: Scalars['Boolean'],
  DeletePantryItemInput: DeletePantryItemInput,
  AddWaterContainerInput: AddWaterContainerInput,
  DeleteWaterContainerInput: DeleteWaterContainerInput,
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
};

export type IsAuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = {   maxAge?: Maybe<Maybe<Scalars['Int']>>,
  scope?: Maybe<Maybe<CacheControlScope>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  register?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>,
  login?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>,
  addPantryItem?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddPantryItemArgs, 'input'>>,
  deletePantryItem?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePantryItemArgs, 'input'>>,
  addWater?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddWaterArgs, 'input'>>,
  deleteWater?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteWaterArgs, 'input'>>,
};

export type PantryItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['PantryItem'] = ResolversParentTypes['PantryItem']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  volume?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  expire?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  pantry?: Resolver<Array<Maybe<ResolversTypes['PantryItem']>>, ParentType, ContextType>,
  water?: Resolver<Array<Maybe<ResolversTypes['WaterContainer']>>, ParentType, ContextType>,
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type WaterContainerResolvers<ContextType = any, ParentType extends ResolversParentTypes['WaterContainer'] = ResolversParentTypes['WaterContainer']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  volume?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  expire?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  PantryItem?: PantryItemResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Token?: TokenResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
  WaterContainer?: WaterContainerResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>,
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;