import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    name: 'dubai-marina-night.jpg',
    url: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-downtown.jpg',
    url: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-business-bay.jpg',
    url: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-palm-jumeirah.jpg',
    url: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-mall.jpg',
    url: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-skyline.jpg',
    url: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-burj-khalifa.jpg',
    url: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-marina-day.jpg',
    url: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'dubai-desert.jpg',
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