import nodeHtmlToImage from 'node-html-to-image';
import fs from 'fs' ;


// const start = Date.now()
async function createTweetImages(tweets)
{
    let response=[]
    let htmlString=fs.readFileSync('./foo.html',"utf-8")
    const images=await nodeHtmlToImage({
        html:htmlString,
        content:tweets,
        type:'jpeg'
      })
    images.forEach((tweet)=>{response.push(tweet)})
    // for (let index = 0; index < tweets.length; index+=4) {
    //     let tweetArray=[];
    //     for (let tweetNum = index; tweetNum <index+4 ; tweetNum++) {
    //         tweetArray.push(tweets[tweetNum]);
    //     }
        
    // }
    return response
}
export {createTweetImages};
