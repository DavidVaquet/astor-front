import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"
import TransferForm from "./transfer-form"
import ExpenseStatistics from "./Expense-statics"
import ExpenseHistory from "./Expense-History"

// Datos de ejemplo
const initialTransfers = [
  { id: 1, from: "Local A", to: "Local B", amount: 1500, concept: "Pago de servicios compartidos", date: "2023-11-15" },
  { id: 2, from: "Local C", to: "Local A", amount: 2200, concept: "Compra de suministros", date: "2023-11-10" },
  { id: 3, from: "Local B", to: "Local C", amount: 1800, concept: "Mantenimiento", date: "2023-11-05" },
  { id: 4, from: "Local A", to: "Local C", amount: 3000, concept: "Reparaciones", date: "2023-10-28" },
  { id: 5, from: "Local B", to: "Local A", amount: 1200, concept: "Publicidad compartida", date: "2023-10-20" },
]

export default function SharedExpenses() {
  const [transfers, setTransfers] = useState(initialTransfers)
  const [balances, setBalances] = useState({
    "Local A": 0,
    "Local B": 0,
    "Local C": 0,
  })
  const [activeTab, setActiveTab] = useState("statistics")

  // Calcular balances cuando cambian las transferencias
  useEffect(() => {
    const newBalances = { "Local A": 0, "Local B": 0, "Local C": 0 }

    transfers.forEach((transfer) => {
      newBalances[transfer.from] -= transfer.amount
      newBalances[transfer.to] += transfer.amount
    })

    setBalances(newBalances)
  }, [transfers])

  const handleAddTransfer = (newTransfer) => {
    const transfer = {
      id: transfers.length + 1,
      ...newTransfer,
      date: new Date().toISOString().split("T")[0],
    }
    setTransfers([transfer, ...transfers])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" className="mb-6 text-center">
        Sistema de Gastos Compartidos
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader variant="gradient" color="blue" className="p-5 m-0">
            <Typography variant="h5" color="white">
              Balances Actuales
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(balances).map(([local, balance]) => (
                <Card key={local} className="shadow-md">
                  <CardBody className={`p-4 ${balance > 0 ? "bg-green-50" : balance < 0 ? "bg-red-50" : "bg-gray-50"}`}>
                    <Typography variant="h6" className="mb-2">
                      {local}
                    </Typography>
                    <Typography
                      variant="h4"
                      className={`font-bold ${
                        balance > 0 ? "text-green-600" : balance < 0 ? "text-red-600" : "text-gray-600"
                      }`}
                    >
                      {balance.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                    </Typography>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader variant="gradient" color="blue" className="p-5 m-0">
            <Typography variant="h5" color="white">
              Nueva Transferencia
            </Typography>
          </CardHeader>
          <CardBody>
            <TransferForm onAddTransfer={handleAddTransfer} />
          </CardBody>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardBody className="p-0">
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabsHeader>
              <Tab value="statistics">Estadísticas</Tab>
              <Tab value="history">Historial</Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="statistics" className="p-4">
                <ExpenseStatistics transfers={transfers} balances={balances} />
              </TabPanel>
              <TabPanel value="history" className="p-4">
                <ExpenseHistory transfers={transfers} />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
