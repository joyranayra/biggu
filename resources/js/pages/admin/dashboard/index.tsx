import { Head, usePage } from '@inertiajs/react'

type Stats = {
  products: number
  workshops: number
  orders: number
  revenue: number

  today_orders: number
  today_revenue: number
  pending_orders: number

  top_products: { name: string; total: number }[]
}

type PageProps = {
  stats: Stats
}

export default function Dashboard() {
  const { stats } = usePage<PageProps>().props
  
  function formatPrice(price: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <Head title="Dashboard" />

      <div className="flex flex-col gap-6 p-6">

        <div className="grid gap-4 md:grid-cols-4">
          <Card title="Total Produk" value={stats.products} />
          <Card title="Workshop" value={stats.workshops} />
          <Card title="Total Pesanan" value={stats.orders} />
          <Card
            title="Pendapatan"
            value={`${formatPrice(stats.revenue)}`}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="Order Hari Ini"
            value={stats.today_orders}
            highlight="text-blue-600"
          />
          <Card
            title="Revenue Hari Ini"
            value={`${formatPrice(stats.today_revenue)}`}
            highlight="text-green-600"
          />
          <Card
            title="Pending Order"
            value={stats.pending_orders}
            highlight="text-orange-600"
          />
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">
            Produk / Workshop Terlaris
          </h2>

          <div className="space-y-3">
            {stats.top_products?.length > 0 ? (
              stats.top_products.map((p, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border rounded-lg p-3"
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="text-sm text-gray-500">
                    {p.total} terjual
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Belum ada data penjualan
              </p>
            )}
          </div>
        </div>

      </div>
    </>
  )
}

function Card({
  title,
  value,
  highlight,
}: {
  title: string
  value: any
  highlight?: string
}) {
  return (
    <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold mt-1 ${highlight || ''}`}>
        {value}
      </h2>
    </div>
  )
}