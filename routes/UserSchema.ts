import { User } from "../db/database";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from "graphql";

const UserType = new GraphQLObjectType({
    name: "USER_TYPE",
    description: "USER OF THE APPLICATION",
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString),
            description: "THE _ID OF THE USER",
            resolve: async (user) => {
                return await user._id;
            }
        },
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: "THE ID OF THE USER",
            resolve: async (user) => {
                return await user.id;
            }
        },
        username: {
            type: new GraphQLNonNull(GraphQLString),
            description: "THE USERNAME OF THE USER",
            resolve: async (user) => {
                return await user.username;
            }
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: "THE PASSWORD OF THE USER",
            resolve: async (user) => {
                return await user.password;
            }
        },
        email: {
            type: GraphQLString,
            description: "THE EMAIL OF THE USER",
            resolve: async (user) => {
                return await user.email;
            }
        },
        phone: {
            type: GraphQLString,
            description: "THE PHONE OF THE USER",
            resolve: async (user) => {
                return await user.phone;
            }
        },
        address: {
            type: GraphQLString,
            description: "THE ADDRESS OF THE USER",
            resolve: async (user) => {
                return await user.address;
            }
        },
        role: {
            type: new GraphQLNonNull(GraphQLString),
            description: "THE ROLE OF THE USER",
            resolve: async (user) => {
                return await user.role;
            }
        },
    }),
});

const QueryUserType = new GraphQLObjectType({
    name: "QUERY_USER_TYPE",
    fields: () => ({
        user: {
            type: new GraphQLList(UserType),
            description: "GET USER BY ID",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "THE ID OF THE USER",
                },
            },
            resolve: async (parent, args) => {
                const user = await User.findById(args.id);
                console.log(user);
                return user;
            }
        },
        users: {
            type: new GraphQLList(UserType),
            description: "GET ALL USERS",
            resolve: async (parent, args) => {
                const users = await User.find({});
                return users;
            }
        },
    }),
});

const MutationUserType = new GraphQLObjectType({
    name: "MUTATION_USER_TYPE",
    fields: () => ({
        createUser: {
            type: UserType,
            description: "CREATE USER",
            args: {
                username: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "THE USERNAME OF THE USER",
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "THE PASSWORD OF THE USER",
                },
                email: {
                    type: GraphQLString,
                    description: "THE EMAIL OF THE USER",
                },
                phone: {
                    type: GraphQLString,
                    description: "THE PHONE OF THE USER",
                },
                address: {
                    type: GraphQLString,
                    description: "THE ADDRESS OF THE USER",
                }
            },
            resolve: async (parent, args) => {
                return await new User(
                    Object.assign(
                        _.pick(args, ["username", "password", "email", "phone", "address"]),
                        { id: uuid() }
                    )
                ).save();
            }
        },
        updateUser: {
            type: UserType,
            description: "UPDATE USER",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "THE ID OF THE USER",
                },
                email: {
                    type: GraphQLString,
                    description: "THE EMAIL OF THE USER",
                },
                phone: {
                    type: GraphQLString,
                    description: "THE PHONE OF THE USER",
                },
                address: {
                    type: GraphQLString,
                    description: "THE ADDRESS OF THE USER",
                }
            },
            resolve: async (parent, args) => {
                return await User.findOneAndUpdate({ id: args.id }, {
                    email: args.email,
                    phone: args.phone,
                    address: args.address,
                });
            }
        },
        deleteUser: {
            type: UserType,
            description: "DELETE USER",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "THE ID OF THE USER",
                },
            },
            resolve: async (parent, args) => {
                return await User.findByIdAndDelete(args.id);
            }
        },
    }),
});




export { QueryUserType, MutationUserType };



