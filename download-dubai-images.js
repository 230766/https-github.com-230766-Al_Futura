import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    name: 'dubai-skyline-panorama.jpg',
    url: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-marina-aerial.jpg',
    url: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-burj-khalifa-night.jpg',
    url: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-palm-jumeirah-aerial.jpg',
    url: 'https://images.pexels.com/photos/4428286/pexels-photo-4428286.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-desert-sunset.jpg',
    url: 'https://images.pexels.com/photos/3334181/pexels-photo-3334181.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-fountain-show.jpg',
    url: 'https://images.pexels.com/photos/4428277/pexels-photo-4428277.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-skyscrapers-blue.jpg',
    url: 'https://images.pexels.com/photos/2662792/pexels-photo-2662792.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-beach-luxury.jpg',
    url: 'https://images.pexels.com/photos/2404046/pexels-photo-2404046.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-mall-interior.jpg',
    url: 'https://images.pexels.com/photos/5746087/pexels-photo-5746087.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-frame-landmark.jpg',
    url: 'https://images.pexels.com/photos/4428282/pexels-photo-4428282.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-marina-night-reflection.jpg',
    url: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-downtown-sunset.jpg',
    url: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1200'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const destPath = path.join(__dirname, 'public', 'dubai', filename);
    const file = fs.createWriteStream(destPath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(destPath, () => {}); // Delete the file if there's an error
        console.error(`Error downloading ${filename}: ${err.message}`);
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
};

const downloadAll = async () => {
  for (const image of images) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`Failed to download ${image.name}`);
    }
  }
  console.log('All downloads completed!');
};

downloadAll(); 