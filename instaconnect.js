/* tslint:disable:no-console */
import { IgApiClient } from 'instagram-private-api';
import { readFile } from 'fs';
import { promisify } from 'util';
const readFileAsync = promisify(readFile);



async function uploadPost(username,password,image,caption)
{
  const ig = new IgApiClient();
  ig.state.generateDevice(username);
  const auth = await ig.account.login(username, password);
  const publishResult = await ig.publish.photo({
    file:image, // imagje buffer, you also can specify image from your disk using fs
    caption: caption, // nice caption (optional)
  });
  
}
export {uploadPost};