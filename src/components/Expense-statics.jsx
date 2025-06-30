import { useState } from "react"
import { Card, CardBody, Typography, Tabs, TabsHeader, Tab } from "@material-tailwind/react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function ExpenseStatistics({ transfers, balances }) {
  const [chartView, setChartView] = useState("balance")

  // Preparar datos para el gráfico de barras de balances
  const balanceData = Object.entries(balances).map(([name, value]) => ({
    name,
    value,
  }))

  // Calcular transferencias por local (salidas)
  const transfersByLocal = {}
  transfers.forEach((transfer) => {
    if (!transfersByLocal[transfer.from]) {
      transfersByLocal[transfer.from] = 0
    }
    transfersByLocal[transfer.from] += transfer.amount
  })

  const transferData = Object.entries(transfersByLocal).map(([name, value]) => ({
    name,
    value,
  }))

  // Calcular transferencias entre locales
  const flowData = []
  const localPairs = {}

  transfers.forEach((transfer) => {
    const key = `${transfer.from} → ${transfer.to}`
    if (!localPairs[key]) {
      localPairs[key] = 0
    }
    localPairs[key] += transfer.amount
  })

  Object.entries(localPairs).forEach(([key, value]) => {
    flowData.push({
      name: key,
      value,
    })
  })

  // Colores para los gráficos
  const COLORS = ["#2196f3", "#4caf50", "#ff9800", "#f44336", "#9c27b0", "#3f51b5"]

  const renderChart = () => {
    switch (chartView) {
      case "balance":
        return (
          <Card className="mt-6">
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Balance por Local
              </Typography>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `${value.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}`}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Balance" fill="#2196f3" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        )
      case "transfers":
        return (
          <Card className="mt-6">
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Gastos por Local
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transferData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) =>
                          `${value.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}`
                        }
                      />
                      <Legend />
                      <Bar dataKey="value" name="Total Transferido" fill="#4caf50" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transferData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {transferData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) =>
                          `${value.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}`
                        }
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardBody>
          </Card>
        )
      case "flow":
        return (
          <Card className="mt-6">
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Flujo entre Locales
              </Typography>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={flowData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip
                      formatter={(value) => `${value.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}`}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Importe" fill="#ff9800" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={chartView} onChange={(value) => setChartView(value)}>
        <TabsHeader>
          <Tab value="balance">Balances</Tab>
          <Tab value="transfers">Gastos por Local</Tab>
          <Tab value="flow">Flujo entre Locales</Tab>
        </TabsHeader>
      </Tabs>
      {renderChart()}
    </div>
  )
}
