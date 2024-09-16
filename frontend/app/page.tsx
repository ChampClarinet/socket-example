import OrdersTable from "./orders";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      <OrdersTable />
    </div>
  );
}
