import { metadata as layoutMetadata } from '../layout';

export const metadata = {
  title: 'Archive',
  description: 'Explore the full archive of BIOSPECTRA Journal, including previous volumes, special issues, and all peer-reviewed research articles since 2006.',
};

export default function ArchiveLayout({ children }) {
  return <>{children}</>;
}
