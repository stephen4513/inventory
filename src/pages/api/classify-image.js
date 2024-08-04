import vision from '@google-cloud/vision';

// Disable Next.js body parser for this route
export const config = {
  api: {
    bodyParser: true,
  },
};

const client = new vision.ImageAnnotatorClient({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
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
