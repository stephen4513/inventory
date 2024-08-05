import vision from '@google-cloud/vision';

// Disable Next.js body parser for this route
export const config = {
  api: {
    bodyParser: true,
  },
};

const client = new vision.ImageAnnotatorClient({
  keyFilename: '/home/steph/projects/website/pantry/pantry-431501-3a97db732ede.json',
});

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { image } = req.body;

  try {
    const [result] = await client.labelDetection({
      image: {
        content: image,
      },
    });
    const labels = result.labelAnnotations.map(label => label.description);
    res.status(200).json({ labels });
  } catch (error) {
    console.error('Error classifying the image:', error);
    res.status(500).json({ error: 'Error classifying the image' });
  }
};