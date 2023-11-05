const statusOptions = ['Paid', 'Pending', 'Unpaid'];

const dummyInvoices = [
  {
    _id: '1',
    invoiceNumber: 'INV-001',
    date: '2023-10-15',
    status: statusOptions[0], // 'Paid'
    client: {
      company: 'ABC Company',
      notes: 'A sample client',
    },
    totalAmount: 100.0,
  },
  {
    _id: '2',
    invoiceNumber: 'INV-002',
    date: '2023-10-20',
    status: statusOptions[1], // 'Pending'
    client: {
      company: 'XYZ Corporation',
      notes: 'Another sample client',
    },
    totalAmount: 150.0,
  },
  {
    _id: '3',
    invoiceNumber: 'INV-003',
    date: '2023-10-25',
    status: statusOptions[0], // 'Paid'
    client: {
      company: 'Sample Ltd.',
      notes: 'Yet another sample client',
    },
    totalAmount: 75.0,
  },
];

export default dummyInvoices;
