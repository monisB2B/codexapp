import { useParams } from 'react-router-dom';

export default function ItemDetail() {
  const { id } = useParams();
  return <div className="p-4">Item Detail {id}</div>;
}
