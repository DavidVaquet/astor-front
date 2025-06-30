"use client"

import { useState } from "react"
import { Card, CardBody, Typography, Input, Select, Option } from "@material-tailwind/react"
import { MagnifyingGlassIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"

export default function ExpenseHistory({ transfers }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [filterLocal, setFilterLocal] = useState("all")

  // Ordenar y filtrar transferencias
  const filteredTransfers = transfers
    .filter((transfer) => {
      // Filtrar por término de búsqueda
      const searchMatch =
        transfer.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.to.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtrar por local
      const localMatch = filterLocal === "all" || transfer.from === filterLocal || transfer.to === filterLocal

      return searchMatch && localMatch
    })
    .sort((a, b) => {
      // Ordenar por campo seleccionado
      if (sortField === "date") {
        return sortDirection === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
      } else if (sortField === "amount") {
        return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
      }
      return 0
    })

  // Cambiar dirección de ordenamiento
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            label="Buscar por concepto o local..."
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-blue-500"
          />
        </div>
        <div className="w-full sm:w-72">
          <Select label="Filtrar por local" value={filterLocal} onChange={(value) => setFilterLocal(value)}>
            <Option value="all">Todos los locales</Option>
            <Option value="Local A">Local A</Option>
            <Option value="Local B">Local B</Option>
            <Option value="Local C">Local C</Option>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <button
                      className="flex items-center gap-2 font-normal leading-none opacity-70 hover:opacity-100"
                      onClick={() => toggleSort("date")}
                    >
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        Fecha
                      </Typography>
                      {sortField === "date" &&
                        (sortDirection === "asc" ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4" />
                        ))}
                    </button>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Origen
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Destino
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <button
                      className="flex items-center gap-2 font-normal leading-none opacity-70 hover:opacity-100 ml-auto"
                      onClick={() => toggleSort("amount")}
                    >
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        Importe
                      </Typography>
                      {sortField === "amount" &&
                        (sortDirection === "asc" ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4" />
                        ))}
                    </button>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Concepto
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransfers.length > 0 ? (
                  filteredTransfers.map((transfer, index) => {
                    const isLast = index === filteredTransfers.length - 1
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

                    return (
                      <tr key={transfer.id}>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {formatDate(transfer.date)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {transfer.from}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {transfer.to}
                          </Typography>
                        </td>
                        <td className={`${classes} text-right`}>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {transfer.amount.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal max-w-[200px] truncate"
                            title={transfer.concept}
                          >
                            {transfer.concept}
                          </Typography>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center">
                      <Typography color="blue-gray" className="font-normal opacity-70">
                        No se encontraron transferencias
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
