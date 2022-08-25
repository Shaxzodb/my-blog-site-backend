import { User, Article } from "../db/database";

import { QueryArticleType, MutationArticleType } from "./ArticleSchema";
import { QueryUserType, MutationUserType } from "./UserSchema";
import {
    GraphQLObjectType,
    GraphQLSchema,
} from "graphql";


const RootQueryType = new GraphQLObjectType({
    name: "QUERY_TYPE",
    fields: {
        GetArticleData: {
            type: QueryArticleType,
            resolve: async () => {
                return await Article.find();
            },
        },
        GetUserData: {
            type: QueryUserType,
            resolve: async () => {
                return await User.find();
            }
        }
    },
});
const RootMutationType = new GraphQLObjectType({
    name: "MUTATION_TYPE",
    fields: {
        EditArticleData: {
            type: MutationArticleType,
            resolve: async () => {
                return await Article.find();
            },
        },
        EditUserData: {
            type: MutationUserType,
            resolve: async () => {
                return await User.find();
            }
        }
    },
});

const schema = new GraphQLSchema({
    query: RootQueryType, // Query
    mutation: RootMutationType, // Mutation
});

export default schema;
