import fs from "fs";
import path from "path";
import * as uuid from "uuid";

const postsPath = path.resolve("data", "posts.json");

const readPosts = async () => {
  const response = JSON.parse(fs.readFileSync(postsPath));

  return response;
};

const savePosts = async (posts) => {
  await fs.writeFileSync(postsPath, JSON.stringify(posts));
};

export const fetchAllPosts = async (req, res, next) => {
  try {
    const posts = await readPosts();

    return res.status(201).json({ success: true, posts });
  } catch (error) {
    return next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const post = req.body;

    const posts = await readPosts();

    posts.push({
      ...post,
      id: uuid.v4(),
      userId: req?.["user"]?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await savePosts(posts);

    return res.status(201).json({ success: true, posts });
  } catch (error) {
    return next(error);
  }
};
