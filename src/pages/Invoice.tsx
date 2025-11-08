import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/data/products";
import { Plus, Trash2, FileDown, X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export default function Invoice() {
  const [invoiceNumber, setInvoiceNumber] = useState(
    `INV-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 10000)
    ).padStart(4, "0")}`
  );
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );

  // Sender address (Utech Life)
  const [senderAddress, setSenderAddress] = useState({
    company: "Utech Life",
    address: "Noida, India",
    phone: "+91-9810756453",
    email: "sales@utechlife.com",
  });

  // Biller address
  const [billerAddress, setBillerAddress] = useState({
    name: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    email: "",
  });

  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [shippingHandling, setShippingHandling] = useState<number>(0);
  const [digitalSignature, setDigitalSignature] = useState("");
  const [notes, setNotes] = useState("");

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  const total = useMemo(() => {
    return subtotal + shippingHandling;
  }, [subtotal, shippingHandling]);

  const handleAddProduct = () => {
    if (!selectedProductId) return;

    const product = products.find(
      (p: { id: string }) => p.id === selectedProductId
    );
    if (!product) return;

    // Check if product already exists in items
    const existingItem = items.find((item) => item.id === selectedProductId);
    if (existingItem) {
      // Update quantity instead of adding duplicate
      setItems(
        items.map((item) =>
          item.id === selectedProductId
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price,
              }
            : item
        )
      );
    } else {
      // Add new item
      setItems([
        ...items,
        {
          id: product.id,
          name: product.name,
          quantity: 1,
          price: 0,
          total: 0,
        },
      ]);
    }
    setSelectedProductId("");
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (
    id: string,
    field: "quantity" | "price",
    value: number
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            [field]: value,
            total:
              field === "quantity" ? value * item.price : item.quantity * value,
          };
          if (field === "price") {
            updatedItem.price = value;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", pageWidth / 2, 30, { align: "center" });

    // Invoice details (top right)
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    let yPos = 45;
    doc.text(`Invoice #: ${invoiceNumber}`, pageWidth - margin, yPos, {
      align: "right",
    });
    yPos += 7;
    doc.text(
      `Date: ${new Date(invoiceDate).toLocaleDateString()}`,
      pageWidth - margin,
      yPos,
      {
        align: "right",
      }
    );
    yPos += 7;
    doc.text(
      `Due Date: ${new Date(dueDate).toLocaleDateString()}`,
      pageWidth - margin,
      yPos,
      { align: "right" }
    );

    // Sender address (top left)
    yPos = 45;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("From:", margin, yPos);
    yPos += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(senderAddress.company, margin, yPos);
    yPos += 6;
    doc.text(senderAddress.address, margin, yPos);
    yPos += 6;
    doc.text(`Phone: ${senderAddress.phone}`, margin, yPos);
    yPos += 6;
    doc.text(`Email: ${senderAddress.email}`, margin, yPos);

    // Biller address
    yPos = 45;
    const billerStartX = pageWidth / 2 + 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Bill To:", billerStartX, yPos);
    yPos += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    if (billerAddress.company) {
      doc.text(billerAddress.company, billerStartX, yPos);
      yPos += 6;
    }
    if (billerAddress.name) {
      doc.text(billerAddress.name, billerStartX, yPos);
      yPos += 6;
    }
    if (billerAddress.address) {
      doc.text(billerAddress.address, billerStartX, yPos);
      yPos += 6;
    }
    const cityStateZip = [
      billerAddress.city,
      billerAddress.state,
      billerAddress.zip,
    ]
      .filter(Boolean)
      .join(", ");
    if (cityStateZip) {
      doc.text(cityStateZip, billerStartX, yPos);
      yPos += 6;
    }
    if (billerAddress.country) {
      doc.text(billerAddress.country, billerStartX, yPos);
      yPos += 6;
    }
    if (billerAddress.phone) {
      doc.text(`Phone: ${billerAddress.phone}`, billerStartX, yPos);
      yPos += 6;
    }
    if (billerAddress.email) {
      doc.text(`Email: ${billerAddress.email}`, billerStartX, yPos);
    }

    // Items table
    const tableStartY = Math.max(90, yPos + 15);

    autoTable(doc, {
      startY: tableStartY,
      head: [["#", "Description", "Quantity", "Unit Price", "Total"]],
      body: items.map((item, index) => [
        index + 1,
        item.name,
        item.quantity.toString(),
        `₹${item.price.toLocaleString()}`,
        `₹${item.total.toLocaleString()}`,
      ]),
      theme: "striped",
      headStyles: { fillColor: [66, 139, 202] },
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: "auto" },
        2: { cellWidth: 30, halign: "center" },
        3: { cellWidth: 40, halign: "right" },
        4: { cellWidth: 40, halign: "right" },
      },
      margin: { left: margin, right: margin },
    });

    // Get the final Y position after the table
    const finalY =
      (doc as any).lastAutoTable?.finalY ||
      tableStartY + items.length * 10 + 20;

    // Totals section
    let totalY = finalY + 10;
    const totalX = pageWidth - margin - 60;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Subtotal:", totalX, totalY, { align: "right" });
    doc.text(`₹${subtotal.toLocaleString()}`, pageWidth - margin, totalY, {
      align: "right",
    });

    totalY += 7;
    doc.text("Shipping & Handling:", totalX, totalY, { align: "right" });
    doc.text(
      `₹${shippingHandling.toLocaleString()}`,
      pageWidth - margin,
      totalY,
      {
        align: "right",
      }
    );

    totalY += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total:", totalX, totalY, { align: "right" });
    doc.text(`₹${total.toLocaleString()}`, pageWidth - margin, totalY, {
      align: "right",
    });

    // Notes
    if (notes) {
      totalY += 15;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Notes:", margin, totalY);
      totalY += 7;
      doc.setFont("helvetica", "normal");
      const splitNotes = doc.splitTextToSize(notes, contentWidth);
      doc.text(splitNotes, margin, totalY);
      totalY += splitNotes.length * 5;
    }

    // Digital signature
    if (digitalSignature) {
      totalY += 15;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Digital Signature:", margin, totalY);
      totalY += 7;
      doc.setFont("helvetica", "normal");
      doc.text(digitalSignature, margin, totalY);
      totalY += 10;
      doc.line(margin, totalY, margin + 80, totalY);
    }

    // Copyright footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text(
      `© ${new Date().getFullYear()} Utech Life. All rights reserved.`,
      pageWidth / 2,
      pageHeight - 15,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`Invoice-${invoiceNumber}.pdf`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Invoice Generator</h1>
          <p className="text-muted-foreground">
            Create and generate professional invoices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Details */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice-number">Invoice Number</Label>
                    <Input
                      id="invoice-number"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoice-date">Invoice Date</Label>
                    <Input
                      id="invoice-date"
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input
                      id="due-date"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sender Address */}
            <Card>
              <CardHeader>
                <CardTitle>From (Sender)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-company">Company</Label>
                    <Input
                      id="sender-company"
                      value={senderAddress.company}
                      onChange={(e) =>
                        setSenderAddress({
                          ...senderAddress,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-address">Address</Label>
                    <Input
                      id="sender-address"
                      value={senderAddress.address}
                      onChange={(e) =>
                        setSenderAddress({
                          ...senderAddress,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-phone">Phone</Label>
                    <Input
                      id="sender-phone"
                      value={senderAddress.phone}
                      onChange={(e) =>
                        setSenderAddress({
                          ...senderAddress,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Email</Label>
                    <Input
                      id="sender-email"
                      type="email"
                      value={senderAddress.email}
                      onChange={(e) =>
                        setSenderAddress({
                          ...senderAddress,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Biller Address */}
            <Card>
              <CardHeader>
                <CardTitle>Bill To</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="biller-name">Name</Label>
                    <Input
                      id="biller-name"
                      value={billerAddress.name}
                      onChange={(e) =>
                        setBillerAddress({
                          ...billerAddress,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biller-company">Company</Label>
                    <Input
                      id="biller-company"
                      value={billerAddress.company}
                      onChange={(e) =>
                        setBillerAddress({
                          ...billerAddress,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="biller-address">Address</Label>
                    <Input
                      id="biller-address"
                      value={billerAddress.address}
                      onChange={(e) =>
                        setBillerAddress({
                          ...billerAddress,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biller-city">City</Label>
                    <Input
                      id="biller-city"
                      value={billerAddress.city}
                      onChange={(e) =>
                        setBillerAddress({
                          ...billerAddress,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biller-state">State</Label>
                    <Input
                      id="biller-state"
                      value={billerAddress.state}
                      onChange={(e) =>
                        setBillerAddress({
                          ...billerAddress,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biller-zip">ZIP Code</Label>
                    <Input
                      id="biller-zip"
                      value={billerAddress.zip}
                      onChange={(e) =>
                        setBillerAddress({
                          ...billerAddress,
                          zip: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biller-country">Country</Label>
                    <Input
                      id="biller-country"
                      value={billerAddress.country}
                      onChange={(e) =>
                        setBillerAddress({
                          ...billerAddress,
                          country: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biller-phone">Phone</Label>
                    <Input
                      id="biller-phone"
                      value={billerAddress.phone}
                      onChange={(e) =>
                        setBillerAddress({
                          ...billerAddress,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biller-email">Email</Label>
                    <Input
                      id="biller-email"
                      type="email"
                      value={billerAddress.email}
                      onChange={(e) =>
                        setBillerAddress({
                          ...billerAddress,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Select
                    value={selectedProductId}
                    onValueChange={setSelectedProductId}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product: { id: string; name: string }) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddProduct}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>

                {items.length > 0 && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 text-sm font-semibold border-b pb-2">
                      <div className="col-span-5">Product</div>
                      <div className="col-span-2 text-center">Quantity</div>
                      <div className="col-span-2 text-right">Price</div>
                      <div className="col-span-2 text-right">Total</div>
                      <div className="col-span-1"></div>
                    </div>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-2 items-center py-2 border-b"
                      >
                        <div className="col-span-5">{item.name}</div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateItem(
                                item.id,
                                "quantity",
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="text-center"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) =>
                              handleUpdateItem(
                                item.id,
                                "price",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="text-right"
                            placeholder="0.00"
                          />
                        </div>
                        <div className="col-span-2 text-right font-medium">
                          ₹{item.total.toLocaleString()}
                        </div>
                        <div className="col-span-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shipping">Shipping & Handling (₹)</Label>
                  <Input
                    id="shipping"
                    type="number"
                    min="0"
                    step="0.01"
                    value={shippingHandling}
                    onChange={(e) =>
                      setShippingHandling(parseFloat(e.target.value) || 0)
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional notes or terms..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signature">Digital Signature</Label>
                  <Input
                    id="signature"
                    value={digitalSignature}
                    onChange={(e) => setDigitalSignature(e.target.value)}
                    placeholder="Enter signature name"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Shipping & Handling:
                    </span>
                    <span className="font-medium">
                      ₹{shippingHandling.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={generatePDF}
                  disabled={items.length === 0}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Generate PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
