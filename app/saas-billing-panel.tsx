"use client"

import { useState, useEffect } from "react"
import {
  Users,
  FileText,
  CreditCard,
  Settings,
  Plus,
  Search,
  Bell,
  User,
  Eye,
  Zap,
  X,
  AlertTriangle,
  ChevronRight,
  Edit,
  Download,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
} from "lucide-react"

const SaaSBillingPanel = () => {
  // State management
  const [activeTab, setActiveTab] = useState("customers")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [showCreateCustomer, setShowCreateCustomer] = useState(false)
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)
  const [showCreatePayment, setShowCreatePayment] = useState(false)
  const [showVoidModal, setShowVoidModal] = useState(false)
  const [voidInvoiceId, setVoidInvoiceId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentTab, setPaymentTab] = useState("all") // "all" or "overdue"

  // Available brands data
  const availableBrands = [
    {
      id: 1,
      name: "McDonald's",
      type: "single",
      subBrands: [],
    },
    {
      id: 2,
      name: "KFC",
      type: "single",
      subBrands: [],
    },
    {
      id: 3,
      name: "Yum! Brands",
      type: "multi",
      subBrands: [
        { id: 31, name: "KFC", parentId: 3 },
        { id: 32, name: "Pizza Hut", parentId: 3 },
        { id: 33, name: "Taco Bell", parentId: 3 },
      ],
    },
    {
      id: 4,
      name: "Restaurant Brands International",
      type: "multi",
      subBrands: [
        { id: 41, name: "Burger King", parentId: 4 },
        { id: 42, name: "Tim Hortons", parentId: 4 },
        { id: 43, name: "Popeyes", parentId: 4 },
      ],
    },
    {
      id: 5,
      name: "Subway",
      type: "single",
      subBrands: [],
    },
    {
      id: 6,
      name: "Starbucks",
      type: "single",
      subBrands: [],
    },
    {
      id: 7,
      name: "Domino's Pizza",
      type: "single",
      subBrands: [],
    },
    {
      id: 8,
      name: "Darden Restaurants",
      type: "multi",
      subBrands: [
        { id: 81, name: "Olive Garden", parentId: 8 },
        { id: 82, name: "LongHorn Steakhouse", parentId: 8 },
        { id: 83, name: "Cheddar's Scratch Kitchen", parentId: 8 },
        { id: 84, name: "The Capital Grille", parentId: 8 },
      ],
    },
  ]

  // Mock data with updated brand structure
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Metro Food Services LLC",
      email: "admin@metrofood.com",
      phone: "+1-555-0123",
      address: "123 Business St, NYC",
      trn: "TRN123456",
      selectedBrands: [
        {
          mainBrandId: 3, // Yum! Brands
          mainBrandName: "Yum! Brands",
          type: "multi",
          subBrands: [31, 32], // KFC, Pizza Hut
          subBrandNames: ["KFC", "Pizza Hut"],
        },
        {
          mainBrandId: 1, // McDonald's
          mainBrandName: "McDonald's",
          type: "single",
          subBrands: [],
          subBrandNames: [],
        },
      ],
      totalBrands: 2,
      totalInvoices: 8,
      overdue: true, // This customer has overdue invoices
    },
    {
      id: 2,
      name: "Quick Serve Holdings",
      email: "billing@quickserve.com",
      phone: "+1-555-0200",
      address: "789 Startup Blvd, SF",
      trn: "TRN789012",
      selectedBrands: [
        {
          mainBrandId: 4, // Restaurant Brands International
          mainBrandName: "Restaurant Brands International",
          type: "multi",
          subBrands: [41, 43], // Burger King, Popeyes
          subBrandNames: ["Burger King", "Popeyes"],
        },
      ],
      totalBrands: 1,
      totalInvoices: 5,
      overdue: false, // This customer has no overdue invoices
    },
    {
      id: 3,
      name: "Urban Dining Corp",
      email: "contact@urbandining.com",
      phone: "+1-555-0300",
      address: "456 Downtown Ave, Chicago",
      trn: null,
      selectedBrands: [
        {
          mainBrandId: 8, // Darden Restaurants
          mainBrandName: "Darden Restaurants",
          type: "multi",
          subBrands: [81, 82, 84], // Olive Garden, LongHorn Steakhouse, The Capital Grille
          subBrandNames: ["Olive Garden", "LongHorn Steakhouse", "The Capital Grille"],
        },
        {
          mainBrandId: 6, // Starbucks
          mainBrandName: "Starbucks",
          type: "single",
          subBrands: [],
          subBrandNames: [],
        },
      ],
      totalBrands: 2,
      totalInvoices: 12,
      overdue: false, // This customer has no overdue invoices
    },
  ])

  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      customerId: 1,
      customerName: "Metro Food Services LLC",
      brandId: 3,
      brandName: "Yum! Brands",
      subBrandId: 31,
      subBrandName: "KFC",
      phone: "+1-555-0123",
      status: "Paid",
      createdDate: "2025-01-15",
      issueDate: "2025-01-15",
      dueDate: "2025-01-25",
      voidDate: null,
      voidReason: null,
      autoGenerated: false,
      subscription: {
        plan: "Monthly Pro",
        amount: 99.99,
        startDate: "2025-01-15",
        endDate: "2025-02-15",
        autoRenewal: true,
      },
      charges: [{ description: "Monthly Pro Subscription - Restaurant Management System", amount: 99.99, tax: 9.99 }],
      total: 109.98,
      trn: "TRN123456",
    },
    {
      id: "INV-002",
      customerId: 1,
      customerName: "Metro Food Services LLC",
      brandId: 3,
      brandName: "Yum! Brands",
      subBrandId: 32,
      subBrandName: "Pizza Hut",
      phone: "+1-555-0123",
      status: "Overdue",
      createdDate: "2025-02-01",
      issueDate: "2025-02-01",
      dueDate: "2025-02-10",
      voidDate: null,
      voidReason: null,
      autoGenerated: true,
      subscription: {
        plan: "Yearly Enterprise",
        amount: 1199.99,
        startDate: "2025-02-01",
        endDate: "2026-02-01",
        autoRenewal: true,
      },
      charges: [
        { description: "Yearly Enterprise Subscription - Full Restaurant Suite", amount: 1199.99, tax: 119.99 },
      ],
      total: 1319.98,
      trn: "TRN123456",
    },
    {
      id: "INV-003",
      customerId: 2,
      customerName: "Quick Serve Holdings",
      brandId: 4,
      brandName: "Restaurant Brands International",
      subBrandId: 41,
      subBrandName: "Burger King",
      phone: "+1-555-0200",
      status: "Voided",
      createdDate: "2025-01-20",
      issueDate: "2025-01-20",
      dueDate: "2025-01-30",
      voidDate: "2025-01-25",
      voidReason: "Customer requested cancellation before service start",
      autoGenerated: false,
      subscription: {
        plan: "Monthly Basic",
        amount: 49.99,
        startDate: "2025-01-20",
        endDate: "2025-02-20",
        autoRenewal: false,
      },
      charges: [{ description: "Monthly Basic Subscription - POS System", amount: 49.99, tax: 4.99 }],
      total: 54.98,
      trn: "TRN789012",
    },
    {
      id: "INV-004",
      customerId: 1,
      customerName: "Metro Food Services LLC",
      brandId: 1,
      brandName: "McDonald's",
      subBrandId: null,
      subBrandName: null,
      phone: "+1-555-0123",
      status: "Unpaid",
      createdDate: "2025-02-05",
      issueDate: "2025-02-05",
      dueDate: "2025-02-20",
      voidDate: null,
      voidReason: null,
      autoGenerated: false,
      subscription: {
        plan: "Monthly Pro",
        amount: 99.99,
        startDate: "2025-02-05",
        endDate: "2025-03-05",
        autoRenewal: true,
      },
      charges: [{ description: "Monthly Pro Subscription - Restaurant Management System", amount: 99.99, tax: 9.99 }],
      total: 109.98,
      trn: "TRN123456",
    },
    {
      id: "INV-005",
      customerId: 3,
      customerName: "Urban Dining Corp",
      brandId: 8,
      brandName: "Darden Restaurants",
      subBrandId: 81,
      subBrandName: "Olive Garden",
      phone: "+1-555-0300",
      status: "Paid",
      createdDate: "2025-01-10",
      issueDate: "2025-01-10",
      dueDate: "2025-01-20",
      voidDate: null,
      voidReason: null,
      autoGenerated: false,
      subscription: {
        plan: "Premium Enterprise",
        amount: 299.99,
        startDate: "2025-01-10",
        endDate: "2025-02-10",
        autoRenewal: true,
      },
      charges: [{ description: "Premium Enterprise Subscription - Full Suite", amount: 299.99, tax: 29.99 }],
      total: 329.98,
      trn: null,
    },
  ])

  const [payments, setPayments] = useState([
    {
      id: 1,
      invoiceNo: "INV-001",
      customerName: "Metro Food Services LLC",
      plan: "Monthly Pro",
      gateway: "Stripe",
      transactionId: "txn_1234567890",
      amount: 109.98,
      status: "Paid",
      date: "2025-01-15",
    },
    {
      id: 2,
      invoiceNo: "INV-005",
      customerName: "Urban Dining Corp",
      plan: "Premium Enterprise",
      gateway: "PayPal",
      transactionId: "txn_0987654321",
      amount: 329.98,
      status: "Paid",
      date: "2025-01-10",
    },
  ])

  // Helper functions
  const calculateDaysOverdue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = today - due
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const isOverdue = (invoice) => {
    if (invoice.status === "Paid" || invoice.status === "Voided") return false
    const today = new Date()
    const dueDate = new Date(invoice.dueDate)
    return today > dueDate
  }

  const updateInvoiceStatuses = () => {
    const updatedInvoices = invoices.map((invoice) => {
      if (isOverdue(invoice) && invoice.status === "Unpaid") {
        return { ...invoice, status: "Overdue" }
      }
      return invoice
    })
    setInvoices(updatedInvoices)
  }

  // Helper function to check if customer has overdue invoices
  const hasOverdueInvoices = (customerId) => {
    const customerInvoices = invoices.filter((inv) => inv.customerId === customerId)
    return customerInvoices.some((invoice) => isOverdue(invoice))
  }

  // Update invoice statuses only when needed
  useEffect(() => {
    const updatedInvoices = invoices.map((invoice) => {
      if (isOverdue(invoice) && invoice.status === "Unpaid") {
        return { ...invoice, status: "Overdue" }
      }
      return invoice
    })

    // Only update if there are actual changes
    const hasChanges = updatedInvoices.some((invoice, index) => invoice.status !== invoices[index].status)

    if (hasChanges) {
      setInvoices(updatedInvoices)
    }
  }, []) // Run only once on mount

  // Update customer overdue status when invoices change
  useEffect(() => {
    const updatedCustomers = customers.map((customer) => {
      const newOverdueStatus = hasOverdueInvoices(customer.id)
      if (customer.overdue !== newOverdueStatus) {
        return { ...customer, overdue: newOverdueStatus }
      }
      return customer
    })

    // Only update if there are actual changes
    const hasChanges = updatedCustomers.some((customer, index) => customer.overdue !== customers[index].overdue)

    if (hasChanges) {
      setCustomers(updatedCustomers)
    }
  }, [invoices, customers]) // Depend on both invoices and customers

  const voidInvoice = (invoiceId, reason) => {
    const updatedInvoices = invoices.map((invoice) => {
      if (invoice.id === invoiceId) {
        return {
          ...invoice,
          status: "Voided",
          voidDate: new Date().toISOString().split("T")[0],
          voidReason: reason,
        }
      }
      return invoice
    })
    setInvoices(updatedInvoices)
    setShowVoidModal(false)
    setVoidInvoiceId(null)
  }

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      Paid: "bg-green-100 text-green-800",
      Unpaid: "bg-yellow-100 text-yellow-800",
      Overdue: "bg-red-100 text-red-800",
      Failed: "bg-gray-100 text-gray-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Voided: "bg-red-100 text-red-800 border border-red-200",
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.Pending}`}>
        {status === "Voided" && <X size={12} className="inline mr-1" />}
        {status}
      </span>
    )
  }

  // Auto badge component
  const AutoBadge = () => (
    <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
      <Zap size={12} className="mr-1" />
      Auto
    </span>
  )

  // Create Customer Modal with Brand Selection
  const CreateCustomerModal = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      trn: "",
      selectedBrands: [],
    })

    const [selectedMainBrand, setSelectedMainBrand] = useState("")
    const [selectedSubBrands, setSelectedSubBrands] = useState([])

    const addBrandToCustomer = () => {
      if (!selectedMainBrand) return

      const mainBrand = availableBrands.find((b) => b.id === Number.parseInt(selectedMainBrand))
      if (!mainBrand) return

      // Check if brand already exists
      const existingBrand = formData.selectedBrands.find((b) => b.mainBrandId === mainBrand.id)
      if (existingBrand) return

      const newBrand = {
        mainBrandId: mainBrand.id,
        mainBrandName: mainBrand.name,
        type: mainBrand.type,
        subBrands: mainBrand.type === "multi" ? selectedSubBrands : [],
        subBrandNames:
          mainBrand.type === "multi"
            ? selectedSubBrands.map((id) => mainBrand.subBrands.find((sb) => sb.id === id)?.name || "")
            : [],
      }

      setFormData({
        ...formData,
        selectedBrands: [...formData.selectedBrands, newBrand],
      })

      // Reset selections
      setSelectedMainBrand("")
      setSelectedSubBrands([])
    }

    const removeBrandFromCustomer = (mainBrandId) => {
      setFormData({
        ...formData,
        selectedBrands: formData.selectedBrands.filter((b) => b.mainBrandId !== mainBrandId),
      })
    }

    const handleSubBrandChange = (subBrandId, checked) => {
      if (checked) {
        setSelectedSubBrands([...selectedSubBrands, subBrandId])
      } else {
        setSelectedSubBrands(selectedSubBrands.filter((id) => id !== subBrandId))
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const newCustomer = {
        id: customers.length + 1,
        ...formData,
        totalBrands: formData.selectedBrands.length,
        totalInvoices: 0,
        overdue: false, // New customers start with no overdue invoices
      }
      setCustomers([...customers, newCustomer])
      setShowCreateCustomer(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        trn: "",
        selectedBrands: [],
      })
      setSelectedMainBrand("")
      setSelectedSubBrands([])
    }

    if (!showCreateCustomer) return null

    const selectedMainBrandData = availableBrands.find((b) => b.id === Number.parseInt(selectedMainBrand))

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Create New Restaurant Customer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Metro Food Services LLC"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">TRN (Optional)</label>
                <input
                  type="text"
                  value={formData.trn}
                  onChange={(e) => setFormData({ ...formData, trn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>

            {/* Brand Selection Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Brand Selection</h3>

              <div className="grid grid-cols-2 gap-6">
                {/* Left Side - Main Brand Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Select Main Brand</label>
                  <select
                    value={selectedMainBrand}
                    onChange={(e) => {
                      setSelectedMainBrand(e.target.value)
                      setSelectedSubBrands([])
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a brand...</option>
                    {availableBrands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name} {brand.type === "multi" ? "(Multi-Brand)" : "(Single Brand)"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Right Side - Sub Brand Selection (only for multi-brand) */}
                <div>
                  {selectedMainBrandData && selectedMainBrandData.type === "multi" && (
                    <>
                      <label className="block text-sm font-medium mb-2">
                        Select Sub-Brands for {selectedMainBrandData.name}
                      </label>
                      <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                        {selectedMainBrandData.subBrands.map((subBrand) => (
                          <div key={subBrand.id} className="flex items-center space-x-2 mb-2">
                            <input
                              type="checkbox"
                              id={`sub-${subBrand.id}`}
                              checked={selectedSubBrands.includes(subBrand.id)}
                              onChange={(e) => handleSubBrandChange(subBrand.id, e.target.checked)}
                              className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor={`sub-${subBrand.id}`} className="text-sm">
                              {subBrand.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {selectedMainBrandData && selectedMainBrandData.type === "single" && (
                    <div className="text-sm text-gray-600 mt-8">This is a single brand. No sub-brands to select.</div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={addBrandToCustomer}
                  disabled={
                    !selectedMainBrand || (selectedMainBrandData?.type === "multi" && selectedSubBrands.length === 0)
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add Brand to Customer
                </button>
              </div>

              {/* Selected Brands Display */}
              {formData.selectedBrands.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-medium mb-3">Selected Brands ({formData.selectedBrands.length})</h4>
                  <div className="space-y-3">
                    {formData.selectedBrands.map((brand, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-blue-600">{brand.mainBrandName}</div>
                            <div className="text-sm text-gray-600">
                              Type: {brand.type === "multi" ? "Multi-Brand" : "Single Brand"}
                            </div>
                            {brand.type === "multi" && brand.subBrandNames.length > 0 && (
                              <div className="text-sm text-gray-700 mt-1">
                                Sub-brands: {brand.subBrandNames.join(", ")}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeBrandFromCustomer(brand.mainBrandId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={formData.selectedBrands.length === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Customer
              </button>
              <button
                type="button"
                onClick={() => setShowCreateCustomer(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Create Invoice Modal
  const CreateInvoiceModal = () => {
    const [formData, setFormData] = useState({
      customerId: selectedCustomer?.id || "",
      brandId: "",
      subBrandId: "",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      plan: "Monthly",
      customPlan: "",
      customAmount: "",
      amount: 99.99,
      tax: 9.99,
      autoRenewal: true,
    })

    const selectedCustomerData = customers.find((c) => c.id === Number.parseInt(formData.customerId))
    const selectedBrandData = selectedCustomerData?.selectedBrands.find(
      (b) => b.mainBrandId === Number.parseInt(formData.brandId),
    )

    const planOptions = {
      Monthly: 99.99,
      Quarterly: 249.99,
      Yearly: 899.99,
      Custom: 0,
    }

    const handlePlanChange = (plan) => {
      setFormData({
        ...formData,
        plan,
        amount: plan === "Custom" ? Number.parseFloat(formData.customAmount) || 0 : planOptions[plan],
        tax: plan === "Custom" ? (Number.parseFloat(formData.customAmount) || 0) * 0.1 : planOptions[plan] * 0.1,
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const customer = customers.find((c) => c.id === Number.parseInt(formData.customerId))
      const brand = customer?.selectedBrands.find((b) => b.mainBrandId === Number.parseInt(formData.brandId))

      let subBrandName = null
      if (brand?.type === "multi" && formData.subBrandId) {
        const subBrand = availableBrands
          .find((b) => b.id === brand.mainBrandId)
          ?.subBrands.find((sb) => sb.id === Number.parseInt(formData.subBrandId))
        subBrandName = subBrand?.name || null
      }

      const newInvoice = {
        id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
        customerId: Number.parseInt(formData.customerId),
        customerName: customer?.name,
        brandId: Number.parseInt(formData.brandId),
        brandName: brand?.mainBrandName,
        subBrandId: formData.subBrandId ? Number.parseInt(formData.subBrandId) : null,
        subBrandName: subBrandName,
        phone: customer?.phone,
        status: "Unpaid",
        createdDate: new Date().toISOString().split("T")[0],
        issueDate: formData.issueDate,
        dueDate: formData.dueDate,
        voidDate: null,
        voidReason: null,
        autoGenerated: false,
        subscription: {
          plan: formData.plan === "Custom" ? formData.customPlan : formData.plan,
          amount: formData.amount,
          startDate: formData.issueDate,
          endDate: new Date(
            new Date(formData.issueDate).getTime() +
              (formData.plan === "Monthly" ? 30 : formData.plan === "Quarterly" ? 90 : 365) * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split("T")[0],
          autoRenewal: formData.autoRenewal,
        },
        charges: [
          {
            description: `${formData.plan === "Custom" ? formData.customPlan : formData.plan} Subscription - Restaurant Management System`,
            amount: formData.amount,
            tax: formData.tax,
          },
        ],
        total: formData.amount + formData.tax,
        trn: customer?.trn,
      }

      setInvoices([...invoices, newInvoice])
      setShowCreateInvoice(false)
      setFormData({
        customerId: selectedCustomer?.id || "",
        brandId: "",
        subBrandId: "",
        issueDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        plan: "Monthly",
        customPlan: "",
        customAmount: "",
        amount: 99.99,
        tax: 9.99,
        autoRenewal: true,
      })
    }

    if (!showCreateInvoice) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Create New Invoice</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Customer</label>
              <select
                required
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value, brandId: "", subBrandId: "" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCustomerData && (
              <div>
                <label className="block text-sm font-medium mb-1">Main Brand</label>
                <select
                  required
                  value={formData.brandId}
                  onChange={(e) => setFormData({ ...formData, brandId: e.target.value, subBrandId: "" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Main Brand</option>
                  {selectedCustomerData.selectedBrands.map((brand) => (
                    <option key={brand.mainBrandId} value={brand.mainBrandId}>
                      {brand.mainBrandName} ({brand.type === "multi" ? "Multi-Brand" : "Single Brand"})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedBrandData && selectedBrandData.type === "multi" && (
              <div>
                <label className="block text-sm font-medium mb-1">Sub Brand</label>
                <select
                  required
                  value={formData.subBrandId}
                  onChange={(e) => setFormData({ ...formData, subBrandId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Sub Brand</option>
                  {selectedBrandData.subBrands.map((subBrandId) => {
                    const subBrandName =
                      selectedBrandData.subBrandNames[selectedBrandData.subBrands.indexOf(subBrandId)]
                    return (
                      <option key={subBrandId} value={subBrandId}>
                        {subBrandName}
                      </option>
                    )
                  })}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Issue Date</label>
                <input
                  type="date"
                  required
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subscription Plan</label>
              <select
                required
                value={formData.plan}
                onChange={(e) => handlePlanChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Monthly">Monthly Pro - $99.99</option>
                <option value="Quarterly">Quarterly Pro - $249.99</option>
                <option value="Yearly">Yearly Enterprise - $899.99</option>
                <option value="Custom">Custom Plan</option>
              </select>
            </div>

            {formData.plan === "Custom" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Custom Plan Name</label>
                  <input
                    type="text"
                    required
                    value={formData.customPlan}
                    onChange={(e) => setFormData({ ...formData, customPlan: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Custom Enterprise Plan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Custom Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.customAmount}
                    onChange={(e) => {
                      const amount = Number.parseFloat(e.target.value) || 0
                      setFormData({
                        ...formData,
                        customAmount: e.target.value,
                        amount: amount,
                        tax: amount * 0.1,
                      })
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  readOnly
                  value={formData.amount}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tax/VAT (10%)</label>
                <input
                  type="number"
                  step="0.01"
                  readOnly
                  value={formData.tax.toFixed(2)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Total</label>
              <input
                type="number"
                step="0.01"
                readOnly
                value={(formData.amount + formData.tax).toFixed(2)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-medium"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoRenewal"
                checked={formData.autoRenewal}
                onChange={(e) => setFormData({ ...formData, autoRenewal: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="autoRenewal" className="text-sm">
                Enable auto-renewal for future invoices
              </label>
            </div>

            <div className="flex space-x-4 pt-4">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Create Invoice
              </button>
              <button
                type="button"
                onClick={() => setShowCreateInvoice(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Create Payment Modal
  const CreatePaymentModal = () => {
    const [formData, setFormData] = useState({
      invoiceNo: "",
      amount: "",
      gateway: "Stripe",
      transactionId: "",
      status: "Paid",
      date: new Date().toISOString().split("T")[0],
    })

    const selectedInvoiceData = invoices.find((inv) => inv.id === formData.invoiceNo)

    const handleSubmit = (e) => {
      e.preventDefault()
      const newPayment = {
        id: payments.length + 1,
        invoiceNo: formData.invoiceNo,
        customerName: selectedInvoiceData?.customerName,
        plan: selectedInvoiceData?.subscription.plan,
        gateway: formData.gateway,
        transactionId: formData.transactionId,
        amount: Number.parseFloat(formData.amount),
        status: formData.status,
        date: formData.date,
      }

      setPayments([...payments, newPayment])

      // Update invoice status to Paid if payment is successful
      if (formData.status === "Paid") {
        const updatedInvoices = invoices.map((inv) =>
          inv.id === formData.invoiceNo ? { ...inv, status: "Paid" } : inv,
        )
        setInvoices(updatedInvoices)
      }

      setShowCreatePayment(false)
      setFormData({
        invoiceNo: "",
        amount: "",
        gateway: "Stripe",
        transactionId: "",
        status: "Paid",
        date: new Date().toISOString().split("T")[0],
      })
    }

    if (!showCreatePayment) return null

    // Filter out voided invoices from payment options
    const availableInvoices = invoices.filter((inv) => inv.status !== "Voided")

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Add Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Invoice Number</label>
              <select
                required
                value={formData.invoiceNo}
                onChange={(e) => {
                  const invoice = invoices.find((inv) => inv.id === e.target.value)
                  setFormData({
                    ...formData,
                    invoiceNo: e.target.value,
                    amount: invoice ? invoice.total.toString() : "",
                  })
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Invoice</option>
                {availableInvoices.map((invoice) => (
                  <option key={invoice.id} value={invoice.id}>
                    {invoice.id} - {invoice.customerName} (${invoice.total.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            {selectedInvoiceData && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm space-y-1">
                  <div>
                    <strong>Customer:</strong> {selectedInvoiceData.customerName}
                  </div>
                  <div>
                    <strong>Plan:</strong> {selectedInvoiceData.subscription.plan}
                  </div>
                  <div>
                    <strong>Amount:</strong> ${selectedInvoiceData.total.toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Payment Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Gateway</label>
                <select
                  required
                  value={formData.gateway}
                  onChange={(e) => setFormData({ ...formData, gateway: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Stripe">Stripe</option>
                  <option value="Razorpay">Razorpay</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Transaction ID</label>
              <input
                type="text"
                required
                value={formData.transactionId}
                onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="txn_1234567890"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Add Payment
              </button>
              <button
                type="button"
                onClick={() => setShowCreatePayment(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Void Invoice Modal
  const VoidInvoiceModal = () => {
    const [voidReason, setVoidReason] = useState("")
    const [selectedReason, setSelectedReason] = useState("")

    const predefinedReasons = [
      "Customer requested cancellation",
      "Duplicate invoice",
      "Service not delivered",
      "Billing error",
      "Customer dispute",
      "Other",
    ]

    const handleVoid = (e) => {
      e.preventDefault()
      const finalReason = selectedReason === "Other" ? voidReason : selectedReason
      if (finalReason.trim()) {
        voidInvoice(voidInvoiceId, finalReason)
        setVoidReason("")
        setSelectedReason("")
      }
    }

    if (!showVoidModal) return null

    const invoice = invoices.find((inv) => inv.id === voidInvoiceId)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="text-red-500" size={24} />
            <h2 className="text-xl font-bold text-red-600">Void Invoice</h2>
          </div>

          {invoice && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="text-sm space-y-1">
                <div>
                  <strong>Invoice:</strong> {invoice.id}
                </div>
                <div>
                  <strong>Customer:</strong> {invoice.customerName}
                </div>
                <div>
                  <strong>Amount:</strong> ${invoice.total.toFixed(2)}
                </div>
                <div>
                  <strong>Status:</strong> {invoice.status}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleVoid} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Reason for voiding</label>
              <select
                required
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select a reason</option>
                {predefinedReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {selectedReason === "Other" && (
              <div>
                <label className="block text-sm font-medium mb-1">Custom reason</label>
                <textarea
                  required
                  value={voidReason}
                  onChange={(e) => setVoidReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                  placeholder="Please specify the reason for voiding this invoice..."
                />
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="text-yellow-600 mt-0.5" size={16} />
                <div className="text-sm text-yellow-800">
                  <strong>Warning:</strong> Voiding this invoice cannot be undone. The invoice will be marked as voided
                  and removed from active billing.
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Void Invoice
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowVoidModal(false)
                  setVoidInvoiceId(null)
                  setVoidReason("")
                  setSelectedReason("")
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Sidebar component
  const Sidebar = () => (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">RestaurantFlow</h1>
        <p className="text-slate-400 text-sm">Billing Admin</p>
      </div>

      <nav className="p-4 space-y-2">
        {[
          { id: "customers", icon: Users, label: "Customers" },
          { id: "invoices", icon: FileText, label: "Invoices" },
          { id: "payments", icon: CreditCard, label: "Payments" },
          { id: "settings", icon: Settings, label: "Settings" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id)
              setSelectedCustomer(null)
              setSelectedInvoice(null)
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id ? "bg-blue-600" : "hover:bg-slate-800"
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )

  // Header component
  const Header = () => (
    <div className="ml-64 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="text-gray-400 hover:text-gray-600 cursor-pointer" size={20} />
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="text-white" size={16} />
        </div>
      </div>
    </div>
  )

  // Customers View
  const CustomersView = () => {
    if (selectedCustomer) {
      const customerInvoices = invoices.filter((inv) => inv.customerId === selectedCustomer.id)

      return (
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <button onClick={() => setSelectedCustomer(null)} className="text-blue-500 hover:text-blue-700">
              Customers
            </button>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-medium">{selectedCustomer.name}</span>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Customer Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-400" />
                    <span>{selectedCustomer.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-400" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{selectedCustomer.address}</span>
                  </div>
                  {selectedCustomer.trn && (
                    <div className="text-sm text-gray-600">
                      <strong>TRN:</strong> {selectedCustomer.trn}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Selected Brands ({selectedCustomer.selectedBrands.length})</h3>
                  <button
                    onClick={() => setShowCreateInvoice(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Create Invoice
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedCustomer.selectedBrands.map((brand, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="font-medium text-blue-600">{brand.mainBrandName}</div>
                      <div className="text-sm text-gray-600">
                        Type: {brand.type === "multi" ? "Multi-Brand" : "Single Brand"}
                      </div>
                      {brand.type === "multi" && brand.subBrandNames.length > 0 && (
                        <div className="text-sm text-gray-700 mt-1">Sub-brands: {brand.subBrandNames.join(", ")}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium">Customer Invoices ({customerInvoices.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{invoice.id}</span>
                          {invoice.autoGenerated && <AutoBadge />}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium">{invoice.brandName}</div>
                          {invoice.subBrandName && <div className="text-sm text-gray-500">{invoice.subBrandName}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">${invoice.total.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{invoice.createdDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Eye size={16} />
                          </button>
                          {invoice.status !== "Voided" && invoice.status !== "Paid" && (
                            <button
                              onClick={() => {
                                setVoidInvoiceId(invoice.id)
                                setShowVoidModal(true)
                              }}
                              className="text-red-500 hover:text-red-700"
                              title="Void Invoice"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }

    const filteredCustomers = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Restaurant Customers</h2>
          <button
            onClick={() => setShowCreateCustomer(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Customer</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brands
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoices
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overdue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{customer.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{customer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {customer.totalBrands} brands
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {customer.totalInvoices} invoices
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.overdue ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertTriangle size={12} className="mr-1" />
                          Overdue
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Current
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Invoice Detail View
  const InvoiceDetailView = () => {
    if (!selectedInvoice) return null

    const customer = customers.find((c) => c.id === selectedInvoice.customerId)

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button onClick={() => setSelectedInvoice(null)} className="text-blue-500 hover:text-blue-700">
              Invoices
            </button>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-medium">{selectedInvoice.id}</span>
          </div>

          <div className="flex items-center space-x-2">
            {selectedInvoice.status !== "Voided" && selectedInvoice.status !== "Paid" && (
              <button
                onClick={() => {
                  setVoidInvoiceId(selectedInvoice.id)
                  setShowVoidModal(true)
                }}
                className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center space-x-1"
              >
                <X size={16} />
                <span>Void</span>
              </button>
            )}
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-1">
              <Edit size={16} />
              <span>Edit</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-1">
              <Download size={16} />
              <span>PDF</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-1">
              <Mail size={16} />
              <span>Email</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-1">
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Void Notice */}
          {selectedInvoice.status === "Voided" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <X className="text-red-500 mt-0.5" size={20} />
                <div>
                  <div className="font-medium text-red-800">This invoice has been voided</div>
                  <div className="text-sm text-red-600 mt-1">Voided on: {selectedInvoice.voidDate}</div>
                  <div className="text-sm text-red-600">Reason: {selectedInvoice.voidReason}</div>
                </div>
              </div>
            </div>
          )}

          {/* Invoice Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="text-lg font-medium">{selectedInvoice.id}</span>
                  {selectedInvoice.autoGenerated && <AutoBadge />}
                  <StatusBadge status={selectedInvoice.status} />
                  {isOverdue(selectedInvoice) &&
                    selectedInvoice.status !== "Paid" &&
                    selectedInvoice.status !== "Voided" && (
                      <span className="inline-flex items-center px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-bold">
                        {calculateDaysOverdue(selectedInvoice.dueDate)} days overdue
                      </span>
                    )}
                </div>
                <div className="mt-2 text-gray-600 space-y-1">
                  <div>Issue Date: {selectedInvoice.issueDate}</div>
                  <div
                    className={
                      isOverdue(selectedInvoice) &&
                      selectedInvoice.status !== "Paid" &&
                      selectedInvoice.status !== "Voided"
                        ? "text-red-600 font-medium"
                        : ""
                    }
                  >
                    Due Date: {selectedInvoice.dueDate}
                  </div>
                  <div>Created: {selectedInvoice.createdDate}</div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-2xl font-bold ${selectedInvoice.status === "Voided" ? "text-red-500 line-through" : "text-gray-900"}`}
                >
                  ${selectedInvoice.total.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">{selectedInvoice.subscription.plan}</div>
                {isOverdue(selectedInvoice) &&
                  selectedInvoice.status !== "Paid" &&
                  selectedInvoice.status !== "Voided" && (
                    <div className="text-sm text-red-600 font-medium mt-1">Payment Overdue</div>
                  )}
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Bill To</h3>
              <div className="space-y-1">
                <div className="font-medium">{customer?.name}</div>
                <div className="text-gray-600">{selectedInvoice.brandName}</div>
                {selectedInvoice.subBrandName && <div className="text-gray-600">{selectedInvoice.subBrandName}</div>}
                <div className="text-gray-600">{customer?.email}</div>
                <div className="text-gray-600">{customer?.phone}</div>
                <div className="text-gray-600">{customer?.address}</div>
                {selectedInvoice.trn && <div className="text-gray-600">TRN: {selectedInvoice.trn}</div>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Subscription Details</h3>
              <div className="space-y-1 text-gray-600">
                <div>Plan: {selectedInvoice.subscription.plan}</div>
                <div>
                  Period: {selectedInvoice.subscription.startDate} to {selectedInvoice.subscription.endDate}
                </div>
                <div className="flex items-center space-x-2">
                  <span>Auto-renewal:</span>
                  {selectedInvoice.subscription.autoRenewal ? (
                    <span className="text-green-600 font-medium">✅ Enabled</span>
                  ) : (
                    <span className="text-red-600 font-medium">❌ Disabled</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Charges Table */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Charges</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tax
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedInvoice.charges.map((charge, index) => (
                    <tr key={index} className={selectedInvoice.status === "Voided" ? "opacity-50" : ""}>
                      <td className="px-6 py-4">{charge.description}</td>
                      <td
                        className={`px-6 py-4 text-right ${selectedInvoice.status === "Voided" ? "line-through" : ""}`}
                      >
                        ${charge.amount.toFixed(2)}
                      </td>
                      <td
                        className={`px-6 py-4 text-right ${selectedInvoice.status === "Voided" ? "line-through" : ""}`}
                      >
                        ${charge.tax.toFixed(2)}
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-medium ${selectedInvoice.status === "Voided" ? "line-through" : ""}`}
                      >
                        ${(charge.amount + charge.tax).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right font-medium">
                      Total Amount:
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-bold text-lg ${selectedInvoice.status === "Voided" ? "line-through text-red-500" : ""}`}
                    >
                      ${selectedInvoice.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment History */}
          <div>
            <h3 className="text-lg font-medium mb-4">Payment History</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gateway
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {payments
                    .filter((payment) => payment.invoiceNo === selectedInvoice.id)
                    .map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4">{payment.date}</td>
                        <td className="px-6 py-4">{payment.gateway}</td>
                        <td className="px-6 py-4 font-mono text-sm">{payment.transactionId}</td>
                        <td className="px-6 py-4 text-right font-medium">${payment.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={payment.status} />
                        </td>
                      </tr>
                    ))}
                  {payments.filter((payment) => payment.invoiceNo === selectedInvoice.id).length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        {selectedInvoice.status === "Voided"
                          ? "No payments recorded (invoice voided)"
                          : "No payments recorded for this invoice"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Invoices View
  const InvoicesView = () => {
    if (selectedInvoice) {
      return <InvoiceDetailView />
    }

    const filteredInvoices = invoices.filter(
      (invoice) =>
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.brandName.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Invoices</h2>
          <button
            onClick={() => setShowCreateInvoice(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Create Invoice</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => {
                  const daysOverdue = calculateDaysOverdue(invoice.dueDate)
                  const isInvoiceOverdue = isOverdue(invoice)

                  return (
                    <tr
                      key={invoice.id}
                      className={`hover:bg-gray-50 ${invoice.status === "Voided" ? "opacity-75" : ""} ${isInvoiceOverdue ? "bg-red-50" : ""}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{invoice.id}</span>
                          {invoice.autoGenerated && <AutoBadge />}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{invoice.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium">{invoice.brandName}</div>
                          {invoice.subBrandName && <div className="text-sm text-gray-500">{invoice.subBrandName}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <StatusBadge status={invoice.status} />
                          {isInvoiceOverdue && invoice.status !== "Paid" && invoice.status !== "Voided" && (
                            <span className="text-xs text-red-600 font-medium">({daysOverdue} days overdue)</span>
                          )}
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap font-medium ${invoice.status === "Voided" ? "line-through text-red-500" : ""}`}
                      >
                        ${invoice.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{invoice.issueDate}</td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${isInvoiceOverdue && invoice.status !== "Paid" && invoice.status !== "Voided" ? "text-red-600 font-medium" : "text-gray-500"}`}
                      >
                        {invoice.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Eye size={16} />
                          </button>
                          {invoice.status !== "Voided" && invoice.status !== "Paid" && (
                            <button
                              onClick={() => {
                                setVoidInvoiceId(invoice.id)
                                setShowVoidModal(true)
                              }}
                              className="text-red-500 hover:text-red-700"
                              title="Void Invoice"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Payments View with Tabs
  const PaymentsView = () => {
    const overdueInvoices = invoices.filter(
      (invoice) => isOverdue(invoice) && invoice.status !== "Paid" && invoice.status !== "Voided",
    )

    const filteredPayments = payments.filter(
      (payment) =>
        payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Payments</h2>
          <button
            onClick={() => setShowCreatePayment(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Payment</span>
          </button>
        </div>

        {/* Payment Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setPaymentTab("all")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  paymentTab === "all"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Payments ({filteredPayments.length})
              </button>
              <button
                onClick={() => setPaymentTab("overdue")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  paymentTab === "overdue"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overdue Payments ({overdueInvoices.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Overdue Payments Tab */}
        {paymentTab === "overdue" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-red-50">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-600" size={20} />
                <h3 className="text-lg font-medium text-red-800">Overdue Payments ({overdueInvoices.length})</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Invoice No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Days Overdue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-red-200">
                  {overdueInvoices.map((invoice) => {
                    const daysOverdue = calculateDaysOverdue(invoice.dueDate)
                    return (
                      <tr key={invoice.id} className="hover:bg-red-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-red-900">{invoice.id}</span>
                            {invoice.autoGenerated && <AutoBadge />}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-red-900">{invoice.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-800">
                          <div>
                            <div className="font-medium">{invoice.brandName}</div>
                            {invoice.subBrandName && <div className="text-sm">{invoice.subBrandName}</div>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-red-900">
                          ${invoice.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-800">{invoice.dueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-bold">
                            {daysOverdue} days overdue
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedInvoice(invoice)}
                              className="text-red-600 hover:text-red-800"
                              title="View Invoice"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => setShowCreatePayment(true)}
                              className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                            >
                              Pay Now
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  {overdueInvoices.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        No overdue payments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* All Payments Tab */}
        {paymentTab === "all" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Payment History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gateway
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{payment.invoiceNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.plan}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.gateway}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm">{payment.transactionId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{payment.date}</td>
                    </tr>
                  ))}
                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                        No payments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Settings View
  const SettingsView = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-4">Auto-Invoice Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable Auto-Invoice Generation</div>
              <div className="text-sm text-gray-600">
                Automatically generate invoices when restaurant subscriptions expire
              </div>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-Email Invoices</div>
              <div className="text-sm text-gray-600">Send invoices via email automatically to restaurant owners</div>
            </div>
            <input type="checkbox" className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-WhatsApp Notifications</div>
              <div className="text-sm text-gray-600">Send invoice notifications via WhatsApp</div>
            </div>
            <input type="checkbox" className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Default Tax Rate</div>
              <div className="text-sm text-gray-600">Default tax/VAT rate for new invoices</div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="number" defaultValue="10" className="w-20 px-2 py-1 border border-gray-300 rounded" />
              <span className="text-sm text-gray-600">%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Invoice Void Period</div>
              <div className="text-sm text-gray-600">Days after creation when invoices can be voided</div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="number" defaultValue="30" className="w-20 px-2 py-1 border border-gray-300 rounded" />
              <span className="text-sm text-gray-600">days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <div className="ml-64 p-6">
        {activeTab === "customers" && <CustomersView />}
        {activeTab === "invoices" && <InvoicesView />}
        {activeTab === "payments" && <PaymentsView />}
        {activeTab === "settings" && <SettingsView />}
      </div>

      {/* Modals */}
      <CreateCustomerModal />
      <CreateInvoiceModal />
      <CreatePaymentModal />
      <VoidInvoiceModal />
    </div>
  )
}

export default SaaSBillingPanel
