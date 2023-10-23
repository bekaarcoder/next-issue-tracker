import Image from 'next/image';
import Pagination from './components/Pagination';

export default function Home() {
    return <Pagination itemCount={50} pageSize={10} currentPage={4} />;
}
