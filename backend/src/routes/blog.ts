import { Hono} from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";



const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    variables: {
        user: {
            id: number;
        }
    }
}>();   

blogRouter.post('/post', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: "1",

        },

    });

    return c.json(post.id);
});

export default blogRouter;