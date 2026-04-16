export default function manifest() {
  return {
    name: 'Biospectra | MSET International Journal of Life Sciences',
    short_name: 'Biospectra',
    description: 'An International Biannual Refereed Journal of Life Sciences published by Madhawi Shyam Educational Trust.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f5ef',
    theme_color: '#1a2e1a',
    icons: [
      {
        src: '/icon.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/icon.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
}
