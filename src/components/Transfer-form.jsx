"use client"

import { useState } from "react"
import { Button, Input, Textarea, Select, Option, Typography } from "@material-tailwind/react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

export default function TransferForm({ onAddTransfer }) {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
    concept: "",
  })
  const [error, setError] = useState("")

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validaciones básicas
    if (!formData.from || !formData.to || !formData.amount || !formData.concept) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (formData.from === formData.to) {
      setError("El origen y destino no pueden ser el mismo local")
      return
    }

    // Convertir a número y validar
    const amount = Number.parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      setError("El importe debe ser un número positivo")
      return
    }

    // Enviar datos
    onAddTransfer({
      from: formData.from,
      to: formData.to,
      amount: amount,
      concept: formData.concept,
    })

    // Resetear formulario
    setFormData({
      from: "",
      to: "",
      amount: "",
      concept: "",
    })

    // Mostrar mensaje de éxito (en una aplicación real usaríamos un toast)
    alert("Transferencia registrada correctamente")
  }

  const locals = ["Local A", "Local B", "Local C"]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Select label="Origen" value={formData.from} onChange={(value) => handleChange("from", value)} className="mb-4">
          {locals.map((local) => (
            <Option key={local} value={local}>
              {local}
            </Option>
          ))}
        </Select>
      </div>

      <div className="flex justify-center my-2">
        <ArrowRightIcon className="h-6 w-6 text-blue-gray-500" />
      </div>

      <div>
        <Select label="Destino" value={formData.to} onChange={(value) => handleChange("to", value)} className="mb-4">
          {locals.map((local) => (
            <Option key={local} value={local}>
              {local}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <Input
          type="number"
          label="Importe (€)"
          min="0"
          step="0.01"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          className="mb-4"
        />
      </div>

      <div>
        <Textarea
          label="Concepto"
          value={formData.concept}
          onChange={(e) => handleChange("concept", e.target.value)}
          className="mb-4"
        />
      </div>

      {error && (
        <Typography variant="small" color="red" className="mt-2">
          {error}
        </Typography>
      )}

      <Button type="submit" fullWidth color="blue" className="mt-4">
        Registrar Transferencia
      </Button>
    </form>
  )
}
