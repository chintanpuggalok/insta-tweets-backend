async function processUsers(usersInfo) {
    // usersInfo.
    // console.log(usersInfo);
    let promises = usersInfo.map(async (user) => {
      return axios.get(user.profile_image_url, {
        responseType: "arraybuffer",
      });
    });
    console.log(promises);
    let images = await Promise.all(promises);
  
    images = images.map((image) => {
      // console.log(im)
      return (
        "data:image/jpeg;base64," +
        Buffer.from(image.data, "binary").toString("base64")
      );
    });
    console.log(images);
    let users = {};
    let i = 0;
    usersInfo.forEach((user) => {
      user.image = images[i];
      users[user.id] = user;
      i += 1;
    });
    // console.log(users);
    return users
    // console.log(first)
  }
  
  async function runBot(roClient,user) {
    const tweetsTagged = await roClient.v2.userMentionTimeline(user.data.id, {
      expansions: ["referenced_tweets.id"],
    });
    // console.log(tweetsOfJack);
    let tweetsToFetch = [];
    for (const tweet of tweetsTagged) {
      tweetsToFetch.push(tweet.referenced_tweets[0].id);
      // console.log()
    }
  
    let parentTweets = await roClient.v2.tweets(tweetsToFetch, {
      "user.fields": ["name", "username", "profile_image_url"],
      expansions: ["attachments.media_keys", "author_id"],
    });
    // console.log(parentTweets)
    // console.log(parentTweets.includes.users)
    let users = await processUsers(parentTweets.includes.users);
  
    let finalTweets = [];
    parentTweets.data.forEach((tweet) => {
      finalTweets.push({
        imageSource: users[tweet.author_id].image,
        tweet_username: users[tweet.author_id].name,
        tweet_userid: users[tweet.author_id].username,
        tweet_text: tweet.text,
      });
    });
    console.log(finalTweets)
    let tweetImages=await createTweetImages(finalTweets);
    uploadPost(process.env.IG_USERNAME,process.env.IG_PASSWORD,tweetImages[0],"this tweet was posted by a bot")
  
  }