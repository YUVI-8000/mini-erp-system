import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function ProductForm() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    router.push('/products');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" required />
      <textarea {...register('description')} placeholder="Description" required />
      <input {...register('price')} type="number" step="0.01" placeholder="Price" required />
      <input {...register('quantity')} type="number" placeholder="Quantity" required />
      <button type="submit">Submit</button>
    </form>
  );
}
