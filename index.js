import { TwitterApi } from "twitter-api-v2";
import * as dotenv from "dotenv";
import axios from "axios";
import { createTweetImages } from "./createPictureFromTweet.js";
import { uploadPost } from "./instaconnect.js";
// import { map } from 'lodash';
dotenv.config();
// console.log(process.env.BEARER_TOKEN);
const twitterClient = new TwitterApi(process.env.BEARER_TOKEN);
const roClient = twitterClient.readOnly;
const user = await roClient.v2.userByUsername("TweetsToInsta");



runBot();