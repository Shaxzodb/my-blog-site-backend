import { Article, User } from "../db/database";
import { v4 as uuid } from "uuid";
import _ from "lodash";
// import { GraphQLUpload } from 'graphql-upload';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from "graphql"; // for GraphQL

// import fs from "fs";
const AuthorType = new GraphQLObjectType({
    name: "AUTHOR_TYPE",
    description: "AUTHOR OF THE APPLICATION",
    fields: () => ({
        username: {
            type: new GraphQLNonNull(GraphQLString),
            description: "THE USERNAME OF THE AUTHOR",
            resolve: async (parent, args) => {
                return await parent.username;
            }
        },
    }),
});
const ArticleType = new GraphQLObjectType({
    name: "ARTICLE_TYPE",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: "ARTICLE ID",
            resolve: async (article) => {
                return await article.id;
            },
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: "ARTICLE TITLE",
            resolve: async (article) => {
                return await article.title;
            },
        },
        img: {
            type: new GraphQLNonNull(GraphQLString),
            description: "ARTICLE IMAGE",
            resolve: async (article) => {
                return await article.img;
            },
        },

        // img: {
        //     description: 'UPLOADED IMAGE',
        //     type: GraphQLUpload,
        //     resolve: async (article, { file }) => {
        //         const { createReadStream, filename, mimetype } = await file;
        //         const stream = createReadStream();
        //         const nowFileName = `${uuid() + filename}`;
        //         const filePath = `./public/images/${nowFileName}`;
        //         const fileStream = fs.createWriteStream(filePath);
        //         stream.pipe(fileStream);
        //         return {
        //             filename: nowFileName,
        //             mimetype: mimetype,
        //             path: filePath,
        //         };
        //     }
        // },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: "ARTICLE CONTENT",
            resolve: async (article) => {
                return await article.content;
            },
        },
        author: {
            type: AuthorType,
            description: "ARTICLE AUTHOR",
            resolve: async (article) => {
                return await article.author;
            }
        },
        date: {
            type: new GraphQLNonNull(GraphQLString),
            description: "ARTICLE DATE",
            resolve: async (article) => {
                return await article.date;
            },
        },
        error: {
            type: GraphQLString,
            description: "ERROR",
            resolve: async (article) => {
                return await article.error;
            }
        },
    }),
});

const QueryArticleType = new GraphQLObjectType({
    name: "QUERY_ARTICLE_TYPE",
    fields: () => ({
        article: {
            type: new GraphQLList(ArticleType),
            description: "GET ARTICLE BY ID",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "ARTICLE ID",
                },
            },
            resolve: async (root, args) => {
                return await Article.find({ id: args.id }).populate("author", "username");
            },
        },
        articles: {
            type: new GraphQLList(ArticleType),
            description: "ALL ARTICLES",
            resolve: async (parent, args) => {
                return await Article.find().populate("author", "username");
            },
        },

    }),
});


const MutationArticleType = new GraphQLObjectType({
    name: "MUTATION_ARTICLE_TYPE",
    fields: () => ({
        createArticle: {
            type: ArticleType,
            description: "NEW ARTICLE CREATION",
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "ARTICLE TITLE",
                },
                content: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "ARTICLE CONTENT",
                },
                img: {
                    // type: GraphQLUpload,
                    type: new GraphQLNonNull(GraphQLString),
                    description: "ARTICLE IMAGE",
                },
                author: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "ARTICLE AUTHOR",
                }
            },
            resolve: async (parent, args) => {

                const permission = await User.findOne({ _id: args.author }, { role: 1 });

                if (permission?.role === "admin" || permission?.role === "super_admin") {
                    const article = await Object.assign(
                        _.pick(args, ["title", "content", "img", "author"]),
                        { id: uuid(), date: new Date() }
                    );
                    return await (await new Article(article).save()).populate("author", "username");
                } else {
                    console.log("You are not an admin");
                    return await Object.assign(
                        _.pick(args, ["title", "content", "img", "author"]),
                        { id: uuid(), date: new Date(), error: "You are not an admin" }
                    );
                }
            },
        },

        updateArticle: {
            type: ArticleType,
            description: "ARTICLE UPDATE",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "ARTICLE ID",
                },
                title: {
                    type: GraphQLString,
                    description: "ARTICLE TITLE",
                },
                content: {
                    type: GraphQLString,
                    description: "ARTICLE CONTENT",
                },
                img: {
                    // type: GraphQLUpload,
                    type: GraphQLString,
                    description: "ARTICLE IMAGE",
                },
            },
            resolve: async (parent, args) => {
                return await Article.findOneAndUpdate(
                    { id: args.id },
                    {
                        title: args.title,
                        content: args.content,
                        img: args.img,
                    }
                );
            },
        },
        deleteArticle: {
            type: ArticleType,
            description: "ARTICLE DELETE",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "ARTICLE ID",
                },
            },
            resolve: async (parent, args) => {
                return await Article.findOneAndDelete({ id: args.id });
            },
        },
    }),
});

export { QueryArticleType, MutationArticleType };
